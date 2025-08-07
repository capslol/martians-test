import React, { useState } from 'react';
import styled from 'styled-components';

interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onPasswordVisibilityChange?: (isVisible: boolean) => void;
  error?: string;
  required?: boolean;
  id?: string;
  name?: string;
  hidePasswordToggle?: boolean;
}

interface StyledInputProps {
  $hasError: boolean;
  $hasPasswordToggle?: boolean;
}

interface LabelProps {
  required: boolean;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Label = styled.label<LabelProps>`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  ${({ required }) => required && `
    &::after {
      content: '*';
      color: #ef4444;
      margin-left: 0.25rem;
    }
  `}
`;

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: ${({ $hasPasswordToggle }) => $hasPasswordToggle ? '3rem' : '1rem'};
  font-size: 0.875rem;
  line-height: 1.5;
  color: #1e293b;
  background-color: #ffffff;
  border: 1px solid ${({ $hasError }) => $hasError ? '#ef4444' : '#e2e8f0'};
  border-radius: 0.5rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  &:focus {
    border-color: ${({ $hasError }) => $hasError ? '#ef4444' : '#000000'};
    box-shadow: 0 0 0 3px ${({ $hasError }) => 
      $hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: #64748b;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #1e293b;
  }
  
  &:focus {
    outline: none;
    color: #000000;
  }
`;

const EyeIcon = styled.svg<{ $isVisible: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0.6};
  transition: opacity 0.2s ease;
`;

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  onPasswordVisibilityChange,
  error,
  required = false,
  id,
  name,
  hidePasswordToggle = false,
  ...rest
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password' || (type === 'text' && onPasswordVisibilityChange);
  const inputType = isPasswordField && showPassword ? 'text' : (type === 'password' ? 'password' : type);

  const handlePasswordToggle = () => {
    const newVisibility = !showPassword;
    setShowPassword(newVisibility);
    if (onPasswordVisibilityChange) {
      onPasswordVisibilityChange(newVisibility);
    }
  };

  return (
    <InputContainer>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <InputWrapper>
        <StyledInput
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          $hasError={!!error}
          $hasPasswordToggle={isPasswordField && !hidePasswordToggle}
          id={id}
          name={name}
          required={required}
          {...rest}
        />
        {isPasswordField && !hidePasswordToggle && (
          <PasswordToggle
            type="button"
            onClick={handlePasswordToggle}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <EyeIcon $isVisible={showPassword} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {showPassword ? (
                // Crossed eye icon for hidden password
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </>
              ) : (
                // Open eye icon for visible password
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </EyeIcon>
          </PasswordToggle>
        )}
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
});

Input.displayName = 'Input';