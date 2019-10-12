import * as React from 'react'
import { Table, message, Tooltip } from 'antd'
import { ColumnProps } from 'antd/es/table'
import request from '../../utils/request'

interface FeedState {
  data: Array<object>,
  pagination: {
    total: number,
    defaultCurrent: number,
    showLoading: boolean
  }
}

interface Column {
  key: number,
  routeKey: string,
  id: string
}

class Feed extends React.Component<any, FeedState> {
  state = {
    data: [],
    pagination: {
      total: 0,
      defaultCurrent: 1,
      showLoading: true
    },
    modalVisible: true
  }

  static getDerivedStateFromProps(nextProps: any, prevState: FeedState) {
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

  componentDidUpdate(prevProps: any, prevState: FeedState, snapshot: any) {
    // 渲染完成后调用一次，这个时候DOM已经渲染了
  }

  componentWillUnmount() {
    // 组件被卸载并销毁之前被调用
  }

  componentDidCatch(error: Error | null, info: object) {
    // 错误边界只会捕获树中下面组件中的错误，错误边界本身不能捕获错误
  }

  querySystemFeedBack = async (params?: object): Promise<void> => {
    const res = await request(`/feed`, params)
    if (res.code === 200) {
      this.setState({
        'data': res.data.list,
        'pagination': Object.assign({}, this.state.pagination, { total: res.data.total }, { showLoading: false })
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
  onChange = (page: number) => {
    this.setState({
      'pagination': Object.assign({}, this.state.pagination, { showLoading: true })
    })
    this.querySystemFeedBack({ pageIndex: page })
  }

  render() {
    const userProblem = {
      width: '280px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
    const columns: ColumnProps<Column>[] = [
      {
        title: 'union',
        dataIndex: 'id',
        width: 180,
        align: 'center',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: 120,
        align: 'center'
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: 120,
        align: 'center'
      },
      {
        title: '地址',
        dataIndex: 'address',
        render: (text: any, record: any) => (
          <Tooltip placement="top" title={!record.address ? '暂无地址' : record.address}>
            <span style={userProblem}>{!record.address ? '暂无地址' : record.address}</span>
          </Tooltip>
        ),
        width: 200,
        align: 'center'
      },
      {
        title: '日期',
        dataIndex: 'data_time',
        width: 180,
        align: 'center'
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        width: 200,
        align: 'center'
      }
    ]
    return (
      <div style={{minHeight: '80vh', background: '#fff', padding: '20px 20px 0 20px', border: '1px solid #ebeef5', borderRadius: '6px', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, .1)'}}>
        <Table bordered columns={columns} dataSource={this.state.data} rowKey={record => record.id} pagination={{total: this.state.pagination.total, onChange: this.onChange}} loading={this.state.pagination.showLoading} />
      </div>
    )
  }
}

export default Feed