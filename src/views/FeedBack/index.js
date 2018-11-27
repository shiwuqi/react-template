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

  componentDidMount () {
    this.querySystemFeedBack()
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
    this.querySystemFeedBack({pageIndex: page})
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
        align: 'center'
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: 200,
        align: 'center'
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
        <Table columns={columns} dataSource={this.state.data} rowKey={record => record.id} pagination={{total: this.state.pagination.total, onChange: this.onChange}} bordered style={{background: '#fff'}} loading={this.state.pagination.showLoading} />
      </div>
    )
  }
}

export default FeedBack