# TSB KulturB Map

## Datawrangler

1. Export data as csv from the [Spreadsheet](https://docs.google.com/spreadsheets/d/137apgGo8hqU02NlEOp1HKmQudt0z-0mDjZrLPeahngw/edit#gid=0)
2. Copy the csv file to the `/datawrangler` directory
3. Run `node datawrangler/index.js`
4. This will create `public/data/data.geojson`

## Installation

```sh
$ npm install
```

## Development

Builds the application and starts a webserver with hot loading.
Runs on [localhost:8080](http://localhost:8080/)

```sh
$ npm run start
```

## Build

Builds a minified version of the application in the build folder.

```sh
$ npm run build
```
