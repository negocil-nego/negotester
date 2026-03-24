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
            <div class="relative z-10 w-full h-full">
                <HomepageBackgroundVideo :video="VideoList.REGISTER" />
                <div class="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8 pointer-events-none">
                    <div
                        class="pointer-events-auto w-full max-w-sm self-end mr-4 bg-[#1a1a1a]/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <div class="mb-4 flex items-center gap-2">
                            <span class="relative flex h-2 w-2">
                                <span
                                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span class="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                            </span>
                            <p class="text-[10px] font-semibold uppercase tracking-widest text-primary">
                                Sistema Live Pulsing
                            </p>
                        </div>
                        <h3 class="text-xl font-bold text-white leading-snug mb-3">
                            Métricas que respiram em tempo real.
                        </h3>
                        <p class="text-xs text-white/50 leading-relaxed">
                            Nossa tecnologia de auditoria processa dados críticos com latência zero, garantindo que sua
                            qualidade editorial nunca perca o compasso.
                        </p>
                    </div>
                    <div class="pointer-events-auto w-full max-w-sm self-end mr-4 flex gap-3">
                        <div
                            class="flex-1 bg-[#1a1a1a]/90 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl flex items-center gap-2">
                            <UIcon name="lucide:zap" class="h-3.5 w-3.5 text-primary shrink-0" />
                            <div>
                                <p class="text-[9px] uppercase tracking-widest text-white/30 font-medium">
                                    QUL Latency
                                </p>
                                <p class="text-xs font-semibold text-white">12ms</p>
                            </div>
                        </div>

                        <!-- Pro Ready -->
                        <div
                            class="flex-1 bg-[#1a1a1a]/90 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl flex items-center gap-2">
                            <UIcon name="lucide:shield-check" class="h-3.5 w-3.5 text-primary shrink-0" />
                            <div>
                                <p class="text-[9px] uppercase tracking-widest text-white/30 font-medium">Pro Ready</p>
                                <p class="text-xs font-semibold text-white">2024</p>
                            </div>
                        </div>
                    </div>
                </div>
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
