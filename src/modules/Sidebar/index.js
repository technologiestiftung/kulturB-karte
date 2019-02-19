import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';

import Menu from '~/components/Menu';

import SidebarFilter from './SidebarFilter';
import SidebarAnalysis from './SidebarAnalysis';
import SidebarList from './SidebarList';

const SidebarWrapper = styled.div`
  display: block;
  background: #fefefe;
  display: flex;
`;

const SidebarContent = styled.div`
  min-width: 300px;
  max-width: 300px;
  padding: 15px;
`;

class Sidebar extends PureComponent {
  render() {
    return (
      <SidebarWrapper>
        <Menu />
        <SidebarContent>
          <Route exact path="/" component={SidebarFilter} />
          <Route path="/analysis" component={SidebarAnalysis} />
          <Route path="/list" component={SidebarList} />
        </SidebarContent>
      </SidebarWrapper>
    );
  }
}

export default withRouter(Sidebar);
