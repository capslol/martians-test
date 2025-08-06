import React, { useState } from 'react';
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
  const [isFlying, setIsFlying] = useState(false);

  const handleLogin = async (data: LoginData): Promise<boolean> => {
    const success = await loginUser(data.email, data.password);
    
    if (success) {
      // Start space flight animation instead of redirect
      console.log('Login successful! Starting space flight animation...');
      setIsFlying(true);
      
      // After some time redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 5000); // 5 seconds of flight animation
    } else {
      // No alert, just return false for sad animation
    }
    
    return success;
  };

  const handleRegister = async (data: RegisterData): Promise<boolean> => {
    const success = await registerUser(data.email, data.password);
    
    if (success) {
      // Registration successful, no alert needed
    } else {
      // User already exists, no alert needed
    }
    
    return success;
  };

  return (
    <AuthForm 
      onLogin={handleLogin}
      onRegister={handleRegister}
      isFlying={isFlying}
    />
  );
}; 