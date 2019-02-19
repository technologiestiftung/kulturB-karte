import React, { PureComponent } from 'react';

import CategoryFilter from './CategoryFilter';

class SidebarFilter extends PureComponent {
  render() {
    return (
      <div>
        <CategoryFilter />
      </div>
    );
  }
}

export default SidebarFilter;
