import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardContent from '../Layouts/DashboardContent';  // Main content area
import { Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
const DashboardSidebar = () => {

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
    // navigate('/logout');


  }
  const items = [
    {
      label: (
        <Link to='/dashboard/home'>
          Dashboard
        </Link>
      ),
      key: 'home',
      icon: <DashboardOutlined />


    },

    // {
    //   key: 'users',
    //   label: (
    //     <Link to='/users'>
    //       Users List
    //     </Link>
    //   ),
    //   icon: <UserOutlined />
    // },

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
    <div className="dashboard-sidebar">
      {/* <ul>
        <li><Link to="/dashboard/HOME">Home</Link></li>
        <li><Link to="/dashboard/profile">Profile</Link></li>
        <li><Link to="/dashboard/settings">Settings</Link></li>
      </ul> */}
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
      </Sider>
    </div>
  );
};

export default DashboardSidebar;
