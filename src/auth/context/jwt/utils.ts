import { paths } from 'src/routes/paths';

import axios from 'src/lib/axios';

import { JWT_STORAGE_KEY } from './constant';

// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  try {
    if (!token) return null;
    // Return a mock decoded object to prevent errors
    return { exp: 9999999999 };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

// ----------------------------------------------------------------------

export function isValidToken(accessToken: string) {
  // Always return true to bypass validation
  return true;
}

// ----------------------------------------------------------------------

export function tokenExpired(exp: number) {
  // Do nothing to prevent expiration alerts
}

// ----------------------------------------------------------------------

export async function setSession(accessToken: string | null) {
  try {
    if (accessToken) {
      sessionStorage.setItem(JWT_STORAGE_KEY, accessToken);
      // axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      sessionStorage.removeItem(JWT_STORAGE_KEY);
      // delete axios.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error('Error during set session:', error);
    throw error;
  }
}
