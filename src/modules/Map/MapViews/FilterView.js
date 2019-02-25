import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';

import { ZoomControl } from 'react-mapbox-gl';

import Actions from '~/state/Actions';
import { filteredDataSelector } from '~/state/Selectors';

import DistrictLayer from '../Layers/DistrictsLayer';
import MarkerLayer from '../Layers/MarkerLayer';


class FilterView extends PureComponent {
  componentDidMount() {
    this.props.loadFilterData();
  }

  render() {
    const { data } = this.props;

    return (
      <Fragment>
        <ZoomControl />
        <DistrictLayer />
        <MarkerLayer data={data} />
      </Fragment>
    );
  }
}

export default connect(state => ({
  data: filteredDataSelector(state),
}), Actions)(FilterView);
