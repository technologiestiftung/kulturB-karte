import createStore from 'unistore';

const Store = createStore({
  isLoading: true,
  data: { features: [] },
  additionalData: {
    districts: null
  },
  mapCenter: [13.4124999, 52.5040961],
  mapZoom: [10],
  mapBounds: false,
  tooltipData: false,
  detailData: false,
  tooltipPos: [0, 0],
  filter: {
    categoryFilter: [],
    districtFilter: false,
    locationFilterCoords: false,
    locationFilterRadius: 1000,
    a11yWheelChairFilter: false,
    a11yBlindFilter: false,
    a11yDeafFilter: false,
  },
  categoryFilterExpanded: false,
  mapBoundsFilterActive: true,
  listSorting: 'name',
  activeAnalysis: null
});

export default Store;
