import React, { PureComponent } from 'react';
import Styled from 'styled-components';
import MapboxGL from 'mapbox-gl';
import PropTypes from 'prop-types';
import 'mapbox-gl/dist/mapbox-gl.css';

import MapContext from './MapContext';

const MapContainer = Styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

class MapGL extends PureComponent {
  static propTypes = {
    styleUrl: PropTypes.string.isRequired,
    zoom: PropTypes.number,
    center: PropTypes.arrayOf(PropTypes.number)
  };

  static defaultProps = {
    zoom: 10,
    center: [13.4124999, 52.5040961]
  };

  constructor() {
    super();
    this.state = { map: null };
    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    this.initMap();
  }

  initMap() {
    const {
      zoom,
      center,
      styleUrl
    } = this.props;

    const map = new MapboxGL.Map({
      container: this.mapContainer.current,
      style: styleUrl,
      center,
      zoom
    });

    map.on('load', () => {
      this.setState({ map });
      map.resize();
    });
  }

  render() {
    return (
      <MapContainer ref={this.mapContainer}>
        <MapContext.Provider value={this.state.map}>
          {this.props.children}
        </MapContext.Provider>
      </MapContainer>
    );
  }
}

export default MapGL;
