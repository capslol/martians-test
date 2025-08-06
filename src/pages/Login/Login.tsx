import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Input, Card } from '../../components/ui';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 1rem;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  color: #1e293b;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const LinkText = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  a {
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <Container>
      <FormContainer>
        <Card variant="elevated">
          <Title>Sign In</Title>
          <Form onSubmit={handleSubmit}>
            <FormField>
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormField>
            <FormField>
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormField>
            <Button type="submit" size="lg">
              Sign In
            </Button>
          </Form>
          <Footer>
            <LinkText>
              Don't have an account?{' '}
              <Link to="/register">Sign up</Link>
            </LinkText>
          </Footer>
        </Card>
      </FormContainer>
    </Container>
  );
};