<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/table-core'
import type { TableColumn } from '@nuxt/ui'
import type { Category } from '~/types'
import { upperFirst } from 'scule'

const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')
const UButton = resolveComponent('UButton')

const table = useTemplateRef('table')

const {
  getRowItems,
  getHeaderSelect,
  getCellSelect,
  getHeaderName,
  columnVisibility,
  columnFilters,
  rowSelection,
  pagination,
  search
} = useCategoryTable(table)

const { data, status } = await useFetch<Category[]>('/api/categories', {
  lazy: true
})

const columns: TableColumn<Category>[] = [
  {
    id: 'select',
    header: ({ table }) => h(UCheckbox, getHeaderSelect(table)),
    cell: ({ row }) => h(UCheckbox, getCellSelect(row))
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h(UButton, getHeaderName(column, column.getIsSorted()))
    }
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => row.original.description
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: { align: 'end' },
            items: getRowItems(row)
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto'
            })
        )
      )
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
          <CategoryAddModal />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <UInput v-model="search" class="max-w-sm" icon="i-lucide-search" placeholder="Pesquisar ..." />

        <div class="flex flex-wrap items-center gap-1.5">
          <CategoryDeleteModal :count="table?.tableApi?.getFilteredSelectedRowModel().rows.length">
            <UButton v-if="table?.tableApi?.getFilteredSelectedRowModel().rows.length" label="Delete" color="error"
              variant="subtle" icon="i-lucide-trash">
              <template #trailing>
                <UKbd>
                  {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length }}
                </UKbd>
              </template>
            </UButton>
          </CategoryDeleteModal>

          <CategoryDropdownMenu :table="table" />
        </div>
      </div>

      <UTable ref="table" v-model:column-filters="columnFilters" v-model:column-visibility="columnVisibility"
        v-model:row-selection="rowSelection" v-model:pagination="pagination" :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }" class="shrink-0" :data="data" :columns="columns" :loading="status === 'pending'" :ui="{
          base: 'table-fixed border-separate border-spacing-0',
          thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
          tbody: '[&>tr]:last:[&>td]:border-b-0',
          th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
          td: 'border-b border-default',
          separator: 'h-0'
        }" />

      <div class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto">
        <div class="text-sm text-muted">
          {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
          {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
        </div>

        <div class="flex items-center gap-1.5">
          <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)" />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
