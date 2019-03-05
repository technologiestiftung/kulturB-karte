import createStore from 'unistore';

const Store = createStore({
  isLoading: true,
  data: { features: [] },
  additionalData: {
    districts: null
  },
  mapCenter: [13.4124999, 52.5040961],
  mapZoom: [10],
  tooltipData: false,
  detailData: false,
  tooltipPos: [0, 0],
  filter: {
    categoryFilter: [],
    districtFilter: false,
    locationFilterCoords: false,
    locationFilterRadius: 1000
  },
  categoryFilterExpanded: false,
  activeAnalysis: null
});

export default Store;
