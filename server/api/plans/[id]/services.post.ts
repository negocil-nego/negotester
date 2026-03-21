import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const planId = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!body?.service_id) throw createError({ statusCode: 400, statusMessage: 'service_id is required' })

    const { data, error } = await client
        .from('tb_plan_service')
        .insert({
            plan_id: planId,
            service_id: body.service_id
        })
        .select()
        .single()

    if (error) throw createError({ statusMessage: error.message })
    return data
})
