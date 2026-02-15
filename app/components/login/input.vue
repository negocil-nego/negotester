<template>
    <div>
        <label v-if="label" class="mb-1.5 block text-sm font-medium">{{ label }}</label>
        <div
            class="flex items-center gap-2 rounded-lg border border-input bg-card px-3 py-2.5 focus-within:ring-2 focus-within:ring-ring">
            <Icon v-if="icon" :name="icon" class="text-base text-muted-foreground" />

            <input :value="modelValue" :type="computedType" :placeholder="placeholder"
                class="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />

            <button v-if="type === 'password'" type="button" @click="togglePassword" class="focus:outline-none">
                <Icon :name="showPassword ? 'lucide:eye' : 'lucide:eye-off'" class="text-base text-muted-foreground" />
            </button>
        </div>

        <div v-if="$slots.helper" class="mt-1.5">
            <slot name="helper" />
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    modelValue: string
    type?: string
    label?: string
    icon?: string
    placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text'
})

defineEmits(['update:modelValue'])

const showPassword = ref(false)

const computedType = computed(() => {
    if (props.type === 'password') {
        return showPassword.value ? 'text' : 'password'
    }
    return props.type
})

const togglePassword = () => {
    showPassword.value = !showPassword.value
}
</script>