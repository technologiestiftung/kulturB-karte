import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import Actions from '~/state/Actions';

import MapGL from '~/components/MapGL';
import GeoJSON from '~/components/MapGL/Layers/GeoJSON';

const MapWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
`;

class Map extends PureComponent {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <MapWrapper>
        <MapGL
          zoom={10}
          center={[13.4124999, 52.5040961]}
          styleUrl="https://maps.tilehosting.com/styles/positron/style.json?key=xJPXLulJcrAnFUN6VtSC"
        >
          <GeoJSON data={this.props.data} />
        </MapGL>
      </MapWrapper>
    );
  }
}

export default connect(
  state => state,
  Actions
)(Map);
