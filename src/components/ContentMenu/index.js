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
      collapsed: false,
      openKeys: [],
      selectedKeys: []
    }
  }

  static defaultProps = {
    menus: [
      {
        title: '用户反馈',
        icon: 'file-done',
        key: '/layOut/feedBack'
      },
      {
        title: '用户信息',
        icon: 'user',
        key: '/layOut/user'
      }
    ]
  }

  static propTypes = {
    menus: PropTypes.array
  }

  componentDidMount() { 
    const pathname = this.props.location.pathname
    const rank = pathname.split('/')
    switch (rank.lenght) {
      case 2: // 一级目录
        this.setState({
          selectedKeys: [pathname]
        })
        break;
      case 5: // 三级目录
        this.setState({
          selectedKeys: [pathname],
          openKeys: [rank.slice(0, 3).join('/'), rank.slice(0, 4).join('/')]
        })
        break;
      default: 
        this.setState({
          selectedKeys: [pathname],
          openKeys: [pathname.substr(0, pathname.lastIndexOf('/'))]
        })
    }
  }

  static test = () => {
    console.log(1111);
  }

  openChange = (openKeys) => {
    if (openKeys.length === 0 || openKeys.length === 1) {
      this.setState({
        openKeys
      })
      return
    }

    const latestOpenKey = openKeys[openKeys.lenght - 1]
    if (latestOpenKey.includes(openKeys[0])) {
      this.setState({
        openKeys
      })
    } else {
      this.setState({
        openKeys: [latestOpenKey]
      })
    }
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  renderSubMenuItem = ({title, icon, key}) => {
    return (
      <MenuItem key={key}>
        <Link to={key}>
          {icon && <Icon type={icon} />}
          <span>{title}</span>
        </Link>
      </MenuItem>
    )
  }

  renderSubMenu = ({title, icon, key, subs}) => {
    return (
    <SubMenu key={key} title={<span>{icon && <Icon type={icon} />}{title}</span>}>
      {
        subs && subs.map(item => {
          return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderSubMenuItem(item)
        })
      }
    </SubMenu>
    )
  }


  render () {
    return (
      <div>
        <Menu theme="dark" openKeys={this.state.openKeys} selectedKeys={this.state.selectedKeys} onClick={({key}) => this.setState({selectedKeys: [key]})} onOpenChange={this.openChange} mode='inline'>
          {
            this.props.menus && this.props.menus.map((item, index) => {
              return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderSubMenuItem(item)
            })
          }
        </Menu>
      </div>
    )
  }
}

export default ContentMenu