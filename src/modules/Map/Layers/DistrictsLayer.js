import React from 'react';
import TopoJSONLayer from '~/components/TopoJSONLayer';

const paintProps = {
  'line-color': '#777',
  'line-width': 2
};

// const filterProps = ['==', 'Gemeinde_name', 'Neukölln'];

const DistrictsLayer = props => (
  <TopoJSONLayer
    {...props}
    source="public/data/bezirksgrenzen.json"
    linePaint={paintProps}
    id="DistrictsLayer"
    // layerOptions={{ filter: filterProps }}
  />
);

export default DistrictsLayer;
