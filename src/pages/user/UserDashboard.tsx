import { useState } from 'react';
import { Download, FileText, Upload, Scissors } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { MiniChart } from '@/components/dashboard/MiniChart';
import { FilterTabs } from '@/components/dashboard/FilterTabs';

type FilterPeriod = 'day' | 'month' | 'year';

// Mock data generators
const generateChartData = (period: FilterPeriod) => {
  const points = period === 'day' ? 24 : period === 'month' ? 30 : 12;
  return Array.from({ length: points }, () => ({
    value: Math.floor(Math.random() * 100) + 20,
  }));
};

const getStats = (period: FilterPeriod) => ({
  downloads: period === 'day' ? 47 : period === 'month' ? 1234 : 15678,
  pdfSplits: period === 'day' ? 12 : period === 'month' ? 345 : 4532,
  uploads: period === 'day' ? 23 : period === 'month' ? 567 : 7890,
  pdfSplitter: period === 'day' ? 8 : period === 'month' ? 189 : 2345,
});

export default function UserDashboard() {
  const [filter, setFilter] = useState<FilterPeriod>('month');
  const stats = getStats(filter);
  const chartData = generateChartData(filter);

  const changeLabels: Record<FilterPeriod, string> = {
    day: 'vs yesterday',
    month: 'vs last month',
    year: 'vs last year',
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Your activity overview and statistics</p>
        </div>
        <FilterTabs value={filter} onChange={setFilter} />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
        <StatCard
          title="Download Count"
          value={stats.downloads.toLocaleString()}
          change={12.5}
          changeLabel={changeLabels[filter]}
          icon={<Download className="h-5 w-5" />}
          chart={<MiniChart data={chartData} color="hsl(var(--chart-1))" />}
        />
        <StatCard
          title="PDF Split Count"
          value={stats.pdfSplits.toLocaleString()}
          change={8.3}
          changeLabel={changeLabels[filter]}
          icon={<Scissors className="h-5 w-5" />}
          chart={<MiniChart data={chartData} color="hsl(var(--chart-2))" />}
        />
        <StatCard
          title="Uploaded File Count"
          value={stats.uploads.toLocaleString()}
          change={15.2}
          changeLabel={changeLabels[filter]}
          icon={<Upload className="h-5 w-5" />}
          chart={<MiniChart data={chartData} color="hsl(var(--chart-3))" />}
        />
        <StatCard
          title="PDF Splitter Usage"
          value={stats.pdfSplitter.toLocaleString()}
          change={-3.1}
          changeLabel={changeLabels[filter]}
          icon={<FileText className="h-5 w-5" />}
          chart={<MiniChart data={chartData} color="hsl(var(--chart-4))" />}
        />
      </div>

      {/* Recent Activity */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Action</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-medium">report_2026.pdf</td>
              <td>PDF Split</td>
              <td><span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs">Completed</span></td>
              <td className="text-muted-foreground">5 min ago</td>
            </tr>
            <tr>
              <td className="font-medium">invoice_jan.pdf</td>
              <td>Download</td>
              <td><span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs">Completed</span></td>
              <td className="text-muted-foreground">15 min ago</td>
            </tr>
            <tr>
              <td className="font-medium">data_export.csv</td>
              <td>Upload</td>
              <td><span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs">Completed</span></td>
              <td className="text-muted-foreground">1 hour ago</td>
            </tr>
            <tr>
              <td className="font-medium">contract_v2.pdf</td>
              <td>PDF Split</td>
              <td><span className="px-2 py-1 rounded-full bg-warning/10 text-warning text-xs">Processing</span></td>
              <td className="text-muted-foreground">2 hours ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
