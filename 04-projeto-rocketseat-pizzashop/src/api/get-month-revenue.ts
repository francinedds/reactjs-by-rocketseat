import { api } from '@/lib/axios'

export interface GetMonthRevenueParams {
  receipt: number
  diffFromLastMonth: number
}

export async function GetMonthRevenue() {
  const response = await api.get<GetMonthRevenueParams>('/metric/month-receipt')

  return response.data
}
