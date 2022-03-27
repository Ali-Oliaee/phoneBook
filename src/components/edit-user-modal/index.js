import { Modal, Button, Form, Input, message } from "antd";
import axios from "../../utils/axios";
import { useSearchParams } from "react-router-dom";

const EditUserModal = ({ visible, user, refetch }) => {
  const [form] = Form.useForm();
  const [searchParam, setSearchParam] = useSearchParams();
  const editUser = ({ name, email, phone }) => {
    axios
      .patch("edit-user/", {
        id: user.id,
        name,
        email,
        phone,
      })
      .then(({ data }) => {
        message.success(data);
        setSearchParam("");
        refetch();
      });
  };

  form.setFieldsValue({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
  });

  return (
    <Modal
      title="Edit user"
      visible={visible}
      onCancel={() => setSearchParam("")}
      footer={false}
      closable
      getContainer={false}
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
