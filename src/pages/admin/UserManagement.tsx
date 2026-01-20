import { useState } from 'react';
import { Search, Plus, MoreHorizontal, Edit, Trash2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', lastActive: '2 min ago' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', lastActive: '15 min ago' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'user', status: 'inactive', lastActive: '2 days ago' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'user', status: 'pending', lastActive: 'Never' },
  { id: '5', name: 'Tom Brown', email: 'tom@example.com', role: 'user', status: 'active', lastActive: '1 hour ago' },
];

const statusStyles = {
  active: 'bg-success/10 text-success border-success/20',
  inactive: 'bg-muted text-muted-foreground border-muted',
  pending: 'bg-warning/10 text-warning border-warning/20',
};

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users] = useState<User[]>(mockUsers);

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage user accounts and permissions</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input pl-10"
        />
      </div>

      {/* Users Table */}
      <div className="stat-card p-0 overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Active</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="gap-1">
                    {user.role === 'admin' && <Shield className="h-3 w-3" />}
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </td>
                <td>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[user.status]}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="text-muted-foreground">{user.lastActive}</td>
                <td>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Edit className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
