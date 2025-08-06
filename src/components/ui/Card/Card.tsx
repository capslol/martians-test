import React from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered' | 'glass';
  hover?: boolean;
}

interface StyledCardProps {
  variant: 'default' | 'elevated' | 'bordered' | 'glass';
  hover: boolean;
}

const variantStyles = {
  default: css`
    background-color: #ffffff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid #f1f5f9;
  `,
  elevated: css`
    background-color: #ffffff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border: 1px solid #f1f5f9;
  `,
  bordered: css`
    background-color: #ffffff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border: 2px solid #e2e8f0;
  `,
  glass: css`
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  `,
};

const StyledCard = styled.div<StyledCardProps>`
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${({ variant }) => variantStyles[variant]}
  
  ${({ hover }) => hover && css`
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  `}
`;

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hover = false,
}) => {
  return (
    <StyledCard variant={variant} hover={hover}>
      {children}
    </StyledCard>
  );
};