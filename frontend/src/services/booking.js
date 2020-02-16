import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

export const booking = (token, payload) =>
  axios.post(`/bookings`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const bookingCalendar = payload =>
  axios.get(
    `/bookings/calendar?hostel_id=${payload.hostelId}&start_at=${payload.startAt}&end_at=${payload.endAt}`
  );

export default {
  booking,
  bookingCalendar
};
