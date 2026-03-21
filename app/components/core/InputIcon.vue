<script setup lang="ts">
import type { IconItem } from '~/shared/icons';
import { iconItems } from '~/shared/icons';

const open = ref(false)
const items = ref<IconItem[]>(iconItems)
const searchQuery = ref('')

const modelValue = defineModel<string>()

const filteredItems = computed(() => {
    if (!searchQuery.value) return items.value

    const query = searchQuery.value.toLowerCase()
    return items.value.map(group => ({
        ...group,
        items: group.items.filter(icon =>
            icon.label.toLowerCase().includes(query)
            || icon.value.toLowerCase().includes(query)
        )
    })).filter(group => group.items.length > 0)
})

const selectedIconLabel = computed(() => {
    if (!modelValue.value) return 'Escolha um icone'
    for (const group of items.value) {
        const found = group.items.find(i => i.value === modelValue.value)
        if (found) return found.label
    }
    return modelValue.value || 'Escolha um icone'
})

const selectIcon = (iconValue: string) => {
    modelValue.value = iconValue
    open.value = false
}
</script>

<template>
    <UPopover class="w-full border-0 reactive" :open :popper="{ placement: 'bottom-start', strategy: 'fixed' }">
        <UButton :icon="modelValue || 'i-lucide-tag'" :label="selectedIconLabel" color="neutral" variant="outline"
            class="w-full justify-start" @click="open = !open" />
        <template #content>
            <div class="p-2 md:p-5">
                <UInput v-model="searchQuery" icon="i-lucide-search" placeholder="Pesquisar icone" autofocus />
                <UScrollArea class="h-[200px] md:h-[250px] mt-2">
                    <div v-for="item in filteredItems" :key="item.label" class="mt-4 md:mt-6 lg:mt-8 mb-2">
                        <div class="font-bold mb-2">{{ item.label }}</div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-5">
                            <div v-for="icon in item.items" :key="icon.value"
                                :class="['flex items-center gap-2 hover:bg-base/80 hover:px-2 hover:rounded-md cursor-pointer transition-colors pt-1 pb-1', modelValue === icon.value ? 'bg-primary/10 text-primary px-2 rounded-md font-medium' : '']"
                                @click="selectIcon(icon.value)">
                                <Icon :name="icon.value" class="shrink-0" />
                                <span class="truncate">{{ icon.label }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="filteredItems.length === 0" class="text-center text-gray-500 my-8">
                        Nenhum ícone encontrado
                    </div>
                </UScrollArea>
            </div>
            <UButton class="absolute top-1 right-1" color="neutral" variant="ghost" icon="i-lucide-x"
                @click="open = false" />
        </template>
    </UPopover>
</template>
