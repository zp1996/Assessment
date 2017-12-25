import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import CSSModules from 'react-css-modules';
import { Button, Table, Modal } from 'antd';
import Wrapper from 'components/Wrapper';
import Container from 'components/Container';
import { componentDidUpdate } from 'utils/index';
import styles from './index.less';

const confirm = Modal.confirm;

@connect(
  state => ({
    error: state.error,
    list: state.news.list,
    msg: state.news.msg,
  }),
)
@Wrapper('新闻媒体')
@CSSModules(styles, {
  allowMultiple: true,
})
export default class NewsPage extends Component {
  constructor(props) {
    super(props);

    this.columns = [{
      title: '新闻标题',
      dataIndex: 'title',
      key: 'title',
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
            <Link to={`/addnew?id=${record.key}`}>更改</Link>
            <span
              onClick={this.delete(record.key, record.title)}
              className="action-delete-btn"
            >删除</span>
          </span>
        );
      },
    }];

    this.toAddNew = this.toAddNew.bind(this);
    this.componentDidUpdate = componentDidUpdate('news');
  }
  delete(id, title) {
    return () => confirm({
      title: '是否删除该文章',
      content: title,
      onOk: () => {
        this.props.dispatch({ type: 'news/delete', id });
      },
    });
  }
  toAddNew() {
    this.props.dispatch({ type: 'news/resetArticle' });
    this.props.dispatch(routerRedux.push('/addnew'));
  }
  render() {
    return (
      <Container router="news">
        <div styleName="news-content">
          <div styleName="tool-nav">
            <Button type="primary" onClick={this.toAddNew}>新建</Button>
          </div>
          <Table columns={this.columns} dataSource={this.props.list} />
        </div>
      </Container>
    );
  }
}
