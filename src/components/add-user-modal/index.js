import { Modal, Button, Form, Input } from "antd";

const AddUserModal = ({ visible, setVisible }) => {
  const addUser = (values) => {
    console.log("values", values);
  };
  return (
    <Modal
      title="Add user"
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={false}
      closable
    >
      <Form onFinish={addUser}>
        <h3>name</h3>
        <Form.Item name="name">
          <Input placeholder="name" size="large" />
        </Form.Item>
        <h3>email</h3>
        <Form.Item name="email">
          <Input placeholder="email" size="large" />
        </Form.Item>
        <h3>phone number</h3>
        <Form.Item name="phone">
          <Input placeholder="phone number" size="large" />
        </Form.Item>
        <Button type="primary" block size="large" htmlType="submit">
          submit
        </Button>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
