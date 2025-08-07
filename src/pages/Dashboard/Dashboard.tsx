import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, SpaceBackground } from '../../components/ui';
import { useAuth } from '../../hooks';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  text-align: center;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #e2e8f0;
  margin-bottom: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

const UserInfo = styled.div`
  margin-bottom: 2rem;
  color: #a0aec0;
  font-size: 1rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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



export const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Показываем основной контент через 3 секунды
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      console.log('Sign out successful');
    } else {
      console.error('Sign out error:', result.error);
    }
  };

  if (!showContent) {
    // Показываем анимацию полета
    return (
      <Container>
        <SpaceBackground isFlying={true} />
        <FlightMessage $isVisible={true}>
          🚀 Welcome to Space! 🚀
        </FlightMessage>
      </Container>
    );
  }

  // Показываем основной контент
  return (
    <Container>
      <SpaceBackground isFlying={false} />
      <Content>
        <Title>Mission Control</Title>
        <Subtitle>🚀 You've successfully entered the space station! 🌌</Subtitle>
        {user && (
          <UserInfo>
            Astronaut: {user.email}
          </UserInfo>
        )}
        <Button onClick={handleLogout} variant="outline">
          Return to Earth
        </Button>
      </Content>
    </Container>
  );
};