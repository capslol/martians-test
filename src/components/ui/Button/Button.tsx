import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

interface StyledButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  primary: css`
    background-color: #000000;
    color: #ffffff;
    border: 1px solid transparent;
    
    &:hover:not(:disabled) {
      background-color: #1f2937;
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
    }
  `,
  secondary: css`
    background-color: #6366f1;
    color: #ffffff;
    border: 1px solid transparent;
    
    &:hover:not(:disabled) {
      background-color: #4f46e5;
      transform: translateY(-1px);
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
    }
  `,
  outline: css`
    background-color: transparent;
    color: #1e293b;
    border: 1px solid #e2e8f0;
    
    &:hover:not(:disabled) {
      background-color: #f8fafc;
      border-color: #cbd5e1;
      transform: translateY(-1px);
    }
  `,
  ghost: css`
    background-color: transparent;
    color: #64748b;
    border: 1px solid transparent;
    
    &:hover:not(:disabled) {
      background-color: #f1f5f9;
      color: #1e293b;
    }
  `,
};

const sizeStyles = {
  sm: css`
    height: 2rem;
    padding: 0 0.75rem;
    font-size: 0.875rem;
  `,
  md: css`
    height: 2.5rem;
    padding: 0 1rem;
    font-size: 0.875rem;
  `,
  lg: css`
    height: 3rem;
    padding: 0 1.5rem;
    font-size: 1rem;
  `,
};

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  outline: none;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  ${({ variant }) => variantStyles[variant]}
  ${({ size }) => sizeStyles[size]}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  type = 'button',
  disabled = false,
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};