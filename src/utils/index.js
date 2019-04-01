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


export default {
  fetchJSON,
  fetchTopoJSON,
  formatNumber
};
