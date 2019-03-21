import React, { PureComponent, Fragment } from 'react';

import ResetFilter from './ResetFilter';
import SidebarTitle from '../SidebarTitle';
import SearchFilter from './SearchFilter';
import CategoryFilter from './CategoryFilter';
import DistrictFilter from './DistrictFilter';
import LocationFilter from './LocationFilter';
import AccessibilityFilter from './AccessibilityFilter';

class SidebarFilter extends PureComponent {
  render() {
    return (
      <Fragment>
        <SidebarTitle>
          Suche
        </SidebarTitle>
        <ResetFilter />
        <SearchFilter />
        <CategoryFilter />
        <DistrictFilter />
        <AccessibilityFilter />
        <LocationFilter />
      </Fragment>
    );
  }
}

export default SidebarFilter;
