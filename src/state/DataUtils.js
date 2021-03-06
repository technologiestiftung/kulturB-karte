import pointInPolygon from '@turf/boolean-point-in-polygon';
import turfDistance from '@turf/distance';
import turfBbox from '@turf/bbox';
import turfBboxPolygon from '@turf/bbox-polygon';
import { scaleOrdinal } from 'd3-scale';
import idx from 'idx';
import Store from 'store';

import {
  IoIosCube as projectRoomIcon,
  IoIosMusicalNotes as musicIcon,
  IoIosMic as operaIcon,
} from 'react-icons/io';

import {
  MdAccountBalance as museumIcon,
  MdLocalLibrary as libraryIcon,
  MdMusicNote as musicSchoolIcon,
  MdImportContacts as bookHouse,
  MdColorLens as galleryIcon,
  MdBrush as artIcon,
  MdBusiness as memorialIcon,
  MdPlace as defaultIcon,
  MdFilterTiltShift as othersIcon,
} from 'react-icons/md';

import {
  GiJuggler as dancePerformanceIcon
} from 'react-icons/gi';

import {
  GoOrganization as associationIcon
} from 'react-icons/go';

import {
  FaGuitar as concertIcon
} from 'react-icons/fa';

import theaterIcon from '~/../public/images/icons/theater.svg';

import { getPolygonFeature } from '~/modules/Map/MapUtils';

const mapboxToTurfBoundingBox = bounds => (
  [bounds._sw.lng, bounds._sw.lat, bounds._ne.lng, bounds._ne.lat] // eslint-disable-line
);

export const filterCategories = (props, categoryFilter) => {
  if (!categoryFilter || !props) {
    return false;
  }

  return !categoryFilter.some(cat => props.tags.includes(cat));
};

export const filterDistricts = (feature, districtFilter, districts) => {
  if (!districts || !districtFilter) {
    return false;
  }

  const polygon = districts.features
    .find(feat => feat.properties.spatial_name === districtFilter);

  return !pointInPolygon(feature, polygon);
};

export const filterLocation = (feat, center, radius) => {
  if (!center || !center.length) {
    return false;
  }

  const polygon = getPolygonFeature(center, radius, 10);
  return !pointInPolygon(feat.geometry.coordinates, polygon);
};

export const filterMapBounds = (feat, bounds) => {
  if (!bounds || !feat) {
    return false;
  }

  const bbox = mapboxToTurfBoundingBox(bounds);
  const bboxPolygon = turfBboxPolygon(bbox);
  return !pointInPolygon(feat, bboxPolygon);
};

export const filterAccessibility = (properties, filter) => {
  const wheelchair = idx(properties, _ => _.accessibility.wheelchair.accessible);
  const isWheelChairFiltered = filter.a11yWheelChairFilter && (!wheelchair || wheelchair === 'no' || wheelchair === 'unknown');

  const deaf = idx(properties, _ => _.accessibility.deaf);
  const isDeafFiltered = filter.a11yDeafFilter && !deaf;

  const blind = idx(properties, _ => _.accessibility.blind);
  const isBlindFiltered = filter.a11yBlindFilter && !blind;

  return isWheelChairFiltered || isDeafFiltered || isBlindFiltered;
};

export const filterFunded = (props, fundedFilter) => !fundedFilter && !props.funded;

export const sortCategories = (a, b) => {
    // we always want to display Sonstige as the last category
    if (a === 'Sonstige') {
      return 1;
    }

    if (b === 'Sonstige') {
      return -1;
    }

    return a.localeCompare(b);
};

export const sortData = (sortBy, direction = 'asc') => (aObj, bObj) => {
  const a = idx(aObj, _ => _[sortBy]);
  const b = idx(bObj, _ => _[sortBy]);
  const type = typeof a;

  // we always want to display Sonstige as the last category
  if (sortBy === 'mainCategory' && a === 'Sonstige') {
    return 1;
  }

  if (sortBy === 'mainCategory' && b === 'Sonstige') {
    return -1;
  }

  if (type === 'string' && direction === 'asc') {
    return a.localeCompare(b);
  }

  if (type === 'string' && direction === 'dec') {
    return b.localeCompare(a);
  }

  if (type === 'boolean' && direction === 'asc') {
    return (a === b) ? 0 : a ? -1 : 1; // eslint-disable-line
  }

  if (type === 'boolean' && direction === 'dec') {
    return (a === b) ? 0 : a ? 1 : -1; // eslint-disable-line
  }

  return direction === 'asc' ? a - b : b - a;
};

export const getDistance = (feat, location) => {
  if (!feat || !location || !location.length) {
    return false;
  }

  return turfDistance(location, feat);
};

export const getNearbyVenues = (data, detailData, maxDistance = 1) => {
  if (!data || !detailData) {
    return [];
  }

  const nearby = data.features
    .filter(feat => feat.properties.id !== detailData.id && !feat.properties.isFiltered)
    .map((feat) => {
      feat.properties.detailDistance = turfDistance(detailData.location, feat);
      return feat;
    })
    .filter(feat => feat.properties.detailDistance < maxDistance)
    .sort((a, b) => a.properties.detailDistance - b.properties.detailDistance)
    .map(feat => feat.properties);

  return nearby;
};

export const getDistrictBounds = districtFeature => (
  turfBbox(districtFeature)
);

const icons = {
  Museum: museumIcon,
  Bibliothek: libraryIcon,
  Archiv: libraryIcon,
  'Bibliothek/Archiv': libraryIcon,
  Theater: theaterIcon,
  Musikschule: musicSchoolIcon,
  Musik: musicIcon,
  Konzert: concertIcon,
  Oper: operaIcon,
  Projektraum: projectRoomIcon,
  Literaturhaus: bookHouse,
  Galerie: galleryIcon,
  Tanz: dancePerformanceIcon,
  Performance: dancePerformanceIcon,
  'Tanz/Performance': dancePerformanceIcon,
  Kunst: artIcon,
  'Bildende Kunst': artIcon,
  Gedenkstätte: memorialIcon,
  Verband: associationIcon,
  Verein: associationIcon,
  'Verband/Verein': associationIcon,
  Sonstige: othersIcon
};

export const getIconByCategory = category => (
  icons[category] ? icons[category] : defaultIcon
);

export const getUniqueCategories = (data) => {
  const allCategories = data.features
    .map(d => d.properties.tags)
    .reduce((acc, value) => acc.concat(value), []);
  return [...new Set(allCategories)].sort(sortCategories);
};

export const getColorizer = (uniqueCategories) => {
  const normalizedCategories = uniqueCategories.map(cat => cat.toLowerCase());
  const colorScale = scaleOrdinal().domain(normalizedCategories).range(config.colors);

  return (category) => {
    const loweredCategory = category ? category.toString().toLowerCase() : '';
    return normalizedCategories.includes(loweredCategory) ? colorScale(loweredCategory) : '#bbb';
  };
};

export const getFavs = () => Store.get(config.localStorage.favKey) || [];

export const setFavs = favs => Store.set(config.localStorage.favKey, favs);

window.Store = Store;

export default {
  filterCategories,
  filterDistricts,
  filterMapBounds,
  filterAccessibility,
  getNearbyVenues,
  getDistrictBounds,
  getColorizer,
  getUniqueCategories,
  getFavs,
  setFavs,
};
