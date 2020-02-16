import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

export const getAllHostels = () => axios.get('/hostels?limit=8');

export const getAllHostelsByLink = link => axios.get(link);

export const getAvailableHostel = (startDate, endDate) =>
  axios.get(
    `/hostels/available?limit=8&start_at=${startDate}&end_at=${endDate}`
  );

export const getHostelData = id => axios.get(`/hostels/${id}`);

export const searchHostel = query =>
  axios.get(`/hostels/search?query=${query}`);

export default {
  getAllHostels,
  getAllHostelsByLink,
  getAvailableHostel,
  getHostelData,
  searchHostel
};
