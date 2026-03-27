import { serverSupabaseClient } from '#supabase/server'
import { useCurrencyFormatter } from '~/composables/useCurrencyFormatter'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { formatCurrency } = useCurrencyFormatter()

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
      tb_services!inner (
        uuid,
        name,
        description,
        icon
      )
    )
  `)
    .eq('tb_plan_service.tb_services.area', 'PLAN')
    .order('price', { ascending: true })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  const plansArray = plans as any[]

  const labelPrice = (plan: any) => {
    if (plan.price === 0) return 'Grátis'
    if (plan.type == 'CUSTOMIZE') return '-'
    return `${formatCurrency(plan.price, 'pt-AO', 'AOA')}`
  }

  const labelBillingCycle = (billing_cycle: any) => {
    if (billing_cycle == 'MONTHLY') return 'Mês'
    if (billing_cycle == 'YEARLY') return 'Ano'
    return ''
  }

  const formattedPlans = plansArray?.map(plan => ({
    title: plan.name,
    description: plan.description,
    price: labelPrice(plan),
    billingCycle: labelBillingCycle(plan.billing_cycle),
    type: plan.type,
    features: plan.tb_plan_service?.map((ps: any) => ps.tb_services?.name).filter(Boolean) || [],
    button: {
      label: 'Assinar agora',
      class: 'rounded-full p-3 md:p-5',
      variant: 'outline'
    }
  })) || []

  return formattedPlans
})
