import React from 'react';
import { Form, Button, Modal, Input } from 'semantic-ui-react';
import { withFormik } from 'formik';

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

export default withFormik({
  mapPropsToValues: () => ({ name: '' }),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values);
    console.log('Submitting...');
    setSubmitting(false);
  },
})(AddChannelModal);
