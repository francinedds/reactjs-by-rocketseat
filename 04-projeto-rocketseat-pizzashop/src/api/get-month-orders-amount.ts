import { api } from '@/lib/axios'

export interface GetMonthOrdersAmountParams {
  amount: number
  diffFromYesterday: number
}

export async function GetMonthOrdersAmount() {
  const response = await api.get<GetMonthOrdersAmountParams>(
    '/metric/month-orders-amount',
  )

  return response.data
}
