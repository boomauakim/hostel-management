import axios from 'axios';

const token = localStorage.getItem('token');

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.headers.common.Authorization = `Bearer ${token}`;

export const booking = payload => axios.post(`/bookings`, payload);

export default {
  booking
};
