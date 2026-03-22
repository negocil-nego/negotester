<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'

const props = defineProps<{
  table?: any
}>()

const open = ref(false)
const isLoading = ref(false)
const toast = useToast()
const queryClient = useQueryClient()

async function onSubmit() {
  const selectedRows = props.table?.tableApi?.getFilteredSelectedRowModel().rows
  if (!selectedRows?.length) return

  const ids = selectedRows.map((row: any) => row.original.id)

  isLoading.value = true
  try {
    await $fetch('/api/plans/bulk', {
      method: 'DELETE',
      body: { ids }
    })

    toast.add({ title: 'Sucesso', description: 'Planos eliminados com sucesso', color: 'success' })
    queryClient.invalidateQueries({ queryKey: ['plans'] })
    props.table?.tableApi?.toggleAllRowsSelected(false)
    open.value = false
  } catch (e: any) {
    toast.add({ title: 'Erro', description: e.message || 'Erro ao eliminar planos', color: 'error' })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UModal v-model:open="open" title="Eliminar planos"
    description="Tem certeza que deseja eliminar os planos selecionados?">
    <UButton v-if="table?.tableApi?.getFilteredSelectedRowModel().rows.length" label="Eliminar" color="error"
      variant="subtle" icon="i-lucide-trash">
      <template #trailing>
        <UKbd>
          {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length }}
        </UKbd>
      </template>
    </UButton>

    <template #body>
      <div class="flex justify-end gap-2">
        <UButton label="Cancelar" color="neutral" variant="subtle" @click="open = false" />
        <UButton label="Eliminar" color="error" variant="solid" loading-auto @click="onSubmit" />
      </div>
    </template>
  </UModal>
</template>
