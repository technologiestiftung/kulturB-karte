import { scaleOrdinal } from 'd3-scale';

const colorScale = scaleOrdinal().range(config.colors);

function orderLayers(map, order) {
  const layerIds = Object.keys(map.style._layers); // eslint-disable-line

  order.forEach((key) => {
    const currentLayerIds = layerIds.filter(l => l.startsWith(key));

    currentLayerIds.forEach((layerId) => {
      if (map.getLayer(layerId)) {
        map.moveLayer(layerId);
      }
    });
  });
}

function getPolygonFeature(center, radius, points = 50, props = {}) {
  const km = radius / 1000;
  const distanceX = km / (111.320 * Math.cos(center[1] * Math.PI / 180));
  const distanceY = km / 110.574;

  const coords = [];

  for (let i = 0; i < points; i++) {
    const theta = (i / points) * (2 * Math.PI);
    const x = distanceX * Math.cos(theta);
    const y = distanceY * Math.sin(theta);

    coords.push([center[0] + x, center[1] + y]);
  }
  coords.push(coords[0]);

  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [coords],
    },
    properties: props,
  };
}

export function removeLayerAndSource(map, id) {
  if (!map || !map.getSource(id)) {
    return false;
  }

  const layerIds = Object.keys(map.style._layers).filter(l => l.startsWith(id)); // eslint-disable-line

  layerIds.forEach((layerId) => {
    map.removeLayer(layerId);
  });

  map.removeSource(id);
}

export function getColorByCategory(category) {
  return colorScale(category);
}

export default {
  orderLayers,
  getPolygonFeature,
  getColorByCategory,
  removeLayerAndSource,
};
