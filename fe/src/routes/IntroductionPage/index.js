import React, { Component } from 'react';
import { connect } from 'dva';
import CSSModules from 'react-css-modules';
import { Upload, Input, Button, Icon, message } from 'antd';
import Wrapper from 'components/Wrapper';
import Container from 'components/Container';
import showError from 'components/ShowError';
import { changeState, domChange } from 'utils/index';
import { data } from 'utils/config';
import styles from './index.less';

const { TextArea } = Input;

@connect(
  state => ({
    introduction: state.introduction,
    load: state.loading.global,
    error: state.error,
  }),
)
@Wrapper('公司及网站信息')
@CSSModules(styles, {
  allowMultiple: true,
})
export default class IntroductionPage extends Component {
  static znData = {
    name: '公司名',
    enName: '公司英文名',
    address: '公司地址',
    introduction: '公司介绍',
    record: '网站备案',
    copyright: '网站版权',
    zip: '公司邮编',
    phone: '联系电话',
    email: 'Email',
    fax: '公司传真',
    logo: '公司logo',
  };
  constructor(props) {
    super(props);

    this.state = {
      ...data,
      change: false,
      err: null,
    };
    this.keys = Object.keys(data);

    this.submit = this.submit.bind(this);
    this.chance = this.chance.bind(this);
    this.changeStatus = changeState(this, 'change', () => true);
    this.changeLogo = changeState(this, 'logo', (info) => {
      const { file: { status, response } } = info;
      if (status === 'done') {
        if (response.code === 200) {
          return response.msg.url;
        } else {
          showError(response);
        }
      }
    });
    this.keys.forEach((key) => {
      this[`change${key}`] = changeState(this, key, domChange);
    });
  }
  /* eslint-disable */
  componentWillUpdate(nextProps, nextState) {
    const d = nextProps.introduction.data;
    // 获取数据成功
    if (d.name !== '' && nextState.name === '') {
      nextState = Object.assign(nextState, d);
    }
  }
  componentDidUpdate() {
    const { err } = this.state;
    const d = this.props.introduction;
    if (err) {
      showError({
        code: 400,
        msg: `请输入${err}！`,
      });
      // 不更新ui
      this.state.err = null;
    } else if (d.success) {
      message.success('更改成功！');
      d.success = false;
    } else if (this.props.error.err) {
        showError(this.props.error);
        // 不更新ui
        this.props.error.err = false;
    }
  }
  submit() {
    const res = this.keys.every((key) => {
      const flag = this.state[key] !== '';
      if (!flag) {
        this.setState({ err: IntroductionPage.znData[key] });
      }
      return flag;
    });
    if (res) {
      const type = this.props.introduction.id == null ? 'add' : 'update';
      this.props.dispatch({
        type: `introduction/${type}`,
        payload: this.state,
      });
    }
  }
  chance() {
    const { data: d } = this.props.introduction;
    // 重置数据
    this.setState({
      change: false,
      ...d,
    });
  }
  renderInput(key, label) {
    const { change } = this.state;
    const value = this.state[key];
    const id = `introd-${key}`;
    return (
      <div styleName="input-wrapper">
        <label styleName="input-label" htmlFor={id}>{label}：</label>
        <Input
          id={id}
          placeholder={`请输入${label}`} value={value}
          disabled={!change}
          onChange={this[`change${key}`]}
        />
      </div>
    );
  }
  render() {
    const { change, introduction, logo } = this.state;
    const { znData: t } = IntroductionPage;
    return (
      <Container router="introduction">
        <div>
          <div styleName="wrapper">
            <div styleName="left-wrapper">
              {this.renderInput('name', t.name)}
              {this.renderInput('enName', t.enName)}
              {this.renderInput('address', t.address)}
              {this.renderInput('zip', t.zip)}
              <div styleName="input-wrapper">
                <label styleName="input-label" htmlFor="introd-introd">
                  {t.introduction}：
                </label>
                <TextArea
                  id="introd-introd"
                  placeholder={`请输入${t.introduction}`} autosize
                  onChange={this.changeintroduction}
                  value={introduction} disabled={!change}
                />
              </div>
            </div>
            <div styleName="right-wrapper">
              {this.renderInput('phone', t.phone)}
              {this.renderInput('fax', t.fax)}
              {this.renderInput('email', t.email)}
              {this.renderInput('record', t.record)}
              {this.renderInput('copyright', t.copyright)}
              <div styleName="input-wrapper">
                {
                  logo ? (
                    <img src={logo} styleName="img-logo" />
                  ) : (
                    <span styleName="img-area">
                      <Icon type="plus" />
                    </span>
                  )
                }
                <Upload action="/api/upload" name="file" onChange={this.changeLogo}>
                  <Button type="primary" disabled={!change}>
                    <Icon type="upload" />
                    <span>{ logo ? '更改图片' : '上传图片'}</span>
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
          <div styleName="button-area">
            {
              change ? (
                <div>
                  <Button type="primary" onClick={this.submit}>保存</Button>
                  <Button onClick={this.chance}>取消</Button>
                </div>
              ) : (
                <Button type="primary" onClick={this.changeStatus}>更改</Button>
              )
            }
          </div>
        </div>
      </Container>
    );
  }
}
