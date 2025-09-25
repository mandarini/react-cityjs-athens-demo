import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Auth from './pages/Auth';
import AuthProvider from './components/Auth/AuthProvider';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={user ? <Navigate to="/tasks" replace /> : <Auth />}
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={user ? "/tasks" : "/auth"} replace />}
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;