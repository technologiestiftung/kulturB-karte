import { createSelector } from 'reselect';

import {
  filterCategories,
  filterDistricts,
  getNearbyVenues,
  getDistrictBounds,
} from './DataUtils';

const dataSelector = state => state.data;
const filterSelector = state => state.filter;
const additionalDataSelector = state => state.additionalData;
const detailDataSelector = state => state.detailData;
const districtDataSelector = state => state.additionalData.districts;
const districtFilterSelector = state => state.filter.districtFilter;

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

export const enrichedDetailDataSelector = createSelector(
  [dataSelector, detailDataSelector],
  (data, detailData) => {
    if (!detailData) {
      return false;
    }

    const nearby = getNearbyVenues(data, detailData);

    return Object.assign({}, detailData, {
      nearby
    });
  }
);

export const districtBoundsSelector = createSelector(
  [districtDataSelector, districtFilterSelector],
  (districtData, districtFilter) => {
    if (!districtFilter || !districtData) {
      return false;
    }

    const selectedDistrict = districtData.features
      .find(feat => feat.properties.Gemeinde_schluessel === districtFilter);

    return selectedDistrict && getDistrictBounds(selectedDistrict);
  }
);

export const dataAsArraySelector = createSelector(
  [dataSelector],
  (data) => {
    if (!data) {
      return [];
    }

    return data.features.map(d => d.properties);
  }
);

export default {
  filteredDataSelector,
  allCategoriesSelector,
  enrichedDetailDataSelector,
  dataAsArraySelector,
};
