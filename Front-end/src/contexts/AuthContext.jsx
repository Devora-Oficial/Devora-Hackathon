// client/src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Verifica se há um token/usuário salvo no armazenamento local
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        // Aqui você faria uma chamada para o backend para verificar se o token é válido
      } catch (e) {
        console.error("Erro ao parsear dados do usuário:", e);
        localStorage.clear();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha na autenticação.');
      }

      // 2. Login bem-sucedido: Salva o token e o usuário no armazenamento local
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      
      // Redireciona com base no papel do usuário
      const redirectPath = data.user.role === 'platform_admin' ? '/admin' : '/company';
      navigate(redirectPath);

    } catch (error) {
      console.error('Erro de Login:', error.message);
      throw error; // Propaga o erro para o LoginPage exibir a mensagem
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);