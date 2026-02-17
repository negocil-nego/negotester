<script setup lang="ts">
import type { IconItem } from '~/shared/icons';
import { iconItems } from '~/shared/icons';

const open = ref(false)
const items = ref<IconItem[]>(iconItems)
</script>

<template>
    <UPopover class="w-full border-0 reactive" :open>
        <UButton icon="i-lucide-tag" label="Escolha um icone" color="neutral" variant="subtle" class="w-full"
            @click="open = !open" />
        <template #content>
            <div class="p-2 md:p-5">
                <UInput icon="i-lucide-search" placeholder="Pesquisar icone" />
                <UScrollArea class="h-50 md:h-80">
                    <div v-for="item in items" :key="item.label" class="mt-4 md:mt-6 lg:mt-8 mb-2">
                        <div class="font-bold mb-2">{{ item.label }}</div>
                        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 md:gap-5">
                            <div v-for="icon in item.items" :key="icon.value"
                                class="flex items-center gap-1 hover:bg-base/80 hover:px-1 hover:rounded-md cursor-pointer">
                                <Icon :name="icon.value" />
                                <span>{{ icon.label }}</span>
                            </div>
                        </div>
                    </div>
                </UScrollArea>
            </div>
        </template>
    </UPopover>
</template>
