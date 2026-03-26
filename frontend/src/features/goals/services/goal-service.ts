import { client } from '@/lib/api/client'
import type { ApiResponse } from '@/lib/api/types'
import type { Goal } from '../types/goal.types'

export const goalService = {
  getAll: (): Promise<ApiResponse<Goal[]>> => client.get('/goals'),
}
