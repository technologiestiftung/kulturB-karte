import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import idx from 'idx';

import withMap from '../hoc/withMap';
import { removeLayerAndSource } from '../MapUtils';

function getPaintProps(props) {
  const linePaint = {
    'line-color': '#111',
    'line-width': 1,
  };

  let fillPaint = {
    'fill-color': '#111',
    'fill-opacity': 0
  };

  if (props.districtFilter) {
    fillPaint = {
      ...fillPaint,
      'fill-opacity': [
        'case',
        ['!=', ['string', ['get', 'spatial_name']], props.districtFilter.toString()], 0.1,
        0
      ]
    };
  }

  return {
    linePaint,
    fillPaint
  };
}


class DistrictsLayer extends PureComponent {
  constructor() {
    super();

    this.layerId = 'DistrictsLayer';
  }

  componentWillMount() {
    removeLayerAndSource(this.props.map, this.layerId);
    return true;
  }

  render() {
    const { props, layerId } = this;

    if (!idx(props, _ => _.districts)) {
      return null;
    }

    const paintProps = getPaintProps(props);

    return (
      <GeoJSONLayer
        {...props}
        {...paintProps}
        data={props.districts}
        id={layerId}
      />
    );
  }
}

export default withMap(connect(state => ({
  districts: state.additionalData.districts,
  districtFilter: state.filter.districtFilter,
}))(DistrictsLayer));
