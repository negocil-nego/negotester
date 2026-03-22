import { serverSupabaseClient } from '#supabase/server'
import type { Service } from '~/types'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const body = await readBody(event)
    const { data, error } = await client.from('tb_services').insert({
        name: body.name,
        icon: body.icon,
        price: body.price,
        description: body.description,
        category_id: body.category.id,
    }).select('*').single()
    if (!data || error) throw createError({ statusMessage: error.message })
    return data as Service
})
