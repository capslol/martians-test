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

// Star flight animation towards the user
const starflight = keyframes`
  0% {
    transform: translateZ(0) scale(1);
    opacity: 0.3;
  }
  100% {
    transform: translateZ(-1000px) scale(3);
    opacity: 0;
  }
`;

// Bright star flight animation with shaking effect
const starflightBright = keyframes`
  0% {
    transform: translateZ(0) scale(1) translateX(0) translateY(0);
    opacity: 1;
    filter: blur(0px);
  }
  50% {
    transform: translateZ(-500px) scale(2) translateX(5px) translateY(-3px);
    opacity: 0.8;
    filter: blur(1px);
  }
  100% {
    transform: translateZ(-1000px) scale(4) translateX(-2px) translateY(2px);
    opacity: 0;
    filter: blur(2px);
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
  $isFlying?: boolean;
}>((props) => ({
  style: {
    width: `${props.$size}px`,
    height: `${props.$size}px`,
    left: `${props.$left}%`,
    top: `${props.$top}%`,
    animationDelay: `${props.$delay}s`,
    animationDuration: props.$isFlying 
      ? `${1 + Math.random() * 2}s` 
      : `${2 + Math.random() * 3}s`,
  }
}))`
  position: absolute;
  background: #ffffff;
  border-radius: 50%;
  animation: ${props => {
    if (props.$isFlying) {
      return props.$isBright ? starflightBright : starflight;
    }
    return props.$isBright ? twinkle : slowTwinkle;
  }} ${props => props.$isFlying ? 'linear' : 'ease-in-out'} infinite;
  animation-fill-mode: forwards;
  box-shadow: ${props => props.$isBright 
    ? '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4)' 
    : '0 0 2px rgba(255, 255, 255, 0.3)'
  };
  perspective: 1000px;
  transform-style: preserve-3d;
`;

interface SpaceBackgroundProps {
  isFlying?: boolean;
}

export const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ isFlying = false }) => {
  // Generate stars with different sizes and brightness
  const stars = React.useMemo(() => 
    Array.from({ length: isFlying ? 150 : 100 }, (_, i) => ({
      id: i,
      size: isFlying ? Math.random() * 4 + 1 : Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: isFlying ? Math.random() * 2 : Math.random() * 5,
      isBright: Math.random() > (isFlying ? 0.5 : 0.7) // More bright stars in flight mode
    })), [isFlying]
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
          $isFlying={isFlying}
        />
      ))}
    </SpaceContainer>
  );
}; 