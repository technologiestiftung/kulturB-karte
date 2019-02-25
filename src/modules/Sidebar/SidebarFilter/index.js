import React, { PureComponent } from 'react';

import CategoryFilter from './CategoryFilter';
import DistrictFilter from './DistrictFilter';

class SidebarFilter extends PureComponent {
  render() {
    return (
      <div>
        <CategoryFilter />
        <DistrictFilter />
      </div>
    );
  }
}

export default SidebarFilter;
