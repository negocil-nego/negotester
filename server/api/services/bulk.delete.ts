import { z } from 'zod'
import { serverSupabaseClient } from '#supabase/server'

const schema = z.object({
  ids: z.array(z.number())
})

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const body = await readValidatedBody(event, schema.parse)

  if (body.ids.length === 0) {
    return { success: true }
  }

  const { error } = await supabase.from('tb_services').delete().in('id', body.ids)

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { success: true }
})
