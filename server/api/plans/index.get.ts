import { serverSupabaseClient } from '#supabase/server'
import type { Plan } from '~/types'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const { data, error } = await client.from('tb_plans').select('*')
    if (error) throw createError({ statusMessage: error.message })
    return (data ?? []) as Plan[]
})
