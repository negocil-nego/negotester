<template>
    <UDropdownMenu :items="table?.tableApi
        ?.getAllColumns()
        .filter((column: any) => column.getCanHide())
        .map((column: any) => ({
            label: upperFirst(column.id),
            type: 'checkbox' as const,
            checked: column.getIsVisible(),
            onUpdateChecked(checked: boolean) {
                table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
            },
            onSelect(e?: Event) {
                e?.preventDefault()
            }
        }))
        " :content="{ align: 'end' }">
        <UButton label="Colunas" color="neutral" variant="outline" trailing-icon="i-lucide-settings-2" />
    </UDropdownMenu>
</template>
<script lang="ts" setup>
import { upperFirst } from 'scule'
defineProps<{ table: any }>()
</script>