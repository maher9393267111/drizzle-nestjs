import axios from 'axios';

function getToken() {
  const cname = 'token';
  if (typeof window !== 'undefined') {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document?.cookie);
  //  console.log("🔶️🔶️🔶️COOKIES🔶️🔶️🔶️" , decodedCookie)
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
  return '';
}

// const baseURL = process.env.BASE_URL;
const baseURL ='https://boliler-backend.vercel.app'
const http = axios.create({
  baseURL: baseURL + `/api`,
  timeout: 300000, // Increased to 30 seconds for debugging
  retryDelay: 1000000,
  maxRetries: 3,
});

// Request interceptor with debugging
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    // Debug API calls
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
      hasToken: !!token,
      timestamp: new Date().toISOString()
    });
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with debugging
http.interceptors.response.use(
  (response) => {
    const { config, status, statusText } = response;
    
    // Debug successful responses
    console.log(`✅ API Response: ${config.method?.toUpperCase()} ${config.url}`, {
      status,
      statusText,
      dataExists: !!response.data,
      timestamp: new Date().toISOString()
    });
    
    return response;
  },
  (error) => {
    const { config, response } = error;
    
    // Debug errors
    console.error(`❌ API Error: ${config?.method?.toUpperCase()} ${config?.url}`, {
      status: response?.status,
      statusText: response?.statusText,
      message: error.message,
      data: response?.data,
      timestamp: new Date().toISOString()
    });

    // Handle specific error cases that might cause refreshes
    if (response?.status === 401) {
      console.warn('🔐 Unauthorized request - token might be expired');
      // Don't automatically redirect here, let components handle it
    }

    if (response?.status === 500) {
      console.error('🔥 Server error - check backend logs');
    }

    if (error.code === 'ECONNABORTED') {
      console.error('⏰ Request timeout');
    }

    return Promise.reject(error);
  }
);

export default http;
