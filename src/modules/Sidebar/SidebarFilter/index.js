import React, { PureComponent, Fragment } from 'react';

import CategoryFilter from './CategoryFilter';
import DistrictFilter from './DistrictFilter';

class SidebarFilter extends PureComponent {
  render() {
    return (
      <Fragment>
        <CategoryFilter />
        <DistrictFilter />
      </Fragment>
    );
  }
}

export default SidebarFilter;
