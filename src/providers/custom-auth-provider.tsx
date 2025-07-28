'use client';
import { useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'src/redux';
import { setLogout } from 'src/redux/slices/user';
import { setWishlist } from 'src/redux/slices/wishlist';

// cookies
import { deleteCookies } from 'src/hooks/cookies';

export default function AuthProvider({ children, isAuth }: { children: React.ReactNode, isAuth: boolean }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(({ user }: { user: any }) => user);
  useEffect(() => {
    if (!isAuthenticated) {
      deleteCookies('token');
      dispatch(setLogout());
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return children;
}
