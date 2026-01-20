import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Activity, 
  Shield, 
  AppWindow, 
  Settings,
  Database,
  Cog,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NavItem {
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

const adminNavItems: NavItem[] = [
  { title: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { title: 'User Management', path: '/admin/users', icon: Users },
  { 
    title: 'Logs', 
    path: '/admin/logs',
    icon: FileText,
    children: [
      { title: 'System Logs', path: '/admin/logs/system', icon: FileText },
      { title: 'User Activity', path: '/admin/logs/activity', icon: Activity },
      { title: 'Audit Logs', path: '/admin/logs/audit', icon: Shield },
    ]
  },
  { title: 'Applications', path: '/admin/applications', icon: AppWindow },
  { title: 'Settings', path: '/admin/settings', icon: Settings },
];

const userNavItems: NavItem[] = [
  { title: 'Dashboard', path: '/user', icon: LayoutDashboard },
  { title: 'DB Manage', path: '/user/db-manage', icon: Database },
  { title: 'Process', path: '/user/process', icon: Cog },
  { title: 'Settings', path: '/user/settings', icon: Settings },
];

interface SidebarNavItemProps {
  item: NavItem;
  basePath: string;
}

function SidebarNavItem({ item, basePath }: SidebarNavItemProps) {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(() => {
    if (item.children) {
      return item.children.some(child => location.pathname === child.path);
    }
    return false;
  });

  const hasChildren = item.children && item.children.length > 0;
  const isActive = location.pathname === item.path;
  const isChildActive = hasChildren && item.children!.some(child => location.pathname === child.path);

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'sidebar-nav-item w-full justify-between',
            (isActive || isChildActive) && 'active'
          )}
        >
          <div className="flex items-center gap-3">
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </div>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {isExpanded && (
          <div className="ml-4 mt-1 space-y-1 animate-fade-in">
            {item.children!.map(child => (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive }) =>
                  cn('sidebar-nav-item pl-6', isActive && 'active')
                }
              >
                <child.icon className="h-4 w-4" />
                <span>{child.title}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      end={item.path === basePath}
      className={({ isActive }) =>
        cn('sidebar-nav-item', isActive && 'active')
      }
    >
      <item.icon className="h-5 w-5" />
      <span>{item.title}</span>
    </NavLink>
  );
}

export function AppSidebar() {
  const { user } = useAuth();
  
  const navItems = user?.role === 'admin' ? adminNavItems : userNavItems;
  const basePath = user?.role === 'admin' ? '/admin' : '/user';

  return (
    <aside className="w-64 h-screen bg-sidebar flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sidebar-ring flex items-center justify-center">
            <span className="text-sidebar font-bold text-sm">E</span>
          </div>
          <span className="font-semibold text-sidebar-primary text-lg">
            EnterpriseSaaS
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="stagger-children">
          {navItems.map(item => (
            <SidebarNavItem key={item.path} item={item} basePath={basePath} />
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-muted">
          {user?.role === 'admin' ? 'Administrator' : 'User'} Panel
        </div>
      </div>
    </aside>
  );
}
