import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react';
import {
  login as apiLogin,
  getAccountInfo
} from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expire');
    setUser(null);
    setAccountInfo(null);
  }, []);

  const fetchAccountInfo = useCallback(async (token) => {
    setLoading(true);
    try {
      const info = await getAccountInfo(token);
      setAccountInfo(info.eventFiltersInfo);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch account info', error);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const expire = localStorage.getItem('expire');
    const savedTariff = localStorage.getItem('tariff');

    if (token && expire) {
      const now = new Date();
      const expireDate = new Date(expire);

      if (now > expireDate) {
        logout();
      } else {
        setUser({
          token,
          tariff: savedTariff || 'beginner'
        });
        fetchAccountInfo(token);
      }
    }
  }, [fetchAccountInfo, logout]);

  const login = async (credentials) => {
    try {
      const { accessToken, expire } = await apiLogin(credentials);

      const tariffs = ['beginner', 'pro', 'business'];
      const randomTariff = tariffs[Math.floor(Math.random() * tariffs.length)];

      setUser({
        token: accessToken,
        tariff: randomTariff
      });

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('expire', expire);
      localStorage.setItem('tariff', randomTariff);

      await fetchAccountInfo(accessToken);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      accountInfo,
      loading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
} 