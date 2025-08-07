import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, Auth } from './pages';
import { GlobalStyles } from './App.styles';
import { Analytics } from "@vercel/analytics/react"
import { useAuth } from './hooks';

// Компонент для защищенных маршрутов
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Загрузка...</div>; // Можно заменить на красивый лоадер
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

// Компонент для публичных маршрутов (только для неавторизованных)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Загрузка...</div>; // Можно заменить на красивый лоадер
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <>
      <Analytics />
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route 
            path="/auth" 
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
