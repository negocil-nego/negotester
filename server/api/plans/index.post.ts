import { serverSupabaseClient } from '#supabase/server'
import type { Plan } from '~/types'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const body = await readBody(event)
    console.log(body)
    const { data, error } = await client.from('tb_plans').insert(body)
    if (error) throw createError({ statusMessage: error.message })
    return (data ?? []) as Plan[]
})
