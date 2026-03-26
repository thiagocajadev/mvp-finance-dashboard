import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  BarChart3,
  ArrowLeftRight,
  FileText,
  CreditCard,
  Users,
  ShieldCheck,
  MessageSquare,
  Video,
  Settings,
  HelpCircle,
  Leaf,
} from 'lucide-react'
import { cn } from '@/shared/lib/utils'

type NavItem = {
  label: string
  to: string
  icon: React.ReactNode
}

const overviewLinks: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard size={16} /> },
  { label: 'Análises', to: '/analytics', icon: <BarChart3 size={16} /> },
  { label: 'Organização', to: '/organization', icon: <Users size={16} /> },
  { label: 'Projetos', to: '/projects', icon: <FileText size={16} /> },
]

const financeLinks: NavItem[] = [
  { label: 'Lançamentos', to: '/transactions', icon: <ArrowLeftRight size={16} /> },
  { label: 'Faturas', to: '/invoices', icon: <FileText size={16} /> },
  { label: 'Pagamentos', to: '/payments', icon: <CreditCard size={16} /> },
]

const teamLinks: NavItem[] = [
  { label: 'Membros', to: '/members', icon: <Users size={16} /> },
  { label: 'Permissões', to: '/permissions', icon: <ShieldCheck size={16} /> },
  { label: 'Chat', to: '/chat', icon: <MessageSquare size={16} /> },
  { label: 'Reuniões', to: '/meetings', icon: <Video size={16} /> },
]

function SidebarSection({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="space-y-0.5">
      <p className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
        {title}
      </p>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
              isActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
            )
          }
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="flex h-dvh w-52 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary">
          <Leaf size={14} className="text-primary-foreground" />
        </div>
        <span className="text-sm font-semibold text-sidebar-foreground">FinanceApp</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-4 overflow-y-auto p-3 py-4">
        <SidebarSection title="Visão Geral" items={overviewLinks} />
        <SidebarSection title="Finanças" items={financeLinks} />
        <SidebarSection title="Equipe" items={teamLinks} />
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3 space-y-0.5">
        <NavLink
          to="/settings"
          className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-colors"
        >
          <Settings size={16} />
          Configurações
        </NavLink>
        <NavLink
          to="/help"
          className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-colors"
        >
          <HelpCircle size={16} />
          Ajuda
        </NavLink>
      </div>
    </aside>
  )
}
