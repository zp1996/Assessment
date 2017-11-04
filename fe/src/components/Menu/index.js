import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

const { Item, SubMenu } = Menu;

export default class MenuComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ width: 240, float: 'left' }}>
        <Menu
          defaultSelectedKeys={['tags']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <Item key="tags">
            <Icon type="tags" />
            <span>指标体系</span>
          </Item>
          <SubMenu key="sub1" title={
            <span>
              <Icon type="user" />
              <span>教职人员</span>
            </span>
          }>
            <Item key="2">院系正职</Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
