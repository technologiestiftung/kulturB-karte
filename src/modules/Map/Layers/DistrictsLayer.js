import React from 'react';
import { connect } from 'unistore/react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import idx from 'idx';

const paintProps = {
  'line-color': '#777',
  'line-width': 2
};

const DistrictsLayer = (props) => {
  if (!idx(props, _ => _.districts)) {
    return null;
  }

  return (
    <GeoJSONLayer
      {...props}
      data={props.districts}
      linePaint={paintProps}
      id="DistrictsLayer"
    />
  );
};

export default connect(state => ({
  districts: state.additionalData.districts,
}))(DistrictsLayer);
