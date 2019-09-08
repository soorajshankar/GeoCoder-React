import axios from "axios";
import { config } from "../config/appConfig";

const { serviceUrls } = config;

//Search Address
export const searchAddress = (address, country) => {
  return axios.get(
    `${serviceUrls.geoCoder}/${address}/${country}`
    // `${serviceUrls.geoCoder}/${address}&components=country:${country}`
  );
};

//Get All markers
export const getAllMarkers = () => {
  return axios.get(serviceUrls.marker);
};

//Add Marker
export const addMarker = data => {
  return axios.post(serviceUrls.marker, data);
};

//Edit Marker by id
export const editMarker = item => {
  return axios.put(`${serviceUrls.marker}/${item._id}`, item);
};

//Delete Marker by id
export const deleteMarker = item => {
  return axios.delete(`${serviceUrls.marker}/${item._id}`);
};
