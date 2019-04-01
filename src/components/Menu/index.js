import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { NavLink, withRouter, matchPath } from 'react-router-dom';

import ListIcon from '@material-ui/icons/FilterList';
import FilterIcon from '@material-ui/icons/Search';
import FavIcon from '@material-ui/icons/BookmarkBorder';
import AnalyseIcon from '@material-ui/icons/Equalizer';

import RoundButton from '~/components/RoundButton';
import { media } from '~/styles/Utils';

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-grow: 0;
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 1000;

  ${media.m`
    transform: ${props => (props.isMenuOpen ? 'translate3d(375px, 0, 0)' : 'none')};
    transition: transform 500ms;
  `}
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
    const isMenuOpen = matchPath(this.props.location.pathname, {
      path: ['/analyse', '/liste', '/suche', '/favoriten'],
    }) !== null;

    return (
      <MenuWrapper isMenuOpen={isMenuOpen}>
        <MenuItem exact to="/suche">
          <RoundButton title="Suche...">
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
        <MenuItem exact to="/analyse">
          <RoundButton>
            <AnalyseIcon />
          </RoundButton>
        </MenuItem>
      </MenuWrapper>
    );
  }
}

export default withRouter(Menu);
