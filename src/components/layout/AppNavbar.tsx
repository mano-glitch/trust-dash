import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut, User, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const routeTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/users': 'User Management',
  '/admin/logs/system': 'System Logs',
  '/admin/logs/activity': 'User Activity Logs',
  '/admin/logs/audit': 'Audit Logs',
  '/admin/applications': 'Applications',
  '/admin/settings': 'Settings',
  '/user': 'Dashboard',
  '/user/db-manage': 'DB Manage',
  '/user/process': 'Process',
  '/user/settings': 'Settings',
};

function getBreadcrumbs(pathname: string): { label: string; path: string }[] {
  const parts = pathname.split('/').filter(Boolean);
  const breadcrumbs: { label: string; path: string }[] = [];
  
  let currentPath = '';
  for (const part of parts) {
    currentPath += `/${part}`;
    const title = routeTitles[currentPath] || part.charAt(0).toUpperCase() + part.slice(1);
    breadcrumbs.push({ label: title, path: currentPath });
  }
  
  return breadcrumbs;
}

export function AppNavbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const breadcrumbs = getBreadcrumbs(location.pathname);
  const pageTitle = routeTitles[location.pathname] || 'Dashboard';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-30">
      {/* Left side - Breadcrumb */}
      <div className="flex items-center gap-2">
        <nav className="flex items-center text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-foreground">{crumb.label}</span>
              ) : (
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                  {crumb.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right side - User menu */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors outline-none">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
              {user?.name ? getInitials(user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>{user?.name}</span>
              <span className="text-xs font-normal text-muted-foreground">{user?.email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
