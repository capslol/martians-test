import React from 'react';
import styled from 'styled-components';
import { Button } from '../../components/ui';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

export const Dashboard: React.FC = () => {
  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <Container>
      <Title>Welcome!</Title>
      <Subtitle>You have successfully logged in</Subtitle>
      <Button onClick={handleLogout} variant="outline">
        Logout
      </Button>
    </Container>
  );
};