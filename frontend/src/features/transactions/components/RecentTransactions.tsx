import { ArrowUpRight, ArrowDownLeft, ShoppingCart, Banknote, MonitorPlay, Server, Globe } from 'lucide-react'
import { formatCurrency, formatDate } from '@/shared/lib/utils'
import { cn } from '@/shared/lib/utils'
import { useTransactions } from '../hooks/use-transactions'
import type { Transaction } from '../types/transaction.types'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  compras: <ShoppingCart size={14} />,
  renda: <Banknote size={14} />,
  serviços: <MonitorPlay size={14} />,
  servidor: <Server size={14} />,
  assinatura: <Globe size={14} />,
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const isPositive = transaction.amount > 0

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
          {CATEGORY_ICONS[transaction.category] ?? <ShoppingCart size={14} />}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground leading-tight">{transaction.name}</p>
          <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span
          className={cn(
            'text-sm font-semibold tabular-nums',
            isPositive ? 'text-success' : 'text-destructive',
          )}
        >
          {isPositive ? '+' : ''}
          {formatCurrency(transaction.amount)}
        </span>
        {isPositive ? (
          <ArrowDownLeft size={13} className="text-success" />
        ) : (
          <ArrowUpRight size={13} className="text-destructive" />
        )}
      </div>
    </div>
  )
}

function TransactionsSkeleton() {
  return (
    <div className="space-y-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-md bg-muted animate-shimmer" />
            <div className="space-y-1">
              <div className="h-3.5 w-36 rounded bg-muted animate-shimmer" />
              <div className="h-3 w-20 rounded bg-muted animate-shimmer" />
            </div>
          </div>
          <div className="h-3.5 w-20 rounded bg-muted animate-shimmer" />
        </div>
      ))}
    </div>
  )
}

export function RecentTransactions() {
  const { transactions, isLoading } = useTransactions()

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowUpRight size={15} className="text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">Histórico de Lançamentos</h2>
        </div>
      </div>

      {/* Subheader */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Atividade Recente ({isLoading ? '–' : transactions.length} lançamentos)
        </p>
        <span className="text-xs text-muted-foreground">Este Mês</span>
      </div>

      {/* List */}
      <div className="divide-y divide-border/60">
        {isLoading ? <TransactionsSkeleton /> : transactions.map((t) => (
          <TransactionRow key={t.id} transaction={t} />
        ))}
      </div>

      {/* Footer */}
      <button className="mt-4 w-full rounded-lg border border-border py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent flex items-center justify-center gap-1.5">
        Ver Todos os Lançamentos
        <ArrowUpRight size={13} />
      </button>
    </div>
  )
}
