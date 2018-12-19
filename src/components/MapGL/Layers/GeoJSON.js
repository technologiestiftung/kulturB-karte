import React, { PureComponent } from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';

import MapContext from '../MapContext';

class GeoJSON extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    radius: PropTypes.number
  };

  static defaultProps = {
    color: '#2e91d2',
    radius: 5
  };

  id = uuid();

  layer = null;

  updateLayer(map) {
    const { data, radius, color } = this.props;

    if (!map || !data) {
      return false;
    }

    if (this.layer) {
      map.getSource(this.id).setData(data);
    } else {
      this.layer = map.addLayer({
        id: this.id,
        type: 'circle',
        source: {
          type: 'geojson',
          data
        },
        paint: {
          'circle-radius': radius,
          'circle-color': color
        }
      });
    }
  }

  render() {
    return (
      <MapContext.Consumer>
        {map => this.updateLayer(map)}
      </MapContext.Consumer>
    );
  }
}

export default GeoJSON;
