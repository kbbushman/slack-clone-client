import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Container, Header, Form, Input, Button } from 'semantic-ui-react';

const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default observer(class Login extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    // Mutate state directly via mobx. Similar to setState({[e.target.name]: e.target.value })
    this[name] = value;
  };

  handleSubmit = async mutation => {
    const { email, password } = this;
    const response = await mutation({ variables: { email, password } });
    console.log(response);
    const { ok, token, refreshToken } = response.data.login;
    if (ok) {
      localStorage.setItem('sc_token', token);
      localStorage.setItem('sc_refreshToken', refreshToken);
    }
  };

  render() {
    const { email, password } = this;

    return (
      <Container text>
        <Header as='h2'>Login</Header>
        <Form>
          <Form.Field>
            <Input
              name='email'
              value={email}
              placeholder='Email'
              onChange={this.handleChange}
              fluid
            />
          </Form.Field>
          <Form.Field>
            <Input
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={this.handleChange}
              fluid
            />
          </Form.Field>
          <Mutation mutation={LOGIN_MUTATION}>
            {(login, { data }) => (
              <Button onClick={() => this.handleSubmit(login)}>Submit</Button>
            )}
          </Mutation>
        </Form>
      </Container>
    );
  };
});
