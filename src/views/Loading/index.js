import React from 'react'
import { Spin } from 'antd'

const styles = {
  loading: {
    widht: '100%',
    height: '100vh',
    textAlign: 'center',
    lineHeight: '100vh'
  }
}

export default class Loading extends React.PureComponent {
  render() {
    return (
      <div style={styles.loading}>
        <Spin />
      </div>
    )
  }
}