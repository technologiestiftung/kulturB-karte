import { createSelector } from 'reselect';

const dataSelector = state => state.data;
const filterSelector = state => state.filter;

export const filteredDataSelector = createSelector(
  [dataSelector, filterSelector],
  (data, filter) => {
    const features = data.features
      .filter(feat => !filter.categoryFilter.includes(feat.properties.mainCategory));

    return Object.assign({}, data, { features });
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
