import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { authApi } from '../api/client';

interface User {
  email: string;
  displayName: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (stored && storedToken) {
      try {
        setUser(JSON.parse(stored));
        setToken(storedToken);
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    const userData = { email: res.email, displayName: res.displayName };
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(res.token);
    setUser(userData);
  }, []);

  const register = useCallback(
    async (email: string, password: string, displayName: string) => {
      const res = await authApi.register(email, password, displayName);
      const userData = { email: res.email, displayName: res.displayName };
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(res.token);
      setUser(userData);
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
