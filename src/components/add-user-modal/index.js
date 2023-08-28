import { Modal, Button, Form, Input, message } from "antd"
import axios from "../../utils/axios"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

const AddUserModal = ({ visible, refetch }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [searchParam, setSearchParam] = useSearchParams()
  const addUser = ({ name, email, phone }) => {
    setLoading(true)
    axios
      .post("add-user/", {
        name,
        email,
        phone,
      })
      .then(({ data }) => {
        message.success(data)
        setSearchParam("")
        refetch()
      })
      .catch(() => {
        message.error("Failed to add user, please try again later!")
        setSearchParam("")
      })
      .finally(setLoading(false))
  }
  form.resetFields()
  return (
    <Modal
      title="Add user"
      visible={visible}
      onCancel={() => setSearchParam("")}
      footer={false}
      closable
    >
      <Form onFinish={addUser} form={form}>
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
        <Button
          type="primary"
          block
          size="large"
          htmlType="submit"
          loading={loading}
        >
          submit
        </Button>
      </Form>
    </Modal>
  )
}

export default AddUserModal
