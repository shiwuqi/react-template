import * as React from 'react';
import { Layout } from 'antd';
import SiderBar from '../../components/SiderBar';
import AppMain from '../../components/AppMain';
import NavBar from '../../components/NavBar'

const { Header, Content, Sider } = Layout;

function Layouts(): React.SFCElement<React.ElementType> {
  return (
    <Layout style={{ width: '100%' }}>
      <Sider>
        <SiderBar></SiderBar>
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

export default Layouts;