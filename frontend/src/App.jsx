import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateCampaignPage } from './pages/CreateCampaignPage';
import { ContactsPage } from './pages/ContactsPage';
import { Navigation } from './components/Navigation';
import { useAuth } from './hooks/useAuth';
import './index.css';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50">
                  <Navigation />
                  <main className="max-w-7xl mx-auto px-4 py-8">
                    <Routes>
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/campaigns/create" element={<CreateCampaignPage />} />
                      <Route path="/contacts" element={<ContactsPage />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
