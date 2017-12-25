import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Wrapper from 'components/Wrapper';
import Container from 'components/Container';
import styles from './index.less';

@Wrapper('产品Tab')
@CSSModules(styles, {
  allowMultiple: true,
})
export default class NewsPage extends Component {
  render() {
    console.log(this);
    return (
      <Container router="news">
        <div>
          <h1>Hello World</h1>
        </div>
      </Container>
    );
  }
}
