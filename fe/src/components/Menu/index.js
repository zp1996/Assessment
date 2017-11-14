import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import { router } from 'utils/config';

const { Item, SubMenu } = Menu;

@connect(
  state => ({
    routing: state.routing,
  }),
)
export default class MenuComponent extends Component {
  render() {
    const { location: { pathname } } = this.props.routing;
    return (
      <div style={{ width: 240, float: 'left' }}>
        <Menu
          defaultSelectedKeys={[router[pathname]]}
          defaultOpenKeys={['users']}
          mode="inline"
        >
          <Item key="tags">
            <Icon type="tags" />
            <span>指标体系</span>
          </Item>
          <SubMenu
            key="users" title={
              <span>
                <Icon type="user" />
                <span>教职人员</span>
              </span>
          }
          >
            <Item key="2">院系正职</Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
