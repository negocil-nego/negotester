import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Row, Table } from "@tanstack/table-core"
import type { Service } from "~/types"

export function useServiceTable(table?: any, onEdit?: (service: Service) => void) {
    const toast = useToast()
    const queryClient = useQueryClient()
    const supabase = useSupabaseClient()

    async function fetchServices() {
        const { data, error } = await supabase.from('tb_services').select('*')
        if (error) throw new Error(error.message)
        return data as Service[]
    }

    async function createService(newService: any) {
        const { data, error } = await supabase.from('tb_services').insert(newService).select()
        if (error) throw new Error(error.message)
        return data
    }

    async function updateService(id: number, updatedService: any) {
        const { data, error } = await supabase.from('tb_services').update(updatedService).eq('id', id).select()
        if (error) throw new Error(error.message)
        return data
    }

    const rowSelection = ref({})
    const columnVisibility = ref({ id: false })
    const pagination = ref({ pageIndex: 0, pageSize: 10 })

    const columnFilters = ref([{ id: 'name', value: '' }])

    const search = computed({
        get: (): string => {
            if (!table) return ''
            return (table.value?.tableApi?.getColumn('name')?.getFilterValue() as string) || ''
        },
        set: (value: string) => {
            if (table) table.value?.tableApi?.getColumn('name')?.setFilterValue(value || undefined)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (serviceId: number) => {
            const { error } = await supabase.from('tb_services').delete().eq('id', serviceId)
            if (error) throw new Error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
            toast.add({
                title: 'Serviço eliminado',
                description: 'O serviço foi eliminado com sucesso.'
            })
        },
        onError: () => {
            toast.add({
                title: 'Erro ao eliminar serviço',
                description: 'O serviço não pôde ser eliminado.',
                color: 'error'
            })
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
                icon: 'i-lucide-edit',
                onSelect() {
                    if (onEdit) onEdit(row.original)
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Eliminar serviço',
                icon: 'i-lucide-trash',
                color: 'error',
                onSelect: () => {
                    deleteMutation.mutate(row.original.id)
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
        fetchServices,
        createService,
        updateService,

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
