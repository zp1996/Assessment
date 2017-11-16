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
  '/demo': {
    key: 'users',
    icon: 'user',
    text: '教职人员',
    children: [
      { key: '2', text: '院系正职' },
    ],
  },
};
export const routerOrder = ['/', '/demo'];
