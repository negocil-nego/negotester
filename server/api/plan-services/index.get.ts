import { serverSupabaseClient } from '#supabase/server'
import type { PlanServiceResponse } from '~/types/response'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data: plans, error } = await client
    .from('tb_plans')
    .select(`
      uuid,
      name,
      description,
      price,
      billing_cycle,
      type,
      tb_plan_service (
        id,
        tb_services (
          uuid,
          name,
          description,
          icon,
          area
        )
      )
    `)
    .order('price', { ascending: true })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return plans.map((it: any) => {
    return {
      uuid: it.uuid,
      name: it.name,
      description: it.description,
      price: it.price,
      billingCycle: it.billing_cycle,
      type: it.type,
      services: it.tb_plan_service.map((ps: any) => {
        return {
          uuid: ps.tb_services.uuid,
          name: ps.tb_services.name,
          description: ps.tb_services.description,
          icon: ps.tb_services.icon,
          area: ps.tb_services.area
        }
      })
    }
  }) as PlanServiceResponse[]
})
