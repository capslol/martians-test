import React from 'react';
import styled from 'styled-components';

interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  id?: string;
}

interface StyledInputProps {
  hasError: boolean;
}

interface LabelProps {
  required: boolean;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  font-size: 0.875rem;
  line-height: 1.5;
  color: #1e293b;
  background-color: #ffffff;
  border: 1px solid ${({ hasError }) => hasError ? '#ef4444' : '#e2e8f0'};
  border-radius: 0.5rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  &:focus {
    border-color: ${({ hasError }) => hasError ? '#ef4444' : '#6366f1'};
    box-shadow: 0 0 0 3px ${({ hasError }) => 
      hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)'};
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  id,
}) => {
  return (
    <InputContainer>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        hasError={!!error}
        id={id}
        required={required}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};