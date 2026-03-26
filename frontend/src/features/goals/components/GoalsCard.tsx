import { Target, ShieldCheck, TrendingUp, CreditCard } from 'lucide-react'
import { formatCurrency, cn } from '@/shared/lib/utils'
import { useGoals } from '../hooks/use-goals'
import type { Goal } from '../types/goal.types'

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  'em-andamento': {
    label: 'Em andamento',
    className: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  },
  pendente: {
    label: 'Pendente',
    className: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  },
  concluído: {
    label: 'Concluído',
    className: 'bg-success/10 text-success border border-success/20',
  },
}

const GOAL_ICONS: React.ReactNode[] = [
  <ShieldCheck size={18} />,
  <TrendingUp size={18} />,
  <CreditCard size={18} />,
]

function GoalCard({ goal, index }: { goal: Goal; index: number }) {
  const status = STATUS_STYLES[goal.status] ?? STATUS_STYLES['pendente']

  return (
    <div className="rounded-lg border border-border bg-background p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
          {GOAL_ICONS[index % GOAL_ICONS.length]}
        </div>
        <span className={cn('rounded-full px-2.5 py-0.5 text-[11px] font-medium', status.className)}>
          {status.label}
        </span>
      </div>

      {/* Info */}
      <div>
        <p className="text-sm font-semibold text-foreground">{goal.name}</p>
        <p className="text-xs text-muted-foreground">{goal.description}</p>
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progresso</span>
          <span className="font-medium text-foreground">{goal.progressPercent}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground/80 transition-all"
            style={{ width: `${goal.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Target */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Target size={12} />
        <span>{formatCurrency(goal.target)} meta</span>
      </div>
    </div>
  )
}

function GoalsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-border bg-background p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="size-9 rounded-md bg-muted animate-shimmer" />
            <div className="h-5 w-20 rounded-full bg-muted animate-shimmer" />
          </div>
          <div className="space-y-1">
            <div className="h-3.5 w-32 rounded bg-muted animate-shimmer" />
            <div className="h-3 w-48 rounded bg-muted animate-shimmer" />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <div className="h-3 w-12 rounded bg-muted animate-shimmer" />
              <div className="h-3 w-8 rounded bg-muted animate-shimmer" />
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted animate-shimmer" />
          </div>
          <div className="h-3 w-28 rounded bg-muted animate-shimmer" />
        </div>
      ))}
    </div>
  )
}

export function GoalsCard() {
  const { goals, isLoading } = useGoals()

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <Target size={15} className="text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">Próximos Compromissos</h2>
      </div>

      {isLoading ? (
        <GoalsSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, index) => (
            <GoalCard key={goal.id} goal={goal} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
