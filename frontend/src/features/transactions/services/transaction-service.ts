import { client } from '@/lib/api/client'
import type { ApiResponse } from '@/lib/api/types'
import type { Transaction } from '../types/transaction.types'

export const transactionService = {
  getAll: (): Promise<ApiResponse<Transaction[]>> => client.get('/transactions'),
}
