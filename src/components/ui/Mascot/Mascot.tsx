import React, { memo, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 90%, 100% {
    transform: scaleY(1);
  }
  95% {
    transform: scaleY(0.1);
  }
`;



const fly = keyframes`
  0%, 100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-8px) translateX(3px) rotate(2deg);
  }
  50% {
    transform: translateY(-5px) translateX(-2px) rotate(-1deg);
  }
  75% {
    transform: translateY(-10px) translateX(1px) rotate(1deg);
  }
`;



const sparkle = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const starTwinkle = keyframes`
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const coverLeftEye = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  100% {
    transform: translateY(-14px) rotate(29deg) translateX(12px);
  }
`;

const coverRightEye = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  100% {
    transform: translateY(-14px) rotate(-29deg) translateX(-12px);
  }
`;

const coverLeftEyeOnly = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  100% {
    transform: translateY(-14px) rotate(29deg) translateX(12px);
  }
`;

const returnToNormal = keyframes`
  0% {
    transform: translateY(-14px) rotate(29deg) translateX(12px);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
`;

const returnToNormalRight = keyframes`
  0% {
    transform: translateY(-14px) rotate(-29deg) translateX(-12px);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
`;

// Warning sign animation
const warningPulse = keyframes`
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
`;

// Antenna warning light animation
const antennaBlink = keyframes`
  0%, 100% {
    fill: #ff6b9d;
  }
  50% {
    fill: #ffd700;
  }
`;

// Success checkmark animation
const successPulse = keyframes`
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
`;

// Antenna success light animation
const antennaSuccessBlink = keyframes`
  0%, 100% {
    fill: #ff6b9d;
  }
  50% {
    fill: #00ff00;
  }
`;

// Click animation for mascot
const clickBounce = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.1) rotate(-2deg);
  }
  50% {
    transform: scale(0.95) rotate(2deg);
  }
  75% {
    transform: scale(1.05) rotate(-1deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
`;

const clickSparkle = keyframes`
  0% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: scale(0) rotate(360deg);
  }
`;

const MascotContainer = styled.div`
  position: absolute;
  top: -160px;
  right: 30px;
  z-index: 10;
  animation: ${fly} 4s ease-in-out infinite;
`;

const StyledSVG = styled.svg`
  width: 140px;
  height: 140px;
  filter: drop-shadow(0 8px 16px rgba(255, 255, 255, 0.4));
`;

const Eyes = styled.g`
  animation: ${blink} 3s ease-in-out infinite;
  transform-origin: center;
`;

const Sparkle0 = styled.circle`
  animation: ${sparkle} 1.5s ease-in-out infinite;
  animation-delay: 0s;
`;

const Sparkle1 = styled.circle`
  animation: ${sparkle} 1.5s ease-in-out infinite;
  animation-delay: 0.3s;
`;

const Sparkle2 = styled.circle`
  animation: ${sparkle} 1.5s ease-in-out infinite;
  animation-delay: 0.6s;
`;

const Sparkle3 = styled.circle`
  animation: ${sparkle} 1.5s ease-in-out infinite;
  animation-delay: 0.9s;
`;

const SparkleDelay = styled.circle`
  animation: ${sparkle} 1.5s ease-in-out infinite;
  animation-delay: 0.5s;
`;

const Star0 = styled.circle`
  animation: ${starTwinkle} 2s ease-in-out infinite;
  animation-delay: 0s;
`;

const Star1 = styled.circle`
  animation: ${starTwinkle} 2s ease-in-out infinite;
  animation-delay: 0.5s;
`;

const Star2 = styled.circle`
  animation: ${starTwinkle} 2s ease-in-out infinite;
  animation-delay: 1s;
`;

const Star3 = styled.circle`
  animation: ${starTwinkle} 2s ease-in-out infinite;
  animation-delay: 1.5s;
`;

const Star4 = styled.circle`
  animation: ${starTwinkle} 2s ease-in-out infinite;
  animation-delay: 0.8s;
`;

const Star5 = styled.circle`
  animation: ${starTwinkle} 2s ease-in-out infinite;
  animation-delay: 1.2s;
`;



const LeftHand = styled.rect<{ $isCovering: boolean; $isPasswordVisible: boolean }>`
  animation: ${props => {
    if (props.$isPasswordVisible) return coverLeftEyeOnly;
    if (props.$isCovering) return coverLeftEye;
    return returnToNormal;
  }} 0.4s ease-in-out forwards;
  transform-origin: center;
`;

const RightHand = styled.rect<{ $isCovering: boolean; $isPasswordVisible: boolean }>`
  animation: ${props => {
    if (props.$isPasswordVisible) return 'none'; // right hand doesn't move when password is visible
    if (props.$isCovering) return coverRightEye;
    return returnToNormalRight;
  }} 0.4s ease-in-out forwards;
  transform-origin: center;
`;

const WarningSign = styled.g<{ $showWarning: boolean }>`
  animation: ${props => props.$showWarning ? warningPulse : 'none'} 1.5s ease-in-out infinite;
  transform-origin: center;
`;

const BlinkingAntenna = styled.circle<{ $showWarning: boolean; $showSuccess: boolean }>`
  animation: ${props => {
    if (props.$showWarning) return antennaBlink;
    if (props.$showSuccess) return antennaSuccessBlink;
    return 'none';
  }} 1s ease-in-out infinite;
`;

const SuccessSign = styled.g<{ $showSuccess: boolean }>`
  animation: ${props => props.$showSuccess ? successPulse : 'none'} 1.5s ease-in-out infinite;
  transform-origin: center;
`;

const ClickableMascot = styled.div<{ $isClicked: boolean }>`
  cursor: pointer;
  animation: ${props => props.$isClicked ? clickBounce : 'none'} 0.6s ease-in-out;
  transform-origin: center;
  user-select: none;
  
  &:hover {
    filter: brightness(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ClickSparkle = styled.circle<{ $isClicked: boolean }>`
  animation: ${props => props.$isClicked ? clickSparkle : 'none'} 0.8s ease-in-out;
  transform-origin: center;
`;

interface MascotProps {
  isVisible?: boolean;
  isPasswordFocused?: boolean; // now means "is there input in password field"
  isPasswordVisible?: boolean; // means "is password visible"
  showWarning?: boolean; // means "show warning sign for wrong password"
  showSuccess?: boolean; // means "show success checkmark for successful registration"
  onMascotClick?: () => void; // callback for mascot click
}

export const Mascot: React.FC<MascotProps> = memo(({ isVisible = true, isPasswordFocused = false, isPasswordVisible = false, showWarning = false, showSuccess = false, onMascotClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = useCallback(() => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600); // Reset after animation
    onMascotClick?.();
  }, [onMascotClick]);

  if (!isVisible) return null;

  return (
    <MascotContainer>
      <ClickableMascot $isClicked={isClicked} onClick={handleClick}>
        <StyledSVG viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        {/* Space stars */}
        <Star0 cx="15" cy="15" r="0.8" fill="#ffffff" />
        <Star1 cx="65" cy="20" r="0.6" fill="#ffffff" />
        <Star2 cx="70" cy="60" r="0.7" fill="#ffffff" />
        <Star3 cx="10" cy="70" r="0.5" fill="#ffffff" />
        <Star4 cx="45" cy="10" r="0.9" fill="#ffffff" />
        <Star5 cx="75" cy="40" r="0.4" fill="#ffffff" />
        
        {/* Маскот - космический робот */}
        <g>
          {/* Тело с градиентом */}
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f0f8ff" />
            </linearGradient>
            <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e6f3ff" />
            </linearGradient>
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>

          </defs>
          
          {/* Свечение вокруг маскота */}
          <circle cx="40" cy="40" r="35" fill="url(#glowGradient)" />
          
          {/* Тело */}
          <rect x="30" y="45" width="20" height="25" rx="4" fill="url(#bodyGradient)" stroke="#000000" strokeWidth="0.8" />
          
          {/* Голова */}
          <rect x="27" y="30" width="26" height="20" rx="6" fill="url(#headGradient)" stroke="#000000" strokeWidth="0.8" />
          
          {/* Глаза с морганием */}
          <Eyes>
            <circle cx="33" cy="38" r="3" fill="#000000" />
            <circle cx="47" cy="38" r="3" fill="#000000" />
            <circle cx="33" cy="37" r="1.2" fill="#ffffff" />
            <circle cx="47" cy="37" r="1.2" fill="#ffffff" />
            <circle cx="33" cy="36.5" r="0.4" fill="#000000" />
            <circle cx="47" cy="36.5" r="0.4" fill="#000000" />
          </Eyes>
          
          {/* Предупреждающий знак над головой */}
          {showWarning && (
            <WarningSign $showWarning={showWarning}>
              {/* Жёлтый треугольник */}
              <polygon 
                points="40,2 33,16 47,16" 
                fill="#ffd700" 
                stroke="#ff8c00" 
                strokeWidth="1"
              />
              {/* Восклицательный знак */}
              <circle cx="40" cy="10" r="1.5" fill="#ff8c00" />
              <rect x="39.2" y="12" width="1.6" height="3" fill="#ff8c00" />
            </WarningSign>
          )}

          {/* Зелёная галочка при успешной регистрации */}
          {showSuccess && (
            <SuccessSign $showSuccess={showSuccess}>
              {/* Зелёный круг */}
              <circle 
                cx="40" 
                cy="9" 
                r="7" 
                fill="#00ff88" 
                stroke="#00cc66" 
                strokeWidth="1"
              />
              {/* Галочка */}
              <path 
                d="M 36 9 L 39 12 L 44 7" 
                stroke="#ffffff" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </SuccessSign>
          )}
          
          {/* Розовые щечки */}
          <circle cx="29" cy="41" r="2" fill="#ffb3d9" opacity="0.8" />
          <circle cx="51" cy="41" r="2" fill="#ffb3d9" opacity="0.8" />
          
          {/* Милая улыбка */}
          <path 
            d="M 33 43 Q 40 47 47 43" 
            stroke="#000000" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
          />
          
          {/* Антенна с мигающим светом */}
          <line x1="40" y1="30" x2="40" y2="20" stroke="#ffffff" strokeWidth="2" />
          <BlinkingAntenna cx="40" cy="19" r="2" fill="#ff6b9d" $showWarning={showWarning} $showSuccess={showSuccess} />
          <Sparkle0 cx="40" cy="19" r="0.8" fill="#ffffff" />
          <SparkleDelay cx="40" cy="19" r="0.5" fill="#ffb3d9" />
          
          {/* Руки - теперь с анимацией закрытия глаз */}
          <LeftHand 
            x="22" 
            y="50" 
            width="8" 
            height="16" 
            rx="4" 
            fill="url(#bodyGradient)" 
            stroke="#000000" 
            strokeWidth="0.8"
            $isCovering={isPasswordFocused}
            $isPasswordVisible={isPasswordVisible}
          />
          <RightHand 
            x="50" 
            y="50" 
            width="8" 
            height="16" 
            rx="4" 
            fill="url(#bodyGradient)" 
            stroke="#000000" 
            strokeWidth="0.8"
            $isCovering={isPasswordFocused}
            $isPasswordVisible={isPasswordVisible}
          />
          
          {/* Ноги */}
          <rect x="32" y="70" width="5" height="10" rx="2.5" fill="url(#bodyGradient)" stroke="#000000" strokeWidth="0.8" />
          <rect x="43" y="70" width="5" height="10" rx="2.5" fill="url(#bodyGradient)" stroke="#000000" strokeWidth="0.8" />
          
          {/* Детали на теле */}
          <rect x="33" y="52" width="14" height="2.5" rx="1.25" fill="#4a90e2" opacity="0.7" />
          <rect x="33" y="56" width="10" height="2.5" rx="1.25" fill="#4a90e2" opacity="0.7" />
          <rect x="33" y="60" width="8" height="2.5" rx="1.25" fill="#4a90e2" opacity="0.7" />
          
          {/* Милые сердечки */}
          <path d="M 25 35 Q 25 32 28 32 Q 31 32 31 35 Q 31 38 28 38 Q 25 38 25 35" fill="#ff6b9d" opacity="0.8" />
          <path d="M 49 35 Q 49 32 52 32 Q 55 32 55 35 Q 55 38 52 38 Q 49 38 49 35" fill="#ff6b9d" opacity="0.8" />
          
          {/* Блестки вокруг */}
          <Sparkle0 cx="15" cy="25" r="1.2" fill="#ffd700" />
          <Sparkle1 cx="65" cy="30" r="1" fill="#ffd700" />
          <Sparkle2 cx="20" cy="65" r="1.1" fill="#ffd700" />
          <Sparkle3 cx="60" cy="70" r="0.8" fill="#ffd700" />
          
          {/* Космические частицы */}
          <circle cx="12" cy="45" r="0.6" fill="#87ceeb" opacity="0.7" />
          <circle cx="68" cy="55" r="0.4" fill="#87ceeb" opacity="0.7" />
          <circle cx="25" cy="15" r="0.5" fill="#87ceeb" opacity="0.7" />
          <circle cx="55" cy="75" r="0.7" fill="#87ceeb" opacity="0.7" />
          
          {/* Искры при клике */}
          {isClicked && (
            <>
              <ClickSparkle cx="40" cy="20" r="3" fill="#ffd700" $isClicked={isClicked} />
              <ClickSparkle cx="35" cy="25" r="2" fill="#ff6b9d" $isClicked={isClicked} />
              <ClickSparkle cx="45" cy="25" r="2.5" fill="#87ceeb" $isClicked={isClicked} />
              <ClickSparkle cx="30" cy="30" r="2" fill="#ffd700" $isClicked={isClicked} />
              <ClickSparkle cx="50" cy="30" r="2" fill="#ff6b9d" $isClicked={isClicked} />
            </>
          )}
        </g>
        </StyledSVG>
      </ClickableMascot>
    </MascotContainer>
  );
}); 