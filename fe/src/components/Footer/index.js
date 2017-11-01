import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './index.less';

const base = 'footer';

/**
 * footer component
 * @param {string} title - 描述文字
 * @param {boolean} fixed - 是否需要固定定位
 */
function Footer({ title, fixed = false }) {
  const name = fixed ? `${base} fixed` : base;
  return (
    <footer styleName={name}>
      {title}
    </footer>
  );
}

Footer.propTypes = {
  fixed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default CSSModules(styles, {
  allowMultiple: true,
})(Footer)
