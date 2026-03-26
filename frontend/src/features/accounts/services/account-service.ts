import { client } from '@/lib/api/client'
import type { ApiResponse } from '@/lib/api/types'
import type { Account, AccountSummary } from '../types/account.types'

// Return type explícito porque o interceptor transforma AxiosResponse → body diretamente
export const accountService = {
  getAll: (): Promise<ApiResponse<Account[]>> => client.get('/accounts'),
  getSummary: (): Promise<ApiResponse<AccountSummary>> => client.get('/accounts/summary'),
}
