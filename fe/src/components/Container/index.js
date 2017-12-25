import React from 'react';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { Breadcrumb } from 'antd';
import { contentMenu } from 'utils/config';
import styles from './index.less';

function itemRender(route, params, routes) {
  const last = routes.indexOf(route) === routes.length - 1;
  const className = last ? 'menu menu-active' : 'menu';
  const { path, breadcrumbName } = route;
  return (
    <span className={className}>
      {
        !last && path !== '' ? (
          <Link to={path}>{breadcrumbName}</Link>
        ) : breadcrumbName
      }
    </span>
  );
}

/**
 * Container component
 * @param {string} router - 页面路由
 # @param {object} children - 子组件
 */
function Container({ router, children }) {
  const list = contentMenu[router];
  if (process.env.NODE_ENV !== 'production') {
    if (!(
      Array.isArray(list) &&
      list.every(item => (
        item instanceof Object &&
        item.breadcrumbName &&
        typeof item.breadcrumbName === 'string'
      ))
    )) {
      throw new Error(`please check contentMenu.${router} in utils/config.js`);
    }
  }
  return (
    <div styleName="container">
      <div styleName="content-menu">
        <Breadcrumb itemRender={itemRender} routes={list} />
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
