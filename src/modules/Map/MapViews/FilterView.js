import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';

import DistrictLayer from '../Layers/DistrictsLayer';
import MarkerLayer from '../Layers/MarkerLayer';

class FilterView extends PureComponent {
  componentDidMount() {
    this.props.loadData();
  }

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

export default connect(state => state, Actions)(FilterView);
