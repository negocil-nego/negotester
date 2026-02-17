<script setup lang="ts">
const props = defineProps<{
  table?: any
}>()

const open = ref(false)

const count = computed(() => props.table?.tableApi?.getFilteredSelectedRowModel().rows.length)

async function onSubmit() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open" title="Eliminar categoria"
    description="Tem certeza que deseja eliminar as categorias selecionadas?">

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
