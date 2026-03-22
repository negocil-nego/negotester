<template>
    <header class="fixed top-0 left-0 flex w-full p-5 items-center bg-transparent">
        <div
            class="w-full md:max-w-6xl mx-auto px-6 h-16 flex items-center justify-between border rounded-full gap-10 md:gap-20">
            <div class="md:ml-3">
                <div class="flex justify-start relative">
                    <LogoSite />
                </div>
            </div>
            <div>
                <ul class="gap-2 md:gap-5 hidden md:flex">
                    <li>
                        <ULink to="#" class="rounded-full"> Início </ULink>
                    </li>
                    <li>
                        <ULink to="#services" class="rounded-full"> Serviços </ULink>
                    </li>
                    <li>
                        <ULink to="#prices" class="rounded-full"> Planos </ULink>
                    </li>
                    <li>
                        <ULink to="#about" class="rounded-full">Sobre</ULink>
                    </li>
                </ul>
            </div>
            <div class="md:mr-3 hidden md:block">
                <div class="flex gap-2 md:gap-5">
                    <UButton href="/login" class="rounded-full px-5" variant="outline">
                        Entra
                    </UButton>
                    <UButton href="/register" class="rounded-full px-5" variant="outline">
                        Registrar
                    </UButton>
                </div>
            </div>
        </div>
    </header>
</template>
