import { createSelector } from 'reselect';
import isEqual from 'lodash.isequal';

import {
  filterCategories,
  filterDistricts,
  filterMapBounds,
  getNearbyVenues,
  getDistrictBounds,
  filterLocation,
  sortData,
  getDistance,
  filterAccessibility,
  filterFunded
} from './DataUtils';

import { filterSection } from './Store';

const dataSelector = state => state.data;
const filterSelector = state => state.filter;
const additionalDataSelector = state => state.additionalData;
const detailDataSelector = state => state.detailData;
const districtDataSelector = state => state.additionalData.districts;
const districtFilterSelector = state => state.filter.districtFilter;
const listSortingSelector = state => state.listSorting;
const mapBoundsSelector = state => state.mapBounds;
const mapBoundsFilterActiveSelector = state => state.mapBoundsFilterActive;
const colorizerSelector = state => state.colorizer;
const categoriesSelector = state => state.categories;
const favsSelector = state => state.favs;

const geojsonToArray = geojson => geojson.features.map(d => d.properties);

export const enrichedDataSelector = createSelector(
  [
    dataSelector,
    additionalDataSelector,
    filterSelector,
    mapBoundsSelector,
    colorizerSelector,
    favsSelector,
  ],
  (
    data,
    additionalData,
    filter,
    mapBounds,
    colorizer,
    favs
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

        properties.fundedFilter = filterFunded(properties, filter.fundedFilter);

        properties.mapBoundsFilter = filterMapBounds(feat, mapBounds);

        properties.color = colorizer(properties.mainCategory);

        properties.distance = getDistance(feat, filter.locationFilterCoords);

        properties.isFav = favs.includes(properties.id);

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
          || feat.properties.fundedFilter
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

export const enrichedDetailDataSelector = createSelector(
  [filteredDataSelector, detailDataSelector],
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
      .find(feat => feat.properties.spatial_name === districtFilter);

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

export const initialFilterSelector = createSelector(
  [categoriesSelector],
  categories => Object.assign({}, filterSection, { categoryFilter: categories })
);

export const hasFilterSelector = createSelector(
  [filterSelector, initialFilterSelector],
  (filter, initialFilter) => !isEqual(filter, initialFilter)
);

export const favoritesSelector = createSelector(
  [enrichedDataSelector],
  (data) => {
    const features = data.features.filter(feat => feat.properties.isFav);
    return geojsonToArray(Object.assign({}, data, { features }));
  }
);

export default {
  filteredDataSelector,
  enrichedDetailDataSelector,
  dataAsArraySelector,
  filteredListDataSelector,
  hasFilterSelector,
  favoritesSelector,
};
