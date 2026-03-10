import { serverSupabaseServiceRole } from '#supabase/server'
import type { User } from '~/types'

export default eventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event)
  const { data, error } = await client.auth.admin.listUsers()

  if (error) throw createError({ statusMessage: error.message })

  return data.users.map(user => ({
    id: user.id ?? 0,
    name: user.user_metadata?.name ?? '',
    email: user.email,
    phone: user.phone ?? '',
    image: '',
    address: ''
  })) as User[]
})