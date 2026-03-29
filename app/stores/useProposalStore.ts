import { defineStore } from 'pinia'
import type { Service } from '~/types'
import type { PlanServiceResponse } from '~/types/response'

interface UserInfo {
  fullName: string
  email: string
  phone: string
  organization: string
  description: string
}

interface AssetsInfo {
  systemUrl: string
}

export const useProposalStore = defineStore('proposal', {
  state: () => ({
    plan: {} as PlanServiceResponse,
    scope: [] as Service[],
    userInfo: {
      fullName: '',
      email: '',
      phone: '',
      organization: '',
      description: ''
    } as UserInfo,
    assets: {
      systemUrl: ''
    } as AssetsInfo
  }),
  // actions: { ... } can be added later if needed
})
