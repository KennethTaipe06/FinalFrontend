import React, { createContext, useContext, useState, useEffect } from 'react'; // Agregar useContext

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(import.meta.env.VITE_API_LOGOUT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ email: userId, token }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message); // "bye bye"
        localStorage.clear();
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(false);
        localStorage.clear();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // Exportar useAuth
