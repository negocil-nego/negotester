import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Row, Table } from "@tanstack/table-core"
import type { Plan } from "~/types"

export function usePlanTable(table?: any, onEdit?: (plan: Plan) => void) {
    const toast = useToast()
    const queryClient = useQueryClient()
    const supabase = useSupabaseClient()

    async function fetchPlans() {
        const { data, error } = await supabase.from('tb_plans').select('*')
        if (error) throw new Error(error.message)
        if (!data) return [] as Plan[]
        const plans: Plan[] = data.map((it: any) => ({ ...it, billingCycle: it.billing_cycle }))
        return plans;
    }

    async function createPlan(item: any) {
        const { data, error } = await supabase.from('tb_plans').insert(item).select()
        if (error) throw new Error(error.message)
        return data
    }

    async function updatePlan(id: number, item: any) {
        const { data, error } = await supabase.from('tb_plans').update(item).eq('id', id).select()
        if (error) throw new Error(error.message)
        return data
    }

    const columnVisibility = ref({ id: false })
    const rowSelection = ref({})
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
        mutationFn: async (planId: number) => {
            const { error } = await supabase.from('tb_plans').delete().eq('id', planId)
            if (error) throw new Error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans'] })
            toast.add({
                title: 'Plano eliminado',
                description: 'O plano foi eliminado com sucesso.'
            })
        },
        onError: () => {
            toast.add({
                title: 'Erro ao eliminar plano',
                description: 'O plano não pôde ser eliminado.',
                color: 'error'
            })
        }
    })

    function getRowItems(row: Row<Plan>) {
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
                        description: 'O ID do plano foi copiado'
                    })
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Editar plano',
                icon: 'i-lucide-edit',
                onSelect() {
                    if (onEdit) onEdit(row.original)
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Eliminar plano',
                icon: 'i-lucide-trash',
                color: 'error',
                onSelect: () => {
                    deleteMutation.mutate(row.original.id)
                }
            }
        ]
    }

    function getHeaderSelect(table: Table<Plan>) {
        return {
            'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
            'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
                table.toggleAllPageRowsSelected(!!value),
            'ariaLabel': 'Select all',
        }
    }

    function getCellSelect(row: Row<Plan>) {
        return {
            'modelValue': row.getIsSelected(),
            'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
            'ariaLabel': 'Select row'
        }
    }

    function getIconAction(row: Row<Plan>) {
        return {
            content: { align: 'end' },
            items: getRowItems(row)
        }
    }

    return {
        fetchPlans,
        createPlan,
        updatePlan,

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
