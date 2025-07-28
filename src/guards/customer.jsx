'use client';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { getCustomerAuth } from 'src/services/customer';

// components
import { LoadingScreen } from 'src/components/loading-screen';

export default function CustomerGuard({ children }) {
  const router = useRouter();
  const [isAuth, setAuth] = useState(true);

  const { data: customerData, isLoading } = useQuery('customerAuth', getCustomerAuth, {
    retry: 1,
    onSuccess: (data) => {
      if (!data.success || !data.customer) {
        setAuth(false);
        console.log('Customer auth failed:', data);
        router.push('/customer/login');
      }
    },
    onError: (error) => {
      setAuth(false);
      // console.log('Customer auth error:', error);
      router.push('/customer/login');
    }
  });

  // Add debugging
  // useEffect(() => {
  //   // console.log('CustomerGuard mounted');
  //   // console.log('Current path:', window.location.pathname);
  // }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuth) {
    return null;
  }

  return children;
}

CustomerGuard.propTypes = {
  children: PropTypes.node.isRequired
};


