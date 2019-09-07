export const loadJS = src => {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref && ref.parentNode.insertBefore(script, ref);
};

export const renderMap = focusLoc => {
  return new window.google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: focusLoc,
    mapTypeId: "terrain"
  });
};
export const addMarkersToMap = (markers, map) =>
  markers.map(i => {
    return new window.google.maps.Marker({
      position: { lat: i.lat, lng: i.lng },
      map: map
    });
  });
