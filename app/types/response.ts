import type { BillingCycle, PlanType, Service } from "."

export interface PlanServiceResponse {
    uuid: string
    name: string
    description: string
    price: number
    billingCycle: BillingCycle
    type: PlanType
    services: Service[]
}