import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { boxShadow, flexCenter, flexStart } from '../../ui/mixins';
import { Button, Heading, Input, Label, Link } from '../../ui';
import { verify } from '../../api/user';

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

class Passphrase extends Component {
  state = {
    passphrase: '',
    rejected: false
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onConfirm = (e) => {
    e.preventDefault();

    const { passphrase } = this.state;

    verify(passphrase)
      .then(({ token }) => this.props.setAuthenticated(true, token))
      .catch(() => this.setState({ passphrase: '', rejected: true }));
  };

  render() {
    const { passphrase, rejected } = this.state;
    const { authenticated } = this.props;

    if (authenticated) {
      return <Redirect to="/bins"/>;
    }

    const disabled = !passphrase;

    return (
      <Wrapper>
        <Header>
          <Heading>🗑️</Heading>
        </Header>

        <Content>
          <form onSubmit={this.onConfirm}>
            <Label error={rejected}>
              {rejected ? 'We couldn\'t find your passphrase 😞' : 'Enter your passphrase below'}
              <Input type="password"
                     name="passphrase"
                     value={passphrase}
                     onChange={this.onChange}
                     autoFocus={true}/>
            </Label>
            <Button color="primary" disabled={disabled}>
              Confirm
            </Button>
          </form>
          <div>
            <Link href="/bins">Or continue in read-only mode</Link>
          </div>
        </Content>
      </Wrapper>
    );
  }
}

export default Passphrase;
