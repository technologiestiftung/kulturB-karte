import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';
import { filteredDataSelector } from '~/state/Selectors';

import DistrictLayer from '../Layers/DistrictsLayer';
import MarkerLayer from '../Layers/MarkerLayer';
import LocationFilterLayer from '../Layers/LocationFilterLayer';

class FilterView extends PureComponent {
  componentDidMount() {
    this.props.loadFilterData();
  }

  render() {
    const { data } = this.props;

    return (
      <Fragment>
        <DistrictLayer />
        <MarkerLayer data={data} />
        <LocationFilterLayer />
      </Fragment>
    );
  }
}

export default connect(state => ({
  data: filteredDataSelector(state)
}), Actions)(FilterView);
