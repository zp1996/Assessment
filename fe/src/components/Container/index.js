import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { Breadcrumb } from 'antd';
import { contentMenu } from 'utils/config';
import styles from './index.less';

/**
 * Container component
 * @param {string} router - 页面路由
 # @param {object} children - 子组件
 */
function Container({ router, children, load }) {
  console.log(load, 'Container');
  const list = contentMenu[router];
  if (process.env.NODE_ENV !== 'production') {
    if (!(
      Array.isArray(list) &&
      list.every(item => (
        item instanceof Object && item.text && typeof item.text === 'string'
      ))
    )) {
      throw new Error(`please check contentMenu.${router} in utils/config.js`);
    }
  }
  return (
    <div styleName="container">
      <div styleName="content-menu">
        <Breadcrumb>
          {
            list.map((l, i) => {
              const last = i === list.length - 1;
              const { href = '', text } = l;
              const styleName = last ? 'menu menu-active' : 'menu';
              /* eslint-disable no-script-url */
              const url = last ? 'javascript:void(0)' : href;
              return (
                <Breadcrumb.Item href={url} key={text}>
                  <span styleName={styleName}>{text}</span>
                </Breadcrumb.Item>
              );
            })
          }
        </Breadcrumb>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

Container.propTypes = {
  router: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default CSSModules(styles, {
  allowMultiple: true,
})(Container);
