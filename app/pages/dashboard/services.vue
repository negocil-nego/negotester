<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/table-core'
import { useQuery } from '@tanstack/vue-query'
import type { TableColumn } from '@nuxt/ui'
import type { Service } from '~/types'

const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')
const UTooltip = resolveComponent('UTooltip')
const UButton = resolveComponent('UButton')
const Icon = resolveComponent('Icon')
const table = useTemplateRef('table')

const isEditOpen = ref(false)
const isAddPlanOpen = ref(false)
const selectedService = ref<Service>()

const {
  getHeaderSelect,
  getCellSelect,
  getIconAction,
  columnVisibility,
  columnFilters,
  rowSelection,
  pagination,
  search
} = useServiceTable(table, (service, sectionType) => {
  if (sectionType === SectionType.EDIT) {
    selectedService.value = service
    isEditOpen.value = true
  } else if (sectionType === SectionType.ATTRIBUTE_PLAN) {
    selectedService.value = service
    isAddPlanOpen.value = !isAddPlanOpen.value
  }
})

const { data, isPending: pending } = useQuery({
  queryKey: ['services'],
  queryFn: () => $fetch<Service[]>('/api/services')
})

const columns: TableColumn<Service>[] = [
  {
    id: 'select',
    header: ({ table }) => h(UCheckbox, getHeaderSelect(table)),
    cell: ({ row }) => h(UCheckbox, getCellSelect(row))
  },
  {
    accessorKey: 'name',
    header: ({ column }) => h(UButton, columnHeaderSort(column, column.getIsSorted(), 'Nome'))
  },
  {
    accessorKey: 'icon',
    header: 'Icone',
    cell: ({ row }) => h(Icon, { name: row.original.icon, class: 'w-5 h-5' })
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => h(UTooltip, { text: row.original.description }, () => h(UButton, { variant: 'ghost', color: 'neutral', class: 'font-normal' }, row.original.description!.substring(0, 40) + '...'))
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
      <UDashboardNavbar title="Serviços">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <ServiceFormModal v-model:open="isEditOpen" :service="selectedService" @cancel="isEditOpen = false" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <UInput v-model="search" class="max-w-sm" icon="i-lucide-search" placeholder="Pesquisar ..." />
        <div class="flex flex-wrap items-center gap-1.5">
          <ServiceDeleteModal :table="table" />
          <ServiceDropdownMenu :table="table" />
        </div>
      </div>

      <ServiceAddPlanModal v-if="isAddPlanOpen" v-model:open="isAddPlanOpen" :service="selectedService"
        @cancel="isAddPlanOpen = false" />

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
