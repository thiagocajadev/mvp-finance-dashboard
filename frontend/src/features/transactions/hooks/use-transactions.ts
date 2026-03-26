import { useTransactionsQuery } from '../queries/transaction-queries'

export function useTransactions() {
  const { data: response, isLoading } = useTransactionsQuery()

  return {
    transactions: response?.data ?? [],
    isLoading,
  }
}
