'use client';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useSelector } from 'src/redux';

// components
import { LoadingScreen } from 'src/components/loading-screen';

Guest.propTypes = {
  children: PropTypes.node.isRequired
};
export default function Guest({ children }) {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(({ user }) => user);
  const [isAuth, setAuth] = useState(true);
  useEffect(() => {
    if (isAuthenticated) {
      setAuth(false);

      const isAdmin = user.role.includes('admin');
      const isVendor = user.role.includes('vendor');
      router.push(isAdmin ? '/admin/dashboard' : isVendor ? '/vendor/dashboard' : '/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isAuth) {
    return <LoadingScreen />;
  }
  return children;
}
