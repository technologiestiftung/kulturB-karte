# Technologiestiftung kulturB Map

An interactive map application that shows cultural institutions in Berlin.

## Getting started

This frontend application is derived from [webkid/react-starter](https://github.com/wbkd/react-starter) which is based on [React](https://facebook.github.io/react/), [unistore](https://www.npmjs.com/package/unistore), [Styled Components](https://www.styled-components.com/) and [webpack v4](https://webpack.js.org/). For the interactive map, [mapbox-gl-js](https://github.com/mapbox/mapbox-gl-js) is used.

To run the app locally, you have to clone this repository:

```sh
$ git clone git@github.com:technologiestiftung/kulturB-karte.git
```

Then, navigate to the project directory and install the dependencies using [npm](https://www.npmjs.com/):

```sh
$ cd kulturB-karte
$ npm install
```

## Development

To run the development server with live reloading, you can use the following command:

```sh
$ npm start
```

The website will be available at [localhost:8080](http://localhost:8080/).

## Build

To create a minified and bundled version of the application, you can use the following command:

```sh
$ npm run build
```

The packaged application will be available in the `build` folder.

## Isolines

For displaying isolines in the detail view of a location, the [here isoline api](https://developer.here.com/documentation/routing/topics/example-isoline-simple-distance.html) is used. To make it work, you need to enter your own `app_id` and `app_code` in the [config.json](/blob/develop/config.json).

```
...
"geocoder": {
  "app_id": {YOUR_APP_ID_HERE},
  "app_code": {YOU_APP_CODE_HERE}
}
...
```

## See also

* [technologiestiftung/kulturB-cms](https://github.com/technologiestiftung/kulturB-cms) - the content management system for the culture locations
* [technologiestiftung/kulturB-api](https://github.com/technologiestiftung/kulturB-api) - the api that drives the cms and map application