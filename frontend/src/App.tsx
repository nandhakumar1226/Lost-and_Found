import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/student/LoginPage';
import { RegisterPage } from './pages/student/RegisterPage';
import { DashboardPage } from './pages/student/DashboardPage';
import { BrowseItemsPage } from './pages/student/BrowseItemsPage';
import { ItemDetailsPage } from './pages/student/ItemDetailsPage';
import { ReportLostPage } from './pages/student/ReportLostPage';
import { ReportFoundPage } from './pages/student/ReportFoundPage';
import { MyActivityPage } from './pages/student/MyActivityPage';
import { ProfilePage } from './pages/student/ProfilePage';

// Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminItemsPage } from './pages/admin/AdminItemsPage';
import { AdminClaimsPage } from './pages/admin/AdminClaimsPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return null;
  if (!user || !isAdmin) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          {/* Public / Auth Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Student App Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/items" element={<ProtectedRoute><BrowseItemsPage /></ProtectedRoute>} />
          <Route path="/items/:id" element={<ProtectedRoute><ItemDetailsPage /></ProtectedRoute>} />
          <Route path="/report-lost" element={<ProtectedRoute><ReportLostPage /></ProtectedRoute>} />
          <Route path="/report-found" element={<ProtectedRoute><ReportFoundPage /></ProtectedRoute>} />
          <Route path="/my-activity" element={<ProtectedRoute><MyActivityPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="items" element={<AdminItemsPage />} />
            <Route path="claims" element={<AdminClaimsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
