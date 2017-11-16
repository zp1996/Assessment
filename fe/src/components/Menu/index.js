import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import { router, routerOrder } from 'utils/config';

const { Item, SubMenu } = Menu;

@connect(
  state => ({
    routing: state.routing,
  }),
)
export default class MenuComponent extends Component {
  static uniqueMenu({ key, icon, text }) {
    return (
      <Item key={key}>
        <Icon type={icon} />
        <span>{text}</span>
      </Item>
    );
  }
  static subMenu({ key, icon, text, children }) {
    return (
      <SubMenu
        key={key} title={
          <span>
            <Icon type={icon} />
            <span>{text}</span>
          </span>
      }
      >
        {
          children.map(c => (
            <Item key={c.key}>{c.text}</Item>
          ))
        }
      </SubMenu>
    );
  }
  render() {
    const { location: { pathname } } = this.props.routing;
    return (
      <div style={{ width: 240, float: 'left' }}>
        <Menu
          defaultSelectedKeys={[router[pathname].key]}
          defaultOpenKeys={['users']}
          mode="inline"
        >
          {
            routerOrder.map((k) => {
              const r = router[k];
              return r.children ?
                MenuComponent.subMenu(router[k]) :
                MenuComponent.uniqueMenu(router[k]);
            })
          }
        </Menu>
      </div>
    );
  }
}
