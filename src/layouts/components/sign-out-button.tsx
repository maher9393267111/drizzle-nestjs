import type { ButtonProps } from '@mui/material/Button';

import { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Button from '@mui/material/Button';

import { useRouter } from 'src/routes/hooks';

import { CONFIG } from 'src/global-config';
import { deleteCookies } from 'src/hooks/cookies.js';
import { useDispatch } from 'src/redux/store';
import { setLogout } from 'src/redux/slices/user';

import { toast } from 'src/components/snackbar';

import { useAuthContext } from 'src/auth/hooks';
import { signOut as jwtSignOut } from 'src/auth/context/jwt/action';


// ----------------------------------------------------------------------

const signOut =
 
  jwtSignOut;

type Props = ButtonProps & {
  onClose?: () => void;
};

export function SignOutButton({ onClose, sx, ...other }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { checkUserSession } = useAuthContext();

  const { logout: signOutAuth0 } = useAuth0();

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      await checkUserSession?.();

      // Delete cookies and clear Redux state
      await deleteCookies('token');
      dispatch(setLogout());

      onClose?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Unable to logout!');
    }
  }, [checkUserSession, onClose, router, dispatch]);

  const handleLogoutAuth0 = useCallback(async () => {
    try {
      await signOutAuth0();

      // Delete cookies and clear Redux state for Auth0 as well
      await deleteCookies('token');
      dispatch(setLogout());

      onClose?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Unable to logout!');
    }
  }, [onClose, router, signOutAuth0, dispatch]);

  return (
    <Button
      fullWidth
      variant="soft"
      size="large"
      color="error"
      onClick={CONFIG.auth.method === 'auth0' ? handleLogoutAuth0 : handleLogout}
      sx={sx}
      {...other}
    >
      Logout
    </Button>
  );
}
