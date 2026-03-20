import { serverSupabaseClient } from '#supabase/server'
import type { Plan } from '~/types'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const body = await readBody<Plan>(event)
    const { data, error } = await client.from('tb_plans').update({
        name: body.name,
        price: body.price,
        description: body.description,
        billing_cycle: body.billingCycle,
    } as never).eq('id', body.id)
    if (error) throw createError({ statusMessage: error.message })
    return data
})
