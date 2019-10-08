import React, { useState } from 'react';
import { Menu, Icon } from 'antd';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { menusType } from '../SiderBar';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

interface CMProps extends RouteComponentProps {
  menus: menusType[],
  openKey: string[],
  selectedKey: string[]
}

function ContentMenu(props: CMProps): React.SFCElement<React.ElementType> {
  const { menus, openKey, selectedKey } = props;
  const [selectedKeys, setSelectedKeys] = useState(selectedKey);
  const [openKeys, setOpenKeys] = useState(openKey);

  const getComponentItems = (data: menusType[]) => {
    return data.map(item => {
      if (item.meta) {
        if (item.children && item.children.length) {
          return <SubMenu key={item.key} title={<span>{item.icon && <Icon type={item.icon} />}{item.name}</span>}>
            {getComponentItems(item.children)}
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

  return (
    <Menu theme="dark" openKeys={openKeys} selectedKeys={selectedKeys} onOpenChange={openKeys => setOpenKeys(openKeys)} onClick={({ key }) => setSelectedKeys([key])} mode='inline'>
      {getComponentItems(menus)}
    </Menu>
  )
}

export default withRouter(ContentMenu)