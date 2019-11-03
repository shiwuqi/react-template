import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'antd';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { menusType } from '../SiderBar';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

interface CMProps extends RouteComponentProps {
  menus: menusType[];
  openKey: string[];
}

function ContentMenu(props: CMProps) {
  const { menus, openKey } = props;
  const [selectedKeys, setSelectedKeys] = useState([props.location.pathname]);
  const [openKeys, setOpenKeys] = useState(openKey);

  useEffect(() => {
    console.log(props.location.pathname);
  })

  const getComponentItems = (data: menusType[]) => {
    const datas = data.map(item => {
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
    });
    return datas;
  }

  return (
    <Menu theme="dark" openKeys={openKeys} selectedKeys={selectedKeys} onOpenChange={openKeys => setOpenKeys(openKeys)} onClick={({ key }) => setSelectedKeys([key])} mode='inline'>
      {getComponentItems(menus)}
    </Menu>
  )
}

export default withRouter(ContentMenu)