import { useQuery } from '@tanstack/react-query'
import { accountService } from '../services/account-service'

export function useAccountsQuery() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountService.getAll(),
  })
}

export function useAccountSummaryQuery() {
  return useQuery({
    queryKey: ['accounts', 'summary'],
    queryFn: () => accountService.getSummary(),
  })
}
