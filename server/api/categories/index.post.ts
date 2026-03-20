import { serverSupabaseClient } from '#supabase/server'
import type { Category } from '~/types'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const body = await readBody(event)
    const { data, error } = await client.from('tb_categories').insert(body)
    if (error) throw createError({ statusMessage: error.message })
    return (data ?? []) as Category[]
})
