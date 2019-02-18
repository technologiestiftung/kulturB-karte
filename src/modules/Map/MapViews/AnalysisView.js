import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';

import DistrictsLayer from '../Layers/DistrictsLayer';
import LorLayer from '../Layers/LorLayer';
import MarkerLayer from '../Layers/MarkerLayer';
import RadiusLayer from '../Layers/RadiusLayer';

class AnalysisView extends PureComponent {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    const { data } = this.props;

    return (
      <Fragment>
        { /* <LorLayer /> */ }
        <DistrictsLayer />
        <MarkerLayer data={data} radius={2} />
        <RadiusLayer data={data} radius={500} />
      </Fragment>
    );
  }
}

export default connect(state => state, Actions)(AnalysisView);
