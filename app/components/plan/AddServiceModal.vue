<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import type { Plan, Service } from '~/types'
import { usePlanServiceBulk } from '~/composables/usePlanServiceBulk'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{
    plan?: Plan
}>()

const { data: services, isPending: loadingServices } = useQuery({
    queryKey: ['services'],
    queryFn: () => $fetch<Service[]>('/api/services')
})

const { data: attachedServiceIds, isPending: loadingAttached } = useQuery({
    queryKey: ['plan-services', computed(() => props.plan?.uuid)],
    queryFn: () => $fetch<number[]>(`/api/plans/${props.plan?.uuid}/services`),
    enabled: computed(() => !!props.plan?.uuid)
})

const searchQuery = ref('')

const hasServices = computed(() => {
    if (!services.value || !attachedServiceIds.value) return []
    return services.value.filter(s => attachedServiceIds.value.includes(s.uuid) && s.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const notHasServices = computed(() => {
    if (!services.value) return []
    let list = services.value
    if (attachedServiceIds.value) list = list.filter(s => !attachedServiceIds.value.includes(s.uuid))
    return list.filter(s => s.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const items = [
    { key: 'not_has', label: 'Disponíveis', icon: 'i-lucide-plus-circle' },
    { key: 'has', label: 'Vinculados', icon: 'i-lucide-check-circle' }
]

const selectedLinkedIds = ref<number[]>([])
const selectedAvailableIds = ref<number[]>([])

watch(open, (isOpen) => {
    if (isOpen) {
        selectedLinkedIds.value = []
        selectedAvailableIds.value = []
        searchQuery.value = ''
    }
})

const { bulkMutate, isPending: submitting } = usePlanServiceBulk()

const submitLink = async () => {
    if (selectedAvailableIds.value.length === 0 || !props.plan) return
    await bulkMutate({ action: 'link', planId: props.plan.uuid, serviceIds: selectedAvailableIds.value })
    selectedAvailableIds.value = []
}

const submitUnlink = async () => {
    if (selectedLinkedIds.value.length === 0 || !props.plan) return
    await bulkMutate({ action: 'unlink', planId: props.plan.uuid, serviceIds: selectedLinkedIds.value })
    selectedLinkedIds.value = []
}

const emit = defineEmits(['cancel'])
</script>

<template>
    <UModal v-model:open="open" :title="`Serviços do Plano: ${plan?.name || ''}`"
        description="Gerencie quais serviços estão inclusos neste plano">
        <template #body>
            <UInput v-model="searchQuery" icon="i-lucide-search" placeholder="Pesquisar serviço..." class="mb-4" />
            <UTabs :items="items" class="w-full" @change="() => { selectedLinkedIds = []; selectedAvailableIds = [] }">
                <template #content="{ item }">
                    <UCard class="mt-4 min-h-[250px]">
                        <div v-if="loadingServices || loadingAttached" class="flex justify-center items-center h-48">
                            <UIcon name="i-lucide-loader-2" class="animate-spin text-3xl text-primary" />
                        </div>

                        <CoreSelectionList v-else-if="item.key === 'has'" v-model:selected-ids="selectedLinkedIds"
                            :items="hasServices" empty-text="Nenhum serviço vinculado" empty-icon="i-lucide-file-x-2"
                            submit-label="Desvincular Selecionados" submit-icon="i-lucide-trash" submit-color="error"
                            :submitting="submitting" active-class="border-error/50 bg-error/5"
                            hover-class="border-gray-200 dark:border-gray-800 hover:border-error/30"
                            @submit="submitUnlink" />

                        <CoreSelectionList v-else-if="item.key === 'not_has'"
                            v-model:selected-ids="selectedAvailableIds" :items="notHasServices"
                            empty-text="Todos os serviços já estão vinculados" empty-icon="i-lucide-check-circle-2"
                            submit-label="Vincular Selecionados" submit-icon="i-lucide-plus" submit-color="primary"
                            :submitting="submitting" active-class="border-primary/50 bg-primary/5"
                            hover-class="border-gray-200 dark:border-gray-800 hover:border-primary/30"
                            @submit="submitLink" />
                    </UCard>
                </template>
            </UTabs>
        </template>

        <div class="flex justify-end gap-2 pt-2">
            <UButton label="Fechar" color="neutral" variant="subtle" @click="emit('cancel')" />
        </div>
    </UModal>
</template>
