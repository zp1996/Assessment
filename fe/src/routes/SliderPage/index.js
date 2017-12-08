import React, { Component } from 'react';
import { connect } from 'dva';
import CSSModules from 'react-css-modules';
import {
  Upload, Button, Row, Col,
  Icon, Input, Radio, Checkbox,
} from 'antd';
import Wrapper from 'components/Wrapper';
import Container from 'components/Container';
import PureRender from 'utils/pure-render';
import ToAdd from 'components/ToAdd';
import styles from './index.less';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const textType = 'text';

@connect(
  state => ({
    slider: state.slider,
    load: state.loading.global,
  }),
)
@PureRender
@Wrapper('宣传Banner')
@CSSModules(styles, {
  allowMultiple: true,
})
export default class SliderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: true,
      stitleType: textType,
      stitleText: '',
      style: ['white'],
    };
    this.add = this.change('adding', () => true);
    this.changeType = this.change('stitleType', e => e.target.value);
    this.changeStyle = this.change('style');
  }
  change(key, fn) {
    return (value) => {
      this.setState({
        [key]: fn ? fn(value) : value,
      });
    };
  }
  renderAddNew() {
    const { stitleType, style } = this.state;
    return (
      <div styleName="add-new">
        <ul styleName="add-new-list">
          <li>
            <div styleName="slider-img">
              <img role="presentation" src="http://www.yijiahe.com.cn/temp/slider_index_02.jpg" />
            </div>
          </li>
          <li>
            <Upload>
              <Button type="primary">
                <Icon type="upload" />
                <span>上传图片</span>
              </Button>
            </Upload>
          </li>
          <li styleName="title">
            <label styleName="title-label" htmlFor="title">Banner大标题：</label>
            <Input placeholder="填写Banner大标题" id="title" />
            <span styleName="stitle">
              <label styleName="title-label" htmlFor="stitle">Banner小标题：</label>
              <RadioGroup value={stitleType} onChange={this.changeType} id="stitle">
                <Radio value={textType}>文字</Radio>
                <Radio value="btn">按钮</Radio>
              </RadioGroup>
              {
                textType === stitleType ? (
                  <Input placeholder="填写文内容" />
                ) : (
                  <Input addonBefore="http://" />
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
        </ul>
      </div>
    );
  }
  render() {
    // adding ? this.renderAddNew() : (
    //   <ToAdd handle={this.add} />
    // )
    const { load } = this.props;
    // const { adding } = this.state;
    return (
      <div>
        <Container router="slider" load={load}>
          <div styleName="slider-content">
            {
              this.renderAddNew()
            }
            <ToAdd handle={this.add} />
          </div>
        </Container>
      </div>
    );
  }
}
