import { serverSupabaseClient } from '#supabase/server'
import type { Plan } from '~/types'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const body = await readBody(event)
    const { data, error } = await client.from('tb_plans').insert({
        name: body.name,
        description: body.description,
        price: body.price,
        billing_cycle: body.billing_cycle
    }).select('*').single()
    if (!data || error) throw createError({ statusMessage: error.message })
    return data as Plan
})
