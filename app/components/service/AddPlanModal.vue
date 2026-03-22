<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import type { Plan, Service } from '~/types'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{
    service?: Service
}>()

const { data: plans, isPending: loadingPlans } = useQuery({
    queryKey: ['plans'],
    queryFn: () => $fetch<Plan[]>('/api/plans')
})

const { data: attachedPlanIds, isPending: loadingAttached } = useQuery({
    queryKey: ['service-plans', computed(() => props.service?.id)],
    queryFn: () => $fetch<number[]>(`/api/services/${props.service?.id}/plans`),
    enabled: computed(() => !!props.service?.id)
})

const searchQuery = ref('')

const hasPlans = computed(() => {
    if (!plans.value || !attachedPlanIds.value) return []
    return plans.value.filter(p => attachedPlanIds.value.includes(p.id) && p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const notHasPlans = computed(() => {
    if (!plans.value) return []
    let list = plans.value
    if (attachedPlanIds.value) list = list.filter(p => !attachedPlanIds.value.includes(p.id))
    return list.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
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
    if (selectedAvailableIds.value.length === 0 || !props.service) return
    await bulkMutate({ action: 'link', serviceId: props.service.id, planIds: selectedAvailableIds.value })
    selectedAvailableIds.value = []
}

const submitUnlink = async () => {
    if (selectedLinkedIds.value.length === 0 || !props.service) return
    await bulkMutate({ action: 'unlink', serviceId: props.service.id, planIds: selectedLinkedIds.value })
    selectedLinkedIds.value = []
}

const emit = defineEmits(['cancel'])
</script>

<template>
    <UModal v-model:open="open" :title="`Planos do Serviço: ${service?.name || ''}`"
        description="Gerencie quais planos contêm este serviço">
        <template #body>
            <UInput v-model="searchQuery" icon="i-lucide-search" placeholder="Pesquisar plano..." class="mb-4" />
            <UTabs :items="items" class="w-full" @change="() => { selectedLinkedIds = []; selectedAvailableIds = [] }">
                <template #content="{ item }">
                    <UCard class="mt-4 min-h-[250px]">
                        <div v-if="loadingPlans || loadingAttached" class="flex justify-center items-center h-48">
                            <UIcon name="i-lucide-loader-2" class="animate-spin text-3xl text-primary" />
                        </div>
                        <CoreSelectionList v-else-if="item.key === 'has'" v-model:selected-ids="selectedLinkedIds"
                            :items="hasPlans" empty-text="Nenhum plano vinculado" empty-icon="i-lucide-file-x-2"
                            submit-label="Desvincular Selecionados" submit-icon="i-lucide-trash" submit-color="error"
                            :submitting="submitting" active-class="border-error/50 bg-error/5"
                            hover-class="border-gray-200 dark:border-gray-800 hover:border-error/30"
                            @submit="submitUnlink" />
                        <CoreSelectionList v-else-if="item.key === 'not_has'"
                            v-model:selected-ids="selectedAvailableIds" :items="notHasPlans"
                            empty-text="Todos os planos já estão vinculados" empty-icon="i-lucide-check-circle-2"
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
