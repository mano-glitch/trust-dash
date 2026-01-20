import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@test.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@test.com',
      name: 'Admin User',
      role: 'admin',
    },
  },
  'user@test.com': {
    password: 'user123',
    user: {
      id: '2',
      email: 'user@test.com',
      name: 'John Doe',
      role: 'user',
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = sessionStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const normalizedEmail = email.toLowerCase().trim();
    const mockUser = MOCK_USERS[normalizedEmail];
    
    if (!mockUser) {
      setIsLoading(false);
      return { success: false, error: 'Account not found. Please check your email.' };
    }
    
    if (mockUser.password !== password) {
      setIsLoading(false);
      return { success: false, error: 'Invalid password. Please try again.' };
    }
    
    setUser(mockUser.user);
    sessionStorage.setItem('auth_user', JSON.stringify(mockUser.user));
    setIsLoading(false);
    
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('auth_user');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
