import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CategoryPage } from './pages/CategoryPage';
import { AdminLogin } from './pages/admin/Login';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { ProductForm } from './pages/admin/ProductForm';
import { AdminLayout } from './pages/admin/AdminLayout';
import { FeaturedManagement } from './pages/admin/FeaturedManagement';
import { MainLayout } from './components/layout/MainLayout';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
            <Route path="featured" element={<FeaturedManagement />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
