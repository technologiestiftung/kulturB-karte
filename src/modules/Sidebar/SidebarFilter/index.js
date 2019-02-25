import React, { PureComponent, Fragment } from 'react';

import SidebarDetail from '../SidebarDetail';
import SearchFilter from './SearchFilter';
import CategoryFilter from './CategoryFilter';
import DistrictFilter from './DistrictFilter';

class SidebarFilter extends PureComponent {
  render() {
    return (
      <Fragment>
        <SearchFilter />
        <SidebarDetail />
        <CategoryFilter />
        <DistrictFilter />
      </Fragment>
    );
  }
}

export default SidebarFilter;
