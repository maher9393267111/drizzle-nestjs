'use client';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { toast } from 'src/components/snackbar';

// redux
import { useSelector } from 'src/redux';
import { LoadingScreen } from 'src/components/loading-screen';

// components
// import Loading from 'src/components/loading';

export default function Guest({ children }) {
  const router = useRouter();
  const [isAdmin, setAdmin] = useState(true);
  const { isAuthenticated, user } = useSelector(({ user }) => user);

  useEffect(() => {
    if ( user?.role !== 'SUPER_ADMIN'

      
      // || user?.role !== 'super admin' 
      // //SUPER_ADMIN

      // || user?.role !== 'super_admin'
      // || user?.role !== 'SUPER_ADMIN'
      // || user?.role !== 'admin'
      // || user?.role !== 'ADMIN'
      // || user?.role !== 'admin'
    ) {

      // toast.error(`You're not allowed to access dashboard ${user?.role}`);
      setAdmin(false);
       toast.error("You're not allowed to access dashboard");
       router.push('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAdmin) {
    return <LoadingScreen />;
  }
  return children;
}

Guest.propTypes = {
  children: PropTypes.node.isRequired
};
