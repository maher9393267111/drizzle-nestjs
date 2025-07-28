// bolile_dashboard/src/services/customerHttp.js
import axios from 'axios';

function getEngineerToken() {
  if (typeof window !== 'undefined') {
    return document.cookie.split('; ')
      .find(row => row.startsWith('engineer='))
      ?.split('=')[1];
  }
  return null;
}

const baseURL = process.env.BASE_URL;
const engineerHttp = axios.create({
    baseURL: baseURL + `/api`,
    // timeout: 70000
    timeout: 1000000, // 10 second timeout
  retryDelay: 1000000,
  maxRetries: 3,
  });



engineerHttp.interceptors.request.use(
  (config) => {
    const token = getEngineerToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);






export default engineerHttp;