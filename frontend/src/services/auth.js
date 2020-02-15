import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

export const signup = async (payload) => axios.post('/signup', payload);

export const login = async (payload) => axios.post('/login', payload);

export default { signup };
