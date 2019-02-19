import createStore from 'unistore';

const Store = createStore({
  isLoading: true,
  data: { features: [] },
  mapCenter: [13.4124999, 52.5040961],
  mapZoom: [10],
  tooltipData: false,
  tooltipPos: [0, 0],
  filter: {
    categoryFilter: []
  }
});

export default Store;
