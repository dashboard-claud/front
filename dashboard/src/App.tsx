import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ThemeProvider } from "./context/ThemeContext";

// Lazy load all screen components for code splitting
const Dashboard = lazy(() => import("./screens/Dashboard"));
const Analytics = lazy(() => import("./screens/Analytics"));
const Users = lazy(() => import("./screens/Users"));
const Products = lazy(() => import("./screens/Products"));
const Orders = lazy(() => import("./screens/Orders"));
const Settings = lazy(() => import("./screens/Settings"));
const Login = lazy(() => import("./screens/Login"));
const Register = lazy(() => import("./screens/Register"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center bg-[var(--color-bg-light)]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
        <p className="text-text-secondary font-medium text-sm">Loading...</p>
      </div>
    </div>
  );
}

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-[var(--color-bg-card)] overflow-hidden">
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[var(--color-bg-light)]">
        <Header />
        {/* Add bottom padding on mobile for bottom nav */}
        <div className="flex-1 overflow-auto pb-20 lg:pb-0">
          <Outlet />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
