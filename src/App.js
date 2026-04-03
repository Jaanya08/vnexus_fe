import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';

// Page imports
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import FacultyDashboard from './components/FacultyDashboard';
import FacProfile from './components/FacProfile';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ─── Auth Context ───
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Helper: fetch with auth header
export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('vnexus_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// ─── Protected Route wrapper ───
function ProtectedRoute({ children, allowedRole }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/" replace />;
  return children;
}

// ─── Page wrappers ───

function HomePage() {
  const navigate = useNavigate();
  return <Home onGetStarted={() => navigate('/login')} />;
}

function LoginPage() {
  const navigate = useNavigate();
  const { login, signup, user } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Navigate to={user.role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard'} replace />;
  }

  return (
    <Login
      onLoginSuccess={async (email, password, role) => {
        await login(email, password);
        // navigation happens via the redirect above on re-render
      }}
      onSignupSuccess={async (name, email, password, role) => {
        await signup(name, email, password, role);
      }}
      onGoToSignup={() => navigate('/signup')}
      isSignup={false}
    />
  );
}

function SignupPage() {
  const navigate = useNavigate();
  const { signup, user } = useAuth();

  if (user) {
    return <Navigate to={user.role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard'} replace />;
  }

  return (
    <Login
      isSignup={true}
      onSignupSuccess={async (name, email, password, role) => {
        await signup(name, email, password, role);
      }}
      onLoginSuccess={async (email, password) => {
        // won't be called in signup mode
      }}
      onGoToLogin={() => navigate('/login')}
      onGoToSignup={() => {}}
    />
  );
}

function StudentDashboardPage() {
  const { user, refreshProfile, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Dashboard
      onNavigateToProfile={() => navigate('/student/profile')}
      profileData={user}
      onLogout={() => { logout(); navigate('/'); }}
    />
  );
}

function StudentProfilePage() {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  return (
    <Profile
      onBack={() => navigate('/student/dashboard')}
      profileData={user}
      onSaveProfile={async (updatedData) => {
        await apiFetch('/profile', {
          method: 'PUT',
          body: JSON.stringify(updatedData),
        });
        await refreshProfile();
      }}
    />
  );
}

function FacultyDashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <FacultyDashboard
      onNavigateToProfile={() => navigate('/faculty/profile')}
      profileData={user}
      onLogout={() => { logout(); navigate('/'); }}
    />
  );
}

function FacultyProfilePage() {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  return (
    <FacProfile
      onBack={() => navigate('/faculty/dashboard')}
      profileData={user}
      onSaveProfile={async (updatedData) => {
        await apiFetch('/profile', {
          method: 'PUT',
          body: JSON.stringify(updatedData),
        });
        await refreshProfile();
      }}
    />
  );
}

// ─── Main App ───

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: check for existing token and load profile
  useEffect(() => {
    const token = localStorage.getItem('vnexus_token');
    if (token) {
      apiFetch('/profile')
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem('vnexus_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('vnexus_token', data.token);
    setUser(data.user);
    return data.user;
  };

  const signup = async (name, email, password, role) => {
    const data = await apiFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
    localStorage.setItem('vnexus_token', data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('vnexus_token');
    setUser(null);
  };

  const refreshProfile = async () => {
    const data = await apiFetch('/profile');
    setUser(data);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshProfile }}>
      <div className="App">
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Student */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRole="student"><StudentDashboardPage /></ProtectedRoute>
          } />
          <Route path="/student/profile" element={
            <ProtectedRoute allowedRole="student"><StudentProfilePage /></ProtectedRoute>
          } />

          {/* Faculty */}
          <Route path="/faculty/dashboard" element={
            <ProtectedRoute allowedRole="faculty"><FacultyDashboardPage /></ProtectedRoute>
          } />
          <Route path="/faculty/profile" element={
            <ProtectedRoute allowedRole="faculty"><FacultyProfilePage /></ProtectedRoute>
          } />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;