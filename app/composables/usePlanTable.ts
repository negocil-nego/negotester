import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Row, Table } from "@tanstack/table-core"
import type { Plan } from "~/types"

export enum PlanSectionType {
    ATTRIBUTE_SERVICE = 'ATTRIBUTE_SERVICE',
    EDIT = 'EDIT'
}

export function usePlanTable(table: any, onEdit: (plan: Plan, sectionType: PlanSectionType) => void) {
    const toast = useToast()
    const queryClient = useQueryClient()
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

    const deleteMutation = useMutation({
        mutationFn: (planId: number) => $fetch(`/api/plans/${planId}`, { method: 'DELETE' }),
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
                    navigator.clipboard.writeText(row.original.uuid.toString())
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
                label: 'Adicionar serviço',
                icon: 'i-lucide-plus',
                onSelect() {
                    onEdit(row.original, PlanSectionType.ATTRIBUTE_SERVICE)
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Editar plano',
                icon: 'i-lucide-edit',
                onSelect() {
                    onEdit(row.original, PlanSectionType.EDIT)
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
                    deleteMutation.mutate(row.original.uuid)
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
