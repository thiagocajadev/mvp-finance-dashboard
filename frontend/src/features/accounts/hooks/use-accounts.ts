import { useAccountsQuery, useAccountSummaryQuery } from '../queries/account-queries'

export function useAccounts() {
  const { data: accountsResponse, isLoading: isLoadingAccounts } = useAccountsQuery()
  const { data: summaryResponse, isLoading: isLoadingSummary } = useAccountSummaryQuery()

  return {
    accounts: accountsResponse?.data ?? [],
    summary: summaryResponse?.data ?? null,
    isLoading: isLoadingAccounts || isLoadingSummary,
  }
}
