import { serverSupabaseClient } from '#supabase/server'
import { useCurrencyFormatter } from '~/composables/useCurrencyFormatter'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { formatCurrency } = useCurrencyFormatter()

  const { data: plans, error } = await client
    .from('tb_plans')
    .select(`
      id,
      name,
      description,
      price,
      billing_cycle,
      tb_plan_service (
        id,
        tb_services (
          id,
          name,
          description,
          icon
        )
      )
    `)
    .order('price', { ascending: true })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  const plansArray = plans as any[]

  const formattedPlans = plansArray?.map(plan => ({
    title: plan.name,
    description: plan.description,
    price: plan.price ? `${formatCurrency(plan.price, 'pt-AO', 'AOA')}` : 'Grátis',
    billing_cycle: plan.billing_cycle,
    features: plan.tb_plan_service?.map((ps: any) => ps.tb_services?.name).filter(Boolean) || [],
    button: {
      label: 'Assinar agora',
      class: 'rounded-full p-3 md:p-5',
      variant: 'outline'
    }
  })) || []

  return formattedPlans
})
