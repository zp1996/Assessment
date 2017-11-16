import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './index.less';

const storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
});
/**
 * header component
 * @param {string} title - 描述文字
 * @param {boolean} login - 是否登录
 */
function Header({ title, login = false }) {
  return (
    <header styleName="header">
      <h4 styleName="title">{title}</h4>
    </header>
  );
}

export default CSSModules(styles, {
  allowMultiple: true,
})(Header);
