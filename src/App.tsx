import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import SystemLogs from "./pages/admin/SystemLogs";
import UserActivityLogs from "./pages/admin/UserActivityLogs";
import AuditLogs from "./pages/admin/AuditLogs";
import Applications from "./pages/admin/Applications";
import AdminSettings from "./pages/admin/AdminSettings";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import DBManage from "./pages/user/DBManage";
import Process from "./pages/user/Process";
import UserSettings from "./pages/user/UserSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<DashboardLayout requiredRole="admin" />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="logs/system" element={<SystemLogs />} />
              <Route path="logs/activity" element={<UserActivityLogs />} />
              <Route path="logs/audit" element={<AuditLogs />} />
              <Route path="applications" element={<Applications />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* User Routes */}
            <Route path="/user" element={<DashboardLayout requiredRole="user" />}>
              <Route index element={<UserDashboard />} />
              <Route path="db-manage" element={<DBManage />} />
              <Route path="process" element={<Process />} />
              <Route path="settings" element={<UserSettings />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
