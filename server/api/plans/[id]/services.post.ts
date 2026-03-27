import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const planId = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!body?.service_id) throw createError({ statusCode: 400, statusMessage: 'service_id is required' })

    const { data, error } = await client
        .from('tb_plan_service')
        .insert({
            plan_uuid: planId,
            service_uuid: body.service_id
        } as any)
        .select()
        .single()

    if (error) throw createError({ statusMessage: error.message })
    return data
})
