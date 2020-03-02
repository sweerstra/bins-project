import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Redirect } from 'react-router-dom';
import { boxShadow, flexCenter, flexStart } from '../ui/mixins';
import { Button, Heading, Input, Label, Link } from '../ui/index';
import { useInput } from '../hooks/form';
import { verify } from '../api/user';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  ${flexStart};
  flex-direction: column;
  background-image: linear-gradient(to bottom right, ${p => p.theme.color.tertiary}, ${p => p.theme.color.white});
`;

const Header = styled.div`
  height: 20rem;
  ${flexCenter};

  ${Heading} {
    color: ${p => p.theme.color.primary};
    font-size: 4rem;
    font-weight: bold;
  }
`;

const Content = styled.div`
  width: 40rem;
  padding: 3rem;
  color: ${p => p.theme.color.secondary};
  background-color: ${p => p.theme.color.white};
  border-top: .4rem solid ${p => p.theme.color.primary};
  border-radius: 0 0 .6rem .6rem;
  ${boxShadow};

  ${p => p.error && css`
    border-top-color: ${p => p.theme.color.danger};
  `}

  ${Button} {
    margin: 2rem 0;
  }
`;

const Login = ({ isAuthenticated, onVerify }) => {
  const [username, setUsername, onUsernameChange] = useInput();
  const [password, setPassword, onPasswordChange] = useInput();
  const [rejected, setRejected] = useState(false);

  const onConfirm = (e) => {
    e.preventDefault();

    verify(username, password)
      .then(onVerify)
      .catch(() => {
        setUsername('');
        setPassword('');
        setRejected(true);
      });
  };

  const isLoginDisabled = !username || !password;

  if (isAuthenticated) {
    return <Redirect to="/bins"/>
  }

  return (
    <Wrapper>
      <Header>
        <Heading>
          <span role="img" aria-label="bin">🗑️</span>
        </Heading>
      </Header>

      <Content error={rejected}>
        <form onSubmit={onConfirm} data-testid="login-form">
          <Label error={rejected}>
            Username
            <Input type="text"
              value={username}
              onChange={onUsernameChange}
              error={rejected}
              required
              autoFocus={true}
              margin />
          </Label>
          <Label error={rejected}>
            Password
            <Input type="password"
              value={password}
              onChange={onPasswordChange}
              error={rejected}
              required />
          </Label>
          <Button color="primary" disabled={isLoginDisabled}>
            Confirm
          </Button>
        </form>
        <div>
          <Link href="/bins">Or continue in read-only mode</Link>
        </div>
      </Content>
    </Wrapper>
  );
};

export default Login;
