import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { Icon } from 'antd';
import styles from './index.less';

/**
 * 待添加占位
 * @param {function} handle - 点击后触发函数
 */
const ToAdd = ({ handle }) => {
  return (
    <div styleName="to-add" onClick={handle}>
      <Icon type="plus" />
    </div>
  );
};

ToAdd.propTypes = {
  handle: PropTypes.func.isRequired,
};

export default CSSModules(styles, {
  allowMultiple: true,
})(ToAdd);
