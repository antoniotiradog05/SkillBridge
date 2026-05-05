import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import RoadmapGeneratorPage from './pages/RoadmapGeneratorPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MentorsPage from './pages/MentorsPage';
import { AuthProvider, AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Cargando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-root">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/roadmap-generator" element={
              <ProtectedRoute>
                <RoadmapGeneratorPage />
              </ProtectedRoute>
            } />
            <Route path="/mentors" element={
              <ProtectedRoute>
                <MentorsPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;