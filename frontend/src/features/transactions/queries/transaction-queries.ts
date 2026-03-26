import { useQuery } from '@tanstack/react-query'
import { transactionService } from '../services/transaction-service'

export function useTransactionsQuery() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.getAll(),
  })
}
