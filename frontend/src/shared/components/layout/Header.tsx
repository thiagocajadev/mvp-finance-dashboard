import { Bell, Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/app/theme-store'

type Props = {
  breadcrumbs?: string[]
}

export function Header({ breadcrumbs = [] }: Props) {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb} className="flex items-center gap-1.5">
            {index > 0 && <span className="text-border">›</span>}
            <span className={index === breadcrumbs.length - 1 ? 'text-foreground font-medium' : ''}>
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell size={16} />
        </button>
        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
          US
        </div>
      </div>
    </header>
  )
}
