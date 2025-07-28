'use client';

import React from 'react';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { resetPassword } from 'src/services/index.js';

import { SentIcon } from 'src/assets/icons';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { toast } from 'src/components/snackbar';

import { FormHead } from '../../../components/form-head';
import { FormReturnLink } from '../../../components/form-return-link';

// ----------------------------------------------------------------------

export type ResetPasswordWithTokenSchemaType = zod.infer<typeof ResetPasswordWithTokenSchema>;

export const ResetPasswordWithTokenSchema = zod
  .object({
    password: zod
      .string()
      .min(1, { message: 'Password is required!' })
      .min(8, { message: 'Password must be at least 8 characters!' }),
    confirmPassword: zod.string().min(1, { message: 'Confirm password is required!' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  });

// ----------------------------------------------------------------------

type Props = {
  token: string;
};

export function SplitResetPasswordWithTokenView({ token }: Props) {
  const showPassword = useBoolean();
  const router = useRouter();

  // Validate token on component mount
  React.useEffect(() => {
    if (!token || token.length < 6) {
      toast.error('Invalid reset token. Please request a new reset link.');
      router.push(paths.authDemo.split.resetPassword);
    }
  }, [token, router]);

  const defaultValues: ResetPasswordWithTokenSchemaType = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm<ResetPasswordWithTokenSchemaType>({
    resolver: zodResolver(ResetPasswordWithTokenSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('Reset password request:', { 
        newPassword: data.password, 
        token,
        tokenLength: token.length 
      });
      
      const response = await resetPassword({
        newPassword: data.password,
        token,
      });
      
      console.log('Reset password response:', response);
      
      // Handle response based on actual API structure
      if (response.success || response.message) {
        // Show success notification
        toast.success(response.message || 'Password successfully updated!');
        
        // Redirect to sign in page
        router.push(paths.authDemo.split.signIn);
      } else {
        toast.error(response.message || 'Failed to update password. Please try again.');
      }
    } catch (error: any) {
      console.error('Reset password error:', error);
      console.error('Error details:', {
        status: error?.response?.status,
        data: error?.response?.data,
        message: error?.message
      });
      
      // More robust error handling
      let errorMessage = 'Failed to update password. Please try again.';
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.status === 400) {
        errorMessage = 'Invalid token or password. Please check your information.';
      } else if (error?.response?.status === 401) {
        errorMessage = 'Token expired or invalid. Please request a new reset link.';
      } else if (error?.response?.status === 404) {
        errorMessage = 'Reset token not found or expired. Please request a new reset link.';
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
      <Field.Text
        name="password"
        label="New Password"
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

      <Field.Text
        name="confirmPassword"
        label="Confirm new password"
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
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Save..."
      >
        Save
      </Button>
    </Box>
  );

  return (
    <>
      <FormHead
        icon={<SentIcon />}
        title="Reset Password"
        description="Enter your new password"
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <FormReturnLink href={paths.authDemo.split.signIn} />
    </>
  );
}
