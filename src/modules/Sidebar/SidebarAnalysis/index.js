import React, { PureComponent, Fragment } from 'react';

import SidebarTitle from '../SidebarTitle';
import CategoryFilter from '../SidebarFilter/CategoryFilter';
import DistrictAnalysis from './DistrictAnalysis';


class SidebarAnalysis extends PureComponent {
  render() {
    return (
      <Fragment>
        <SidebarTitle>Analyse</SidebarTitle>
        <CategoryFilter />
        <DistrictAnalysis />
      </Fragment>
    );
  }
}

export default SidebarAnalysis;
