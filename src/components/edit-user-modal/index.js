import { Modal, Button, Form, Input } from "antd";
import axios from "axios";

const EditUserModal = ({ visible, setVisible, user }) => {
  const [form] = Form.useForm();
  form.resetFields();
  console.log("user", user);
  const editUser = (values) => {
    // axios.patch("http://localhost:8000/edit-user/", {});
  };

  return (
    <Modal
      title="Edit user"
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={false}
      closable
    >
      <Form onFinish={editUser} form={form}>
        <h3>name</h3>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "user name is required!",
            },
          ]}
        >
          <Input placeholder="name" size="large" />
        </Form.Item>
        <h3>email</h3>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "user email is required!",
            },
            {
              type: "email",
              message: "please enter a valid email!",
            },
          ]}
        >
          <Input placeholder="email" size="large" />
        </Form.Item>
        <h3>phone number</h3>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "user phone number is required!",
            },
            {
              min: 2,
            },
            {
              max: 10,
            },
          ]}
        >
          <Input placeholder="phone number" type="number" size="large" />
        </Form.Item>
        <Button type="primary" block size="large" htmlType="submit">
          submit
        </Button>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
