export type Account = {
  id: string
  name: string
  type: string
  balance: number
}

export type AccountSummary = {
  totalBalance: number
  accountCount: number
}
