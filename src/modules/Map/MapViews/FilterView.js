import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';
import { filteredDataSelector } from '~/state/Selectors';

import DistrictLayer from '../Layers/DistrictsLayer';
import MarkerLayer from '../Layers/MarkerLayer';


class FilterView extends PureComponent {
  render() {
    const { data } = this.props;

    return (
      <Fragment>
        <DistrictLayer />
        <MarkerLayer data={data} />
      </Fragment>
    );
  }
}

export default connect(state => ({
  data: filteredDataSelector(state)
}), Actions)(FilterView);
