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
  const { signIn, signUp } = useAuth();

  const handleLogin = async (data: LoginData): Promise<boolean> => {
    const result = await signIn(data.email, data.password);
    
    if (result.success) {
      // Запуск анимации полета в космос
      console.log('Вход выполнен успешно! Запуск анимации полета в космос...');
      setIsFlying(true);
      
      // После анимации переход на дашборд
      setTimeout(() => {
        navigate('/dashboard');
      }, 5000); // 5 секунд анимации полета
    } else {
      // Ошибка входа, показываем грустную анимацию
      console.error('Ошибка входа:', result.error);
    }
    
    return result.success;
  };

  const handleRegister = async (data: RegisterData): Promise<boolean> => {
    const result = await signUp(data.email, data.password);
    
    if (result.success) {
      // Регистрация успешна
      console.log('Регистрация прошла успешно!');
    } else {
      // Ошибка регистрации
      console.error('Ошибка регистрации:', result.error);
    }
    
    return result.success;
  };

  return (
    <AuthForm 
      onLogin={handleLogin}
      onRegister={handleRegister}
      isFlying={isFlying}
    />
  );
}; 