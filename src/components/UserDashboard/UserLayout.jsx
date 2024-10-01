import React, { useEffect, useState } from 'react';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

const UserLayout = () => {
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
    window.localStorage.clear();
    navigate('/logout');

  }

    // const { login } = useAuth();
    // useEffect(() => {
    //   const isAuthenticated = !!localStorage.getItem('userAuth');  // Simple token-based check

    //   if (!isAuthenticated) {
    //     navigate('/login')
    //   }

    // }, [])




  const items = [

    {
      key: 'add-bill',
      label: (
        <Link to='/dashboard/add-bill'>
          Add New Bill
        </Link>
      ),
      icon: <UserOutlined />
    },

    {
      key: 'list-bills',
      label: (
        <Link to='/dashboard/list-bills'>
          List Bill
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
          <div className="demo-logo-vertical ss" />
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
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Add Bill</Breadcrumb.Item>
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
            Parking Management System ©{new Date().getFullYear()} Created by Nexus.
          </Footer>

        </Layout>
      </Layout>


    </div>
  );
};

export default UserLayout;
