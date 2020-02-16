import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

export const booking = (token, payload) =>
  axios.post(`/bookings`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });

export default {
  booking
};
