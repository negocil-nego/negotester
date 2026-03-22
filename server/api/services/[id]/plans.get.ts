import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const serviceId = getRouterParam(event, 'id')

    if (!serviceId) throw createError({ statusCode: 400, statusMessage: 'ID do serviço não fornecido.' })

    const { data, error } = await client
        .from('tb_plan_service')
        .select('plan_id')
        .eq('service_id', serviceId)

    if (error) throw createError({ statusMessage: error.message })
    return data.map((row: any) => row.plan_id)
})
