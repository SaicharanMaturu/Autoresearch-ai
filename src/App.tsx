import React, { useState, useEffect } from "react";
import { Brain, Map, Layers, Activity, Presentation, BrainCircuit, User } from "lucide-react";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
import { ResetPasswordPage } from "./components/ResetPasswordPage";
import { Dashboard } from "./components/Dashboard";
import { ResearchUpload } from "./components/ResearchUpload";
import { ResearchChat } from "./components/ResearchChat";
import { ProfilePage } from "./components/ProfilePage";
import { HistoryPage } from "./components/HistoryPage";
import { PlaceholderPage } from "./components/PlaceholderPage";

type PageId = 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'dashboard' | 'upload' | 'chat' | 'profile' | 'history' | 'universe' | 'gap-lab' | 'streams' | 'chamber' | 'studio';

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
  const [currentPage, setCurrentPage] = useState<PageId>('login');
  const [user, setUser] = useState<User | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email: email,
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setCurrentPage('dashboard');
  };

  const handleSignup = (name: string, email: string, password: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentPage('login');
  };

  const handleFileUpload = (files: File[]) => {
    const newFiles = files.map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      date: new Date().toISOString().split('T')[0],
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type || 'File',
    }));
    setUploadedFiles([...newFiles, ...uploadedFiles]);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
  };

  const goBack = () => {
    if (user) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('login');
    }
  };

  // Render appropriate page
  if (!user) {
    return (
      <>
        {currentPage === 'login' && (
          <LoginPage
            onLogin={handleLogin}
            onSignupClick={() => setCurrentPage('signup')}
            onForgotPassword={() => setCurrentPage('forgot-password')}
          />
        )}
        {currentPage === 'signup' && (
          <SignupPage
            onSignup={handleSignup}
            onBackToLogin={() => setCurrentPage('login')}
          />
        )}
        {currentPage === 'forgot-password' && (
          <ForgotPasswordPage
            onBackToLogin={() => setCurrentPage('login')}
            onResetCodeSubmit={(resetToken) => {
              localStorage.setItem('resetToken', resetToken);
              setCurrentPage('reset-password');
            }}
          />
        )}
        {currentPage === 'reset-password' && (
          <ResetPasswordPage
            onPasswordReset={() => {
              localStorage.removeItem('resetToken');
              setCurrentPage('login');
            }}
            onBackToLogin={() => {
              localStorage.removeItem('resetToken');
              setCurrentPage('login');
            }}
          />
        )}
      </>
    );
  }

  return (
    <>
      {currentPage === 'dashboard' && (
        <Dashboard
          userName={user.name}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'upload' && (
        <ResearchUpload
          onUpload={handleFileUpload}
          onBack={goBack}
        />
      )}
      {currentPage === 'chat' && (
        <ResearchChat onBack={goBack} />
      )}
      {currentPage === 'profile' && (
        <ProfilePage
          userName={user.name}
          userEmail={user.email}
          onBack={goBack}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'history' && (
        <HistoryPage onBack={goBack} />
      )}
      {currentPage === 'universe' && (
        <PlaceholderPage
          title="Research Universe"
          description="Interactive galaxy-like knowledge system showing papers as planets and topics as constellations"
          icon={Brain}
          onBack={goBack}
        />
      )}
      {currentPage === 'gap-lab' && (
        <PlaceholderPage
          title="Research Gap Lab"
          description="Discover missing areas in research landscape and identify opportunities"
          icon={Layers}
          onBack={goBack}
        />
      )}
      {currentPage === 'streams' && (
        <PlaceholderPage
          title="Data Streams"
          description="Citation flux analysis and semantic tags analytics"
          icon={Activity}
          onBack={goBack}
        />
      )}
      {currentPage === 'chamber' && (
        <PlaceholderPage
          title="Memory Chamber"
          description="Personal behavior helix timelines and user interaction history"
          icon={BrainCircuit}
          onBack={goBack}
        />
      )}
      {currentPage === 'studio' && (
        <PlaceholderPage
          title="Presentation Studio"
          description="AI-powered slide generation and presentation creation"
          icon={Presentation}
          onBack={goBack}
        />
      )}
    </>
  );
}
