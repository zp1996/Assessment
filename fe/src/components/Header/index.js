import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './index.less';

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

Header.propTypes = {
  login: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default CSSModules(styles, {
  allowMultiple: true,
})(Header)
