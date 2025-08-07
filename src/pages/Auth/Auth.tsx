import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/forms';
import { useAuth } from '../../hooks';

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
  const [isFlying, setIsFlying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { signIn, signUp } = useAuth();

  const handleLogin = async (data: LoginData): Promise<boolean> => {
    const result = await signIn(data.email, data.password);
    
    if (result.success) {
      // Launch space flight animation
      console.log('Login successful! Launching space flight animation...');
      setIsFlying(true);
      
      // После анимации переход на дашборд
      setTimeout(() => {
        navigate('/dashboard');
      }, 5000); // 5 секунд анимации полета
    } else {
      // Login error, show sad animation
      console.error('Login error:', result.error);
      setErrorMessage(result.error || 'Login failed');
      // Clear error after 3 seconds
      setTimeout(() => setErrorMessage(''), 3000);
    }
    
    return result.success;
  };

  const handleRegister = async (data: RegisterData): Promise<boolean> => {
    const result = await signUp(data.email, data.password);
    
    if (result.success) {
      // Registration successful
      console.log('Registration successful!');
    } else {
      // Registration error
      console.error('Registration error:', result.error);
      setErrorMessage(result.error || 'Registration failed');
      // Clear error after 3 seconds
      setTimeout(() => setErrorMessage(''), 3000);
    }
    
    return result.success;
  };

  return (
    <AuthForm 
      onLogin={handleLogin}
      onRegister={handleRegister}
      isFlying={isFlying}
      errorMessage={errorMessage}
    />
  );
}; 