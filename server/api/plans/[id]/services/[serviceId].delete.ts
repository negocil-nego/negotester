import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const planId = getRouterParam(event, 'id')
    const serviceId = getRouterParam(event, 'serviceId')
    const { error } = await client
        .from('tb_plan_service')
        .delete()
        .match({ plan_id: planId, service_id: serviceId })

    if (error) throw createError({ statusMessage: error.message })
    return { success: true }
})
