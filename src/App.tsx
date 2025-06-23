import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser } from "./utils/auth";
import { initializeData } from "./config/data";
import { ROUTES } from "./config/routes";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Auth pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Customer pages
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import PersonalInfo from "./pages/customer/PersonalInfo";
import EventDetails from "./pages/customer/EventDetails";
import FoodDetails from "./pages/customer/FoodDetails";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManagerManagement from "./pages/admin/ManagerManagement";
import WorkAssignment from "./pages/admin/WorkAssignment";
import ShiftManagement from "./pages/admin/ShiftManagement";
import StaffManagement from "./pages/admin/StaffManagement";
import Analytics from "./pages/admin/Analytics";

// Manager pages
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerShifts from "./pages/manager/ManagerShifts";
import DutyHours from "./pages/manager/DutyHours";
import CustomerManagement from "./pages/manager/CustomerManagement";
import EventManagement from "./pages/manager/EventManagement";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initializeData();
  }, []);

  const user = getCurrentUser();
  const isAuthenticated = !!user;

  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex w-full">
        {isAuthenticated && <Sidebar />}
        <main className={`flex-1 ${isAuthenticated ? 'p-6' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path={ROUTES.LOGIN} element={
                isAuthenticated ? (
                  <Navigate to={
                    user.role === 'admin' ? ROUTES.ADMIN_DASHBOARD :
                    user.role === 'manager' ? ROUTES.MANAGER_DASHBOARD :
                    ROUTES.CUSTOMER_DASHBOARD
                  } replace />
                ) : <Login />
              } />
              <Route path={ROUTES.SIGNUP} element={
                isAuthenticated ? (
                  <Navigate to={
                    user.role === 'admin' ? ROUTES.ADMIN_DASHBOARD :
                    user.role === 'manager' ? ROUTES.MANAGER_DASHBOARD :
                    ROUTES.CUSTOMER_DASHBOARD
                  } replace />
                ) : <Signup />
              } />

              {/* Customer routes */}
              <Route path={ROUTES.CUSTOMER_DASHBOARD} element={
                <ProtectedRoute requiredRole="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.CUSTOMER_PERSONAL} element={
                <ProtectedRoute requiredRole="customer">
                  <PersonalInfo />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.CUSTOMER_EVENT} element={
                <ProtectedRoute requiredRole="customer">
                  <EventDetails />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.CUSTOMER_FOOD} element={
                <ProtectedRoute requiredRole="customer">
                  <FoodDetails />
                </ProtectedRoute>
              } />

              {/* Admin routes */}
              <Route path={ROUTES.ADMIN_DASHBOARD} element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.ADMIN_MANAGERS} element={
                <ProtectedRoute requiredRole="admin">
                  <ManagerManagement />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.ADMIN_ASSIGNMENTS} element={
                <ProtectedRoute requiredRole="admin">
                  <WorkAssignment />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.ADMIN_SHIFTS} element={
                <ProtectedRoute requiredRole="admin">
                  <ShiftManagement />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.ADMIN_STAFF} element={
                <ProtectedRoute requiredRole="admin">
                  <StaffManagement />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.ADMIN_ANALYTICS} element={
                <ProtectedRoute requiredRole="admin">
                  <Analytics />
                </ProtectedRoute>
              } />

              {/* Manager routes */}
              <Route path={ROUTES.MANAGER_DASHBOARD} element={
                <ProtectedRoute requiredRole="manager">
                  <ManagerDashboard />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.MANAGER_SHIFTS} element={
                <ProtectedRoute requiredRole="manager">
                  <ManagerShifts />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.MANAGER_PERSONAL} element={
                <ProtectedRoute requiredRole="manager">
                  <PersonalInfo />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.MANAGER_DUTIES} element={
                <ProtectedRoute requiredRole="manager">
                  <DutyHours />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.MANAGER_CUSTOMERS} element={
                <ProtectedRoute requiredRole="manager">
                  <CustomerManagement />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.MANAGER_EVENTS} element={
                <ProtectedRoute requiredRole="manager">
                  <EventManagement />
                </ProtectedRoute>
              } />

              {/* Root redirect */}
              <Route path="/" element={
                <Navigate to={
                  isAuthenticated ? (
                    user.role === 'admin' ? ROUTES.ADMIN_DASHBOARD :
                    user.role === 'manager' ? ROUTES.MANAGER_DASHBOARD :
                    ROUTES.CUSTOMER_DASHBOARD
                  ) : ROUTES.LOGIN
                } replace />
              } />

              {/* 404 catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
