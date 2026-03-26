import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

type ThemeStore = {
  theme: Theme
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        set({ theme: next })
        document.documentElement.classList.toggle('dark', next === 'dark')
      },
    }),
    { name: 'finance-theme' },
  ),
)

export function initTheme() {
  const stored = localStorage.getItem('finance-theme')
  const theme: Theme = stored ? (JSON.parse(stored) as { state: { theme: Theme } }).state.theme : 'light'
  document.documentElement.classList.toggle('dark', theme === 'dark')
}
