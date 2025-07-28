'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { login } from 'src/services/index.js';
import { createCookies } from 'src/hooks/cookies.js';
import { useDispatch } from 'src/redux/store';
import { setLogin } from 'src/redux/slices/user';
import { setWishlist } from 'src/redux/slices/wishlist';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { toast } from 'src/components/snackbar';

import { FormHead } from '../../../components/form-head';
import { FormSocials } from '../../../components/form-socials';
import { FormDivider } from '../../../components/form-divider';

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export function SplitSignInView() {
  const showPassword = useBoolean();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const defaultValues: SignInSchemaType = {
    email: '',
    password: '',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await login(data);
      
      if (response.success) {
        // Store auth token in cookies (use 'token' to match the http interceptor)
        createCookies('token', response.token);
        
        // Set user data in Redux store
        dispatch(setLogin(response.user));
        
        // Set wishlist in Redux store if available (check if user has wishlist property)
        if (response.user?.wishlist) {
          dispatch(setWishlist(response.user.wishlist));
        }
        
        // Show success notification
        toast.success(response.message || 'Login successful!');
        
        // Redirect based on user role or returnTo parameter
        const redirectPath = returnTo || 
          (response.user.role === 'SUPER_ADMIN' || response.user.role === 'ADMIN' 
            ? paths.dashboard.root 
            : paths.dashboard.root);
        
        router.push(redirectPath);
      } else {
        toast.error(response.message || 'Login failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // More robust error handling
      let errorMessage = 'Login failed. Please try again.';
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.status === 401) {
        errorMessage = 'Invalid email or password.';
      } else if (error?.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error?.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please check your connection.';
      }
      
      toast.error(errorMessage);
    }
  });

  const renderForm = () => (
    <Box
      sx={{
        gap: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Field.Text name="email" label="Email address" slotProps={{ inputLabel: { shrink: true } }} />

      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Link
          component={RouterLink}
          href={paths.authDemo.split.forgotPassword}
          variant="body2"
          color="inherit"
          sx={{ alignSelf: 'flex-end' }}
        >
          Forgot password?
        </Link>

        <Field.Text
          name="password"
          label="Password"
          placeholder="6+ characters"
          type={showPassword.value ? 'text' : 'password'}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    <Iconify
                      icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Sign in..."
      >
        Sign in
      </Button>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Sign in to your account"
        description={
          <>
            {`Don’t have an account? `}
            <Link component={RouterLink} href={paths.authDemo.split.signUp} variant="subtitle2">
              Get started
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <FormDivider />

      <FormSocials
        signInWithGoogle={() => {}}
        singInWithGithub={() => {}}
        signInWithTwitter={() => {}}
      />
    </>
  );
}
