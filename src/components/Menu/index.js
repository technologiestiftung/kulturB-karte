import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-grow: 0;
  background: #448AFF;
`;

const MenuItem = styled(NavLink).attrs({
  activeStyle: {
    background: '#2979FF',
  }
})`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-size: 13px;
`;

class Menu extends PureComponent {
  render() {
    return (
      <MenuWrapper>
        <MenuItem exact to="/">Filter</MenuItem>
        <MenuItem exact to="/analysis">Analyse</MenuItem>
        <MenuItem exact to="/list">Liste</MenuItem>
      </MenuWrapper>
    );
  }
}

export default withRouter(Menu);
