import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { Input, Icon } from 'antd';
import styles from './index.less';

/**
 * 对antd的input的表单的再次封装
 */
@CSSModules(styles, {
  allowMultiple: true,
})
class LoginInput extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    preIcon: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    errText: PropTypes.string,
    type: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.clear = this.clear.bind(this);
  }
  check(val) {
    const { pattern } = this.props;
    return pattern ? !pattern.test(val) : ( val === '' );
  }
  change(val) {
    this.props.change({
      val,
      err: this.check(val)
    });
  }
  onChange(e) {
    this.change(e.target.value);
  }
  clear() {
    this.node.focus();
    this.change('');
  }
  render() {
    const {
      value = '', placeholder = '', preIcon,
      error, errText = '', type = 'text'
    } = this.props;
    const suffix = value ? (
      <Icon type="close-circle" onClick={this.clear} />
    ) : null;
    const styleName = error ? "err-input" : "";
    return (
      <div>
        <Input
          styleName={styleName}
          placeholder={placeholder}
          prefix={<Icon type={preIcon} /> }
          suffix={suffix}
          value={value}
          onChange={this.onChange}
          type={type}
          ref={node => this.node = node}
        />
        <p styleName="error">
          {
            error ? errText : ''
          }
        </p>
      </div>
    );
  }
}

export default LoginInput;
