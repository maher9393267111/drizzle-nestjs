import type { AxiosRequestConfig } from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = {
  get: async (url: string, config?: any) => {
    console.log('%c[Axios-Get]', 'color: #008000', url, config);
    return Promise.resolve({ data: {} });
  },
  post: async (url: string, data?: any, config?: any) => {
    console.log('%c[Axios-Post]', 'color: #008000', url, data, config);
    return Promise.resolve({ data: {} });
  },
  put: async (url: string, data?: any, config?: any) => {
    console.log('%c[Axios-Put]', 'color: #008000', url, data, config);
    return Promise.resolve({ data: {} });
  },
  delete: async (url: string, config?: any) => {
    console.log('%c[Axios-Delete]', 'color: #008000', url, config);
    return Promise.resolve({ data: {} });
  },
  create: () => axiosInstance,
  interceptors: {
    response: {
      use: () => {},
    },
    request: {
      use: () => {},
    },
  },
};

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    console.log('%c[Fetcher]', 'color: #008000', url, config);

    return { data: {} };
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
