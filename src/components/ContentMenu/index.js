import React from 'react';
import { Menu, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

@withRouter
class ContentMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKeys: []
    }
  }

  static defaultProps = {
    menus: []
  }

  static propTypes = {
    menus: PropTypes.array
  }

  static test = () => {

  }

  getComponentItems = (data) => {
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
    const { location, menus } = this.props
    const { pathname } = location
    const items = pathname.split('/')
    const selectedKeys = items[items.length - 1]
    return (
      <Menu theme="dark" selectedKeys={[selectedKeys]} onClick={({ key }) => this.setState({ selectedKeys: [key] })} mode='inline'>
        {this.getComponentItems(menus)}
      </Menu>
    )
  }
}

export default ContentMenu