import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { HeaderText, FooterText } from 'utils/config';
import CSSModules from 'react-css-modules';
import Header from '../Header';
import Footer from '../Footer';
import Menu from '../Menu';
import styles from './index.less';

/**
 * page layout
 */
function Wrapper(title) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof title !== 'string' || title == '') {
      throw new Error('please give a page title');
    }
  }
  return function(WrappedComponent) {
    @CSSModules(styles, {
      allowMultiple: true,
    })
    class WrapperComponent extends Component {
      static displayName = `HOC(${WrappedComponent.displayName})`;
      constructor(props) {
        super(props);
        this.login = Boolean(window.__login__);
      }
      render() {
        return (
          <DocumentTitle title={title}>
            <div styleName="wrapper">
              <Header login={this.login} title={HeaderText} />
              <div styleName="main">
                <Menu />
                <div styleName="content">
                  <WrappedComponent {...this.props} />
                </div>
              </div>
              <Footer fixed={false} title={FooterText} />
            </div>
          </DocumentTitle>
        );
      }
    }
    return WrapperComponent;
  };
}

export default Wrapper;
