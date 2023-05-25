import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://192.168.11.7:3000/',
  baseURL: 'http://localhost:3000/',
});

// export const baseURL = 'http://192.168.11.7:3000/';
export const baseURL = 'http://localhost:3000/';

