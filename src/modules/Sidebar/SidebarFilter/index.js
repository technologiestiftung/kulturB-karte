import React, { PureComponent, Fragment } from 'react';

import SidebarTitle from '../SidebarTitle';
import SearchFilter from './SearchFilter';
import CategoryFilter from './CategoryFilter';
import DistrictFilter from './DistrictFilter';
import LocationFilter from './LocationFilter';

class SidebarFilter extends PureComponent {
  render() {
    return (
      <Fragment>
        <SidebarTitle>
          Kultureinrichtungen in Berlin
        </SidebarTitle>
        <SearchFilter />
        <CategoryFilter />
        <DistrictFilter />
        <LocationFilter />
      </Fragment>
    );
  }
}

export default SidebarFilter;
