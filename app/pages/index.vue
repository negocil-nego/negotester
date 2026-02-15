<template>
    <div class="h-screen">
        <!-- Header -->
        <header
            class="absolute top-0 left-0 right-0 bg-hero text-hero-foreground sticky top-0 z-50 border-b border-hero-foreground/10 backdrop-blur-sm bg-hero/95">
            <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <div class="flex justify-start relative">
                    <Logo />
                </div>
                <div>
                    <ul class="gap-2 md:gap-5 hidden md:flex">
                        <li>
                            <ULink to="#" class="rounded-full">
                                Home
                            </ULink>
                        </li>
                        <li>
                            <ULink to="#services" class="rounded-full">
                                Serviços
                            </ULink>
                        </li>
                        <li>
                            <ULink to="#prices" class="rounded-full">
                                Preços
                            </ULink>
                        </li>
                        <li>
                            <ULink to="#about" class="rounded-full">
                                Sobre
                            </ULink>
                        </li>
                    </ul>
                </div>
                <div class="flex gap-2 md:gap-5">
                    <UButton href="/login" class="rounded-full">
                        Entra
                    </UButton>
                    <UButton href="/register" class="rounded-full">
                        Registrar
                    </UButton>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="bg-hero mx-auto px-6 text-hero-foreground relative">
            <HomepagePattern />
            <HomepageHero />
        </section>

        <!-- Services Section -->
        <section id="services" class="bg-hero-foreground px-6 text-hero-foreground mx-auto my-5 md:my-10">
            <HomepageCategory />
        </section>

        <!-- Price Section -->
        <section id="prices" class="relative px-6 my-5 md:py-10">
            <HomepagePattern />
            <HomepagePrice />
        </section>

        <!-- Footer -->
        <section class="max-w-6xl mx-auto px-6 md:py-20 mb-2">
            <HomepageFooter />
        </section>
    </div>
</template>