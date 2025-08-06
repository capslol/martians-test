import React from 'react';
import styled, { keyframes } from 'styled-components';

const twinkle = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const slowTwinkle = keyframes`
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.8;
  }
`;

const SpaceContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`;

const Star = styled.div.attrs<{ 
  $size: number; 
  $left: number; 
  $top: number;
  $delay: number;
  $isBright?: boolean;
}>((props) => ({
  style: {
    width: `${props.$size}px`,
    height: `${props.$size}px`,
    left: `${props.$left}%`,
    top: `${props.$top}%`,
    animationDelay: `${props.$delay}s`,
    animationDuration: `${2 + Math.random() * 3}s`,
  }
}))`
  position: absolute;
  background: #ffffff;
  border-radius: 50%;
  animation: ${props => props.$isBright ? twinkle : slowTwinkle} ease-in-out infinite;
  box-shadow: ${props => props.$isBright 
    ? '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4)' 
    : '0 0 2px rgba(255, 255, 255, 0.3)'
  };
`;

export const SpaceBackground: React.FC = () => {
  // Генерируем звезды разных размеров и яркости
  const stars = React.useMemo(() => 
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      isBright: Math.random() > 0.7 // 30% звезд будут яркими
    })), []
  );

  return (
    <SpaceContainer>
      {stars.map(star => (
        <Star
          key={star.id}
          $size={star.size}
          $left={star.left}
          $top={star.top}
          $delay={star.delay}
          $isBright={star.isBright}
        />
      ))}
    </SpaceContainer>
  );
}; 