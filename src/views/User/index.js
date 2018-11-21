import React from 'react'
import { increment, decrement } from '../../redux/actions/counter'
import { connect } from 'react-redux'
import { Button } from 'antd'
import './style.less'

class User extends React.Component {

  render() {
    return (
      <div>
        <p>{this.props.counter.count}</p>
        <Button type="primary" onClick={() => this.props.increment(2)}>增加</Button>
        <Button type="primary" onClick={() => this.props.decrement(2)}>减少</Button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increment: (val) => {
      dispatch(increment(val))
    },
    decrement: (val) => {
      dispatch(decrement(val))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)