import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const id = getRouterParam(event, 'id')

    if (!id) {
        throw createError({ statusCode: 400, statusMessage: 'ID da categoria não fornecido.' })
    }

    const { error } = await client.from('tb_categories').delete().eq('id', id)

    if (error) {
        throw createError({ statusCode: 404, statusMessage: 'Categoria não encontrada ou erro na base de dados' })
    }
})
