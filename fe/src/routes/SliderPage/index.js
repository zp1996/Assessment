import React, { Component } from 'react';
import { connect } from 'dva';
import CSSModules from 'react-css-modules';
import { message } from 'antd';
import Wrapper from 'components/Wrapper';
import Container from 'components/Container';
import showError from 'components/ShowError';
import PureRender from 'utils/pure-render';
import ToAdd from 'components/ToAdd';
import AddSliderItem from 'components/AddSliderItem';
import { changeState } from 'utils/index';
import styles from './index.less';

@connect(
  state => ({
    slider: state.slider,
    load: state.loading.global,
    error: state.error,
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
      adding: false,
    };
    this.add = changeState(this, 'adding', () => true);
    this.chanceAdd = changeState(this, 'adding', () => false);
    this.addData = this.baseSave('slider/add');
    this.updateData = this.baseSave('slider/update');
    this.del = this.del.bind(this);
  }
  componentDidUpdate() {
    const { error, slider: { msg } } = this.props;
    if (error.err) {
      showError(error);
      error.err = false;
    } else if (msg !== '') {
      message.success(msg);
      this.props.slider.msg = '';
      // 关闭添加
      this.chanceAdd();
    }
  }
  baseSave(type) {
    return (payload) => {
      this.props.dispatch({
        type,
        payload,
      });
    };
  }
  del(id) {
    this.props.dispatch({
      type: 'slider/delete',
      id,
    });
  }
  render() {
    const { load, slider: { list } } = this.props;
    const { adding } = this.state;
    return (
      <Container router="slider" load={load}>
        <div styleName="slider-content">
          {
            Array.isArray(list) && list.map(l => (
              <AddSliderItem
                data={l} key={l._id}
                save={this.updateData} del={this.del}
              />
            ))
          }
          {
            adding ? (
              <AddSliderItem
                addnew del={this.del}
                save={this.addData} chance={this.chanceAdd}
              />
            ) : (
              <ToAdd handle={this.add} />
            )
          }
        </div>
      </Container>
    );
  }
}
