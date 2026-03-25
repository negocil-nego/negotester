<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/table-core'
import { useQuery } from '@tanstack/vue-query'
import type { TableColumn } from '@nuxt/ui'
import type { Plan } from '~/types'

const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')
const UTooltip = resolveComponent('UTooltip')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const table = useTemplateRef('table')

const isEditOpen = ref(false)
const isAddServiceOpen = ref(false)
const selectedPlan = ref<Plan>()

const {
  getHeaderSelect,
  getCellSelect,
  getIconAction,
  columnVisibility,
  columnFilters,
  rowSelection,
  pagination,
  search
} = usePlanTable(table, (plan, sectionType) => {
  if (sectionType === PlanSectionType.EDIT) {
    selectedPlan.value = plan
    isEditOpen.value = true
  } else if (sectionType === PlanSectionType.ATTRIBUTE_SERVICE) {
    selectedPlan.value = plan
    isAddServiceOpen.value = true
  }
})

const { data, isPending: pending } = useQuery({
  queryKey: ['plans'],
  queryFn: () => $fetch<Plan[]>('/api/plans')
})

const columns: TableColumn<Plan>[] = [
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
    accessorKey: 'price',
    header: ({ column }) => h(UButton, columnHeaderSort(column, column.getIsSorted(), 'Preço'))
  },
  {
    accessorKey: 'billingCycle',
    header: ({ column }) => h(UButton, columnHeaderSort(column, column.getIsSorted(), 'Ciclo de Faturação')),
    cell: ({ row }) => {
      const color = {
        DAY: 'success' as const,
        MONTH: 'error' as const,
        YEAR: 'warning' as const,
        NONE: 'neutral' as const
      }[row.original.billingCycle]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.original.billingCycle
      )
    }
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
  <UDashboardPanel id="Planos">
    <template #header>
      <UDashboardNavbar title="Planos">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <PlanFormModal v-model:open="isEditOpen" :plan="selectedPlan" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <UInput v-model="search" class="max-w-sm" icon="i-lucide-search" placeholder="Pesquisar ..." />
        <div class="flex flex-wrap items-center gap-1.5">
          <PlanDeleteModal :table="table" />
          <PlanDropdownMenu :table="table" />
        </div>
      </div>

      <PlanFormModal v-if="isAddServiceOpen" v-model:open="isAddServiceOpen" :plan="selectedPlan"
        @cancel="isAddServiceOpen = false" />

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
