import React from "react";
export const initialContext = {
  isMapLoaded: false,
  mapInstance: null,
  markers: [],
  mapLoaded: () => {
    initialContext.isMapLoaded = true;
  },
  setMapObject: mapObject => {
    initialContext.mapInstance = mapObject;
  },
  addMarker: marker => {
    initialContext.markers.push(marker);
  },
  removeMarker: id => {
    //Remove marker By id.
  },
  removeAllMarkers: () => {
    for (var i = 0; i < initialContext.markers.length; i++) {
      initialContext.markers[i] && initialContext.markers[i].setMap(null);
    }
  },
  setMapOnAll: map => {
    for (var i = 0; i < initialContext.markers.length; i++) {
      initialContext.markers[i] && initialContext.markers[i].setMap(map);
    }
  },
  editMarker: id => {
    //Edit
  }
};
export const appContext = React.createContext({});
