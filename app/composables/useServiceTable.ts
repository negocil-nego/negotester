import type { Row, Table } from "@tanstack/table-core"
import type { Service } from "~/types"

export function useServiceTable(table: any) {
    const toast = useToast()
    const columnVisibility = ref({ id: false })
    const rowSelection = ref({})
    const pagination = ref({
        pageIndex: 0,
        pageSize: 10
    })

    const columnFilters = ref([{ id: 'name', value: '' }])

    const search = computed({
        get: (): string => {
            return (table.value?.tableApi?.getColumn('name')?.getFilterValue() as string) || ''
        },
        set: (value: string) => {
            table.value?.tableApi?.getColumn('name')?.setFilterValue(value || undefined)
        }
    })

    function getRowItems(row: Row<Service>) {
        return [
            {
                type: 'label',
                label: 'Acção'
            },
            {
                label: 'Copiar o ID',
                icon: 'i-lucide-copy',
                onSelect() {
                    navigator.clipboard.writeText(row.original.id.toString())
                    toast.add({
                        title: 'ID copiado',
                        description: 'O ID do serviço foi copiado'
                    })
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Editar serviço',
                icon: 'i-lucide-edit'
            },
            {
                type: 'separator'
            },
            {
                label: 'Eliminar serviço',
                icon: 'i-lucide-trash',
                color: 'error',
                onSelect() {
                    toast.add({
                        title: 'Serviço eliminado',
                        description: 'O serviço foi eliminado.'
                    })
                }
            }
        ]
    }

    function getHeaderSelect(table: Table<Service>) {
        return {
            'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
            'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
                table.toggleAllPageRowsSelected(!!value),
            'ariaLabel': 'Select all',
        }
    }

    function getCellSelect(row: Row<Service>) {
        return {
            'modelValue': row.getIsSelected(),
            'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
            'ariaLabel': 'Select row'
        }
    }

    function getIconAction(row: Row<Service>) {
        return {
            content: { align: 'end' },
            items: getRowItems(row)
        }
    }

    return {
        search,
        getRowItems,
        getHeaderSelect,
        getCellSelect,
        getIconAction,

        columnFilters,
        rowSelection,
        pagination,
        columnVisibility
    }
}