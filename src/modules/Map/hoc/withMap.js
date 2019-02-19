import React from 'react';
import { MapConsumer } from './MapContext';

const withMap = Component => ({ props }) => (
  <MapConsumer>
    {map => <Component {...props} map={map} />}
  </MapConsumer>
);

export default withMap;
