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
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
  
      const response = await fetch(import.meta.env.VITE_API_LOGOUT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}` // Enviar el token en el header
        },
        body: JSON.stringify({ email: userId })
      });
  
      if (!response.ok) {
        throw new Error(`Logout failed: ${response.statusText}`);
      }
  
      const { message } = await response.json();
      console.log(message || "Logout successful");
  
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      localStorage.clear();
      setIsAuthenticated(false);
    }
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // Exportar useAuth