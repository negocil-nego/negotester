<template>
    <div class="flex min-h-screen">
        <!-- Left - Form -->
        <div class="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-20">
            <!-- Logo -->
            <div class="mb-10 flex items-center gap-2 text-primary">
                <Icon name="lucide:monitor" class="text-2xl" />
                <span class="text-xl font-bold">SoftQA</span>
            </div>

            <!-- Header -->
            <h1 class="mb-2 text-3xl font-bold text-foreground">Welcome Back!</h1>
            <p class="mb-8 text-muted-foreground">
                Sign in to access your dashboard and continue optimizing your QA process.
            </p>

            <!-- Form -->
            <form class="space-y-5" @submit.prevent="handleSubmit">
                <!-- Email Input -->
                <div>
                    <label class="mb-1.5 block text-sm font-medium">Email</label>
                    <div
                        class="flex items-center gap-2 rounded-lg border border-input bg-card px-3 py-2.5 focus-within:ring-2 focus-within:ring-ring">
                        <Icon name="lucide:mail" class="text-base text-muted-foreground" />
                        <input v-model="form.email" type="email" placeholder="Enter your email"
                            class="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
                    </div>
                </div>

                <!-- Password Input -->
                <div>
                    <label class="mb-1.5 block text-sm font-medium">Password</label>
                    <div
                        class="flex items-center gap-2 rounded-lg border border-input bg-card px-3 py-2.5 focus-within:ring-2 focus-within:ring-ring">
                        <Icon name="lucide:lock" class="text-base text-muted-foreground" />
                        <input v-model="form.password" :type="showPass ? 'text' : 'password'"
                            placeholder="Enter your password"
                            class="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
                        <button type="button" @click="togglePassword" class="focus:outline-none">
                            <Icon :name="showPass ? 'lucide:eye' : 'lucide:eye-off'"
                                class="text-base text-muted-foreground" />
                        </button>
                    </div>
                    <div class="mt-1.5 text-right">
                        <NuxtLink to="#" class="text-sm font-medium text-primary hover:underline">
                            Forgot Password?
                        </NuxtLink>
                    </div>
                </div>

                <!-- Submit Button -->
                <button type="submit"
                    class="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                    Sign In
                </button>
            </form>

            <!-- Divider -->
            <div class="my-6 flex items-center gap-3">
                <div class="h-px flex-1 bg-border" />
                <span class="text-xs text-muted-foreground">OR</span>
                <div class="h-px flex-1 bg-border" />
            </div>

            <!-- Social Login -->
            <div class="space-y-3">
                <button v-for="provider in socialProviders" :key="provider.name" type="button"
                    class="flex w-full items-center justify-center gap-2 rounded-lg border border-input bg-card py-2.5 text-sm font-medium transition hover:bg-muted"
                    @click="handleSocialLogin(provider.name)">
                    <Icon :name="provider.icon" class="text-base" />
                    {{ provider.label }}
                </button>
            </div>

            <!-- Sign Up Link -->
            <p class="mt-8 text-center text-sm text-muted-foreground">
                Don't have an Account?
                <NuxtLink to="#" class="font-semibold text-primary hover:underline">
                    Sign Up
                </NuxtLink>
            </p>
        </div>

        <!-- Right - Hero -->
        <div
            class="hidden flex-col justify-between bg-gradient-to-br from-[hsl(180,40%,20%)] to-[hsl(200,50%,12%)] p-12 text-white lg:flex lg:w-1/2">
            <div />

            <!-- Testimonial -->
            <div>
                <h2 class="mb-8 text-4xl font-bold leading-tight">
                    Revolutionize QA with Smarter Automation
                </h2>
                <blockquote class="mb-6 border-l-2 border-white/30 pl-4 text-white/80">
                    "SoftQA has completely transformed our testing process. It's reliable, efficient, and
                    ensures our releases are always top-notch."
                </blockquote>
                <div class="flex items-center gap-3">
                    <div class="h-10 w-10 rounded-full bg-white/20" />
                    <div>
                        <p class="text-sm font-semibold">Michael Carter</p>
                        <p class="text-xs text-white/60">Software Engineer at DevCore</p>
                    </div>
                </div>
            </div>

            <!-- Companies -->
            <div class="space-y-3 pt-8">
                <p class="text-xs font-semibold tracking-widest text-white/50">JOIN 1K TEAMS</p>
                <div class="flex flex-wrap gap-6 text-sm font-bold text-white/70">
                    <span v-for="company in companies" :key="company">{{ company }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// State
const showPass = ref(false)
const form = reactive({
    email: '',
    password: ''
})

// Social providers configuration
const socialProviders = [
    {
        name: 'google',
        icon: 'simple-icons:google',
        label: 'Continue with Google'
    },
    {
        name: 'apple',
        icon: 'simple-icons:apple',
        label: 'Continue with Apple'
    }
]

// Companies list
const companies = [
    'Discord',
    'Mailchimp',
    'Grammarly',
    'Attentive',
    'HelloSign',
    'Intercom',
    'Square',
    'Dropbox'
]

// Methods
const togglePassword = () => {
    showPass.value = !showPass.value
}

const handleSubmit = () => {
    console.log('Form submitted:', form)
}

const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
}
</script>