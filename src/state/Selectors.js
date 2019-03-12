import { createSelector } from 'reselect';

import {
  filterCategories,
  filterDistricts,
  filterMapBounds,
  getNearbyVenues,
  getDistrictBounds,
  filterLocation,
  sortData
} from './DataUtils';

const dataSelector = state => state.data;
const filterSelector = state => state.filter;
const additionalDataSelector = state => state.additionalData;
const detailDataSelector = state => state.detailData;
const districtDataSelector = state => state.additionalData.districts;
const districtFilterSelector = state => state.filter.districtFilter;
const listSortingSelector = state => state.listSorting;
const mapBoundsSelector = state => state.mapBounds;
const mapBoundsFilterActiveSelector = state => state.mapBoundsFilterActive;

const geojsonToArray = geojson => geojson.features.map(d => d.properties);

export const filteredDataSelector = createSelector(
  [dataSelector, additionalDataSelector, filterSelector],
  (data, additionalData, filter) => {
    let filteredData = data;

    filteredData = filterCategories(filteredData, filter.categoryFilter);
    filteredData = filterDistricts(filteredData, filter.districtFilter, additionalData.districts);
    filteredData = filterLocation(
      filteredData,
      filter.locationFilterCoords,
      filter.locationFilterRadius
    );

    return filteredData;
  }
);

export const filteredListDataSelector = createSelector(
  [filteredDataSelector, mapBoundsFilterActiveSelector, mapBoundsSelector, listSortingSelector],
  (data, mapBoundsFilterActive, mapBounds, sortBy) => {
    if (!data) {
      return [];
    }

    let filteredData = data;

    if (mapBoundsFilterActive) {
      filteredData = filterMapBounds(filteredData, mapBounds);
    }

    filteredData = geojsonToArray(filteredData);
    filteredData = sortData(filteredData, sortBy);

    return filteredData;
  }
);

export const filteredAnalysisDataSelector = createSelector(
  [dataSelector, additionalDataSelector, filterSelector],
  (data, additionalData, filter) => {
    let filteredData = data;

    filteredData = filterCategories(data, filter.categoryFilter);
    filteredData = filterDistricts(filteredData, filter.districtFilter, additionalData.districts);

    return filteredData;
  }
);

export const filteredDistrictDataSelector = createSelector(
  [dataSelector, additionalDataSelector, filterSelector],
  (data, additionalData, filter) => {
    let filteredData = data;

    filteredData = filterDistricts(filteredData, filter.districtFilter, additionalData.districts);

    return filteredData;
  }
);

export const allCategoriesSelector = createSelector(
  [dataSelector],
  (data) => {
    const allCategories = data.features
      .map(d => d.properties.tags)
      .reduce((acc, value) => acc.concat(value), []);
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

    return geojsonToArray(data);
  }
);

export default {
  filteredDataSelector,
  allCategoriesSelector,
  enrichedDetailDataSelector,
  dataAsArraySelector,
  filteredListDataSelector,
};
