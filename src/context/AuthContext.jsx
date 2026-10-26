import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('artiva_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('artiva_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('artiva_user');
      }
    } catch (e) {
      console.warn('Failed to sync auth user to localStorage', e);
    }
  }, [user]);

  // Demo Login (accepts any valid email format + password)
  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error('Please enter a valid email address.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    // Simulate auth token / user profile
    const namePart = email.split('@')[0];
    const capitalizedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    const loggedUser = {
      id: 'usr_' + Date.now().toString(36),
      name: capitalizedName,
      email: email.toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(capitalizedName)}&backgroundColor=6c2bd9,ff6b9a`,
      role: 'Art Enthusiast',
      isDemo: true,
      token: 'demo_token_' + Math.random().toString(36).substring(2)
    };

    setUser(loggedUser);
    return loggedUser;
  };

  // Demo Registration
  const register = async (name, email, password, confirmPassword) => {
    if (!name || name.trim().length < 2) {
      throw new Error('Please provide your full name (at least 2 characters).');
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      throw new Error('Please enter a valid email address.');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    const newUser = {
      id: 'usr_' + Date.now().toString(36),
      name: name.trim(),
      email: email.toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name.trim())}&backgroundColor=6c2bd9,ff6b9a`,
      role: 'Art Collector',
      isDemo: true,
      token: 'demo_token_' + Math.random().toString(36).substring(2)
    };

    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
