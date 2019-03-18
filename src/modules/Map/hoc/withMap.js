import React from 'react';
import { MapConsumer } from './MapContext';

const withMap = Component => props => (
  <MapConsumer>
    {map => <Component map={map} {...props} />}
  </MapConsumer>
);

export default withMap;
