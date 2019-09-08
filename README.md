# Geocoder Web Application

* I have used native Google Maps-JS API to load map directly into the DOM (though there are custom-unofficial react components for google map, I am not using here )
* React hooks and context API is used.
* Map instance is kept inside React global context to make sure it is available throughout the application for future enhancements.
* React Class Components, Functional Components are used across the applications.
* Jest Unit Tests are written for all major components with trivial coverage.
* For switching the map service provider, only helpers and generic map component needs to be modified. ( considering the competitor's like bing maps and azure maps are loading the map SDK through scrips)

# User Experience

* User should be able to to load the page with saved markers.
* User should be able to add markers by clicking the "Add Marker" Button on the top righ side of the screen 
* Add Marker Button will open a model with address search input and country picker dropdown.
* User can add any `Google Map Geocoder Api` validated address into the marker list.
* Error handler will show the error notification if the marker is already there in the list.
* After adding the marker map will be focused onto the newly added marker.
* Right side pane will have the list of markers.
* By clicking on the `Marker name` user will be able to to focus map onto the marker positon.
* User will be able to `Delete` any marker.
* User will be able to `Edit` any marker using the `Geocoder API` validation.
<!-- # Note fixed 
> Google map will show popup "This page can't load Google Maps correctly." because of the google map API developer trial plan limitations. -->

## Requirements

- [Node and npm](http://nodejs.org)

## Installation

1. Clone the repository
2. Install the application: `npm install`
3. Start the server: `npm start`
4. View in browser at `http://localhost:8080`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Design

## React Context API

Context API has been used for storing the map instance and marker instances.
This will make sure that the future enhancements over map can be established without modifying the current code

## React Hooks

MarkerModal component is using hooks to manage the internal states.

## API services

All api services are isolated in a file which can be further changed to Redux Thunk/Saga if required.

## Map-helper

Map-helper is written to ensure that all google map specific method calls and instantiation are written in this file. so that if required, migration will be easy.

## Constants

Constant file is seperated with constant enums and static data.

## Config

appConfig.js is having the configuration data like api Keys and API Url configuration

# Main Components

## GoogleMap - Class Component

Google map component with generic properties. in order to refractor the map provider this file and map helper only needs to be chnaged.

### Props

@loc : default focus location,
@addToMarkers : output function on add marker
@viewMode EDIT/VIEW,
@isMapLoaded loded/not boolean

## Marker Modal - Functional Component

Reusable component as addMarker/EditMarker

### Props

@marker : marker object needs to be edited/added in shape of {name,lat,lng}
@mode : defines add mode or edit mode (from constant enum MARKERMODES) \*

### React Hooks

@name ,
@lat ,
@lng : form data
 