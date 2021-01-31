import { Menu } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

interface MenuInfo {
  key: React.Key;
  keyPath: React.Key[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement>;
}

const { Item } = Menu;

const MenuComponent: React.FC = () => {
  const { push } = useHistory();
  const onMenuClick = (e: MenuInfo) => {
    push(`${e.key}`);
  };

  return (
    <Menu theme="dark" mode="horizontal" onClick={onMenuClick}>
      <Item key="/">Back</Item>
      <Item key="/history">History</Item>
    </Menu>
  );
};

export default MenuComponent;
