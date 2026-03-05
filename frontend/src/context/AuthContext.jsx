import { createContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const signup = useCallback(async (email, password) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateProfile = useCallback(async (updates) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.updateUser({
        data: updates,
      });
      if (error) throw error;
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      setError(null);
      // First verify current password by trying to re-auth
      const { error: reAuthError } = await supabase.auth.signInWithPassword({
        email: user?.email,
        password: currentPassword,
      });
      if (reAuthError) {
        throw new Error('Current password is incorrect');
      }

      // Change password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [user?.email]);

  const value = {
    user,
    session,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
