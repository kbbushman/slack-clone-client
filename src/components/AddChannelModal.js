import React from 'react';
import findIndex from 'lodash/findIndex';
import gql from 'graphql-tag';
import { Form, Button, Modal, Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import { ALL_TEAMS_QUERY } from '../graphql/teams';

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Input value={values.name} onChange={handleChange} onBlur={handleBlur} name='name' fluid placeholder='Channel Name' />
          </Form.Field>
          <Form.Group widths="equal">
            <Button onClick={onClose} disabled={isSubmitting} fluid>Cancel</Button>
            <Button onClick={handleSubmit} disabled={isSubmitting} fluid>Create Channel</Button>
          </Form.Group>
        </Form>
      </Modal.Content>
  </Modal>
);

const CREATE_CHANNEL_MUTATION = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`;

export default compose(
  graphql(CREATE_CHANNEL_MUTATION),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
      await mutate({
        variables: { teamId, name: values.name },
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (!ok) {
            return;
          }
          const data = store.readQuery({ query: ALL_TEAMS_QUERY });
          const teamIndex = findIndex(data.allTeams, ['id', teamId]);
          data.allTeams[teamIndex].channels.push(channel);
          store.writeQuery({ query: ALL_TEAMS_QUERY, data });
        },
      });
      setSubmitting(false);
      onClose();
    },
}))(AddChannelModal);
