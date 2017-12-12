import React, { Component } from 'react';
import { connect } from 'dva';
import CSSModules from 'react-css-modules';
import Wrapper from 'components/Wrapper';
import Container from 'components/Container';
import PureRender from 'utils/pure-render';
import ToAdd from 'components/ToAdd';
import AddSliderItem from 'components/AddSliderItem';
import { changeState } from 'utils/index';
import styles from './index.less';

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
      adding: false,
    };
    this.add = changeState(this, 'adding', () => true);
    this.chanceAdd = changeState(this, 'adding', () => false);
  }
  render() {
    const { load, slider: { list } } = this.props;
    const { adding } = this.state;
    return (
      <Container router="slider" load={load}>
        <div styleName="slider-content">
          {
            Array.isArray(list) && list.map((l, i) => (
              <AddSliderItem data={l} key={i} />
            ))
          }
          {
            adding ? (
              <AddSliderItem addnew chance={this.chanceAdd} />
            ) : (
              <ToAdd handle={this.add} />
            )
          }
        </div>
      </Container>
    );
  }
}
