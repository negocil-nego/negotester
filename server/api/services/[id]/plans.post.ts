import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const serviceId = getRouterParam(event, 'id')
    const body = await readBody(event)
    if (!body?.plan_id) throw createError({ statusCode: 400, statusMessage: 'plan_id is required' })

    const { data, error } = await client
        .from('tb_plan_service')
        .insert({
            service_uuid: serviceId,
            plan_uuid: body.plan_id
        } as any)
        .select()
        .single()

    if (error) throw createError({ statusMessage: error.message })
    return data
})
