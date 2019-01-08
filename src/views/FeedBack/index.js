import React from 'react'
import { Table, message, Tooltip } from 'antd'
import request from '../../utils/request'

class FeedBack extends React.Component {
  state = {
    data: [],
    pagination: {
      total: 0,
      defaultCurrent: 1,
      showLoading: true
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // 组件实例化后和接受新的props后被调用（包括父组件的props改变）
    // 调用setState()不会触发该方法
    console.log('getDerivedStateFromProps', nextProps, prevState)
    return null
  }

  // componentWillMount() {
  //   // 将被废弃
  //   // 服务器渲染的唯一方法
  // }

  componentDidMount () {
    this.querySystemFeedBack()
  }

  
  // componentWillReceiveProps(nextProps) {
  //   // 将被废弃
  //   // props被父组件更改，使用setData()，以触发render方法重新渲染组件
  // }

  shouldComponentUpdate() {
    return true
    // true重新render false不会重写render 默认true
    // 当前的状态或属性的改变是否会影响组件的输出
  }

  // componentWillUpdate(nextProps, nextState) {
  //   // 将被废弃
       // 在渲染新的state或props时被调用
       // 不能使用setData()，不能做会触发视图更新的操作
  // }

  getSnapshotBeforeUpdate() {
    // 在render后的输出被渲染到DOM之前被调用
    // 它使您的组件能够在它们被潜在更改之前捕获当前值（如滚动位置）
    // 该生命周期返回的任何值都将作为参数传递给componentDidUpdate（）
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 渲染完成后调用一次，这个时候DOM已经渲染了
  }

  componentWillUnmount() {
    // 组件被卸载并销毁之前被调用
  }

  componentDidCatch(error, info) {
    // 错误边界只会捕获树中下面组件中的错误，错误边界本身不能捕获错误
  }

  querySystemFeedBack = async (params) => {
    const res = await request(`/list`, params)
    if (res.status === '00') {
      this.setState({
        'data': res.data.list,
        'pagination': Object.assign({}, this.state.pagination, { total: res.data.pageNum }, { showLoading: false })
      })
    } else {
      this.setState({
        'data': [],
        'pagination': Object.assign({}, this.state.pagination, { total: 0 }, { showLoading: false })
      })
      message.error(res.log)
    }
  }

  // 改变页数
  onChange = (page) => {
    this.setState({
      'pagination': Object.assign({}, this.state.pagination, { showLoading: true })
    })
    this.querySystemFeedBack({ pageIndex: page })
  }

  render() {
    const userProblem = {
      width: '280px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textAlign: 'center'
    }
    const columns= [
      {
        title: 'union',
        dataIndex: 'id',
        width: 200,
        align: 'center',
        fixed: 'left'
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: 200,
        align: 'center',
        fixed: 'left'
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: 280,
        align: 'center'
      },
      {
        title: '地址',
        dataIndex: 'address',
        render: (text, record) => (
          <Tooltip placement="top" title={!record.address ? '暂无地址' : record.address}>
            <p style={userProblem}>{!record.address ? '暂无地址' : record.address}</p>
          </Tooltip>
        ),
        width: 280,
        align: 'center'
      },
      {
        title: '日期',
        dataIndex: 'data_time',
        width: 200,
        align: 'center'
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        width: 280,
        align: 'center'
      }
    ]
    return (
      <div>
        <Table columns={columns} dataSource={this.state.data} rowKey={record => record.id} pagination={{total: this.state.pagination.total, onChange: this.onChange}} style={{background: '#fff', padding: 10}} loading={this.state.pagination.showLoading} />
      </div>
    )
  }
}

export default FeedBack