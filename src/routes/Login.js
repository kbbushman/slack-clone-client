import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Header, Input, Button } from 'semantic-ui-react';

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
  }

  handleSubmit = () => {
    const { email, password } = this;
    console.log(email, password);
  }

  render() {
    const { email, password } = this;

    return (
      <Container text>
        <Header as='h2'>Login</Header>
        <Input
          name='email'
          value={email}
          placeholder='Email'
          onChange={this.handleChange}
          fluid
        />
        <Input
          type='password'
          name='password'
          value={password}
          placeholder='Password'
          onChange={this.handleChange}
          fluid
        />
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Container>
    );
  };
});
