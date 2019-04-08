import fetch from 'unfetch';
import { feature } from 'topojson';
import { formatDefaultLocale } from 'd3-format';

const germanNumberFormat = formatDefaultLocale({
  decimal: ',',
  thousands: '.',
  grouping: [3],
  currency: ['€', '']
});

export async function fetchJSON(url) {
  return fetch(url).then(res => res.json());
}

export async function fetchTopoJSON(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const topoData = await fetchJSON(url);
      const data = feature(topoData, topoData.objects[Object.keys(topoData.objects)[0]]);
      return resolve(data);
    } catch (err) {
      return reject(err);
    }
  });
}

export function formatNumber(num, decimals = 0) {
  if (typeof num === 'undefined') {
    return '';
  }

  return germanNumberFormat.format(`,.${decimals}f`)(num);
}

export const isMobile = navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i);

export function noop() {}

export default {
  fetchJSON,
  fetchTopoJSON,
  formatNumber,
  isMobile,
  noop
};
