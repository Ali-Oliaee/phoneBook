import { Table, Space, Button, Popconfirm, message, Input } from "antd";
import {
  DeleteOutlined,
  EditFilled,
  QuestionCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import AddUserModal from "../../components/add-user-modal";
import EditUserModal from "../../components/edit-user-modal";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import qs from "query-string";
import Fuse from "fuse.js";
import "./style.scss";

const HomePage = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const [searchParam, setSearchParam] = useSearchParams();
  const QS = qs.parse(location.search);
  const [users, setUsers] = useState();

  const getUsersDate = () =>
    axios
      .get("http://localhost:8000/users/")
      .then(({ data }) => setUsers(data));

  useEffect(() => {
    getUsersDate();
  }, []);

  // const getUserData = (id) =>
  //   axios.get(`http://localhost:8000/user/${id}`).then(({ data }) => data);

  const getUserDateById = (givenId) =>
    users?.find((user) => user.id === givenId);

  const deleteUser = ({ id }) =>
    axios
      .delete(`http://localhost:8000/delete-user/${id}`)
      .then(({ data }) => message.success(data));

  const fuse = new Fuse(users || [], {
    keys: ["name", "email", "phone"],
  });
  const results = searchValue
    ? fuse.search(searchValue).map(({ item }) => item)
    : users;

  return (
    <div className="home-page">
      <div className="table-header">
        <h1>users</h1>
        <Input.Search
          size="large"
          placeholder="Search user"
          className="search-input"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => setAddModalVisible(true)}
        >
          Add user
        </Button>
      </div>
      <Table
        dataSource={results}
        pagination={false}
        bordered
        className="users-table"
      >
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column title="Phone number" dataIndex="phone" key="phone" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          key="actions"
          render={(row, user) => {
            return (
              <Space size="middle">
                <Popconfirm
                  title="Are you sure？"
                  icon={<QuestionCircleOutlined />}
                  onConfirm={() => deleteUser(user)}
                >
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
                <Button
                  icon={<EditFilled />}
                  onClick={() => {
                    setSearchParam({ id: user.id });
                    setEditModalVisible(true);
                  }}
                />
              </Space>
            );
          }}
        />
      </Table>
      <AddUserModal visible={addModalVisible} setVisible={setAddModalVisible} />
      <EditUserModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        user={getUserDateById(Number(QS.id)) || -1}
      />
    </div>
  );
};

export default HomePage;
