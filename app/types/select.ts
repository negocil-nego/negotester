import type { BillingCycle, PlanType, ServiceArea } from ".";

export const planTypeMap: Record<PlanType, string> = {
    FREE: 'Gratuito',
    FIXED: 'Fixo',
    CUSTOMIZE: 'Personalizado'
};

export const billingCycleMap: Record<BillingCycle, string> = {
    DAY: 'Diário',
    MONTH: 'Mensal',
    YEAR: 'Anual',
    NONE: 'Nenhum'
};

export const serviceAreaOptions: Record<ServiceArea, string> = {
    PLAN: 'Plano',
    PROPOSAL: 'Proposta'
}