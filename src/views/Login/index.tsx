import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import './style.less'
import md5 from 'md5'
import store from '../../redux/store'
import { loginIn } from '../../redux/actions/login'

const FormItem = Form.Item

export interface LoginFormProps extends FormComponentProps, RouteComponentProps {
  account: string,
  password: string
}

class LoginForm extends React.Component<LoginFormProps> {

  validatorToAccount = (rule: any, value: string, callback: (value?: string) => void) => {
    if (!value) {
      callback('请输入账号')
    } else {
      callback()
    }
  }

  validatorToPassword = (rule: any, value: string, callback: (value?: string) => void) => {
    if (!value) {
      callback('请输入密码')
    } else if (value.length < 8 || value.length > 18) {
      callback('请输入8-18位密码')
    } else {
      callback()
    }
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          ...values,
          password: md5(values.password)
        }
        store.dispatch(loginIn('/login', params, 'POST'))
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const lg = 'login'
    return (
      <div>
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
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </FormItem>
            <a href="/registry" style={{ color: '#fff' }}>去注册</a>
          </Form>
        </div>
      </div>
    )
  }
}

const Login = Form.create<LoginFormProps>({})(withRouter(LoginForm))

export default Login