<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/table-core'
import { useQuery } from '@tanstack/vue-query'
import type { TableColumn } from '@nuxt/ui'
import type { Category } from '~/types'

const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')
const UButton = resolveComponent('UButton')
const table = useTemplateRef('table')

const isEditOpen = ref(false)
const selectedCategory = ref<Category>()

const {
  getHeaderSelect,
  getCellSelect,
  getIconAction,
  columnVisibility,
  columnFilters,
  rowSelection,
  pagination,
  search,
  fetchCategories
} = useCategoryTable(table, (category) => {
  selectedCategory.value = category
  isEditOpen.value = true
})

const { data, isPending: pending } = useQuery({
  queryKey: ['categories'],
  queryFn: fetchCategories
})

const columns: TableColumn<Category>[] = [
  {
    id: 'select',
    header: ({ table }) => h(UCheckbox, getHeaderSelect(table)),
    cell: ({ row }) => h(UCheckbox, getCellSelect(row))
  },
  {
    accessorKey: 'id',
    header: ({ column }) => h(UButton, columnHeaderSort(column, column.getIsSorted(), 'id'))
  },
  {
    accessorKey: 'name',
    header: ({ column }) => h(UButton, columnHeaderSort(column, column.getIsSorted(), 'Nome'))
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => row.original.description
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h('div', iconStyle, h(UDropdownMenu, getIconAction(row), () => h(UButton, iconButton)))
    }
  }
]
</script>

<template>
  <UDashboardPanel id="categories">
    <template #header>
      <UDashboardNavbar title="Categorias">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <CategoryAddModal v-model:open="isEditOpen" :category="selectedCategory" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <UInput v-model="search" class="max-w-sm" icon="i-lucide-search" placeholder="Pesquisar ..." />
        <div class="flex flex-wrap items-center gap-1.5">
          <CategoryDeleteModal :table="table" />
          <CategoryDropdownMenu :table="table" />
        </div>
      </div>

      <UTable ref="table" v-model:column-filters="columnFilters" v-model:column-visibility="columnVisibility"
        v-model:row-selection="rowSelection" v-model:pagination="pagination" :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }" class="shrink-0" :data="data || []" :columns="columns" :loading="pending" :ui="{
          base: 'table-fixed border-separate border-spacing-0',
          thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
          tbody: '[&>tr]:last:[&>td]:border-b-0',
          th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
          td: 'border-b border-default',
          separator: 'h-0'
        }" />

      <CorePagination :table="table" />
    </template>
  </UDashboardPanel>
</template>
