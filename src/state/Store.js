import createStore from 'unistore';

import { getFavs } from './DataUtils';

export const filterSection = {
  categoryFilter: [],
  districtFilter: false,
  locationFilterCoords: false,
  locationFilterRadius: 1000,
  a11yWheelChairFilter: false,
  a11yBlindFilter: false,
  a11yDeafFilter: false,
  fundedFilter: true
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
  selectedData: false,
  detailData: false,
  highlightData: false,
  tooltipPos: [0, 0],
  colorizer: () => '#bbb',
  categories: [],
  filter: filterSection,
  categoryFilterExpanded: false,
  mapBoundsFilterActive: true,
  listSorting: 'name',
  activeAnalysis: null,
  favs: getFavs(),
});

export default Store;
