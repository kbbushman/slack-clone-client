import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Container, Header, Form, Input, Button, Message } from 'semantic-ui-react';

const REGISTER_MUTATION= gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    usernameError: '',
    emailError: '',
    passwordError: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async mutation => {
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
    });
    const { username, email, password } = this.state;
    const response = await mutation({ variables: { username, email, password } });
    console.log(response);

    const { ok, errors } = response.data.register;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.setState(err);
    }
  };

  render() {
    const { username, email, password, usernameError, emailError, passwordError } = this.state;
    const errorList = [];

    if (usernameError) errorList.push(usernameError);
    if (emailError) errorList.push(emailError);
    if (passwordError) errorList.push(passwordError);

    return (
      <Container text>
        <Form>
          <Header as='h2'>Register</Header>
          <Form.Field error={!!usernameError}>
            <Input
              name='username'
              value={username}
              placeholder='Username'
              onChange={this.handleChange}
              fluid
            />
          </Form.Field>
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
          <Mutation mutation={REGISTER_MUTATION}>
            {(register, { data }) => (
              <Button onClick={() => this.handleSubmit(register)}>Submit</Button>
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
};

export default Register;
