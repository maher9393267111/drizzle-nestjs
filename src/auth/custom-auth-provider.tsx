'use client';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'src/redux';
import { setLogout } from 'src/redux/slices/user';

import { deleteCookies } from 'src/hooks/cookies';

// ----------------------------------------------------------------------

export function CustomAuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      deleteCookies('token');
      dispatch(setLogout());
     
    }
  }, [isAuthenticated, dispatch]);

  return children;
} 