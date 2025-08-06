import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/forms';
import { loginUser, registerUser } from '../../services';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export const Auth: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (data: LoginData) => {
    const success = await loginUser(data.email, data.password);
    
    if (success) {
      navigate('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  const handleRegister = async (data: RegisterData) => {
    const success = await registerUser(data.email, data.password);
    
    if (success) {
      alert('Registration successful! Please sign in.');
    } else {
      alert('User already exists');
    }
  };

  return (
    <AuthForm 
      onLogin={handleLogin}
      onRegister={handleRegister}
    />
  );
}; 