import React, { PureComponent, Fragment } from 'react';

import SidebarDetail from '../SidebarDetail';
import SidebarTitle from '../SidebarTitle';
import CategoryFilter from '../SidebarFilter/CategoryFilter';

class SidebarAnalysis extends PureComponent {
  render() {
    return (
      <Fragment>
        <SidebarTitle>Analyse</SidebarTitle>
        <CategoryFilter />
        <SidebarDetail />
      </Fragment>
    );
  }
}

export default SidebarAnalysis;
