import { Table, Space, Button, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditFilled,
  QuestionCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import AddUserModal from "../../components/add-user-modal";
import EditUserModal from "../../components/edit-user-modal";
import axios from "axios";
import "./style.scss";

const HomePage = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [users, setUsers] = useState();

  const getUserDate = () =>
    axios
      .get("http://localhost:8000/users/")
      .then(({ data }) => setUsers(data));

  useEffect(() => {
    getUserDate();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone number",
      dataIndex: "phone",
      key: "phone",
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
        dataSource={users}
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
