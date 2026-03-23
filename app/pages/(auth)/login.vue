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
      <div class="z-10 p-0">
        <HomepageBackgroundVideo :video="VideoList.LOGIN" />
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
