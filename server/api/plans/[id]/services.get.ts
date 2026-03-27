import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const planId = getRouterParam(event, 'id')

    if (!planId) throw createError({ statusCode: 400, statusMessage: 'ID do plano não fornecido.' })

    const { data, error } = await client
        .from('tb_plan_service')
        .select('service_uuid')
        .eq('plan_uuid', planId)

    if (error) throw createError({ statusMessage: error.message })
    return data.map((row: any) => row.service_uuid)
})
