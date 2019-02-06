import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import ReactMapboxGl from 'react-mapbox-gl';

import Actions from '~/state/Actions';
import MapUtils from './MapUtils';

import Tooltip from './Tooltip';
import MarkerLayer from './Layers/MarkerLayer';
import LorLayer from './Layers/LorLayer';
import DistrictsLayer from './Layers/DistrictsLayer';
import RadiusLayer from './Layers/RadiusLayer';
import HeatmapLayer from './Layers/HeatmapLayer';

const MapGL = ReactMapboxGl({});

const LayerOrder = ['LorLayer', 'DistrictsLayer', 'RadiusLayer', 'MarkerLayer', 'HeatmapLayer'];

const MapWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  opacity: ${props => (props.isLoading ? 0 : 1)};
`;

class Map extends PureComponent {
  state = {
    isLoading: true,
  };

  lastLayerIds = '';

  componentDidMount() {
    this.props.loadData();
  }

  onStyleLoad(map) {
    map.resize();
    this.setState({ isLoading: false });
  }

  onData(map) {
    const layerIds = Object.keys(map.style._layers).join(''); // eslint-disable-line

    if (layerIds !== this.lastLayerIds) {
      MapUtils.orderLayers(map, LayerOrder);
    }

    this.lastLayerIds = layerIds;
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
          onData={map => this.onData(map)}
        >
          <MarkerLayer data={this.props.data} />
          { /* <RadiusLayer data={this.props.data} radius={700} /> */ }
          <DistrictsLayer />
          { /* <LorLayer /> */ }
          { /* <HeatmapLayer data={this.props.data} /> */ }
          <Tooltip />
        </MapGL>
      </MapWrapper>
    );
  }
}

export default connect(
  state => state,
  Actions
)(Map);
