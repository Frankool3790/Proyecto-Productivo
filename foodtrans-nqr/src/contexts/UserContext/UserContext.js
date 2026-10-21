import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { foodtransApi } from '../../services/api/index.js';

export const UserContext = createContext(null);
const STORAGE_KEY = 'foodtrans-nqr-session';

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  } catch {
    return null;
  }
}

export function UserProvider({ children }) {
  const [session, setSession] = useState(readSession);
  const [loading, setLoading] = useState(Boolean(readSession()?.token));

  const saveSession = useCallback((nextSession) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
  }, []);

  useEffect(() => {
    if (!session?.token) {
      setLoading(false);
      return undefined;
    }
    let active = true;
    foodtransApi.getMe(session.token)
      .then(({ user }) => {
        if (active) saveSession({ ...session, user });
      })
      .catch(() => {
        if (!active) return;
        localStorage.removeItem(STORAGE_KEY);
        setSession(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const login = useCallback(async (credentials) => {
    const result = await foodtransApi.login(credentials);
    saveSession(result);
    return result.user;
  }, [saveSession]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo(() => ({
    user: session?.user || null,
    token: session?.token || '',
    loading,
    login,
    logout,
  }), [session, loading, login, logout]);

  return createElement(UserContext.Provider, { value }, children);
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser debe usarse dentro de UserProvider');
  return context;
}
