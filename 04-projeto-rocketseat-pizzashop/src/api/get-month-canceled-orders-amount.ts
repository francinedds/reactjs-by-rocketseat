import { api } from '@/lib/axios'

export interface GetMonthCanceledOrdersAmountParams {
  amount: number
  diffFromLastMonth: number
}

export async function GetMonthCanceledOrdersAmount() {
  const response = await api.get<GetMonthCanceledOrdersAmountParams>(
    '/metric/month-orders-amount',
  )

  return response.data
}
