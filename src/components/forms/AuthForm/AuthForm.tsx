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
  onLogin: (data: { email: string; password: string }) => Promise<boolean>;
  onRegister: (data: { email: string; password: string; confirmPassword?: string }) => Promise<boolean>;
  isFlying?: boolean;
  errorMessage?: string;
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
  padding: 1rem;
  position: relative;
  overflow: visible;
`;

const FormContainer = styled.div<{ $isFlying?: boolean }>`
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 10;
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  opacity: ${props => props.$isFlying ? 0 : 1};
  transform: ${props => props.$isFlying ? 'scale(0.8) translateY(20px)' : 'scale(1) translateY(0)'};
  pointer-events: ${props => props.$isFlying ? 'none' : 'auto'};
  overflow: visible;
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

const FlightMessage = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  z-index: 20;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  @keyframes pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
  
  ${props => props.$isVisible && `
    animation: pulse 2s ease-in-out infinite;
  `}
`;

export const AuthForm: React.FC<AuthFormProps> = ({ onLogin, onRegister, isFlying = false, errorMessage = '' }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AuthFormData>();

  const handleMascotClick = useCallback(() => {
    // Fun interaction when mascot is clicked
    console.log('🤖 Mascot was clicked! Hello there!');
  }, []);

  const handleToggle = useCallback(() => {
    setIsLogin(!isLogin);
    setPassword('');
    setConfirmPassword('');
    setIsPasswordVisible(false);
    setShowWarning(false);
    setShowSuccess(false);
    reset();
  }, [isLogin, reset]);

  const handleFormSubmit = useCallback((data: AuthFormData) => {
    if (isLogin) {
      // Show warning animation when login fails
      const handleLoginWithWarning = async () => {
        const success = await onLogin(data);
        if (!success) {
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 3000); // Reset after 3 seconds
        }
      };
      handleLoginWithWarning();
    } else {
      // Show success animation when registration succeeds and switch to login
      const handleRegisterWithSuccess = async () => {
        const success = await onRegister(data);
        if (success) {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            setIsLogin(true); // Switch to login form
            reset(); // Clear form
            setPassword('');
            setConfirmPassword('');
          }, 2000); // Show success for 2 seconds
        }
      };
      handleRegisterWithSuccess();
    }
  }, [isLogin, onLogin, onRegister, reset]);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleConfirmPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }, []);

  // Robot closes eyes if any password field has input
  const hasPasswordInput = password.length > 0 || confirmPassword.length > 0;
  // Robot closes one eye if password is visible
  const isPasswordVisibleState = isPasswordVisible;

  const title = isLogin ? 'Welcome Back' : 'Join Us';
  const buttonText = isLogin ? 'Sign In' : 'Create Account';

  return (
    <Container>
      <SpaceBackground isFlying={isFlying} />
      
      {isFlying && (
        <FlightMessage $isVisible={isFlying}>
          🚀 Welcome to Space! 🚀
        </FlightMessage>
      )}
      
      <FormContainer $isFlying={isFlying}>
        <Card variant="glass">
          <Mascot 
            isVisible={true} 
            isPasswordFocused={hasPasswordInput} 
            isPasswordVisible={isPasswordVisibleState}
            showWarning={showWarning}
            showSuccess={showSuccess}
            onMascotClick={handleMascotClick}
            errorMessage={errorMessage}
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