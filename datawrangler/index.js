const Fs = require('fs');
const Path = require('path');
const D3Dsv = require('d3-dsv');
const TurfHelpers = require('@turf/helpers');

const INPUT_FILENAME = 'Kulturakteure in Berlin - Daten.csv';
const OUTPUT_FILENAME = 'data.geojson';

const inputPath = Path.resolve(__dirname, INPUT_FILENAME);
const outputPath = Path.resolve(__dirname, '..', 'public/data', OUTPUT_FILENAME);
const csvData = Fs.readFileSync(inputPath).toString();
const data = D3Dsv.csvParse(csvData, parseRow);

delete data.columns;
const geojson = TurfHelpers.featureCollection(data);

Fs.writeFile(outputPath, JSON.stringify(geojson), err => {
  if (err) {
    throw err;
  }
  console.log(`wrote ${data.length} features to ${outputPath}`);
});

function getCategories(categoryString) {
  return categoryString.toUpperCase().split(',').filter(c => !!c).map(c => c.trim());
}

function parseRow(row, i) {
  const categories = getCategories(row.Sparte);

  const properties = {
    id: row.ID,
    name: row.Institution,
    description: '',
    website: row.Webseite,
    socialNetworks: [],
    email: '',
    telephone: '',
    logo: '',
    legalName: '',
    address: row.Adresse,
    zipcode: row.PLZ,
    city: row.Ort,
    location: [+row.lon, +row.lat],
    category: categories,
    type: row.Typ,
  };

  return new TurfHelpers.point([+row.lon, +row.lat], properties);
}
