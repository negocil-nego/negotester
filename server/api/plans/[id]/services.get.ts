import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const planId = getRouterParam(event, 'id')
    
    const { data, error } = await client
        .from('tb_plan_service')
        .select('service_id')
        .eq('plan_id', planId)

    if (error) throw createError({ statusMessage: error.message })
    return data.map(row => row.service_id)
})
