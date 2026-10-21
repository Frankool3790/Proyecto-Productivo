import Avatar from '../Avatar/Avatar.jsx';
import Button from '../Button/Button.jsx';
import { useUser } from '../../contexts/UserContext/index.js';
import { useMediaQuery } from '../../hooks/useMediaQuery/index.js';
import { useState } from 'react';

export default function AppShell({ routes, activeRoute, onNavigate, onReset, apiStatus, onLogout, children }) {
  const { user } = useUser();
  const isCompact = useMediaQuery('(max-width: 760px)');
  const roleLabel = user.role === 'admin' ? 'Administrador' : 'Cliente';
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('foodtrans-nqr-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('foodtrans-nqr-theme', nextTheme);
    } catch {
      // The theme still changes for this session if storage is unavailable.
    }
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand__mark">FT</div>
          <div>
            <strong>FoodTrans NQR</strong>
            <span>Plan productivo 2026</span>
          </div>
        </div>

        <nav className="nav" aria-label="Navegación principal">
          {routes.map((route) => (
            <button
              key={route.id}
              className={activeRoute === route.id ? 'nav__item nav__item--active' : 'nav__item'}
              type="button"
              onClick={() => onNavigate(route.id)}
            >
              <span>{route.icon}</span>
              {!isCompact ? route.label : null}
            </button>
          ))}
        </nav>

        <div className="sidebar__footer">
          <Avatar name={user.name} />
          <div>
            <strong>{user.name}</strong>
            <span>{roleLabel}</span>
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <div className="topbar">
          <div>
            <span>{user.companyName || 'FoodTrans NQR'}</span>
            <strong>{roleLabel}</strong>
          </div>
          <span className={`api-pill api-pill--${apiStatus}`}>
            API {apiStatus === 'connected' ? 'conectada' : apiStatus === 'checking' ? 'verificando' : 'sin conexión'}
          </span>
          <div className="topbar__actions">
            <Button
              variant="secondary"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-pressed={theme === 'dark'}
              aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
            >
              <span className="theme-toggle__icon" aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
              <span>{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
            </Button>
            {onReset ? <Button variant="secondary" onClick={onReset}>Reiniciar demo</Button> : null}
            <Button variant="secondary" onClick={onLogout}>Cerrar sesión</Button>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
