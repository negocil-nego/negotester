<template>
    <div class="max-w-6xl mx-auto">
        <div class="mb-10">
            <h2 class="font-display text-xl md:text-2xl font-bold leading-tight tracking-tight mb-6">
                <span>Os nossos </span>
                <span class="text-primary">preços </span>
                <span>são personalizados.</span>
            </h2>

            <p class="text-hero-muted text-md max-w-xl mb-10 leading-relaxed">
                Preços competitivos e transparentes para todos os serviços, escolha o que precisas
                para saber o valor exato.
            </p>

            <UAlert title="Atenção"
                description="Os serviços tenhem estimativas de preços que pode variar dependendo do projecto fornecido, todos preços que apresentamos são os valores iniciais, em caso de dúvida entre em contacto connosco para um orçamento personalizado ou solicite o serviço de diagnóstico que tem o valor fixo."
                icon="i-heroicons-information-circle" variant="subtle" />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 md:mt-10 md:w-full md:justify-between">
                <!-- Serviços disponíveis -->
                <div>
                    <h3 class="text-sm font-semibold mb-3 text-gray-700">
                        Selecione os serviços
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        <UBadge v-for="service in data" :key="service.id" color="neutral" variant="outline"
                            class="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                            :class="{ 'bg-primary text-white': isSelected(service.id) }"
                            @click="toggleService(service)">
                            <span class="text-sm">{{ service.title }}</span>
                            <Icon :name="isSelected(service.id) ? 'i-heroicons-minus' : 'i-heroicons-plus'"
                                class="ml-2" />
                        </UBadge>
                    </div>
                </div>

                <!-- Serviços selecionados -->
                <div class="h-full">
                    <div v-if="selectedServices.length > 0" class="space-y-2">
                        <div class="text-sm font-semibold mb-3 text-gray-700">
                            Serviços selecionados ({{ selectedServices.length }})
                        </div>
                        <UScrollArea v-slot="{ item, index }" :items="selectedServices"
                            class="h-[250px] hidden md:block">
                            <UBadge :key="index">
                                {{ item.title }} ({{ item.price }} Kz)
                                <Icon name="i-heroicons-trash" class="ml-2" @click="removeService(item)" />
                            </UBadge>
                        </UScrollArea>
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-semibold">Total:</span>
                            <span class="text-sm font-semibold">{{ total }} Kz</span>
                        </div>
                    </div>

                    <div v-else class="text-sm text-gray-500 italic h-full">
                        <UEmpty class="h-full" title="Nenhum serviço selecionado"
                            description="Selecione os serviços que deseja para saber o valor exato." />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Service } from '~/types';

const { data } = await useFetch<Service[]>('/api/services');
const selectedServices = ref<Service[]>([]);

const selectedIds = computed(() => new Set(selectedServices.value.map(s => s.id)));

const total = computed(() => {
    return selectedServices.value.reduce((total, service) => total + service.price, 0);
});

const isSelected = (serviceId: number) => {
    return selectedIds.value.has(serviceId);
};

const toggleService = (service: Service) => {
    if (isSelected(service.id)) {
        removeService(service);
    } else {
        addService(service);
    }
};

const addService = (service: Service) => {
    selectedServices.value.push(service);
};

const removeService = (service: Service) => {
    selectedServices.value = selectedServices.value.filter((s) => s.id !== service.id);
};
</script>