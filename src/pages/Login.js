import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
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
  
  ${Button} {
    margin: 2rem 0;
  }
`;

const Login = ({ authenticated, handleAuthentication }) => {
  const [username, setUsername, onUsernameChange] = useInput();
  const [password, setPassword, onPasswordChange] = useInput();
  const [rejected, setRejected] = useState(false);

  const onConfirm = (e) => {
    e.preventDefault();


    verify(username, password)
      .then(({ token }) => handleAuthentication(true, token))
      .catch(() => {
        setUsername('');
        setPassword('');
        setRejected(true);
      });
  };

  if (authenticated) {
    return <Redirect to="/bins"/>;
  }

  const buttonDisabled = !username || !password;

  return (
    <Wrapper>
      <Header>
        <Heading>🗑️</Heading>
      </Header>

      <Content>
        <form onSubmit={onConfirm}>
          {rejected && <Label error block>
            Invalid username or password 😞
          </Label>}

          <Label>
            Username
            <Input type="text"
                   value={username}
                   onChange={onUsernameChange}
                   autoFocus={true}
                   margin/>
          </Label>
          <Label>
            Password
            <Input type="password"
                   value={password}
                   onChange={onPasswordChange}/>
          </Label>
          <Button color="primary" disabled={buttonDisabled}>
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
