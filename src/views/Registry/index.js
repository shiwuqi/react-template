import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import history from '../../utils/history';
import '../Login/style.less';
import { checkUserName, userRegistry } from '../../api/login';
import md5 from 'md5';

const FormItem = Form.Item

@withRouter
class Registry extends React.Component {

  validatorToAccount = (rule, value, callback) => {
    if (!value) {
      callback('请输入账号')
    } else {
      // 查询账号是否已注册
      checkUserName({ account: value }).then(res => {
        if (res.code === 200) {
          callback()
        } else if (res.code === 201) {
          callback('账号已注册')
        }
      })
    }
  }

  validatorToPassword = (rule, value, callback) => {
    if (!value) {
      callback('请输入密码')
    } else if (value.length < 8 || value.length > 18) {
      callback('请输入8-18位密码')
    } else {
      callback()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 调用注册接口
        const params = {
          ...values,
          password: md5(values.password)
        }
        userRegistry(params).then(res => {
          if (res.code === 200) {
            history.replace({ pathname: '/' })
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
                  rules: [{ validator: this.validatorToAccount }]
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="注册账号" />
                )
              }
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ validator: this.validatorToPassword }],
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

Registry = Form.create({})(Registry)

export default Registry