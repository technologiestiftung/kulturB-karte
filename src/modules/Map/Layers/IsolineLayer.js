import React, { PureComponent } from 'react';
import { Layer, Feature } from 'react-mapbox-gl';

const layerId = 'IsoLineLayer';

function getIsolineUrl(location) {
  if (!location) {
    return null;
  }

  const { coordinates } = location;

  return `https://isoline.route.api.here.com/routing/7.2/calculateisoline.json?app_id=${config.geocoder.app_id}&app_code=${config.geocoder.app_code}&mode=shortest;pedestrian;traffic:disabled&start=geo!${coordinates[1]},${coordinates[0]}&range=500,1000,2000&rangetype=distance`;
}

function getIsolines(data) {
  if (!data.isoline || !data.isoline.length) {
    return null;
  }

  return data.isoline.map(i => ([
    i.component[0].shape.map(s => s.split(',').reverse().map(n => +n))
  ]));
}

class LorLayer extends PureComponent {
  state = {
    isolines: false
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.detailData.id !== nextProps.detailData.id) {
      this.loadData(nextProps);
    }
  }

  loadData = async (props) => {
    const url = getIsolineUrl(props.detailData.location);

    if (!url) {
      return null;
    }

    const res = await fetch(url);
    const jsonRes = await res.json();
    const isolines = getIsolines(jsonRes.response);

    this.setState({ isolines });
  }

  render() {
    const { isolines } = this.state;

    if (!isolines) {
      return null;
    }

    return (
      <Layer
        id={layerId}
        type="fill"
        paint={{
          'fill-color': 'rgb(55,147,205)',
          'fill-opacity': 0.25,
          'fill-outline-color': '#fff',
        }}
      >
        {isolines.map(isoline => <Feature coordinates={isoline} />)}
      </Layer>
    );
  }
}

export default LorLayer;
