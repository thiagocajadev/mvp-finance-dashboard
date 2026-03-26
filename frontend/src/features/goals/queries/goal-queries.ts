import { useQuery } from '@tanstack/react-query'
import { goalService } from '../services/goal-service'

export function useGoalsQuery() {
  return useQuery({
    queryKey: ['goals'],
    queryFn: () => goalService.getAll(),
  })
}
