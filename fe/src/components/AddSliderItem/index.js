import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import {
  Upload, Button, Row, Col,
  Icon, Input, Radio, Checkbox,
} from 'antd';
import { changeState, domChange } from 'utils/index';
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
    data: {},
  };
  constructor(props) {
    super(props);

    this.initState();

    this.changeType = changeState(this,
      ['stitleType', 'stitle'], {
        stitleType: domChange,
        stitle: () => '',
      },
    );
    this.changeStyle = changeState(this, 'style');
    this.changeTitle = changeState(this, 'title', domChange);
    this.changeStitle = changeState(this, 'stitle', domChange);
  }
  initState() {
    const { data = {} } = this.props;
    if (data.btn) {
      data.stitleType = types.btn;
      data.stitle = data.btn.url;
    } else {
      data.stitleType = types.text;
    }
    delete data.btn;

    this.state = data;
  }
  render() {
    const { url, title = '', stitle = '', stitleType, style } = this.state;
    const { addnew, chance } = this.props;
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
            <Upload>
              <Button type="primary">
                <Icon type="upload" />
                <span>{ url ? '更改图片' : '上传图片'}</span>
              </Button>
            </Upload>
          </li>
          <li styleName="title">
            <label styleName="title-label" htmlFor="title">Banner大标题：</label>
            <Input
              placeholder="填写Banner大标题" id="title" value={title}
              onChange={this.changeTitle}
            />
            <span styleName="stitle">
              <label styleName="title-label" htmlFor="stitle">Banner小标题：</label>
              <RadioGroup value={stitleType} onChange={this.changeType} id="stitle">
                <Radio value={types.text}>文字</Radio>
                <Radio value={types.btn}>按钮</Radio>
              </RadioGroup>
              {
                types.text === stitleType ? (
                  <Input
                    placeholder="请填写小标题内容" value={stitle}
                    onChange={this.changeStitle}
                  />
                ) : (
                  <Input
                    addonBefore="http://" value={stitle}
                    onChange={this.changeStitle}
                  />
                )
              }
            </span>
          </li>
          <li styleName="style">
            <label styleName="title-label" htmlFor="style">标题文字样式：</label>
            <div className="slider-style-chechbox">
              <CheckboxGroup value={style} onChange={this.changeStyle} id="style">
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
            <Row>
              <Col><Button type="primary">保存</Button></Col>
              {
                addnew && (
                  <Col><Button onClick={chance}>取消</Button></Col>
                )
              }
            </Row>
          </li>
        </ul>
      </div>
    );
  }
}
