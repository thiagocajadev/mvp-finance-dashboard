import { AccountsCard } from '@/features/accounts'
import { RecentTransactions } from '@/features/transactions'
import { GoalsCard } from '@/features/goals'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top grid: Accounts + Recent Transactions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]">
        <AccountsCard />
        <RecentTransactions />
      </div>

      {/* Goals */}
      <GoalsCard />
    </div>
  )
}
