import React from 'react';
import { Menu, Icon } from 'antd';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { menusType } from '../SideBar';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

interface CMProps extends RouteComponentProps {
  menus: menusType[],
  openKey: string[]
}

interface CMState {
  selectedKeys: string[]
}

class ContentMenu extends React.Component<CMProps, CMState> {
  constructor(props: CMProps) {
    super(props)
    this.state = {
      selectedKeys: []
    }
  }

  static defaultProps = {
    menus: [],
    openKey: ['/page/feed']
  }

  static test = () => {

  }

  getComponentItems = (data: menusType[]) => {
    return data.map(item => {
      if (item.meta) {
        if (item.children && item.children.length) {
          return <SubMenu key={item.key} title={<span>{item.icon && <Icon type={item.icon} />}{item.name}</span>}>
            {this.getComponentItems(item.children)}
          </SubMenu>
        }
        return <MenuItem key={item.key}>
          <Link to={item.key}>
            {item.icon && <Icon type={item.icon} />}
            <span>{item.name}</span>
          </Link>
        </MenuItem>
      }
    })
  }


  render() {
    const { location, menus, openKey } = this.props
    const { pathname } = location
    const selectedKeys = pathname
    return (
      <Menu theme="dark" defaultOpenKeys={openKey} selectedKeys={[selectedKeys]} onClick={({ key }) => this.setState({ selectedKeys: [key] })} mode='inline'>
        {this.getComponentItems(menus)}
      </Menu>
    )
  }
}

export default withRouter(ContentMenu)