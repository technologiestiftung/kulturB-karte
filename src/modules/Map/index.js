import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import ReactMapboxGl from 'react-mapbox-gl';

import Actions from '~/state/Actions';
import { districtBoundsSelector } from '~/state/Selectors';
import MapUtils from './MapUtils';
import { MapProvider } from './hoc/MapContext';
import FilterView from './MapViews/FilterView';
import AnalysisView from './MapViews/AnalysisView';
import Tooltip from './Tooltip';


const LayerOrder = ['LorLayer', 'DistrictsLayer', 'RadiusLayer', 'MarkerLayer', 'HeatmapLayer', 'LocationFilterLayer'];
const mapConfig = {
  minZoom: 8,
  maxZoom: 15,
  dragRotate: false,
  bearing: 0,
  maxBounds: [
    [12.85, 52.2],
    [13.95, 52.8]
  ]
};

const MapGL = ReactMapboxGl({ ...mapConfig });

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  flex-shrink: 1;
  flex-grow: 1;
  position: relative;
  opacity: 1;
`;

class Map extends PureComponent {
  state = {
    isLoading: true,
    map: false,
  };

  lastLayerIds = '';

  componentDidMount() {
    this.props.loadData();
  }

  onStyleLoad(map) {
    map.resize();
    window.map = map;
    this.setState({ isLoading: false, map });
  }

  onData(map) {
    const layerIds = Object.keys(map.style._layers).join(''); // eslint-disable-line

    if (layerIds !== this.lastLayerIds) {
      MapUtils.orderLayers(map, LayerOrder);
    }

    this.lastLayerIds = layerIds;
  }

  render() {
    const {
      mapZoom,
      mapCenter,
      districtBounds,
      detailData
    } = this.props;

    const isLoading = this.props.isLoading || this.state.isLoading;
    const center = detailData ? detailData.location.coordinates : mapCenter;

    return (
      <MapWrapper isLoading={isLoading}>
        <MapProvider value={this.state.map}>
          <MapGL
            zoom={mapZoom}
            center={center}
            bearing={mapConfig.bearing}
            style="https://maps.tilehosting.com/styles/positron/style.json?key=xJPXLulJcrAnFUN6VtSC" // eslint-disable-line
            containerStyle={{ height: '100%', width: '100%' }}
            onStyleLoad={map => this.onStyleLoad(map)}
            flyToOptions={config.map.flyToOptions}
            onData={map => this.onData(map)}
            fitBounds={districtBounds}
            maxBounds={mapConfig.maxBounds}
          >
            <Route exact path="/" component={FilterView} />
            <Route path="/standort/:id" component={FilterView} />
            <Route path="/analysis" component={AnalysisView} />
            <Tooltip />
          </MapGL>
        </MapProvider>
      </MapWrapper>
    );
  }
}

export default withRouter(connect(state => ({
  mapZoom: state.mapZoom,
  mapCenter: state.mapCenter,
  districtBounds: districtBoundsSelector(state),
  detailData: state.detailData,
}), Actions)(Map));
