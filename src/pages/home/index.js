import { Table, Space, Button } from "antd";
import { DeleteOutlined, EditFilled, UserAddOutlined } from "@ant-design/icons";
import "./style.scss";

const HomePage = () => {
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
          <Button danger icon={<DeleteOutlined />} />
          <Button icon={<EditFilled />} />
        </Space>
      ),
    },
  ];

  return (
    <div className="home-page">
      <div className="table-header">
        <h3>users</h3>
        <Button type="primary" icon={<UserAddOutlined />}>
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
    </div>
  );
};

export default HomePage;
