<template>
    <NuxtLayout name="auth" @social-login="handleSocialLogin">
        <!-- Header -->
        <template #header>
            <h1 class="mb-2 text-3xl font-bold text-foreground">Registro</h1>
            <p class="mb-8 text-muted-foreground">
                Faça o processo de cadastro para fazer parte da nossa plataforma, utilize com maior responsabilidade.
            </p>
        </template>

        <!-- Form -->
        <template #form>
            <form class="space-y-5" @submit.prevent="handleSubmit">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    <!-- Phone Input -->
                    <LoginInput v-model="form.phone" type="text" label="Telefone" icon="lucide:phone"
                        placeholder="Digita o seu contacto" />

                    <!-- Email Input -->
                    <LoginInput v-model="form.email" type="email" label="Email" icon="lucide:mail"
                        placeholder="Digita o seu email" />
                </div>

                <!-- Password Input -->
                <LoginInput v-model="form.password" type="password" label="Senha" icon="lucide:lock"
                    placeholder="Digita a sua senha" />

                <!-- Submit Button -->
                <UButton type="submit" variant="solid" size="xl" class="w-full flex justify-center mt-2">
                    Cadastrar
                </UButton>
            </form>
        </template>

        <!-- Footer -->
        <template #footer>
            <p class="mt-8 text-center text-sm text-muted-foreground">
                Já tenho conta?
                <NuxtLink to="/login" class="font-semibold text-primary hover:underline">
                    Entrar
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
// State
const form = reactive({
    phone: '',
    email: '',
    password: ''
})

// Methods
const handleSubmit = () => {
    console.log('Form submitted:', form)
    // Adicione sua lógica de registro aqui
}

const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
    // Adicione sua lógica de login social aqui
}
</script>