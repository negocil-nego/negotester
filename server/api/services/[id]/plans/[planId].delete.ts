import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const serviceId = getRouterParam(event, 'id')
    const planId = getRouterParam(event, 'planId')

    const { error } = await client
        .from('tb_plan_service')
        .delete()
        .match({ service_id: serviceId, plan_id: planId })

    if (error) throw createError({ statusMessage: error.message })
    return { success: true }
})
