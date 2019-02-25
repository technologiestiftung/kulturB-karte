import { createSelector } from 'reselect';
import pointInPolygon from '@turf/boolean-point-in-polygon';

const dataSelector = state => state.data;
const filterSelector = state => state.filter;
const additionalDataSelector = state => state.additionalData;

const filterCategories = (data, categoryFilter) => {
  const features = data.features
    .filter(feat => !categoryFilter.includes(feat.properties.mainCategory));

  return Object.assign({}, data, { features });
};

const filterDistricts = (data, districtFilter, districts) => {
  if (!districts || !districtFilter) {
    return data;
  }

  const polygon = districts.features
    .find(feat => feat.properties.Gemeinde_schluessel === districtFilter);

  const filteredFeatures = data.features.filter(feat => pointInPolygon(feat, polygon));

  return Object.assign({}, data, { features: filteredFeatures });
};

export const filteredDataSelector = createSelector(
  [dataSelector, additionalDataSelector, filterSelector],
  (data, additionalData, filter) => {
    let filteredData = data;

    filteredData = filterCategories(filteredData, filter.categoryFilter);
    filteredData = filterDistricts(filteredData, filter.districtFilter, additionalData.districts);

    return filteredData;
  }
);

export const allCategoriesSelector = createSelector(
  [dataSelector],
  (data) => {
    const allCategories = data.features.map(d => d.properties.mainCategory);
    return [...new Set(allCategories)];
  }
);

export default {
  filteredDataSelector,
  allCategoriesSelector,
};
