import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AppSidebar } from './AppSidebar';
import { AppNavbar } from './AppNavbar';

interface DashboardLayoutProps {
  requiredRole: 'admin' | 'user';
}

export function DashboardLayout({ requiredRole }: DashboardLayoutProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== requiredRole) {
    const redirectPath = user?.role === 'admin' ? '/admin' : '/user';
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <AppNavbar />
      <main className="ml-64 mt-16 p-6 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
}
