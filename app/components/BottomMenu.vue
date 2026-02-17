<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  collapsed?: boolean
}>()

const supabase = useSupabaseClient()
const toast = useToast()


function showToastLogout() {
  toast.add({
    title: 'Sair',
    description: 'Tens certeza que desejas sair, confirma no botão abaixo antes de fechar a janela.',
    actions: [{
      icon: 'i-lucide-log-out',
      label: 'Sair',
      color: 'neutral',
      variant: 'outline',
      onClick: async (e) => {
        const { error } = await supabase.auth.signOut()
        if (error) {
          console.error('Error signing out:', error)
        } else {
          navigateTo('/login')
        }

        e?.stopPropagation()
      }
    }]
  })
}


const items = computed<DropdownMenuItem[][]>(() => ([
  [{
    label: 'Documentação',
    icon: 'i-lucide-book-open',
    to: 'https://ui.nuxt.com/docs/getting-started/installation/nuxt',
    target: '_blank'
  }, {
    label: 'Repositório',
    icon: 'i-simple-icons-github',
    to: 'https://github.com/nuxt-ui-templates/dashboard',
    target: '_blank'
  }, {
    label: 'Sair',
    icon: 'i-lucide-log-out',
    onSelect: showToastLogout
  },
  ]]))
</script>

<template>
  <UDropdownMenu :items="items" :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }">
    <UButton v-bind="{
      label: collapsed ? undefined : 'Ajuda',
      icon: 'i-lucide-info',
      trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
    }" color="neutral" variant="ghost" block :square="collapsed" class="data-[state=open]:bg-elevated" :ui="{
      trailingIcon: 'text-dimmed'
    }" />

    <template #chip-leading="{ item }">
      <div class="inline-flex items-center justify-center shrink-0 size-5">
        <span class="rounded-full ring ring-bg bg-(--chip-light) dark:bg-(--chip-dark) size-2" :style="{
          '--chip-light': `var(--color-${(item as any).chip}-500)`,
          '--chip-dark': `var(--color-${(item as any).chip}-400)`
        }" />
      </div>
    </template>
  </UDropdownMenu>
</template>
