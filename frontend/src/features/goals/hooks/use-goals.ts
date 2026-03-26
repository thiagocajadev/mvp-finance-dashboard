import { useGoalsQuery } from '../queries/goal-queries'

export function useGoals() {
  const { data: response, isLoading } = useGoalsQuery()

  return {
    goals: response?.data ?? [],
    isLoading,
  }
}
