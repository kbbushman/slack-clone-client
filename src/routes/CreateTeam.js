import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Container, Header, Form, Input, Button, Message } from 'semantic-ui-react';

const CREATE_TEAM_MUTATION = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

class CreateTeam extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: '',
      errors: {}
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    // Mutate state directly via mobx. Similar to setState({[e.target.name]: e.target.value })
    this[name] = value;
  };

  handleSubmit = async mutation => {
    const { name } = this;
    let response = null;

    try {
      response = await mutation({ variables: { name } });
    } catch (err) {
      return this.props.history.push('/login');
    }
    console.log(response);

    const { ok, errors } = response.data.createTeam;

    if (ok) {
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
    const { name, errors: { nameError } } = this;
    const errorList = [];

    if (nameError) errorList.push(nameError);

    return (
      <Container text>
        <Header as='h2'>Create A New Team</Header>
        <Form>
          <Form.Field error={!!nameError}>
            <Input
              name='name'
              value={name}
              placeholder='Team Name'
              onChange={this.handleChange}
              fluid
            />
          </Form.Field>
          <Mutation mutation={CREATE_TEAM_MUTATION}>
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
};

export default observer(CreateTeam);
