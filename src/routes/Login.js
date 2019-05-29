import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Container, Header, Form, Input, Button, Message } from 'semantic-ui-react';

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
      errors: {}
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

    const { ok, token, refreshToken, errors } = response.data.login;

    if (ok) {
      localStorage.setItem('sc_token', token);
      localStorage.setItem('sc_refreshToken', refreshToken);
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.errors = { ...err };
    }
  };

  render() {
    const { email, password, errors: { emailError, passwordError } } = this;
    const errorList = [];

    if (emailError) errorList.push(emailError);
    if (passwordError) errorList.push(passwordError);

    return (
      <Container text>
        <Header as='h2'>Login</Header>
        <Form>
          <Form.Field error={!!emailError}>
            <Input
              name='email'
              value={email}
              placeholder='Email'
              onChange={this.handleChange}
              fluid
            />
          </Form.Field>
          <Form.Field error={!!passwordError}>
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
        {errorList.length > 0 && (
          <Message
            error
            header='There were some errors with your submission'
            list={errorList}
          />
        )}
      </Container>
    );
  };
});
