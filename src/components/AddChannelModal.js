import React from 'react';
import { Form, Button, Modal, Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
    createChannel(teamId: $teamId, name: $name)
  }
`;

export default compose(
  graphql(CREATE_CHANNEL_MUTATION),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
      teamId = parseInt(teamId);
      await mutate({ variables: { teamId, name: values.name } });
      setSubmitting(false);
      onClose();
    },
}))(AddChannelModal);
