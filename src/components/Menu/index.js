import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';

import ListIcon from '@material-ui/icons/FilterList';
import FilterIcon from '@material-ui/icons/Search';
import FavIcon from '@material-ui/icons/BookmarkBorder';

import RoundButton from '~/components/RoundButton';

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-grow: 0;
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 1000;
`;

const MenuItem = styled(NavLink)`
  margin-bottom: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// const MenuLabel = styled.div`
//   z-index: 1000;
//   border-radius: ${props => props.theme.borderRadius};
//   color: #000;
//   background: rgba(255, 255, 255, .5);
//   font-size: 10px;
//   padding: 3px 5px 3px 5px;
//   text-decoration: none !important;
// `;

class Menu extends PureComponent {
  render() {
    return (
      <MenuWrapper>
        <MenuItem exact to="/suche">
          <RoundButton>
            <FilterIcon />
          </RoundButton>
        </MenuItem>
        <MenuItem exact to="/liste">
          <RoundButton>
            <ListIcon />
          </RoundButton>
        </MenuItem>
        <MenuItem exact to="/favoriten">
          <RoundButton>
            <FavIcon />
          </RoundButton>
        </MenuItem>
      </MenuWrapper>
    );
  }
}

export default withRouter(Menu);
