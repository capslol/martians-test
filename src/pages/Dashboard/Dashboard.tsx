import React from 'react';
import styled from 'styled-components';
import { Button, SpaceBackground } from '../../components/ui';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #000000;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
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

export const Dashboard: React.FC = () => {
  const handleLogout = () => {
    window.location.href = '/auth';
  };

  return (
    <Container>
      <SpaceBackground />
      <Content>
        <Title>Mission Control</Title>
        <Subtitle>🚀 You've successfully entered the space station! 🌌</Subtitle>
        <Button onClick={handleLogout} variant="outline">
          Return to Earth
        </Button>
      </Content>
    </Container>
  );
};