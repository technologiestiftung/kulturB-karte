import fetch from 'unfetch';

const loadData = Store => async () => {
  Store.setState({ isLoading: true });

  let data = null;
  try {
    const res = await fetch('public/data/data.geojson');
    data = await res.json();
  } catch (err) {
    console.log(err);
  }
  return { data, isLoading: false };
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

export default Store => ({
  loadData: loadData(Store),
  setMapCenter,
  setMapView,
  setTooltipData,
  setTooltipPos,
  toggleCategoryFilter,
});
