import React from 'react';
import { Layout, Menu, Avatar, Typography, Space } from 'antd';
import { AppstoreOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <AppstoreOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/campaigns',
      icon: <MailOutlined />,
      label: 'Campañas',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" width={250} style={{ borderRight: '1px solid #f0f0f0' }}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Title level={4} style={{ margin: 0, color: '#1890FF' }}>Megamedia</Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <Space>
            <Typography.Text strong>Admin User</Typography.Text>
            <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890FF' }} />
          </Space>
        </Header>
        <Content style={{ margin: '24px', padding: 24, minHeight: 280, background: '#fff' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
