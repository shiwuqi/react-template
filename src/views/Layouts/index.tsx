import * as React from 'react';
import { Layout } from 'antd';
import SideBar from '../../components/SideBar';
import AppMain from '../../components/AppMain';
import NavBar from '../../components/NavBar'

const { Header, Content, Sider } = Layout;

export default class Layouts extends React.Component<any, any> {

  render() {
    return (
      <Layout style={{ width: '100%' }}>
        <Sider>
          <SideBar></SideBar>
        </Sider>
        <Layout style={{ background: '#fff' }}>
          <Header style={{ padding: '0 16px', background: '#fff', boxShadow: '0 2px 6px rgba(99, 99, 99, .15)' }}>
            <NavBar />
          </Header>
          <Content>
            <AppMain></AppMain>
          </Content>
        </Layout>
      </Layout>
    )
  }
}