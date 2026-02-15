<template>
    <NuxtLayout name="auth" back-to="/login" @social-login="handleSocialLogin">
        <!-- Header -->
        <template #header>
            <h1 class="mb-2 text-3xl font-bold text-foreground">Recuperar Senha</h1>
            <p class="mb-8 text-muted-foreground">
                Digite seu email para receber instruções de recuperação de senha
            </p>
        </template>

        <!-- Form -->
        <template #form>
            <form class="space-y-5" @submit.prevent="handleSubmit">
                <!-- Email Input -->
                <LoginInput v-model="form.email" type="text" label="Email ou Contacto" icon="lucide:mail"
                    placeholder="Digita o seu email ou contacto" />

                <!-- Submit Button -->
                <UButton type="submit" variant="solid" size="xl" class="w-full flex justify-center">
                    Continuar
                </UButton>
            </form>
        </template>

        <!-- Footer -->
        <template #footer>
            <p class="mt-8 text-center text-sm text-muted-foreground">
                Lembrou a senha?
                <NuxtLink to="/login" class="font-semibold text-primary hover:underline">
                    Voltar para Login
                </NuxtLink>
            </p>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
// State
const form = reactive({
    email: ''
})

// Methods
const handleSubmit = () => {
    console.log('Recuperação solicitada:', form)
    // Lógica de recuperação de senha
}

const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
}
</script>