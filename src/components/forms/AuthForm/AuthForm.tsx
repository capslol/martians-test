import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Button, Input, Card, Mascot, SpaceToggle, SpaceBackground } from '../../ui';

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface AuthFormProps {
  onLogin: (data: { email: string; password: string }) => void;
  onRegister: (data: { email: string; password: string; confirmPassword?: string }) => void;
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
  padding: 1rem;
  position: relative;
  overflow: hidden;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  color: #000000;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToggleSection = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

export const AuthForm: React.FC<AuthFormProps> = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AuthFormData>();

  const handleToggle = useCallback(() => {
    setIsLogin(!isLogin);
    setPassword('');
    setConfirmPassword('');
    setIsPasswordVisible(false);
    reset();
  }, [isLogin, reset]);

  const handleFormSubmit = useCallback((data: AuthFormData) => {
    if (isLogin) {
      onLogin(data);
    } else {
      onRegister(data);
    }
  }, [isLogin, onLogin, onRegister]);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleConfirmPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }, []);

  // Робот закрывает глаза если в любом из полей пароля что-то введено
  const hasPasswordInput = password.length > 0 || confirmPassword.length > 0;
  // Робот закрывает один глаз если пароль видимый
  const isPasswordVisibleState = isPasswordVisible;

  const title = isLogin ? 'Welcome Back' : 'Join Us';
  const buttonText = isLogin ? 'Sign In' : 'Create Account';

  return (
    <Container>
      <SpaceBackground />
      
      <FormContainer>
        <Card variant="glass">
          <Mascot 
            isVisible={true} 
            isPasswordFocused={hasPasswordInput} 
            isPasswordVisible={isPasswordVisibleState}
          />
          <Title>{title}</Title>
          
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormField>
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...register('email', { required: 'Email is required' })}
                error={errors.email?.message}
                required
              />
            </FormField>
            
            <FormField>
              <Input
                id="password"
                label="Password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  onChange: handlePasswordChange
                })}
                error={errors.password?.message}
                required
                onPasswordVisibilityChange={setIsPasswordVisible}
              />
            </FormField>

            {!isLogin && (
              <FormField>
                <Input
                  id="confirmPassword"
                  label="Confirm Password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match',
                    onChange: handleConfirmPasswordChange
                  })}
                  error={errors.confirmPassword?.message}
                  required
                  hidePasswordToggle={true}
                />
              </FormField>
            )}

            <Button type="submit" size="lg">
              {buttonText}
            </Button>
            
            <ToggleSection>
              <SpaceToggle isLogin={isLogin} onToggle={handleToggle} />
            </ToggleSection>
          </Form>
        </Card>
      </FormContainer>
    </Container>
  );
};