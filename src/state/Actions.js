import xor from 'lodash.xor';
import destination from '@turf/destination';
import { fetchJSON, fetchTopoJSON, isMobile } from '~/utils';
import { getUniqueCategories, getColorizer, setFavs, getNearbyVenues } from './DataUtils';

import history from '~/history';

const createPoint = d => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: d.location.coordinates.reverse(),
    },
    properties: {
      mainCategory: d.tags[0],
      ...d
    }
});

// for overlapping points
// @TODO: should we implement a collision detection?
const randomizeCoord = (coord) => {
  const randomValue = Math.random() / 20000 + 0.0002;
  return Math.random() < .5 ? coord + randomValue : coord - randomValue;
};

const loadData = Store => async () => {
  Store.setState({ isLoading: true });

  try {
    const { data } = await fetchJSON(`${config.api.base}${config.api.locations}${config.api.params}`);
    const { filter } = Store.getState();

    const features = data
      .map(d => ({
        ...d,
        location: d.location ? {
          ...d.location,
          coordinates: d.location.coordinates.map(randomizeCoord)
        } : false,
        tags: d.tags.length ? d.tags.map(t => t.name) : ['Sonstige']
      }))
      .filter(d => d.location)
      .map(createPoint);

    const parsedData = {
      type: 'FeatureCollection',
      features
    };

    const categories = getUniqueCategories(parsedData);
    const colorizer = getColorizer(categories);

    return {
      data: parsedData,
      isLoading: false,
      filter: {
        ...filter,
        categoryFilter: categories
      },
      categories,
      colorizer
    };
  } catch (err) {
    console.log(err);
    return { isLoading: false };
  }
};

const setDetailRoute = (state, id = false) => {
  if (id) {
    const nextLocation = isMobile ? `/?location=${id}` : `?location=${id}`;
    return history.push(nextLocation);
  }

  history.push(history.location.pathname.replace(/\?location=.+/, ''));

  return {
    detailData: false
  };
};

export const loadEntryData = Store => async (state, detailId) => {
  if (!detailId) return { detailData: false };
  Store.setState({ isLoading: true });

  try {
    const data = await fetchJSON(`${config.api.base}${config.api.locations}/${detailId}`);

    data.location.coordinates.reverse();
    data.tags = data.tags.map(t => t.name);
    [data.mainCategory] = data.tags;

    return {
      mapCenter: data.location.coordinates,
      mapZoom: [Math.max(14, state.mapZoom)],
      detailData: data,
      isLoading: false,
    };
  } catch (err) {
    return { isLoading: false };
  }
};

export const setDetailData = (state, detailData) => ({
  detailData
});

export const setHighlightData = (state, highlightData) => ({ highlightData });

const loadFilterData = Store => async () => {
  Store.setState({ isLoading: true });

  try {
    const districts = await fetchTopoJSON('/public/data/berliner-bezirke.json');

    return {
      additionalData: {
        ...Store.getState().additionalData,
        districts
      },
      isLoading: false
    };
  } catch (err) {
    return { isLoading: false };
  }
};

const loadAnalysisData = Store => async () => {
  Store.setState({ isLoading: true });

  try {
    const districts = await fetchTopoJSON('/public/data/berliner-bezirke.json');
    return {
      additionalData: {
        ...Store.getState().additionalData,
        districts
      },
      isLoading: false
    };
  } catch (err) {
    return { isLoading: false };
  }
};

const setMapCenter = (state, mapCenter) => (
  { mapCenter }
);

const setMapView = (state, viewObject) => (
  {
    mapCenter: viewObject.center || state.mapCenter,
    mapZoom: [viewObject.zoom] || state.mapZoom,
  }
);

const setTooltipData = (state, tooltipData) => (
  { tooltipData }
);

const setTooltipPos = (state, tooltipPos) => (
  { tooltipPos }
);

const setFilter = (state, filter) => ({
  filter
});

const toggleCategoryFilter = (state, category, deactivate = false) => {
  let { categoryFilter } = state.filter;
  const { categories } = state;

  if (categoryFilter.length === 1 && categoryFilter.includes(category)) {
    categoryFilter = categories;
  } else if (categoryFilter.includes(category) || deactivate) {
    categoryFilter = [category];
  } else {
    categoryFilter.push(category);
  }

  const filter = Object.assign({}, state.filter, { categoryFilter });
  return { filter };
};

const resetCategoryFilter = (state) => {
  const allCategories = getUniqueCategories(state.data);
  const filter = Object.assign({}, state.filter, { categoryFilter: allCategories });
  return { filter };
};

const setDistrictFilter = (state, districtFilter) => (
  {
    filter: Object.assign({}, state.filter, { districtFilter }),
    detailData: false
  }
);

const setLocationFilterCoords = (state, locationFilterCoords) => (
  {
    filter: Object.assign({}, state.filter, { locationFilterCoords }),
    detailData: false
  }
);

const setLocationFilterRadius = (state, locationFilterRadius) => (
  { filter: Object.assign({}, state.filter, { locationFilterRadius }) }
);

const setActiveAnalysis = (state, activeAnalysis) => ({
  activeAnalysis
});

const setMapBounds = (state, mapBounds) => ({
  mapBounds
});

const setListSorting = (state, listSorting) => ({
  listSorting
});

const toggleMapBoundsFilter = state => ({
  mapBoundsFilterActive: !state.mapBoundsFilterActive
});

const toggleFilter = (state, toggleKey) => {
  const result = {
    filter: Object.assign({}, state.filter)
  };

  result.filter[toggleKey] = !state.filter[toggleKey];

  const a11yFilterKeys = ['a11yWheelChairFilter', 'a11yBlindFilter', 'a11yDeafFilter'];

  if (a11yFilterKeys.includes(toggleKey)) {
    a11yFilterKeys.forEach((key) => {
      result.filter[key] = !state.filter[key] && key === toggleKey;
    });
  }

  return result;
};

const toggleFav = (state, favId) => {
  let { favs } = state;

  favs = xor(favs, [favId]);

  setFavs(favs);

  return { favs };
};

export default Store => ({
  loadData: loadData(Store),
  loadFilterData: loadFilterData(Store),
  loadAnalysisData: loadAnalysisData(Store),
  loadEntryData: loadEntryData(Store),
  setDetailData,
  setHighlightData,
  setDetailRoute,
  setMapCenter,
  setMapView,
  setTooltipData,
  setTooltipPos,
  toggleCategoryFilter,
  resetCategoryFilter,
  setDistrictFilter,
  setLocationFilterCoords,
  setLocationFilterRadius,
  setActiveAnalysis,
  setMapBounds,
  setListSorting,
  toggleMapBoundsFilter,
  toggleFilter,
  setFilter,
  toggleFav,
});
