import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

export const getMyBooking = token => {
  return axios.get(`/me/bookings`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export default {
  getMyBooking
};
