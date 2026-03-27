import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
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
  ChevronLeft,
  ChevronRight,
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

function SidebarSection({
  title,
  items,
  isCollapsed,
}: {
  title: string
  items: NavItem[]
  isCollapsed: boolean
}) {
  return (
    <div className="space-y-0.5">
      {!isCollapsed && (
        <p className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
          {title}
        </p>
      )}
      {isCollapsed && <div className="mx-3 my-1.5 border-t border-sidebar-border/60" />}
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          title={isCollapsed ? item.label : undefined}
          className={({ isActive }) =>
            cn(
              'flex items-center rounded-md py-2 text-sm transition-colors',
              isCollapsed ? 'justify-center px-2' : 'gap-2.5 px-3',
              isActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
            )
          }
        >
          <span className="shrink-0">{item.icon}</span>
          {!isCollapsed && item.label}
        </NavLink>
      ))}
    </div>
  )
}

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: SidebarProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 flex h-dvh w-52 shrink-0 flex-col border-r border-sidebar-border bg-sidebar',
        'transition-[width,transform] duration-200 ease-in-out',
        'md:static md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        isCollapsed && 'md:w-14',
      )}>
        {/* Logo */}
        <div className={cn(
          'flex h-14 shrink-0 items-center border-b border-sidebar-border',
          isCollapsed ? 'justify-center px-0' : 'gap-2 px-3',
        )}>
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Leaf size={14} className="text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <span className="flex-1 truncate text-sm font-semibold text-sidebar-foreground">
              FinanceApp
            </span>
          )}
          <button
            onClick={onToggleCollapse}
            className={cn(
              'hidden md:flex size-6 items-center justify-center rounded-md text-sidebar-foreground/40 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
              isCollapsed && 'mt-0',
            )}
            aria-label={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {isCollapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
          </button>
        </div>

        {/* Nav */}
        <nav className={cn(
          'flex-1 space-y-3 overflow-y-auto overflow-x-hidden py-4',
          isCollapsed ? 'px-1' : 'px-2',
        )}>
          <SidebarSection title="Visão Geral" items={overviewLinks} isCollapsed={isCollapsed} />
          <SidebarSection title="Finanças" items={financeLinks} isCollapsed={isCollapsed} />
          <SidebarSection title="Equipe" items={teamLinks} isCollapsed={isCollapsed} />
        </nav>

        {/* Footer */}
        <div className={cn(
          'border-t border-sidebar-border py-3 space-y-0.5',
          isCollapsed ? 'px-1' : 'px-2',
        )}>
          <NavLink
            to="/settings"
            title={isCollapsed ? 'Configurações' : undefined}
            className={cn(
              'flex items-center rounded-md py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
              isCollapsed ? 'justify-center px-2' : 'gap-2.5 px-3',
            )}
          >
            <Settings size={16} className="shrink-0" />
            {!isCollapsed && 'Configurações'}
          </NavLink>
          <NavLink
            to="/help"
            title={isCollapsed ? 'Ajuda' : undefined}
            className={cn(
              'flex items-center rounded-md py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
              isCollapsed ? 'justify-center px-2' : 'gap-2.5 px-3',
            )}
          >
            <HelpCircle size={16} className="shrink-0" />
            {!isCollapsed && 'Ajuda'}
          </NavLink>
        </div>
      </aside>
    </>
  )
}
