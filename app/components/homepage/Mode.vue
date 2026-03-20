<script setup lang="ts">
const colorMode = useColorMode()

const toggleColorMode = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
    <UButton :icon="colorMode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'" size="md" color="neutral"
        class="p-5 rounded-full" variant="outline" aria-label="Toggle Color Mode" @click="toggleColorMode" />
</template>