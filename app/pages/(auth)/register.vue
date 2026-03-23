<template>
    <NuxtLayout name="auth" @social-login="handleSocialLogin">
        <template #header>
            <h1 class="mb-2 text-3xl font-bold text-foreground md:text-5xl lg:text-7xl">Registro</h1>
            <p class="mb-8 text-muted-foreground md:mt-4 lg:mt-10 md:text-lg lg:text-xl">
                Faça o processo de cadastro para fazer parte da nossa plataforma, utilize com maior responsabilidade.
            </p>
        </template>

        <template #form>
            <form class="space-y-5 md:space-y-10 md:my-10" @submit.prevent="handleSubmit">
                <LoginInput v-model="form.phone" type="text" label="Telefone" icon="lucide:phone"
                    placeholder="Digita o seu contacto" />

                <LoginInput v-model="form.email" type="email" label="Email" icon="lucide:mail"
                    placeholder="Digita o seu email" />

                <LoginInput v-model="form.password" type="password" label="Senha" icon="lucide:lock"
                    placeholder="Digita a sua senha" />

                <UButton type="submit" variant="solid" size="xl"
                    class="w-full flex justify-center mt-2 rounded-full p-3">
                    Cadastrar
                </UButton>
            </form>
        </template>

        <template #footer>
            <p class="mt-8 text-center text-sm text-muted-foreground">
                Já tenho conta?
                <NuxtLink to="/login" class="font-semibold text-primary hover:underline">
                    Entrar
                </NuxtLink>
            </p>
        </template>

        <template #hero>
            <div class="z-10 p-0">
                <HomepageBackgroundVideo :video="VideoList.REGISTER" />
            </div>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { VideoList } from '~/shared/videos'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const form = reactive({
    phone: '',
    email: '',
    password: ''
})

const handleSubmit = async () => {
    const { data, error } = await supabase.auth.signUp({
        email: form.email,
        phone: form.phone,
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
}

watch(user, () => {
    if (user.value) {
        navigateTo('/dashboard')
    }
}, { immediate: true })
</script>
