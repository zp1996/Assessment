import React, { Component } from 'react';
import { connect } from 'dva';
import CSSModules from 'react-css-modules';
import { Button, Checkbox } from 'antd';
import Header from 'components/Header';
import Footer from 'components/Footer';
import LoginInput from 'components/LoginInput';
import { pwdRE } from 'utils/index';
import { HeaderText, FooterText } from 'utils/config';
import logo from 'assets/logo.png';
import styles from './index.less';

@connect(
  state => ({
    login: state.login
  })
)
@CSSModules(styles, {
  allowMultiple: true,
})
export default class LoginPage extends Component {
  static check = {
    username: val => val !== '',
    password: val => pwdRE.test(val)
  };
  constructor(props) {
    super(props);
    this.login = Boolean(window.__login__);
    this.usernameChange = this.change('username');
    this.passwordChange = this.change('password');
    this.remChange = this.change('remember');
    this.changeRemember = this.changeRemember.bind(this);
    this.submit = this.submit.bind(this);
  }
  changeRemember(e) {
    this.props.dispatch({
      type: 'login/save',
      payload: {
        remember: e.target.checked
      }
    });
  }
  // 错误处理
  getError(payload, key, err, perr) {
    if (err) {
      if (perr == null || perr.code !== 400) {
        payload.err = {
          code: 400,
          key: {
            [key]: true
          }
        };
      } else {
        perr.key[key] = true;
        payload.err = perr;
      }
    } else {
      perr && perr.key && ( delete perr.key[key] );
    }
    return payload;
  }
  change(key) {
    return ({ val, err }) => {
      const { login: { err: perr }, dispatch } = this.props;
      dispatch({
        type: 'login/save',
        payload: this.getError({
          [key]: val
        }, key, err, perr)
      });
    };
  }
  inputErr(key) {
    const { err } = this.props.login;
    return Boolean(err && err.key && err.key[key]);
  }
  submit() {
    const { login, dispatch } = this.props;
    const { check } = LoginPage;
    // 再次验证
    let err = null;
    Object.keys(check).every((key) => {
      const res = check[key](login[key]);
      !res && (err = key);
      return res;
    });

    if (err != null) {
      this[`${err}Change`]({
        val: login[err],
        err
      });
    } else {
      console.log('submit');
    }

  }
  render() {
    const { username, password, remember, err = {} } = this.props.login;
    return (
      <div>
        <Header login={this.login} title={HeaderText} />
        <div styleName="input-container">
          <img src={logo} styleName="logo" />
          <div styleName="input">
            <LoginInput value={username}
              preIcon="user"
              change={this.usernameChange}
              placeholder="请您输入用户名"
              errText="请输入用户名"
              error={this.inputErr('username')}
            />
          </div>
          <div styleName="input">
            <LoginInput value={password}
              preIcon="key"
              change={this.passwordChange}
              placeholder="请您输入密码"
              errText="输入密码格式有误"
              error={this.inputErr('password')}
              type="password"
              pattern={pwdRE}
            />
          </div>
          <div styleName="checkbox">
            <Checkbox onChange={this.changeRemember} checked={remember}>
              是否自动登录
            </Checkbox>
          </div>
          <Button type="primary" styleName="btn" onClick={this.submit}>
            登 录
          </Button>
        </div>
        <Footer fixed={true} title={FooterText} />
      </div>
    );
  }
}
