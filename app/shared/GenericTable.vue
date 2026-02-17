<template>
  <UTable :ref="ref" v-model:column-filters="columnFilters" v-model:column-visibility="columnVisibility"
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
</template>
<script lang="ts" setup>
import { getPaginationRowModel } from '@tanstack/table-core'

defineProps<{
  ref: string
  data: any[] | undefined
  columns: any[]
  status: string
}>()

const rowSelection = ref({ 1: true })
const pagination = ref({ pageIndex: 0, pageSize: 10 })
const columnFilters = ref([])
const columnVisibility = ref()
</script>