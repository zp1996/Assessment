import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import {
  Upload, Button, Row, Col, message,
  Icon, Input, Radio, Checkbox,
} from 'antd';
import showError from 'components/ShowError';
import { changeState, domChange, handleUploadRes } from 'utils/index';
import { sliderData } from 'utils/config';
import styles from './index.less';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const types = {
  text: 'text',
  btn: 'btn',
};

@CSSModules(styles, {
  allowMultiple: true,
})
export default class AddSliderItem extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  static defaultProps = {
    data: { ...sliderData },
  };
  static znData = {
    url: '请上传图片',
    title: '请填写大标题',
    stitle: '请填写小标题内容',
    style: '请选择文字样式',
    type: '请选择小标题类型',
  };
  constructor(props) {
    super(props);

    this.state = this.initState();

    this.changeType = changeState(this,
      ['type', 'stitle'], {
        type: domChange,
        stitle: () => '',
      },
    );
    this.changeStyle = changeState(this, 'style');
    this.changeTitle = changeState(this, 'title', domChange);
    this.changeStitle = changeState(this, 'stitle', domChange);
    this.changeUrl = changeState(this, 'url', handleUploadRes(showError));
    this.submit = this.submit.bind(this);
    this.del = this.del.bind(this);

    if (this.state.nochange != null) {
      this.changeNoChange = changeState(this, 'nochange', () => false);
      this.chance = () => {
        this.setState({
          nochange: true,
          ...this.initState(),
        });
      };
    } else {
      this.chance = props.chance;
    }
  }
  componentDidUpdate() {
    const { err } = this.state;
    if (err) {
      showError({
        code: 400,
        msg: err,
      });
      this.state.err = null;
    }
  }
  initState() {
    const { data, addnew } = this.props;

    if (!addnew) data.nochange = true;

    data.err = null;

    return data;
  }
  addPayload(payload, key, data) {
    payload[key] = data;
  }
  updatePayload(payload, key, data) {
    if (data !== this.props.data[key]) {
      payload[key] = data;
    }
  }
  del() {
    this.props.del(this.state._id);
  }
  submit() {
    const payload = {};
    const { addnew } = this.props;
    const type = addnew ? 'add' : 'update';
    const res = Object.keys(sliderData).every((key) => {
      const data = this.state[key];
      this[`${type}Payload`](payload, key, data);
      const flag = Array.isArray(data) ? data.length !== 0 : data !== '';
      if (!flag) {
        this.setState({ err: AddSliderItem.znData[key] });
      }
      return flag;
    });
    if (res) {
      // 数据不更新,不触发
      if (Object.keys(payload).length === 0) {
        message.success('更新成功');
      } else {
        if (!addnew) {
          payload._id = this.state._id;       // eslint-disable-line
        }
        this.props.save(payload);
      }
    }
    this.setState({ nochange: true });
  }
  render() {
    const { url, title = '', stitle = '', type, style, nochange } = this.state;
    const { addnew } = this.props;
    return (
      <div styleName="add-new">
        <ul styleName="add-new-list">
          <li>
            <div styleName="slider-img">
              {
                url ? (
                  <img role="presentation" src={url} />
                ) : (
                  <div styleName="img-area">图片建议尺寸1920 * 625</div>
                )
              }
            </div>
          </li>
          <li>
            <Upload action="/api/upload" name="file" onChange={this.changeUrl}>
              <Button type="primary" disabled={nochange}>
                <Icon type="upload" />
                <span>{ url ? '更改图片' : '上传图片'}</span>
              </Button>
            </Upload>
          </li>
          <li styleName="title">
            <label styleName="title-label" htmlFor="title">Banner大标题：</label>
            <Input
              placeholder="填写Banner大标题" id="title" value={title}
              onChange={this.changeTitle} disabled={nochange}
            />
            <span styleName="stitle">
              <label styleName="title-label" htmlFor="stitle">Banner小标题：</label>
              <RadioGroup
                value={type} onChange={this.changeType}
                id="stitle" disabled={nochange}
              >
                <Radio value={types.text}>文字</Radio>
                <Radio value={types.btn}>按钮</Radio>
              </RadioGroup>
              {
                types.text === type ? (
                  <Input
                    placeholder="请填写小标题内容" value={stitle}
                    onChange={this.changeStitle} disabled={nochange}
                  />
                ) : (
                  <Input
                    addonBefore="http://" value={stitle}
                    onChange={this.changeStitle} disabled={nochange}
                  />
                )
              }
            </span>
          </li>
          <li styleName="style">
            <label styleName="title-label" htmlFor="style">标题文字样式：</label>
            <div className="slider-style-chechbox">
              <CheckboxGroup
                value={style} onChange={this.changeStyle}
                disabled={nochange} id="style"
              >
                <Row>
                  <Col><Checkbox value="center">center</Checkbox></Col>
                  <Col><Checkbox value="big">big</Checkbox></Col>
                  <Col><Checkbox value="white">white</Checkbox></Col>
                  <Col><Checkbox value="dark">dark</Checkbox></Col>
                </Row>
              </CheckboxGroup>
            </div>
          </li>
          <li className="submit">
            {
              nochange != null && nochange === true ? (
                <Row>
                  <Col>
                    <Button type="primary" onClick={this.changeNoChange}>更改</Button>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col>
                    <Button type="primary" onClick={this.submit}>保存</Button>
                  </Col>
                  {
                    !addnew && (
                      <Col><Button type="primary" onClick={this.del}>删除</Button></Col>
                    )
                  }
                  <Col><Button onClick={this.chance}>取消</Button></Col>
                </Row>
              )
            }
          </li>
        </ul>
      </div>
    );
  }
}
