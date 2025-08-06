import React, { memo } from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
`;

const ToggleWrapper = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  padding: 2px;
  display: flex;
  width: 140px;
  height: 32px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ToggleOption = styled.button<{ $isActive: boolean }>`
  flex: 1;
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  color: ${props => props.$isActive ? '#000000' : 'rgba(255, 255, 255, 0.7)'};
  border: none;
  border-radius: 23px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
  
  &:hover {
    background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.1)'};
    color: ${props => props.$isActive ? '#000000' : '#ffffff'};
  }
`;

interface SpaceToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}

export const SpaceToggle: React.FC<SpaceToggleProps> = memo(({ isLogin, onToggle }) => {
  return (
    <ToggleContainer>
      <ToggleWrapper>
        <ToggleOption 
          $isActive={isLogin}
          onClick={() => !isLogin && onToggle()}
        >
          Sign In
        </ToggleOption>
        <ToggleOption 
          $isActive={!isLogin}
          onClick={() => isLogin && onToggle()}
        >
          Sign Up
        </ToggleOption>
      </ToggleWrapper>
    </ToggleContainer>
  );
}); 