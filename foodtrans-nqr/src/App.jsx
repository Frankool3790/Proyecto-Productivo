import { useEffect, useState } from 'react';
import AppShell from './components/AppShell/AppShell.jsx';
import { AppDataProvider, useAppData } from './contexts/AppDataContext/index.js';
import { UserProvider, useUser } from './contexts/UserContext/index.js';
import { clientRoutes, renderRoute, routes } from './routes/routes.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';

function AppContent() {
  const { user, loading, login, logout } = useUser();
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const { resetDemoData, apiStatus } = useAppData();
  const currentRoutes = user?.role === 'client' ? clientRoutes : routes;

  useEffect(() => {
    setActiveRoute(currentRoutes[0].id);
  }, [user?.role]);

  if (loading) return <main className="auth-screen"><p>Verificando sesión…</p></main>;
  if (!user) return <AuthPage onLogin={login} />;

  return (
    <AppShell
      routes={currentRoutes}
      activeRoute={activeRoute}
      onNavigate={setActiveRoute}
      onReset={user.role === 'admin' ? resetDemoData : undefined}
      apiStatus={apiStatus}
      onLogout={logout}
    >
      {renderRoute(activeRoute, currentRoutes)}
    </AppShell>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppDataProvider>
        <AppContent />
      </AppDataProvider>
    </UserProvider>
  );
}
