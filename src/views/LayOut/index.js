import React from 'react';
import { Layout } from 'antd';
import SideBar from '../../components/SideBar';
import AppMain from '../../components/AppMain';
import NavBar from '../../components/NavBar'

const { Header, Content, Sider } = Layout;

export default class LayOut extends React.Component {
  state = {
    collapsed: false
  }

  onToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return(
      <div>
        <Layout style={{height: '100vh', overflow: 'hidden'}}>
          <Sider collapsible trigger={null} collapsed={this.state.collapsed}>
            <SideBar></SideBar>
          </Sider>
          <Layout style={{overflowY: 'scroll'}}>
            <Header style={{background: '#fff', padding: '0 16px'}}>
              <NavBar collapsed={this.state.collapsed} onToggle={this.onToggle} />
            </Header>
            <Content style={{margin: '0 16px'}}>
              <AppMain></AppMain>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}