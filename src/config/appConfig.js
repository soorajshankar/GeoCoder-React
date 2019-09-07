const baseUrl = process.env.REACT_APP_BASE_SERVICE_URL || "";

export const PROVIDERS = {
  GOOGLE: "GOOGLE",
  BING: "BING"
};

export const config = {
  GOOGLE_MAP_API_KEY: "AIzaSyAMQ_lokx5I3FFYafAuC1B2VcxCIuX13Gs",
  serviceUrls: {
    marker: `${baseUrl}/api/markers`,
    geoCoder: `${baseUrl}/api/geoCoder`
  }
};
/**
 * Provider specific configuration 
 */
export const getProviderLibUrl = (apiKey, provider) => {
  switch (provider) {
    case PROVIDERS.GOOGLE:
      return `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    //TODO for other providers like BING 
    default:
      return `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  }
};
