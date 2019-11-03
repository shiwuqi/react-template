import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import '../Login/style.less';
import { checkUserAccount, userRegistry } from '../../api/login';
import md5 from 'md5';

const FormItem = Form.Item

export interface RegistryFormProps {
  account: string;
  password: string;
}

class RegistryForm extends React.Component<RegistryFormProps & FormComponentProps & RouteComponentProps> {

  validatorToAccount = (rule: any, value: string, callback: (value?: string) => void) => {
    if (!value) {
      callback('请输入账号')
    } else {
      // 查询账号是否已注册
      checkUserAccount({ account: value }).then(res => {
        if (res.code === 200) {
          callback()
        } else if (res.code === 201) {
          callback('账号已注册')
        }
      })
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
    this.props.form.validateFields((err: any, values: RegistryFormProps) => {
      if (!err) {
        // 调用注册接口
        const params = {
          ...values,
          password: md5(values.password)
        }
        userRegistry(params).then(res => {
          if (res.code === 200) {
            this.props.history.replace({ pathname: '/login' })
          }
        })
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
            <h3 className={`${lg}-title`}>注册</h3>
            <FormItem>
              {
                getFieldDecorator('account', {
                  rules: [{ validator: this.validatorToAccount }],
                  validateTrigger: "onBlur"
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="注册账号" />
                )
              }
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ validator: this.validatorToPassword }],
                validateTrigger: "onBlur"
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />} type="password" placeholder="注册密码" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                注册
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const Registry = Form.create({})(withRouter(RegistryForm))

export default Registry