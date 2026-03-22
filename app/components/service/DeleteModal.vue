<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'

const props = defineProps<{
  table?: any
}>()

const open = ref(false)
const isLoading = ref(false)
const toast = useToast()
const queryClient = useQueryClient()

const onSubmit = async () => {
  const selectedRows = props.table?.tableApi?.getFilteredSelectedRowModel().rows
  if (!selectedRows?.length) return

  const ids = selectedRows.map((row: any) => row.original.id)

  isLoading.value = true
  try {
    await $fetch('/api/services/bulk', {
      method: 'DELETE',
      body: { ids }
    })

    toast.add({ title: 'Sucesso', description: 'Serviços eliminados com sucesso', color: 'success' })
    queryClient.invalidateQueries({ queryKey: ['services'] })
    props.table?.tableApi?.toggleAllRowsSelected(false)
    open.value = false
  } catch (e: any) {
    toast.add({ title: 'Erro', description: e.message || 'Erro ao eliminar serviços', color: 'error' })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UModal v-model:open="open" title="Eliminar serviços"
    description="Tem certeza que deseja eliminar os serviços selecionados?">
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
