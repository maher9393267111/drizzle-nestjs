'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { register } from 'src/services/index.js';
import { createCookies } from 'src/hooks/cookies.js';
import { useDispatch } from 'src/redux/store';
import { setLogin } from 'src/redux/slices/user';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { toast } from 'src/components/snackbar';

import { FormHead } from '../../../components/form-head';
import { FormDivider } from '../../../components/form-divider';
import { FormSocials } from '../../../components/form-socials';
import { SignUpTerms } from '../../../components/sign-up-terms';

// ----------------------------------------------------------------------

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required!' }),
  lastName: zod.string().min(1, { message: 'Last name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  phone: zod
    .string()
    .min(1, { message: 'Phone number is required!' })
    .regex(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 
      { message: 'Phone number is not valid' }),
  gender: zod.enum(['male', 'female', 'other'], { 
    required_error: 'Gender is required!' 
  }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(8, { message: 'Password should be 8 characters or longer.' }),
});

// ----------------------------------------------------------------------

export function SplitSignUpView() {
  const showPassword = useBoolean();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const defaultValues: SignUpSchemaType = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'male' as const,
    password: '',
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const watchedGender = watch('gender');

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await register(data);
      
      if (response.success) {
        // Store auth token in cookies
        createCookies('token', response.token);
        
        // Set user data in Redux store
        dispatch(setLogin(response.user));
        
        // Show success notification
        toast.success(`OTP sent to your email ${response.user.firstName}`);
        
        // Redirect to OTP verification with optional redirect parameter
        const otpPath = redirect 
          ? `/auth-demo/split/verify-otp?redirect=${redirect}` 
          : paths.authDemo.split.verify || '/auth-demo/split/verify-otp';
        
        router.push(otpPath);
      } else {
        toast.error(response.message || 'Registration failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // More robust error handling
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.status === 400) {
        errorMessage = 'Invalid data provided. Please check your information.';
      } else if (error?.response?.status === 409) {
        errorMessage = 'Email already exists. Please use a different email.';
      } else if (error?.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error?.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please check your connection.';
      }
      
      toast.error(errorMessage);
    }
  });

  const renderForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{ display: 'flex', gap: { xs: 3, sm: 2 }, flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Field.Text
          name="firstName"
          label="First name"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Field.Text
          name="lastName"
          label="Last name"
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Box>

      <Box
        sx={{ display: 'flex', gap: { xs: 3, sm: 2 }, flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Field.Select
          name="gender"
          label="Gender"
          slotProps={{ inputLabel: { shrink: true } }}
        >
          <MenuItem value="male">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Iconify icon="solar:user-id-bold" />
              Male
            </Box>
          </MenuItem>
          <MenuItem value="female">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Iconify icon="solar:user-id-bold" />
              Female
            </Box>
          </MenuItem>
          <MenuItem value="other">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Iconify icon="solar:user-id-bold" />
              Other
            </Box>
          </MenuItem>
        </Field.Select>

        <Field.Text
          name="phone"
          label="Phone"
          placeholder="Enter phone number"
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Box>

      <Field.Text 
        name="email" 
        label="Email address" 
        slotProps={{ inputLabel: { shrink: true } }} 
      />

      <Field.Text
        name="password"
        label="Password"
        placeholder="8+ characters"
        type={showPassword.value ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={showPassword.onToggle} edge="end">
                  <Iconify icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Create account..."
      >
        Create account
      </Button>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Get started absolutely free"
        description={
          <>
            {`Already have an account? `}
            <Link component={RouterLink} href={paths.authDemo.split.signIn} variant="subtitle2">
              Get started
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <SignUpTerms />

      <FormDivider />

      <FormSocials
        signInWithGoogle={() => {}}
        singInWithGithub={() => {}}
        signInWithTwitter={() => {}}
      />
    </>
  );
}
