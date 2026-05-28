import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { loginUser, registerUser, type AuthResponse } from '../api/auth';

interface User {
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'USER' | 'ADMIN') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token'),
  );

  const persist = useCallback((res: AuthResponse) => {
    localStorage.setItem('token', res.token);
    localStorage.setItem(
      'user',
      JSON.stringify({ email: res.email, name: res.name, role: res.role }),
    );
    setToken(res.token);
    setUser({ email: res.email, name: res.name, role: res.role });
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await loginUser({ email, password });
      persist(res);
    },
    [persist],
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      role: 'USER' | 'ADMIN',
    ) => {
      const res = await registerUser({ name, email, password, role });
      persist(res);
    },
    [persist],
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
