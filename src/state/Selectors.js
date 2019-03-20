import { createSelector } from 'reselect';

import {
  filterCategories,
  filterDistricts,
  filterMapBounds,
  getNearbyVenues,
  getDistrictBounds,
  filterLocation,
  sortData,
  getDistance,
  getColorByCategory,
  filterAccessibility,
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

export const enrichedDataSelector = createSelector(
  [
    dataSelector,
    additionalDataSelector,
    filterSelector,
    mapBoundsSelector
  ],
  (
    data,
    additionalData,
    filter,
    mapBounds
  ) => {
    const features = data.features
      .map((feat) => {
        const { properties } = feat;

        properties.categoryFilter = filterCategories(properties, filter.categoryFilter);

        properties.districtFilter = filterDistricts(
          feat,
          filter.districtFilter,
          additionalData.districts
        );

        properties.locationFilter = filterLocation(
          feat,
          filter.locationFilterCoords,
          filter.locationFilterRadius
        );

        properties.a11yFilter = filterAccessibility(properties, filter);

        properties.mapBoundsFilter = filterMapBounds(feat, mapBounds);

        properties.color = getColorByCategory(properties.mainCategory);

        properties.distance = getDistance(feat, filter.locationFilterCoords);

        properties.isFiltered = false;

        feat.properties = properties;

        return feat;
      });

    return Object.assign({}, data, { features });
  }
);

export const filteredDataSelector = createSelector(
  [enrichedDataSelector],
  (data) => {
    const features = data.features
      .map((feat) => {
        feat.properties.isFiltered = (
          feat.properties.categoryFilter
          || feat.properties.districtFilter
          || feat.properties.locationFilter
          || feat.properties.a11yFilter
        );

        return feat;
      })
      .sort(sortData('properties.isFiltered', 'dec'));

    return Object.assign({}, data, { features });
  }
);

export const filteredListDataSelector = createSelector(
  [filteredDataSelector, mapBoundsFilterActiveSelector, listSortingSelector],
  (data, mapBoundsFilterActive, sortBy) => {
    if (!data) {
      return [];
    }

    const features = data.features.filter(feat => (
      !feat.properties.isFiltered
      && !(mapBoundsFilterActive && feat.properties.mapBoundsFilter)
    ));

    return features
      .map(feat => feat.properties)
      .sort(sortData(sortBy));
  }
);

export const filteredAnalysisDataSelector = createSelector(
  [enrichedDataSelector, additionalDataSelector, filterSelector],
  (data) => {
    const features = data.features.filter(feat => (
      !feat.properties.districtFilter && !feat.properties.categoryFilter
    ));

    return Object.assign({}, data, { features });
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
  [enrichedDataSelector, detailDataSelector],
  (data, detailData) => {
    if (!detailData) {
      return false;
    }

    detailData.nearby = getNearbyVenues(data, detailData);
    return detailData;
  }
);

export const filteredDistrictDataSelector = createSelector(
  [enrichedDataSelector],
  (data) => {
    const features = data.features.filter(feat => (
      !feat.properties.districtFilter
    ));

    return Object.assign({}, data, { features });
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
