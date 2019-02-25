import pointInPolygon from '@turf/boolean-point-in-polygon';
import { point as turfPoint } from '@turf/helpers';
import turfDistance from '@turf/distance';
import turfBbox from '@turf/bbox';

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

export const getNearbyVenues = (data, detailData, maxDistance = 1) => {
  if (!data || !detailData) {
    return [];
  }

  const center = turfPoint(detailData.location);

  const nearby = data.features
    .filter(feat => feat.properties.id !== detailData.id)
    .map((feat) => {
      const res = Object.assign({}, feat);
      res.properties.distance = turfDistance(center, feat);
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

export default {
  filterCategories,
  filterDistricts,
  getNearbyVenues,
  getDistrictBounds,
};
