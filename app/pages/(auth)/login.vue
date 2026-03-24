<template>
  <NuxtLayout name="auth" @social-login="handleSocialLogin">
    <template #header>
      <h1 class="mb-2 text-3xl font-bold text-foreground md:text-5xl lg:text-7xl">Bem-vindo!</h1>
      <p class="mb-8 text-muted-foreground md:text-lg lg:mt-10 lg:text-xl">
        Faça o processo de autenticação para ter acesso à plataforma
      </p>
    </template>

    <template #form>
      <form class="space-y-5 md:space-y-8 md:my-10" @submit.prevent="handleSubmit">
        <LoginInput v-model="form.email" type="email" label="Email" icon="lucide:mail"
          placeholder="Digita o seu email" />

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

        <UButton type="submit" variant="solid" size="xl" class="w-full flex justify-center rounded-full p-3">
          Entrar
        </UButton>
      </form>
    </template>

    <template #footer>
      <p class="mt-8 text-center text-sm text-muted-foreground">
        Não tem conta?
        <NuxtLink to="/register" class="font-semibold text-primary hover:underline">
          Registrar
        </NuxtLink>
      </p>
    </template>

    <template #hero>
      <div class="relative z-10 w-full h-full">
        <HomepageBackgroundVideo :video="VideoList.LOGIN" />
        <div class="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 pointer-events-none">
          <div
            class="pointer-events-auto w-full max-w-xs self-end mr-4 bg-[#1a1a1a]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl">
            <div class="flex items-start gap-3">
              <div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                <UIcon name="lucide:shield-check" class="h-4 w-4 text-primary" />
              </div>
              <div>
                <p class="text-sm font-semibold text-white">Auditoria Manual</p>
                <p class="mt-1 text-xs text-white/50 leading-relaxed">
                  Cada linha de código é revisada por especialistas sob demanda.
                </p>
              </div>
            </div>
          </div>
          <div
            class="pointer-events-auto w-full max-w-xs self-start ml-4 bg-[#1a1a1a]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl">
            <p class="mb-2 text-xs font-medium uppercase tracking-widest text-white/40">Linha de status</p>
            <div class="mb-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div class="h-full w-[88%] rounded-full bg-primary transition-all duration-1000" />
            </div>
            <p class="text-sm font-semibold text-white">88.4% Precisão Média</p>
          </div>
          <div class="pointer-events-auto w-full max-w-xs border-l-2 border-primary pl-4 self-end mr-4">
            <p class="text-sm italic text-white/80 leading-relaxed">
              "A excelência não é um ato, mas um hábito. Transformamos o caos digital em clareza editorial."
            </p>
            <p class="mt-2 text-[10px] font-semibold uppercase tracking-widest text-primary">
              The QualityPulse Methodology
            </p>
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
