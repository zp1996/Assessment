import React, { Component } from 'react';
import { connect } from 'dva';
import CSSModules from 'react-css-modules';
import { Button, Checkbox } from 'antd';
import Header from 'components/Header';
import Footer from 'components/Footer';
import LoginInput from 'components/LoginInput';
import showError from 'components/ShowError';
import { pwdRE, changeState } from 'utils/index';
import { HeaderText, FooterText } from 'utils/config';
import logo from 'assets/logo.png';
import styles from './index.less';

@connect(
  state => ({
    login: state.login,
  }),
)
@CSSModules(styles, {
  allowMultiple: true,
})
export default class LoginPage extends Component {
  static check = {
    username: val => val !== '',
    password: val => pwdRE.test(val),
  };
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      remember: true,
      error: null,
    };

    this.usernameChange = this.change('username');
    this.passwordChange = this.change('password');
    this.changeRemember = changeState(this, 'remember', e => e.target.checked);
    this.submit = this.submit.bind(this);
  }
  componentWillMount() {
    this.login = Boolean(window.__login__);   // eslint-disable-line
  }
  componentDidUpdate() {
    const { err } = this.props.login;
    if (err) {
      showError(err);
    }
  }
  change(key) {
    return ({ val, err }) => {
      this.setState({
        [key]: val,
        error: err ? key : null,
      });
    };
  }
  submit() {
    const { check } = LoginPage;
    const s = this.state;

    let err = null;
    Object.keys(check).every((key) => {
      const res = check[key](s[key]);
      if (!res) err = key;
      return res;
    });

    if (err != null) {
      this.setState({ error: err });
    } else {
      this.props.dispatch({
        type: 'login/submit',
        payload: {
          username: s.username,
          password: s.password,
          remember: s.remember,
        },
      });
    }
  }
  render() {
    const { username, password, remember, error } = this.state;
    return (
      <div>
        <Header login={this.login} title={HeaderText} />
        <div styleName="input-container">
          <img src={logo} styleName="logo" role="presentation" />
          <div styleName="input">
            <LoginInput
              value={username}
              preIcon="user"
              change={this.usernameChange}
              placeholder="请您输入用户名"
              errText="请输入用户名"
              error={error === 'username'}
            />
          </div>
          <div styleName="input">
            <LoginInput
              value={password}
              preIcon="key"
              change={this.passwordChange}
              placeholder="请您输入密码"
              errText="输入密码格式有误"
              error={error === 'password'}
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
        <Footer fixed title={FooterText} />
      </div>
    );
  }
}
