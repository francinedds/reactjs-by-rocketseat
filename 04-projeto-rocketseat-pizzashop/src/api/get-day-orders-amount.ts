import { api } from '@/lib/axios'

export interface GetDayOrdersAmountParams {
  amount: number
  diffFromYesterday: number
}

export async function GetDayOrdersAmount() {
  const response = await api.get<GetDayOrdersAmountParams>(
    '/metric/day-orders-amount',
  )

  return response.data
}
