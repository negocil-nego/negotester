import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const id = getRouterParam(event, 'id')

    if (!id) throw createError({ statusCode: 400, statusMessage: 'ID do serviço não fornecido.' })

    const { data, error } = await client.from('tb_services').delete().eq('id', id)

    if (error) throw createError({ statusCode: 404, statusMessage: 'Serviço não encontrado ou erro na base de dados' })

    return data
})
