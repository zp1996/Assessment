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
  '/demo': {
    key: 'users',
    icon: 'user',
    text: '教职人员',
    children: [
      { key: '2', text: '院系正职' },
    ],
  },
};
export const routerOrder = ['/', '/demo', '/slider', '/tab'];
/**
 * 内容区导航
 * key为路由,value为期望导航(shape({text, href}) of array)
 */
export const contentMenu = {
  index: [
    { text: '头部导航' },
    { text: '一级导航' },
  ],
  slider: [
    { text: '宣传Banner' },
  ],
};
