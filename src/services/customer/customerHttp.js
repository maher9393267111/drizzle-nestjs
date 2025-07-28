// bolile_dashboard/src/services/customerHttp.js
import axios from 'axios';

function getCustomerToken() {
  if (typeof window !== 'undefined') {
    return document.cookie.split('; ')
      .find(row => row.startsWith('customer='))
      ?.split('=')[1];
  }
  return null;
}

const baseURL = process.env.BASE_URL;
const customerHttp = axios.create({
    baseURL: baseURL + `/api`,
    // timeout: 70000
    timeout: 100000, // 10 second timeout
  retryDelay: 100000,
  maxRetries: 3,
  });



customerHttp.interceptors.request.use(
  (config) => {
    const token = getCustomerToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);






export default customerHttp;