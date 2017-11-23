import React, { Component } from 'react';
import { connect } from 'dva';
import CSSModules from 'react-css-modules';
import Wrapper from 'components/Wrapper';
import Container from 'components/Container';
import styles from './index.less';

@connect(
  state => ({
    example: state.example,
  }),
)
@Wrapper('头部导航')
@CSSModules(styles, {
  allowMultiple: true,
})
export default class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.changeName = this.changeName.bind(this);
  }
  changeName() {
    this.props.dispatch({
      type: 'example/fetch',
      payload: { name: 'zp' },
    });
  }
  render() {
    const { example } = this.props;
    console.log(example);
    return (
      <div styleName="normal">
        <Container router="index">
          <h1>Hello world</h1>
        </Container>
      </div>
    );
  }
}
