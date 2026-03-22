import { serverSupabaseClient } from '#supabase/server'
import { z } from 'zod'

const bodySchema = z.object({
  action: z.enum(['link', 'unlink']),
  planId: z.number().optional(),
  serviceId: z.number().optional(),
  planIds: z.array(z.number()).optional(),
  serviceIds: z.array(z.number()).optional()
}).refine((data) => {
  return (data.planId && data.serviceIds) || (data.serviceId && data.planIds)
}, "Must provide either planId+serviceIds or serviceId+planIds")

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<any>(event)
  const body = await readValidatedBody(event, bodySchema.parse)

  if (body.action === 'link') {
    const rows: { plan_id: number, service_id: number }[] = []
    if (body.planId && body.serviceIds) {
      body.serviceIds.forEach(id => rows.push({ plan_id: body.planId!, service_id: id }))
    } else if (body.serviceId && body.planIds) {
      body.planIds.forEach(id => rows.push({ plan_id: id, service_id: body.serviceId! }))
    }

    if (rows.length === 0) return { success: true }

    const { error } = await supabase.from('tb_plan_service').insert(rows)
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    return { success: true }
  }

  if (body.action === 'unlink') {
    if (body.planId && body.serviceIds && body.serviceIds.length > 0) {
      const { error } = await supabase.from('tb_plan_service').delete()
        .eq('plan_id', body.planId)
        .in('service_id', body.serviceIds)
      if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    } else if (body.serviceId && body.planIds && body.planIds.length > 0) {
      const { error } = await supabase.from('tb_plan_service').delete()
        .eq('service_id', body.serviceId)
        .in('plan_id', body.planIds)
      if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    }
    return { success: true }
  }
})
