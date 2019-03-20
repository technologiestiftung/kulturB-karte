import pointInPolygon from '@turf/boolean-point-in-polygon';
import turfDistance from '@turf/distance';
import turfBbox from '@turf/bbox';
import turfBboxPolygon from '@turf/bbox-polygon';
import { scaleOrdinal } from 'd3-scale';
import get from 'lodash.get';
import museumIcon from '@material-ui/icons/AccountBalance';
import libraryIcon from '@material-ui/icons/LocalLibrary';
import theaterIcon from '~/../public/images/icons/theater.svg';
import musicSchoolIcon from '@material-ui/icons/MusicNote';
import projectRoomIcon from '@material-ui/icons/Store';
import bookHouse from '@material-ui/icons/ImportContacts';
import galleryIcon from '@material-ui/icons/ColorLens';
import danceIcon from '@material-ui/icons/InsertEmoticon';
import artIcon from '@material-ui/icons/Brush';
import memorialIcon from '@material-ui/icons/Business';
import defaultIcon from '@material-ui/icons/Place';

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
    .find(feat => feat.properties.Gemeinde_schluessel === districtFilter);

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
  const isWheelChairFiltered = filter.a11yWheelChairFilter && (!properties.accessibility_wheelchair || properties.accessibility_wheelchair === 'no' || properties.accessibility_wheelchair === 'unknown');
  const isDeafFiltered = filter.a11yDeafFilter;
  const isBlindFiltered = filter.a11yBlindFilter;

  return isWheelChairFiltered || isDeafFiltered || isBlindFiltered;
};

export const sortData = (sortBy, direction = 'asc') => (aObj, bObj) => {
  const a = get(aObj, sortBy);
  const b = get(bObj, sortBy);
  const type = typeof a;

  if (type === 'string' && direction === 'asc') {
    return a.localeCompare(b);
  }

  if (type === 'string' && direction === 'dec') {
    return b.localeCompare(a);
  }

  if (type === 'boolean' && direction === 'asc') {
    return (a === b) ? 0 : a ? 1 : -1; // eslint-disable-line
  }

  if (type === 'boolean' && direction === 'dec') {
    return (a === b) ? 0 : a ? -1 : 1; // eslint-disable-line
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
    .slice(0, 3)
    .map(feat => feat.properties);

  return nearby;
};

export const getDistrictBounds = districtFeature => (
  turfBbox(districtFeature)
);

const icons = {
  Museum: museumIcon,
  Bibliothek: libraryIcon,
  Theater: theaterIcon,
  Musikschule: musicSchoolIcon,
  Projektraum: projectRoomIcon,
  Literaturhaus: bookHouse,
  Galerie: galleryIcon,
  Tanz: danceIcon,
  'Bildende Kunst': artIcon,
  Gedenkstätte: memorialIcon
};

export const getIconByCategory = category => (
  icons[category] ? icons[category] : defaultIcon
);

export const getUniqueCategories = (data) => {
  const allCategories = data.features
    .map(d => d.properties.tags)
    .reduce((acc, value) => acc.concat(value), []);
  return [...new Set(allCategories)].sort((a, b) => a.localeCompare(b));
};

export const getColorizer = (uniqueCategories) => {
  const normalizedCategories = uniqueCategories.map(cat => cat.toLowerCase());
  const colorScale = scaleOrdinal().domain(normalizedCategories).range(config.colors);

  return (category) => {
    const loweredCategory = category ? category.toString().toLowerCase() : '';
    return normalizedCategories.includes(loweredCategory) ? colorScale(loweredCategory) : '#bbb';
  };
};

export default {
  filterCategories,
  filterDistricts,
  filterMapBounds,
  filterAccessibility,
  getNearbyVenues,
  getDistrictBounds,
  getColorizer,
  getUniqueCategories,
};
