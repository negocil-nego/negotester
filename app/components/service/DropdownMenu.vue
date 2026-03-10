<template>
    <UDropdownMenu :items="table?.tableApi
        ?.getAllColumns()
        .filter((column: any) => column.getCanHide())
        .map((column: any) => {
            return {
                label: label(column),
                type: 'checkbox' as const,
                checked: column.getIsVisible(),
                onUpdateChecked(checked: boolean) {
                    table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                },
                onSelect(e?: Event) {
                    e?.preventDefault()
                }
            }
        })
        " :content="{ align: 'end' }">
        <UButton label="Colunas" color="neutral" variant="outline" trailing-icon="i-lucide-settings-2" />
    </UDropdownMenu>
</template>
<script lang="ts" setup>
import { upperFirst } from 'scule';;
defineProps<{ table: any }>()

const label = (column: any) => {
    switch (column.id) {
        case 'id':
            return 'ID'
        case 'name':
            return 'Nome'
        case 'select':
            return 'Selecionar'
        case 'description':
            return 'Descrição'
        case 'actions':
            return 'Ações'
        default:
            return upperFirst(column.id)
    }
}
</script>