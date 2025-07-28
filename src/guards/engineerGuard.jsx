'use client';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useEngineerAuth } from 'src/hooks/useEngineerAuth';

// components
import { LoadingScreen } from 'src/components/loading-screen';


export default function CustomerGuard({ children }) {
  const router = useRouter();
  const [isAuth, setAuth] = useState(true);

  const { data: engineerData, isLoading } = useEngineerAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!engineerData?.success || !engineerData?.engineer) {
        setAuth(false);
        console.log('Engineer auth failed:', engineerData);
        router.push('/engineer/login');
      }
    }
  }, [engineerData, isLoading, router]);

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

