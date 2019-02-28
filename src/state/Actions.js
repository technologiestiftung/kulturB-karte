import { fetchJSON, fetchTopoJSON } from '~/utils';

const loadData = Store => async () => {
  Store.setState({ isLoading: true });

  try {
    const { data } = await fetchJSON(`${config.api.base}${config.api.locations}${config.api.params}`);
    data.map(d => d.tags = d.tags.map(t => t.name));

    return {
      data: {
        type: 'FeatureCollection',
        features: data.filter(d => d.location).map(d => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: d.location.coordinates.reverse(),
          },
          properties: {
            mainCategory: d.tags[0],
            ...d
          }
      }))
    },
    isLoading: false
  };
  } catch (err) {
    return { isLoading: false };
  }
};

const loadEntryData = Store => async (state, detailData) => {
  Store.setState({ isLoading: true });

  try {
    const { id } = detailData;
    const data = await fetchJSON(`${config.api.base}${config.api.locations}/${id}`);

    data.location.coordinates.reverse();
    data.tags = data.tags.map(t => t.name);
    [data.mainCategory] = data.tags;

    return {
      detailData: data,
      isLoading: false,
    };
  } catch (err) {
    return { isLoading: false };
  }
};

const loadFilterData = Store => async () => {
  Store.setState({ isLoading: true });

  try {
    const districts = await fetchTopoJSON('public/data/bezirksgrenzen.json');
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
    const districts = await fetchTopoJSON('public/data/bezirksgrenzen.json');
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

const toggleCategoryFilter = (state, category) => {
  let { categoryFilter } = state.filter;

  if (categoryFilter.includes(category)) {
    categoryFilter = categoryFilter.filter(cat => cat !== category);
  } else {
    categoryFilter.push(category);
  }

  const filter = Object.assign({}, state.filter, { categoryFilter });
  return { filter };
};

const setDistrictFilter = (state, districtFilter) => (
  { filter: Object.assign({}, state.filter, { districtFilter }) }
);

export default Store => ({
  loadData: loadData(Store),
  loadFilterData: loadFilterData(Store),
  loadAnalysisData: loadAnalysisData(Store),
  loadEntryData: loadEntryData(Store),
  setMapCenter,
  setMapView,
  setTooltipData,
  setTooltipPos,
  toggleCategoryFilter,
  setDistrictFilter,
});
