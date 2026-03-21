import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Row, Table } from "@tanstack/table-core"
import type { Category } from "~/types"

export function useCategoryTable(table?: any, onEdit?: (category: Category) => void) {
    const toast = useToast()
    const queryClient = useQueryClient()
    const supabase = useSupabaseClient()

    async function fetchCategories() {
        const { data, error } = await supabase.from('tb_categories').select('*')
        if (error) throw new Error(error.message)
        return data as Category[]
    }

    async function createCategory(item: any) {
        const { data, error } = await supabase.from('tb_categories').insert(item).select()
        if (error) throw new Error(error.message)
        return data
    }

    async function updateCategory(id: number, item: any) {
        const { data, error } = await supabase.from('tb_categories').update(item).eq('id', id).select()
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
        mutationFn: async (categoryId: number) => {
            const { error } = await supabase.from('tb_categories').delete().eq('id', categoryId)
            if (error) throw new Error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            toast.add({
                title: 'Categoria eliminada',
                description: 'A categoria foi eliminada com sucesso.'
            })
        },
        onError: () => {
            toast.add({
                title: 'Erro ao eliminar categoria',
                description: 'A categoria não pôde ser eliminada.',
                color: 'error'
            })
        }
    })

    function getRowItems(row: Row<Category>) {
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
                        description: 'O ID da categoria foi copiado'
                    })
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Editar categoria',
                icon: 'i-lucide-edit',
                onSelect() {
                    if (onEdit) onEdit(row.original)
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Eliminar categoria',
                icon: 'i-lucide-trash',
                color: 'error',
                onSelect: () => {
                    deleteMutation.mutate(row.original.id)
                }
            }
        ]
    }

    function getHeaderSelect(table: Table<Category>) {
        return {
            'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
            'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
                table.toggleAllPageRowsSelected(!!value),
            'ariaLabel': 'Select all',
        }
    }

    function getCellSelect(row: Row<Category>) {
        return {
            'modelValue': row.getIsSelected(),
            'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
            'ariaLabel': 'Select row'
        }
    }

    function getIconAction(row: Row<Category>) {
        return {
            content: { align: 'end' },
            items: getRowItems(row)
        }
    }

    return {
        fetchCategories,
        createCategory,
        updateCategory,

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
