import React, { useState } from 'react';
import DashboardSidebar from '../Layouts/DashboardSidebar';  // Sidebar component
import DashboardHeader from '../Layouts/DashboardHeader';    // Header component
import DashboardContent from '../Layouts/DashboardContent';  // Main content area
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
      token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onMenuClick = ({ key }) => {
      console.log('key pressed', key);
      if (key !== 'logout') {
          navigate(key);

      }
     
  };

  const logout = () => {
    console.log('logout called');
    navigate('/logout');


}


  const items = [
    {
      label: (
        <Link to='/dashboard/home'>
          Dashboard
        </Link>
      ),
      key: 'dashboard',
      icon: <DashboardOutlined />


    },

    {
      key: 'profile',
      label: (
        <Link to='/dashboard/profile'>
          Profile
        </Link>
      ),
      icon: <UserOutlined />
    },

    {
      key: 'settings',
      label: (
        <Link to='/dashboard/settings'>
          Settings
        </Link>
      ),
      icon: <UserOutlined />
    },


  ];
  return (
    <div className="dashboard-layout">

      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={onMenuClick} >

            {items.map(item => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))}

            <Menu.Item key="logout" type='' icon={<LogoutOutlined />} onClick={logout}>
              <Link to="http://localhost:3000/logout">Logout</Link>
            </Menu.Item>


          </Menu>
          {/* <DashboardSidebar /> */}
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}

          >
            <DashboardHeader />

          </Header>

          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>User</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >

              <Outlet /> {/* Render the nested route components */}


            </div>
          </Content>

          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>

        </Layout>
      </Layout>


    </div>
  );
};

export default DashboardLayout;
