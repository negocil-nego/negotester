<template>
    <section class="relative w-full overflow-hidden">
        <div class="absolute inset-0 opacity-30 pointer-events-none"
            style="background-image: radial-gradient(circle, #2a2c2c 1px, transparent 1px); background-size: 24px 24px;" />

        <div class="relative z-10 max-w-7xl mx-auto">
            <div class="mb-10">
                <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight text-[#f0f0ee] mb-2">
                    Os nossos
                    <span class="text-[#3ddc84] underline underline-offset-4 decoration-2">serviços</span>
                </h2>
                <p class="text-sm text-[#7a7a78] max-w-lg leading-relaxed">
                    Serviços especializados em QA, consultoria, documentação técnica à medida do seu projeto.
                </p>
            </div>

            <div v-if="data?.length" class="cards-grid">
                <div v-for="category in data" :key="category.id" class="card-item relative bg-[#161818] border border-[#242626] rounded-2xl p-7
                 flex flex-col gap-4 overflow-hidden hover:border-[#2e3030] transition-colors">
                    <div
                        class="w-10 h-10 rounded-xl bg-[#1e2e22] border border-[#2a4030] flex items-center justify-center shrink-0">
                        <Icon v-if="category.icon" :name="category.icon" size="20" class="text-[#3ddc84]" />
                        <span v-else class="text-[#3ddc84] text-lg">◎</span>
                    </div>

                    <div class="flex flex-col gap-2 relative z-10">
                        <h3 class="text-lg font-bold text-[#f0f0ee] tracking-tight">{{ category.name }}</h3>
                        <p class="text-sm text-[#7a7a78] leading-relaxed">{{ category.description }}</p>
                        <a href="#"
                            class="card-link mt-2 text-xs font-bold tracking-widest text-[#3ddc84] hover:opacity-70 transition-opacity w-fit">
                            SAIBA MAIS →
                        </a>
                    </div>

                    <div class="card-deco absolute right-6 top-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none">
                        <Icon v-if="category.icon" :name="category.icon" size="110" class="text-[#e8e8e6]" />
                        <span v-else class="text-[#e8e8e6] text-[7rem] leading-none">◎</span>
                    </div>
                </div>
            </div>

            <div v-else class="cards-grid animate-pulse">
                <div v-for="n in 3" :key="n"
                    class="card-item bg-[#161818] border border-[#242626] rounded-2xl min-h-[180px]" />
                <div class="stat-card bg-[#161818] border border-[#242626] rounded-2xl min-h-[120px]" />
                <div class="stat-card bg-[#161818] border border-[#242626] rounded-2xl min-h-[120px]" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Category } from "~/types"

const { data } = await useFetch<Category[]>("/api/categories")
</script>

<style scoped>
/* ── Grid base (mobile first) ── */
.cards-grid {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    .cards-grid {
        grid-template-columns: 3fr 2fr;
    }

    /* Card 1: featured — left col, taller */
    .card-item:nth-child(1) {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        min-height: 240px;
        justify-content: space-between;
    }

    /* Card 2: right col, row 1 */
    .card-item:nth-child(2) {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
    }

    /* Card 3: left col, row 2 */
    .card-item:nth-child(3) {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
    }

    /* Card 4+: full width */
    .card-item:nth-child(n + 4) {
        grid-column: 1 / -1;
    }

    /* Stats: stacked in right col, row 2 */
    .stat-card:nth-of-type(1) {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
    }

    .stat-card:nth-of-type(2) {
        grid-column: 2 / 3;
        grid-row: 3 / 4;
    }

    /* Decorative icon: only first card */
    .card-deco {
        display: none;
    }

    .card-item:nth-child(1) .card-deco {
        display: block;
    }

    /* CTA link: only first card */
    .card-link {
        display: none;
    }

    .card-item:nth-child(1) .card-link {
        display: inline;
    }
}
</style>