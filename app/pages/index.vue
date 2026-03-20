<template>
    <main>
        <HomepageBackgroundVideo
            video="https://nulpvyicfuecpcugpjun.supabase.co/storage/v1/object/public/site/1107914_1080p_4k_3840x2160.mp4" />

        <div class="absolute top-0 justify-center items-center w-full h-screen">
            <HomepageNav />
            <div class="h-full flex items-center">
                <HomepageHero />
            </div>
        </div>

        <section id="services" class="bg-hero-foreground px-6 text-hero-foreground mx-auto my-5 md:my-10 lg:my-50">
            <HomepageCategory />
        </section>

        <section id="prices" class="relative px-6 my-5 md:py-10">
            <HomepagePattern />
            <HomepagePrice />
        </section>

        <!-- Footer -->
        <section class="max-w-6xl mx-auto px-6 md:py-20 mb-2">
            <HomepageFooter />
        </section>
    </main>
</template>
