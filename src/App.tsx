import React, { useState, useEffect } from 'react';
import apiFetch from './utils/api';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { ResetPasswordPage } from './components/ResetPasswordPage';
import { Dashboard } from './components/Dashboard';
import { ResearchUpload } from './components/ResearchUpload';
import { ResearchChat } from './components/ResearchChat';
import { ProfilePage } from './components/ProfilePage';
import { HistoryPage } from './components/HistoryPage';
import { AgentMonitor } from './components/AgentMonitor';
import { Settings } from './components/Settings';
import { ResearchUniverse } from './components/ResearchUniverse';
import { ResearchGapLab } from './components/ResearchGapLab';
import { DataStreams } from './components/DataStreams';
import { MemoryChamber } from './components/MemoryChamber';
import { PresentationStudio } from './components/PresentationStudio';

type PageId =
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'reset-password'
  | 'dashboard'
  | 'upload'
  | 'chat'
  | 'profile'
  | 'history'
  | 'universe'
  | 'gap-lab'
  | 'streams'
  | 'chamber'
  | 'studio'
  | 'agents'
  | 'settings';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UploadedFile {
  id: string;
  name: string;
  date: string;
  size: string;
  type: string;
}

export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token by fetching profile
      (async () => {
        try {
          const res = await apiFetch('/api/profile');
          if (!res.ok) {
            localStorage.removeItem('token');
            return;
          }
          const data = await res.json();
          if (data && data.profile) {
            setUser({ id: data.profile.id, name: data.profile.name, email: data.profile.email });
            navigate('/dashboard', { replace: true });
          }
        } catch (e) {
          localStorage.removeItem('token');
        }
      })();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await apiFetch('/api/profile');
      if (!res.ok) {
        localStorage.removeItem('token');
        return;
      }
      const data = await res.json();
      if (data && data.profile) {
        setUser({ id: data.profile.id, name: data.profile.name, email: data.profile.email });
        navigate('/dashboard');
      }
    } catch (e) {
      localStorage.removeItem('token');
    }
  };

  const handleSignup = async () => {
    // After signup, the signup flow should place a token in localStorage (if provided). If so, fetch profile.
    await handleLogin();
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleFileUpload = (files: File[]) => {
    const newFiles = files.map((file) => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      date: new Date().toISOString().split('T')[0],
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type || 'File',
    }));
    setUploadedFiles((prev) => [...newFiles, ...prev]);
    navigate('/dashboard');
  };

  const pageToPath = (page: PageId) => {
    const map: Record<PageId, string> = {
      'login': '/login',
      'signup': '/signup',
      'forgot-password': '/forgot-password',
      'reset-password': '/reset-password',
      'dashboard': '/dashboard',
      'upload': '/upload',
      'chat': '/chat',
      'profile': '/profile',
      'history': '/history',
      'universe': '/universe',
      'gap-lab': '/gap-lab',
      'streams': '/streams',
      'chamber': '/chamber',
      'studio': '/studio',
      'agents': '/agents',
      'settings': '/settings',
    };
    return map[page];
  };

  const handleNavigate = (page: PageId) => {
    navigate(pageToPath(page));
  };

  const goBack = () => navigate(-1);

  function ProtectedRoute({ children }: { children: React.ReactNode }) {
    if (!user) return <Navigate to="/login" replace />;
    return children as React.JSX.Element;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage onLogin={handleLogin} onSignupClick={() => navigate('/signup')} onForgotPassword={() => navigate('/forgot-password')} />} />
      <Route path="/signup" element={<SignupPage onSignup={handleSignup} onBackToLogin={() => navigate('/login')} />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage onBackToLogin={() => navigate('/login')} onResetCodeSubmit={(resetToken: string) => { localStorage.setItem('resetToken', resetToken); navigate('/reset-password'); }} />} />
      <Route path="/reset-password" element={<ResetPasswordPage onPasswordReset={() => { localStorage.removeItem('resetToken'); navigate('/login'); }} onBackToLogin={() => { localStorage.removeItem('resetToken'); navigate('/login'); }} />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard userName={user?.name || 'Researcher'} onNavigate={handleNavigate} onLogout={handleLogout} /></ProtectedRoute>} />
      <Route path="/upload" element={<ProtectedRoute><ResearchUpload onUpload={handleFileUpload} onBack={goBack} /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute><ResearchChat onBack={goBack} /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage userName={user?.name || ''} userEmail={user?.email || ''} onBack={goBack} onLogout={handleLogout} /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><HistoryPage onBack={goBack} /></ProtectedRoute>} />
      <Route path="/universe" element={<ProtectedRoute><ResearchUniverse onBack={goBack} /></ProtectedRoute>} />
      <Route path="/gap-lab" element={<ProtectedRoute><ResearchGapLab onBack={goBack} /></ProtectedRoute>} />
      <Route path="/streams" element={<ProtectedRoute><DataStreams onBack={goBack} /></ProtectedRoute>} />
      <Route path="/chamber" element={<ProtectedRoute><MemoryChamber onBack={goBack} /></ProtectedRoute>} />
      <Route path="/studio" element={<ProtectedRoute><PresentationStudio onBack={goBack} /></ProtectedRoute>} />
      <Route path="/agents" element={<ProtectedRoute><AgentMonitor onBack={goBack} /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings onBack={goBack} onLogout={handleLogout} /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
