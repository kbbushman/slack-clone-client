import React from 'react';
import gql from 'graphql-tag';
import { Form, Button, Modal, Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import normalizeErrors from '../utils/noralizeErrors';

const InvitePeopleModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  touched,
  errors,
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add People to Your Team</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Input value={values.name} onChange={handleChange} onBlur={handleBlur} name='email' fluid placeholder='Users Email Address' />
          </Form.Field>
          {touched.email && errors.email ? errors.email[0] : null}
          <Form.Group widths="equal">
            <Button onClick={onClose} disabled={isSubmitting} fluid>Cancel</Button>
            <Button onClick={handleSubmit} disabled={isSubmitting} fluid>Add User</Button>
          </Form.Group>
        </Form>
      </Modal.Content>
  </Modal>
);

const ADD_TEAM_MEMBER_MUTATION = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default compose(
  graphql(ADD_TEAM_MEMBER_MUTATION),
  withFormik({
    mapPropsToValues: () => ({ email: '' }),
    handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting, setErrors }) => {
      const response = await mutate({
        variables: { teamId, email: values.email },
      });
      console.log(response);
      const { ok, errors } = response.data.addTeamMember;
      if (ok) {
        onClose();
        setSubmitting(false);
      } else {
        setSubmitting(false);
        setErrors(normalizeErrors(errors));
      }
    },
}))(InvitePeopleModal);
