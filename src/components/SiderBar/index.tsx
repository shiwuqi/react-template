import * as React from "react";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import { Menu, Icon } from "antd";
import { asideMenuConfig, AsideMenuConfigType } from "../../router/menu";
const { useState, useEffect } = React;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const openKey: string[] = ["feed"];

function SiderBar(props: RouteComponentProps) {
  const [selectedKeys, setSelectedKeys] = useState([props.location.pathname]);
  const [openKeys, setOpenKeys] = useState(openKey);

  useEffect(() => {
    console.log(props.location.pathname);
  });

  const getComponentItems = (data: AsideMenuConfigType[]) => {
    const Menus = data.map((item) => {
      if (item.meta) {
        if (item.children && item.children.length) {
          return (
            <SubMenu
              key={item.key}
              title={
                <span>
                  {item.icon && <Icon type={item.icon} />}
                  {item.name}
                </span>
              }
            >
              {getComponentItems(item.children)}
            </SubMenu>
          );
        }
        return (
          <MenuItem key={item.key}>
            <Link to={item.key}>
              {item.icon && <Icon type={item.icon} />}
              <span>{item.name}</span>
            </Link>
          </MenuItem>
        );
      }
    });
    return Menus;
  };

  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <div
        style={{
          height: "32px",
          background: "rgba(255, 255, 255, .2)",
          margin: "16px",
        }}
      />
      <Menu
        theme="dark"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={(openKeys) => setOpenKeys(openKeys)}
        onClick={({ key }) => setSelectedKeys([key])}
        mode="inline"
      >
        {getComponentItems(asideMenuConfig)}
      </Menu>
    </div>
  );
}

export default withRouter(SiderBar);
