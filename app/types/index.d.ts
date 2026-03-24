import type { AvatarProps } from '@nuxt/ui'

export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'
export type SaleStatus = 'paid' | 'failed' | 'refunded'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  image?: string
  address: string
}

export interface Mail {
  id: number
  unread?: boolean
  from: User
  subject: string
  body: string
  date: string
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: AvatarProps
}

export interface Stat {
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: (value: number) => string
}

export interface Sale {
  id: string
  date: string
  status: SaleStatus
  email: string
  amount: number
}

export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export interface Category {
  id: number
  name: string
  description?: string
  icon?: string
}

export type ServiceType = 'FREE' | 'FIXED' | 'CUSTOMIZE'
export type ServiceV = 'GENERAL' | 'SPECIFIC'

export interface Service {
  id: number
  name: string
  description?: string
  icon?: string
  price: number
  type: ServiceType
  category: Category
}

export type Period = 'DAILY' | 'WEEKLY' | 'MONTHLY'

export interface Range {
  start: Date
  end: Date
}

export type BillingCycle = 'DAY' | 'MONTH' | 'YEAR' | 'NONE'

export interface Plan {
  id: number
  name: string
  description?: string
  price: number
  billingCycle: BillingCycle
}

export type ProposalRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface ProposalRequest {
  id: number
  plan: Plan
  phone: string
  email: string
  status: ProposalRequestStatus
}