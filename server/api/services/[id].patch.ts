import { serverSupabaseClient } from '#supabase/server'
import type { Service } from '~/types'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const body = await readBody<Service>(event)

    const id = getRouterParam(event, 'id')

    if (!id) {
        throw createError({ statusCode: 400, statusMessage: 'ID do serviço não fornecido.' })
    }

    const { data, error } = await client.from('tb_services').update({
        name: body.name,
        icon: body.icon,
        price: body.price,
        description: body.description,
        category_id: body.category.id,
    } as never).eq('id', id);

    if (error) {
        throw createError({ statusCode: 404, statusMessage: error.message })
    }

    return data
})
