<script setup lang="ts">
defineProps<{
    items: any[]
    emptyText: string
    emptyIcon: string
    submitLabel: string
    submitIcon: string
    submitColor?: any
    submitting?: boolean
    activeClass?: string
    hoverClass?: string
}>()

const emit = defineEmits<{
    (e: 'submit', ids: string[]): void
}>()

const selectedIds = defineModel<string[]>('selectedIds', { default: () => [] })

const toggleSelection = (id: string) => {
    const idx = selectedIds.value.indexOf(id)
    if (idx > -1) selectedIds.value.splice(idx, 1)
    else selectedIds.value.push(id)
}

const submit = () => {
    emit('submit', selectedIds.value)
}
</script>

<template>
    <div v-if="items.length === 0" class="flex flex-col items-center justify-center h-32 text-gray-500">
        <Icon :name="emptyIcon" class="w-8 h-8 mb-2 opacity-50" />
        {{ emptyText }}
    </div>
    <div v-else class="flex flex-col h-full">
        <div class="space-y-2 mb-4 max-h-[40vh] overflow-y-auto pr-1">
            <div v-for="item in items" :key="item.id" @click="toggleSelection(item.uuid)"
                :class="['flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-colors', selectedIds.includes(item.uuid) ? (activeClass || 'border-primary/50 bg-primary/5') : (hoverClass || 'border-gray-200 dark:border-gray-800 hover:border-primary/30')]">
                <UCheckbox :model-value="selectedIds.includes(item.uuid)" :color="submitColor || 'primary'"
                    class="pointer-events-none" />
                <div class="flex flex-col">
                    <span class="font-medium flex items-center gap-2">
                        <Icon v-if="item.icon" :name="item.icon" class="w-4 h-4" />
                        {{ item.name }}
                    </span>
                    <span class="text-xs text-gray-500">{{ item.description || 'Sem descrição' }}</span>
                </div>
            </div>
        </div>
        <div class="flex justify-end mt-auto pt-2 border-t border-gray-100 dark:border-gray-800">
            <UButton :icon="submitIcon" :label="submitLabel" :color="submitColor || 'primary'"
                :variant="submitColor === 'error' ? 'ghost' : 'solid'" :disabled="selectedIds.length === 0"
                :loading="submitting" @click="submit" />
        </div>
    </div>
</template>
