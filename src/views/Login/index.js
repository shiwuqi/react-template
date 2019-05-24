import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import './style.less'
import { requestData } from '../../redux/actions/counter'
import { connect } from 'react-redux'

const FormItem = Form.Item

@withRouter
class Login extends React.Component {

  validatorToAccount = (rule, value, callback) => {
    if (value && value !== 'admin') {
      callback('请输入正确的账号')
    } else {
      callback()
    }
  }

  validatorToPassword = (rule, value, callback) => {
    if (value && value !== '123456') {
      callback('请输入正确的密码')
    } else {
      callback()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.requestData({ funcName: 'login', url: '/login', params: values, method: 'post' })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const lg = 'login'
    return (
      <div>
        {/* {this.props.data.isLogin ? <Redirect to={{ pathname: '/layouts/feed', query: { id: 'login' } }}></Redirect>:null} */}
        <div className={lg}>
          <Form onSubmit={this.handleSubmit} className={`${lg}-form`}>
            <h3 className={`${lg}-title`}>后台管理系统</h3>
            <FormItem>
              {
                getFieldDecorator('account', {
                  rules: [{ required: true, message: '账号不能为空' }, { validator: this.validatorToAccount }]
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="登录账号" />
                )
              }
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }, { validator: this.validatorToPassword }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />} type="password" placeholder="登录密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox style={{ color: '#fff' }}>记住我</Checkbox>
              )}
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <p style={{color: '#fff'}}>账号: admin  密码: 123456</p>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

Login = Form.create({})(Login)

const mapStateToProps = (state) => {
  return {
    data: state.counter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestData: ({ funcName, url, params, method }) => {
      dispatch(requestData({ funcName, url, params, method }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)