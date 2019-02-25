import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import idx from 'idx';

import withMap from '../hoc/withMap';
import { removeLayerAndSource } from '../MapUtils';

function getPaintProps(props) {
  const linePaint = {
    'line-color': '#777',
    'line-width': 2,
  };

  let fillPaint = {
    'fill-color': '#777',
    'fill-opacity': 0
  };

  if (props.districtFilter) {
    fillPaint = {
      ...fillPaint,
      'fill-opacity': [
        'case',
        ['!=', ['string', ['get', 'Gemeinde_schluessel']], props.districtFilter.toString()], 0.2,
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
