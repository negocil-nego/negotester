<template>
    <UFooterColumns :columns="columns">
        <template #right>
            <UFormField name="email" label="Subscrição no nosso newsletter" size="lg">
                <UInput type="email" class="w-full">
                    <template #trailing>
                        <UButton type="submit" size="xs" color="neutral" label="Subscrever" />
                    </template>
                </UInput>
            </UFormField>
        </template>
    </UFooterColumns>
</template>
<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui';

const columns: FooterColumn[] = [
    {
        label: 'Redes socias',
        children: [
            {
                label: 'Github',
                to: 'https://nuxters.nuxt.com',
                target: '_blank'
            },
            {
                label: 'Youtube',
                to: 'https://masteringnuxt.com/nuxt3?ref=nuxt',
                target: '_blank'
            },
            {
                label: 'Linkedin',
                to: 'https://github.com/nuxt',
                target: '_blank'
            },
            {
                label: 'Facebook',
                to: 'https://github.com/nuxt',
                target: '_blank'
            },
            {
                label: 'Instagram',
                to: 'https://github.com/nuxt',
                target: '_blank'
            }
        ]
    },
    {
        label: 'Navegação',
        children: [
            {
                label: 'Home',
                to: '#',
                target: '_self'
            },
            {
                label: 'Serviço',
                to: '#services',
                target: '_self'
            },
            {
                label: 'Preço',
                to: '#prices',
                target: '_self'
            },
            {
                label: 'Sobre',
                to: '#about',
                target: '_self'
            }
        ]
    }
]
</script>