'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import { Toaster } from 'react-hot-toast';
import { LinearProgress, Stack } from '@mui/material';

import { reduxStore, persistor } from 'src/redux';
import AuthProvider from './custom-auth-provider';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  isAuth: boolean;
};

export function Providers({ children, isAuth }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <ReduxProvider store={reduxStore}>
      <AuthProvider 
        isAuth={isAuth} 
      >
      <PersistGate
        loading={
          <Stack
            sx={{
              position: 'fixed',
              top: 'calc(50vh - 2px)',
              width: '300px',
              left: 'calc(50vw - 150px)',
              zIndex: 9999,
            }}
          >
            <LinearProgress />
          </Stack>
        }
        persistor={persistor}
      >
        <QueryClientProvider client={queryClient}>
          {/* <Toaster position="top-center" /> */}
          {children}
          </QueryClientProvider>
        </PersistGate>
      </AuthProvider>
    </ReduxProvider>
  );
} 