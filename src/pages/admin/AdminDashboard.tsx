import { Users, Activity, Shield, AppWindow } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { MiniChart } from '@/components/dashboard/MiniChart';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';

// Mock data
const userGrowthData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 600 },
  { name: 'Mar', users: 800 },
  { name: 'Apr', users: 1000 },
  { name: 'May', users: 1400 },
  { name: 'Jun', users: 1800 },
];

const activityData = [
  { name: 'Mon', logins: 120, actions: 340 },
  { name: 'Tue', logins: 180, actions: 420 },
  { name: 'Wed', logins: 150, actions: 380 },
  { name: 'Thu', logins: 200, actions: 500 },
  { name: 'Fri', logins: 170, actions: 450 },
  { name: 'Sat', logins: 80, actions: 200 },
  { name: 'Sun', logins: 60, actions: 150 },
];

const miniChartData = [
  { value: 30 }, { value: 40 }, { value: 35 }, { value: 50 },
  { value: 45 }, { value: 60 }, { value: 55 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of system performance and user activity</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
        <StatCard
          title="Total Users"
          value="1,847"
          change={12.5}
          changeLabel="vs last month"
          icon={<Users className="h-5 w-5" />}
          chart={<MiniChart data={miniChartData} color="hsl(var(--chart-1))" />}
        />
        <StatCard
          title="Active Sessions"
          value="342"
          change={8.2}
          changeLabel="vs yesterday"
          icon={<Activity className="h-5 w-5" />}
          chart={<MiniChart data={miniChartData} color="hsl(var(--chart-2))" />}
        />
        <StatCard
          title="Security Events"
          value="23"
          change={-5.1}
          changeLabel="vs last week"
          icon={<Shield className="h-5 w-5" />}
          chart={<MiniChart data={miniChartData} color="hsl(var(--chart-3))" />}
        />
        <StatCard
          title="Active Apps"
          value="12"
          change={0}
          changeLabel="no change"
          icon={<AppWindow className="h-5 w-5" />}
          chart={<MiniChart data={miniChartData} color="hsl(var(--chart-4))" />}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Growth Chart */}
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">User Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  fill="url(#userGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Chart */}
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="logins" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actions" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-medium">John Doe</td>
              <td>Login</td>
              <td><span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs">Success</span></td>
              <td className="text-muted-foreground">2 min ago</td>
            </tr>
            <tr>
              <td className="font-medium">Jane Smith</td>
              <td>File Upload</td>
              <td><span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs">Success</span></td>
              <td className="text-muted-foreground">5 min ago</td>
            </tr>
            <tr>
              <td className="font-medium">Mike Johnson</td>
              <td>Password Change</td>
              <td><span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs">Success</span></td>
              <td className="text-muted-foreground">15 min ago</td>
            </tr>
            <tr>
              <td className="font-medium">Sarah Wilson</td>
              <td>Failed Login</td>
              <td><span className="px-2 py-1 rounded-full bg-destructive/10 text-destructive text-xs">Failed</span></td>
              <td className="text-muted-foreground">32 min ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
