import pointInPolygon from '@turf/boolean-point-in-polygon';
import turfDistance from '@turf/distance';
import turfBbox from '@turf/bbox';
import { scaleOrdinal } from 'd3-scale';

import { getPolygonFeature } from '~/modules/Map/MapUtils';

const colorScale = scaleOrdinal().range(config.colors);

export const filterCategories = (data, categoryFilter) => {
  const features = data.features
    .filter(feat => !categoryFilter.includes(feat.properties.mainCategory));

  return Object.assign({}, data, { features });
};

export const filterDistricts = (data, districtFilter, districts) => {
  if (!districts || !districtFilter) {
    return data;
  }

  const polygon = districts.features
    .find(feat => feat.properties.Gemeinde_schluessel === districtFilter);

  const filteredFeatures = data.features.filter(feat => pointInPolygon(feat, polygon));

  return Object.assign({}, data, { features: filteredFeatures });
};

export const filterLocation = (data, center, radius) => {
  if (!center || !center.length) {
    return data;
  }

  const polygon = getPolygonFeature(center, radius);
  const features = data.features.filter(feat => pointInPolygon(feat.geometry.coordinates, polygon));
  return Object.assign({}, data, { features });
};

export const getNearbyVenues = (data, detailData, maxDistance = 1) => {
  if (!data || !detailData) {
    return [];
  }

  const nearby = data.features
    .filter(feat => feat.properties.id !== detailData.id)
    .map((feat) => {
      const res = Object.assign({}, feat);
        res.properties.distance = turfDistance(detailData.location, feat);
        return res;
      })
    .filter(feat => feat.properties.distance < maxDistance)
    .sort((a, b) => a.properties.distance - b.properties.distance)
    .slice(0, 3)
    .map(feat => feat.properties);

  return nearby;
};

export const getDistrictBounds = districtFeature => (
  turfBbox(districtFeature)
);

export const getColorByCategory = category => (
  typeof category === 'undefined' ? '#bbb' : colorScale(category)
);

export default {
  filterCategories,
  filterDistricts,
  getNearbyVenues,
  getDistrictBounds,
  getColorByCategory,
};
