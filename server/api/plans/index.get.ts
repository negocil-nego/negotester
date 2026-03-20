import { serverSupabaseClient } from '#supabase/server'
import type { Plan } from '~/types'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    const { data, error } = await client.from('tb_plans').select('*')
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    if (!data) return []

    const plans: Plan[] = data.map((it: any) => ({ ...it, billingCycle: it.billing_cycle }))

    return plans
})
