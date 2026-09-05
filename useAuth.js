import { useEffect, useState } from 'react';
import { getSession, onAuthStateChange } from '../services/adminService';

export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getSession().then(({ data }) => {
      if (mounted) {
        setSession(data?.session || null);
        setLoading(false);
      }
    });

    const { data: listener } = onAuthStateChange((newSession) => {
      if (mounted) setSession(newSession);
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  return { session, isAuthenticated: Boolean(session), loading };
}
