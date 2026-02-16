<template>
    <NuxtLayout name="auth" @social-login="handleSocialLogin">
        <!-- Header -->
        <template #header>
            <h1 class="mb-2 text-3xl font-bold text-foreground">Bem-vindo!</h1>
            <p class="mb-8 text-muted-foreground">
                Faça o processo de autenticação para ter acesso à plataforma
            </p>
        </template>

        <!-- Form -->
        <template #form>
            <form class="space-y-5" @submit.prevent="handleSubmit">
                <!-- Email Input -->
                <LoginInput v-model="form.email" type="email" label="Email" icon="lucide:mail"
                    placeholder="Digita o seu email" />

                <!-- Password Input -->
                <LoginInput v-model="form.password" type="password" label="Senha" icon="lucide:lock"
                    placeholder="Digita a sua senha">
                    <template #helper>
                        <div class="text-right">
                            <NuxtLink to="/forget-password" class="text-sm font-medium text-primary hover:underline">
                                Esqueceu a senha?
                            </NuxtLink>
                        </div>
                    </template>
                </LoginInput>

                <!-- Submit Button -->
                <UButton type="submit" variant="solid" size="xl" class="w-full flex justify-center">
                    Entrar
                </UButton>
            </form>
        </template>

        <!-- Footer -->
        <template #footer>
            <p class="mt-8 text-center text-sm text-muted-foreground">
                Não tem conta?
                <NuxtLink to="/register" class="font-semibold text-primary hover:underline">
                    Registrar
                </NuxtLink>
            </p>
        </template>

        <!-- Hero Section (Optional) -->
        <template #hero>
            <!-- Adicione conteúdo do hero aqui se necessário -->
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const form = reactive({
    email: '',
    password: ''
})

const handleSubmit = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password
    })
    if (error) {
        console.error('Error signing up:', error)
    } else {
        console.log('User signed up successfully:', data)
    }
}

const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
    // Adicione sua lógica de login social aqui
}

watch(user, () => {
    if (user.value) {
        navigateTo('/dashboard')
    }
}, { immediate: true })
</script>