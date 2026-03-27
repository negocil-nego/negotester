<script setup lang="ts">
import { useMutation, useQueryClient, useQuery } from '@tanstack/vue-query'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Service, Category, ServiceArea } from '~/types'

const props = defineProps<{
  service?: Service
  onCancel?: () => void
}>()
const open = defineModel<boolean>('open', { default: false })

const justClickedNew = ref(false)
const isEditingInternal = ref(false)
const isEditing = computed(() => isEditingInternal.value)

function onOpenNew() {
  justClickedNew.value = true
  open.value = true
}

const schema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  price: z.number().min(0, 'O preço não pode ser negativo'),
  description: z.string().min(2, 'Descrição muito curta'),
  icon: z.string().min(2, 'Icone muito curto').optional(),
  category: z.any().refine(val => val && val.uuid, 'Categoria é obrigatória'),
  area: z.enum(['PLAN', 'PROPOSAL'] as ServiceArea[])
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  price: 0,
  description: '',
  icon: '',
  category: undefined
})

watch(open, (isOpen) => {
  if (isOpen) {
    if (justClickedNew.value) {
      justClickedNew.value = false
      isEditingInternal.value = false
      Object.assign(state, { name: '', price: 0, description: '', icon: '', category: undefined, image: undefined })
    } else if (props.service) {
      isEditingInternal.value = true
      Object.assign(state, {
        name: props.service.name,
        price: props.service.price,
        description: props.service.description,
        icon: props.service.icon,
        category: props.service.category,
        area: props.service.area,
        image: undefined
      })
    } else {
      isEditingInternal.value = false
      Object.assign(state, { name: '', price: 0, description: '', icon: '', category: undefined, image: undefined })
    }
  } else {
    setTimeout(() => {
      isEditingInternal.value = false
    }, 200)
    Object.assign(state, { name: '', price: 0, description: '', icon: '', category: undefined, image: undefined })
  }
})

const { data: categories, isPending: loadingCategories } = useQuery({
  queryKey: ['categories'],
  queryFn: () => $fetch<Category[]>('/api/categories')
})

const toast = useToast()
const queryClient = useQueryClient()

const { mutate, isPending: loading } = useMutation({
  mutationFn: (newService: Schema) => {
    if (isEditing.value && props.service?.uuid) {
      return $fetch(`/api/services/${props.service.uuid}`, { method: 'PATCH', body: newService })
    }
    return $fetch('/api/services', { method: 'POST', body: newService })
  },
  onSuccess: (_, variables) => {
    queryClient.invalidateQueries({ queryKey: ['services'] })
    const action = isEditing.value ? 'atualizado' : 'criado'
    toast.add({ title: 'Sucesso', description: `Serviço ${variables.name} ${action}`, color: 'success' })
    open.value = false
    Object.assign(state, { name: '', price: 0, description: '', icon: '', category: undefined, image: undefined })
  },
  onError: (error: any) => {
    toast.add({ title: 'Erro', description: error.statusMessage || 'Erro ao guardar serviço', color: 'error' })
  }
})

function onSubmit(event: FormSubmitEvent<Schema>) {
  mutate(event.data)
}

const onCancel = () => {
  if (props.onCancel) props.onCancel()
  open.value = false
}
</script>

<template>
  <div>
    <UButton v-if="!isEditing" label="Novo serviço" icon="i-lucide-plus" @click="onOpenNew" />
    <UModal v-model:open="open" :title="isEditing ? 'Editar serviço' : 'Novo serviço'"
      :description="isEditing ? 'Atualize os detalhes do serviço' : 'Adicione um novo serviço ao sistema'">
      <template #body>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Nome" name="name" required>
              <UInput v-model="state.name" placeholder="Nome do serviço" class="w-full" />
            </UFormField>

            <UFormField label="Preço" name="price" required>
              <UInput v-model.number="state.price" type="number" icon="i-lucide-banknote" placeholder="0.00"
                class="w-full" />
            </UFormField>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Categoria" name="category" required>
              <USelectMenu v-model="state.category" :loading="loadingCategories" :items="categories || []"
                :label-key="'name'" class="w-full" placeholder="Selecione..." />
            </UFormField>

            <UFormField label="Icone" name="icon">
              <CoreInputIcon v-model="state.icon" />
            </UFormField>
          </div>

          <UFormField label="Área de Atuação" name="area" required>
            <CoreSelectServiceArea v-model="state.area" />
          </UFormField>

          <UFormField label="Descrição" name="description" required>
            <UTextarea v-model="state.description" :rows="3" placeholder="Descrição do serviço" class="w-full" />
          </UFormField>

          <div class="flex justify-end gap-2 pt-2">
            <UButton label="Cancelar" color="neutral" variant="subtle" @click="onCancel" />
            <UButton :label="isEditing ? 'Guardar' : 'Criar'" color="primary" variant="solid" type="submit"
              :loading="loading" />
          </div>
        </UForm>
      </template>
    </UModal>
  </div>
</template>
