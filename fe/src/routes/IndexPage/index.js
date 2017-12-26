import React, { Component } from 'react';
import { connect } from 'dva';
import CSSModules from 'react-css-modules';
import { Button, Modal, Input, Table, message } from 'antd';
import Wrapper from 'components/Wrapper';
import Container from 'components/Container';
import showError from 'components/ShowError';
import { changeState, domChange, componentDidUpdate } from 'utils/index';
import styles from './index.less';

const confirm = Modal.confirm;

const znData = {
  title: '导航文字',
  href: '导航链接',
};

const initState = () => ({
  title: '',
  href: '',
  show: false,
  id: null,
});

@connect(
  state => ({
    error: state.error,
    list: state.menu.list,
    msg: state.menu.msg,
  }),
)
@Wrapper('头部导航')
@CSSModules(styles, {
  allowMultiple: true,
})
export default class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = initState();
    this.keys = Object.keys(znData);
    this.columns = [{
      title: '导航文字',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '导航链接',
      dataIndex: 'href',
      key: 'href',
    }, {
      title: '最后更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <span className="action-wrapper">
            <span onClick={this.change(record.id)}>更改</span>
            <span
              className="action-delete-btn"
              onClick={this.delete(record.id, record.title)}
            >
              删除
            </span>
          </span>
        );
      },
    }];
    this.old = null;      // 存储更改前

    this.componentDidUpdate = componentDidUpdate('menu');
    this.show = changeState(this, 'show', () => true);
    this.hide = changeState(this, 'show', () => false);
    this.changeTitle = changeState(this, 'title', domChange);
    this.changeHref = changeState(this, 'href', domChange);
    this.submit = this.submit.bind(this);
  }
  change(id) {
    return () => {
      for (let i = 0, item; item = this.props.list[i++]; ) {     // eslint-disable-line
        if (item.id === id) {
          this.old = {
            title: item.title,
            href: item.href,
          };
          this.setState({ id, show: true, ...this.old });
          break;
        }
      }
    };
  }
  delete(id, title) {
    return () => confirm({
      title: '是否删除该导航',
      content: title,
      onOk: () => {
        this.props.dispatch({ type: 'menu/delete', id });
      },
    });
  }
  baseSave(type, payload) {
    this.props.dispatch({
      type: `menu/${type}`,
      payload,
    });
  }
  submit() {
    const s = this.state;
    let err = null;
    this.keys.every((key) => {
      const flag = this.state[key] !== '';
      if (!flag) err = key;
      return flag;
    });
    if (err == null) {
      if (s.id !== null) {
        const data = {};
        this.keys.forEach((key) => {
          if (s[key] !== this.old[key]) {
            data[key] = s[key];
          }
        });
        if (Object.keys(data).length) {
          this.baseSave('update', { id: s.id, data });
        } else {
          message.success('更改成功');
        }
      } else {
        this.baseSave('add', {
          title: s.title,
          href: s.href,
        });
      }
      this.setState(initState());
    } else {
      showError({
        code: 400,
        msg: `请输入${znData[err]}`,
      });
    }
  }
  render() {
    const { show, id, title, href } = this.state;
    const text = id ? '更改' : '新增';
    return (
      <Container router="index">
        <div styleName="menu-content">
          <div styleName="tool-nav">
            <Button type="primary" onClick={this.show}>新建</Button>
          </div>
          <Modal
            title={`${text}导航`} visible={show}
            onCancel={this.hide} onOk={this.submit}
          >
            <div styleName="modal-input-wrapper">
              <label htmlFor="modal-title">{`${znData.title}：`}</label>
              <Input
                placeholder={`请输入${znData.title}`} value={title}
                id="modal-title" onChange={this.changeTitle}
              />
            </div>
            <div styleName="modal-input-wrapper" className="modal-href">
              <label htmlFor="modal-url">导航链接：</label>
              <Input
                placeholder="请输入导航链接" value={href}
                addonBefore="http://" id="modal-href" onChange={this.changeHref}
              />
            </div>
          </Modal>
          <Table columns={this.columns} dataSource={this.props.list} />
        </div>
      </Container>
    );
  }
}
