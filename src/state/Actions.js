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

export default Store => ({
  loadData: loadData(Store),
  setMapCenter,
  setTooltipData,
  setMapView,
});
