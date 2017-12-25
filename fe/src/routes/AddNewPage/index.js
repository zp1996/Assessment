import React, { Component } from 'react';
import { connect } from 'dva';
import CSSModules from 'react-css-modules';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Button, Input, Upload, Icon, message } from 'antd';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import Wrapper from 'components/Wrapper';
import Container from 'components/Container';
import showError from 'components/ShowError';
import {
  changeState, domChange, handleUploadRes, componentDidUpdate,
} from 'utils/index';
import { addNewData } from 'utils/config';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './index.less';

@connect(
  state => ({
    article: state.news.article,
    error: state.error,
    search: state.routing.location.search,
    msg: state.news.msg,
  }),
)
@Wrapper('发布新闻')
@CSSModules(styles, {
  allowMultiple: true,
})
export default class NewsPage extends Component {
  static znData = {
    title: '新闻标题',
    des: '新闻描述',
    img: '封面图片',
  };
  constructor(props) {
    super(props);

    this.state = addNewData();

    this.keys = Object.keys(NewsPage.znData);
    this.id = null;

    this.changeContent = changeState(this, 'content');
    this.changeTitle = changeState(this, 'title', domChange);
    this.changeDes = changeState(this, 'des', domChange);
    this.changeImg = changeState(this, 'img', handleUploadRes(showError));
    this.submit = this.submit.bind(this);
    this.upload = this.upload.bind(this);
    this.componentDidUpdate = componentDidUpdate('news');
  }
  /* eslint-disable */
  componentWillUpdate(nextProps, nextState) {
    const { _id, data } = nextProps.article;
    // 获取数据成功
    if (this.props.search !== '' && _id !== '' && this.id == null) {
      this.id = _id;
      const content = stateFromHTML(data.content);
      nextState = Object.assign(
        nextState,
        data,
        { content: EditorState.createWithContent(content) },
      );
    }
  }
  upload(file) {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append('file', file);
      data.file = file;

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/upload');
      xhr.send(data);

      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        if (response.code !== 200) {
          reject();
          showError(response);
        } else {
          resolve({
            data: { link: response.msg.url }
          });
        }
      });

      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  }
  submit() {
    const content = this.state.content.getCurrentContent();
    const html = stateToHTML(content);
    if (html !== '<p><br></p>') {
      const res = this.keys.every((key) => {
        const flag = this.state[key] !== '';
        if (!flag) {
          showError({
            code: 400,
            msg: `请输入${NewsPage.znData[key]}`,
          });
        }
        return flag;
      });
      if (res) {
        if (this.id == null) {
          this.toSubmit('add', {
            content: html,
            title: this.state.title,
            des: this.state.des,
            img: this.state.img,
          });
        } else {
          const { article: { data } } = this.props;
          const payload = {};

          if (html !== data.content) {
            payload.content = html;
          }
          this.keys.forEach((key) => {
            if (data[key] !== this.state[key]) {
              payload[key] = this.state[key];
            }
          });

          if (Object.keys(payload).length !== 0) {
            this.toSubmit('update', { id: this.id, data: payload });
          } else {
            message.success('更改成功！');
          }
        }
      }
    } else {
      showError({
        code: 400,
        msg: '请输入文章内容',
      });
    }
  }
  toSubmit(type, payload) {
    this.props.dispatch({
      type: `news/${type}`,
      payload,
    });
  }
  render() {
    const { title, des, content, img } = this.state;
    return (
      <Container router="addnew">
        <div styleName="addnew-content">
          <ul styleName="title-ul">
            <li styleName="title">
              <span styleName="label">新闻题目：</span>
              <Input placeholder="请输入新闻题目" value={title} onChange={this.changeTitle} />
            </li>
            <li styleName="des">
              <span styleName="label">新闻摘要：</span>
              <Input.TextArea value={des} placeholder="请输入新闻摘要" onChange={this.changeDes} />
            </li>
            <li>
              <span styleName="label">封面图片：</span>
              <Upload className="news-img" action="/api/upload"
                name="file" onChange={this.changeImg}
              >
                <Button type="primary">
                  <Icon type="upload" /> {img ? '更改' : '上传'}图片
                </Button>
              </Upload>
            </li>
            <li styleName="img-area">
              {
                img ? (
                  <img src={img} styleName="img" />
                ) : (
                  <span styleName="img-span">建议尺寸500 * 300</span>
                )
              }
            </li>
          </ul>
          <div>
            <Editor editorState={content}
              toolbar={{
                image: {
                  uploadCallback: this.upload,
                  alt: { present: true, mandatory: true },
                }
              }}
              onEditorStateChange={this.changeContent}
            />
          </div>
          <div styleName="submit-area">
            <Button type="primary" onClick={this.submit}>提交</Button>
          </div>
        </div>
      </Container>
    );
  }
}
