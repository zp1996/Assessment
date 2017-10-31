import React, { Component } from 'react';
import { connect } from 'dva';
import CSSModules from 'react-css-modules';
import styles from './IndexPage.less';

@connect(
  state => ({
    example: state.example
  })
)
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
  };
  render() {
    const { example } = this.props;
    return (
      <div styleName="normal">
        <h1 styleName="title">Yay! Welcome to dva!</h1>
        <div styleName="welcome" />
        <h2>{`Hello ${example.name}`}</h2>
        <button onClick={this.changeName}>change name</button>
      </div>
    );
  }
}
