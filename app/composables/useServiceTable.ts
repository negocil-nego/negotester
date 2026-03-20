import type { Row, Table } from "@tanstack/table-core"
import type { Service } from "~/types"

async function useServiceDelete(job: Service) {
    const { data, status } = await useFetch(`/api/services/${job.id}`, { method: 'DELETE', lazy: true })
    return { data, status }
}

export function useServiceTable(table: any) {
    const toast = useToast()
    const columnVisibility = ref({ id: false })
    const rowSelection = ref({})
    const pagination = ref({ pageIndex: 0, pageSize: 10 })

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
                        title: 'Copied to clipboard',
                        description: 'Customer ID copied to clipboard'
                    })
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Editar categoria',
                icon: 'i-lucide-edit'
            },
            {
                type: 'separator'
            },
            {
                label: 'Eliminar categoria',
                icon: 'i-lucide-trash',
                color: 'error',
                onSelect: async () => {
                    const { status } = await useServiceDelete(row.original)
                    if (status.value === 'success') {
                        toast.add({
                            title: 'Categoria eliminada',
                            description: 'A categoria foi eliminada com sucesso.'
                        })
                    } else {
                        toast.add({
                            title: 'Erro ao eliminar categoria',
                            description: 'A categoria não foi eliminada.',
                            color: 'error'
                        })
                    }
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
