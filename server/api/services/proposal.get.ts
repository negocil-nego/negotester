import { serverSupabaseClient } from '#supabase/server'
import { toMapService } from '~/utils/mapper'
import type { Service, ServiceArea } from "~/types"

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const { data, error } = await client.from('tb_services').select('*, tb_categories(*)')
        .eq('area', 'PROPOSAL' as ServiceArea)
    if (!data || error) throw createError({ statusMessage: error.message })
    return data.map(toMapService) as Service[]
})
