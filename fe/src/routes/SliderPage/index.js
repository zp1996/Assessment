import React, { Component } from 'react';
import { connect } from 'dva';
import CSSModules from 'react-css-modules';
import Wrapper from 'components/Wrapper';
import Container from 'components/Container';
import PureRender from 'utils/pure-render';
import ToAdd from 'components/ToAdd';
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
    this.add = this.add.bind(this);
  }
  add() {
    this.setState({
      adding: true,
    });
  }
  renderAddNew() {
    return (
      <h1>hello world</h1>
    );
  }
  render() {
    const { load } = this.props;
    const { adding } = this.state;
    return (
      <div>
        <Container router="slider" load={load}>
          <div styleName="slider-content">
            {
              adding ? this.renderAddNew() : (
                <ToAdd handle={this.add} />
              )
            }
          </div>
        </Container>
      </div>
    );
  }
}
