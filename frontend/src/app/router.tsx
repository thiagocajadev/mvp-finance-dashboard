import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/shared/components/layout/AppLayout'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-card">
      <p className="text-sm text-muted-foreground">{title} — coming soon</p>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout breadcrumbs={['FinanceApp', 'dashboard']} />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'analytics', element: <PlaceholderPage title="Analytics" /> },
      { path: 'organization', element: <PlaceholderPage title="Organization" /> },
      { path: 'projects', element: <PlaceholderPage title="Projects" /> },
      { path: 'transactions', element: <PlaceholderPage title="Transactions" /> },
      { path: 'invoices', element: <PlaceholderPage title="Invoices" /> },
      { path: 'payments', element: <PlaceholderPage title="Payments" /> },
      { path: 'members', element: <PlaceholderPage title="Members" /> },
      { path: 'permissions', element: <PlaceholderPage title="Permissions" /> },
      { path: 'chat', element: <PlaceholderPage title="Chat" /> },
      { path: 'meetings', element: <PlaceholderPage title="Meetings" /> },
      { path: 'settings', element: <PlaceholderPage title="Settings" /> },
      { path: 'help', element: <PlaceholderPage title="Help" /> },
    ],
  },
])
