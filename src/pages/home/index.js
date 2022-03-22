import { Table, Space, Button, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditFilled,
  QuestionCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import "./style.scss";
import AddUserModal from "../../components/add-user-modal";
import EditUserModal from "../../components/edit-user-modal";

const HomePage = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined />}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button
            icon={<EditFilled />}
            onClick={() => setEditModalVisible(true)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="home-page">
      <div className="table-header">
        <h1>users</h1>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => setAddModalVisible(true)}
        >
          Add user
        </Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        className="users-table"
      />
      <AddUserModal visible={addModalVisible} setVisible={setAddModalVisible} />
      <EditUserModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
      />
    </div>
  );
};

export default HomePage;
