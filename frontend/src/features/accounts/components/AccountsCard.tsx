import { PiggyBank, TrendingUp, CreditCard, Wallet, ShieldCheck } from 'lucide-react'
import { formatCurrency } from '@/shared/lib/utils'
import { useAccounts } from '../hooks/use-accounts'
import type { Account } from '../types/account.types'

const ACCOUNT_ICONS: Record<string, React.ReactNode> = {
  pessoal: <PiggyBank size={16} className="text-emerald-500" />,
  investimento: <TrendingUp size={16} className="text-violet-500" />,
  crédito: <CreditCard size={16} className="text-rose-500" />,
  emergência: <ShieldCheck size={16} className="text-emerald-500" />,
  'dia-a-dia': <Wallet size={16} className="text-blue-500" />,
}

function AccountRow({ account }: { account: Account }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-md bg-muted">
          {ACCOUNT_ICONS[account.type] ?? <Wallet size={16} className="text-muted-foreground" />}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{account.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{account.type}</p>
        </div>
      </div>
      <span className="text-sm font-medium tabular-nums text-foreground">
        {formatCurrency(account.balance)}
      </span>
    </div>
  )
}

function AccountsSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-md bg-muted animate-shimmer" />
            <div className="space-y-1">
              <div className="h-3.5 w-28 rounded bg-muted animate-shimmer" />
              <div className="h-3 w-16 rounded bg-muted animate-shimmer" />
            </div>
          </div>
          <div className="h-3.5 w-20 rounded bg-muted animate-shimmer" />
        </div>
      ))}
    </div>
  )
}

export function AccountsCard() {
  const { accounts, summary, isLoading } = useAccounts()

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <Wallet size={15} className="text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">Contas</h2>
      </div>

      {/* Summary */}
      <div className="mb-5 rounded-lg bg-muted/50 p-4">
        <p className="text-xs text-muted-foreground">Balanço Total</p>
        {isLoading ? (
          <div className="mt-1 h-7 w-36 rounded bg-muted animate-shimmer" />
        ) : (
          <p className="mt-0.5 text-2xl font-bold tabular-nums text-foreground">
            {formatCurrency(summary?.totalBalance ?? 0)}
          </p>
        )}
      </div>

      {/* Account list */}
      <p className="mb-1 text-xs font-medium text-muted-foreground">Suas Contas</p>
      <div className="divide-y divide-border/60">
        {isLoading ? (
          <AccountsSkeleton />
        ) : (
          accounts.map((account) => <AccountRow key={account.id} account={account} />)
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {['+ Adicionar', '↗ Enviar', '↙ Depositar', '→ Mais'].map((action) => (
          <button
            key={action}
            className="rounded-md border border-border bg-background px-2 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  )
}
