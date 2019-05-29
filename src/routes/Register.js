import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Container, Header, Input, Button, Message } from 'semantic-ui-react';

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
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

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

    // this.setState({ username: '', email: '', password: '' });
  }

  render() {
    const { username, email, password, usernameError, emailError, passwordError } = this.state;
    const errorList = [];

    if (usernameError) errorList.push(usernameError);
    if (emailError) errorList.push(emailError);
    if (passwordError) errorList.push(passwordError);

    return (
      <Mutation mutation={REGISTER_MUTATION}>
        {(register, { data }) => (
          <Container text>
            <Header as='h2'>Register</Header>
            <Input
              name='username'
              value={username}
              placeholder='Username'
              error={!!usernameError}
              onChange={this.handleChange}
              fluid
            />
            <Input
              name='email'
              value={email}
              placeholder='Email'
              error={!!emailError}
              onChange={this.handleChange}
              fluid
            />
            <Input
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              error={!!passwordError}
              onChange={this.handleChange}
              fluid
            />
            <Button onClick={() => this.handleSubmit(register)}>Submit</Button>
            {(usernameError || emailError || passwordError) && (
              <Message
                error
                header='There were some errors with your submission'
                list={errorList}
              />
            )}
          </Container>
        )}
      </Mutation>
    )
  }
}

export default Register;
