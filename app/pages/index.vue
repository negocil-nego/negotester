<script setup lang="ts">
import { VideoList } from '~/shared/videos';
</script>

<template>
    <main>
        <HomepageBackgroundVideo :video="VideoList.HOME" />

        <div class="absolute top-0 justify-center items-center w-full h-screen">
            <HomepageNav />
            <div class="h-full flex items-center">
                <HomepageHero />
            </div>
        </div>

        <section id="services" class="bg-hero-foreground px-6 text-hero-foreground mx-auto my-5 md:my-10 lg:my-30">
            <HomepageCategory />
        </section>

        <section id="how-it-works" class="py-24 bg-surface-container-lowest border-y border-white/5">
            <HomepageHowItWorks />
        </section>

        <section id="prices" class="relative px-6 my-5 md:py-10">
            <HomepagePlan />
        </section>

        <!-- Footer -->
        <section class="max-w-6xl mx-auto px-6 md:py-20 mb-2">
            <HomepageFooter />
        </section>
    </main>
</template>
