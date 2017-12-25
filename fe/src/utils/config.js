import { EditorState } from 'draft-js';

// 头部文案
export const HeaderText = '企业官网配置后台';
// 底部文案
export const FooterText = '© 2017 NCEPU LsgoGroup provide technical support';
// 路由与侧边栏active映射
export const router = {
  '/': {
    key: 'tags',
    icon: 'tags',
    text: '头部导航',
  },
  '/introduction': {
    key: 'introductions',
    icon: 'pushpin',
    text: '公司及网站信息',
  },
  '/slider': {
    key: 'sliders',
    icon: 'switcher',
    text: '宣传Banner',
  },
  '/tab': {
    key: 'tabs',
    icon: 'layout',
    text: '产品Tab',
  },
  '/new': {
    key: 'new',
    icon: 'notification',
    text: '新闻媒体',
  },
  '/addnew': {
    key: 'new',
  },
};
export const routerOrder = ['/introduction', '/', '/slider', '/tab', '/new'];
/**
 * 内容区导航
 * key为路由,value为期望导航(shape({text, href}) of array)
 */
export const contentMenu = {
  index: [
    { breadcrumbName: '头部导航' },
    { breadcrumbName: '一级导航' },
  ],
  slider: [
    { breadcrumbName: '宣传Banner' },
  ],
  introduction: [
    { breadcrumbName: '公司及网站信息' },
  ],
  news: [
    { breadcrumbName: '新闻媒体' },
    { breadcrumbName: '新闻列表' },
  ],
  addnew: [
    { breadcrumbName: '新闻媒体', path: '/new' },
    { breadcrumbName: '发布新闻' },
  ],
};
/**
 * 公司介绍默认数据
 */
export const data = {
  name: '',
  enName: '',
  address: '',
  record: '',
  copyright: '',
  introduction: '',
  zip: '',
  email: '',
  phone: '',
  fax: '',
  logo: '',
};
/**
 * Slider默认数据
 */
export const sliderData = {
  url: '',
  title: '',
  type: 'text',
  stitle: '',
  style: [],
};
/**
 * 添加文章默认数据
 */
export function addNewData() {
  return {
    content: EditorState.createEmpty(),
    title: '',
    des: '',
    img: '',
  };
}
