import createStore from 'unistore';

export const filterSection = {
  categoryFilter: [],
  districtFilter: false,
  locationFilterCoords: false,
  locationFilterRadius: 1000,
  a11yWheelChairFilter: false,
  a11yBlindFilter: false,
  a11yDeafFilter: false,
};

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
  colorizer: () => '#bbb',
  categories: [],
  filter: filterSection,
  categoryFilterExpanded: false,
  mapBoundsFilterActive: true,
  listSorting: 'name',
  activeAnalysis: null
});

window.Store = Store;

export default Store;
