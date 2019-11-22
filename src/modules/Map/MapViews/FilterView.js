import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';
import { filteredDataSelector } from '~/state/Selectors';

import DistrictLayer from '../Layers/DistrictsLayer';
import MarkerLayer from '../Layers/MarkerLayer';
import LocationFilterLayer from '../Layers/LocationFilterLayer';
import IsolineLayer from '../Layers/IsolineLayer';

class FilterView extends PureComponent {
  componentDidMount() {
    this.props.loadFilterData();
  }

  render() {
    const { data, detailData } = this.props;

    console.log(data);

    return (
      <Fragment>
        <DistrictLayer />
        <MarkerLayer data={data} />
        {detailData && <IsolineLayer detailData={detailData} />}
        <LocationFilterLayer />
      </Fragment>
    );
  }
}

export default connect(state => ({
  data: filteredDataSelector(state),
  detailData: state.detailData
}), Actions)(FilterView);
