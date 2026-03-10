<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/table-core'
import type { TableColumn } from '@nuxt/ui'
import type { User } from '~/types'

const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')
const UButton = resolveComponent('UButton')
const table = useTemplateRef('table')

const {
  getHeaderSelect,
  getCellSelect,
  getIconAction,
  columnVisibility,
  columnFilters,
  rowSelection,
  pagination,
  search
} = useUserTable(table)

const { data, status } = await useFetch<User[]>('/api/users', {
  lazy: true
})

const columns: TableColumn<User>[] = [
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
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.original.email
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
  <UDashboardPanel id="users">
    <template #header>
      <UDashboardNavbar title="Utilizadores">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <UserAddModal />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <UInput v-model="search" class="max-w-sm" icon="i-lucide-search" placeholder="Pesquisar ..." />
        <div class="flex flex-wrap items-center gap-1.5">
          <UserDeleteModal :table="table" />
          <UserDropdownMenu :table="table" />
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

      <CorePagination :table="table" />
    </template>
  </UDashboardPanel>
</template>
