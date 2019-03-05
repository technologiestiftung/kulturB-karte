import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';
import { filteredAnalysisDataSelector } from '~/state/Selectors';

import DistrictsLayer from '../Layers/DistrictsLayer';
import MarkerLayer from '../Layers/MarkerLayer';
import LorLayer from '../Layers/LorLayer';

class AnalysisView extends PureComponent {
  componentDidMount() {
    this.props.loadAnalysisData();
  }

  render() {
    const { data } = this.props;

    return (
      <Fragment>
        <DistrictsLayer />
        <LorLayer />
        <MarkerLayer data={data} />
      </Fragment>
    );
  }
}

export default connect(state => ({
  data: filteredAnalysisDataSelector(state)
}), Actions)(AnalysisView);
