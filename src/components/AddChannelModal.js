import React from 'react';
import { Form, Button, Modal, Input } from 'semantic-ui-react';

const AddChannelModal = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Input fluid placeholder='Channel Name' />
          </Form.Field>
          <Form.Group widths="equal">
            <Button fluid>Cancel</Button>
            <Button fluid>Create Channel</Button>
          </Form.Group>
        </Form>
      </Modal.Content>
  </Modal>
);

export default AddChannelModal;
