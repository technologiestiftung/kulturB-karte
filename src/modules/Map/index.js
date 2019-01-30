import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import ReactMapboxGl from 'react-mapbox-gl';

import Actions from '~/state/Actions';
import MarkerLayer from './Layers/MarkerLayer';

const MapGL = ReactMapboxGl({});

const MapWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  opacity: ${props => (props.isLoading ? 0 : 1)};
`;

class Map extends PureComponent {
  state = {
    isLoading: false // set to true later
  }

  componentDidMount() {
    this.props.loadData();
  }

  onStyleLoad(map) {
    map.resize();
    this.setState({ isLoading: false });
  }

  render() {
    const { mapZoom, mapCenter } = this.props;
    const isLoading = this.props.isLoading || this.state.isLoading;

    return (
      <MapWrapper isLoading={isLoading}>
        <MapGL
          zoom={mapZoom}
          center={mapCenter}
          style="https://maps.tilehosting.com/styles/positron/style.json?key=xJPXLulJcrAnFUN6VtSC" // eslint-disable-line
          containerStyle={{ height: '100%', width: '100%' }}
          onStyleLoad={map => this.onStyleLoad(map)}
          flyToOptions={config.map.flyToOptions}
        >
          <MarkerLayer data={this.props.data} />
        </MapGL>
      </MapWrapper>
    );
  }
}

export default connect(
  state => state,
  Actions
)(Map);
