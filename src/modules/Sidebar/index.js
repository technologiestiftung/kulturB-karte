import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';

import Menu from '~/components/Menu';

import SidebarFilter from './SidebarFilter';
import SidebarAnalysis from './SidebarAnalysis';
import SidebarList from './SidebarList';
import SidebarDetail from './SidebarDetail';

const SidebarWrapper = styled.div`
  display: block;
  background: #fefefe;
  display: flex;
  box-shadow: ${props => props.theme.boxShadow};
  z-index: 1000;
`;

const SidebarContent = styled.div`
  min-width: 370px;
  max-width: 370px;
  padding: 20px 15px;
  overflow: auto;
`;

class Sidebar extends PureComponent {
  render() {
    return (
      <SidebarWrapper>
        <Menu />
        <SidebarContent>
          <SidebarDetail />
          <Route exact path="/" component={SidebarFilter} />
          <Route path="/analysis" component={SidebarAnalysis} />
          <Route path="/list" component={SidebarList} />
        </SidebarContent>
      </SidebarWrapper>
    );
  }
}

export default withRouter(Sidebar);
