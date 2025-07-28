'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { forgetPassword } from 'src/services/index.js';

import { PasswordIcon } from 'src/assets/icons';

import { Form, Field } from 'src/components/hook-form';
import { toast } from 'src/components/snackbar';

import { FormHead } from '../../../components/form-head';
import { FormReturnLink } from '../../../components/form-return-link';

// ----------------------------------------------------------------------

export type ResetPasswordSchemaType = zod.infer<typeof ResetPasswordSchema>;

export const ResetPasswordSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
});

// ----------------------------------------------------------------------

export function SplitResetPasswordView() {
  const router = useRouter();

  const defaultValues: ResetPasswordSchemaType = {
    email: '',
  };

  const methods = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await forgetPassword(data);
      
      if (response.success) {
        // Show success notification
        toast.success(response.message || 'Password reset email sent successfully!');
        
        // Redirect back to sign in page
        router.push(paths.authDemo.split.signIn);
      } else {
        toast.error(response.message || 'Failed to send reset email. Please try again.');
      }
    } catch (error: any) {
      console.error('Reset password error:', error);
      
      // More robust error handling
      let errorMessage = 'Failed to send reset email. Please try again.';
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.status === 404) {
        errorMessage = 'Email address not found. Please check your email.';
      } else if (error?.response?.status === 400) {
        errorMessage = 'Invalid email address. Please check your email.';
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
        autoFocus
        name="email"
        label="Email address"
        placeholder="example@gmail.com"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Send request..."
      >
        Send request
      </Button>
    </Box>
  );

  return (
    <>
      <FormHead
        icon={<PasswordIcon />}
        title="Forgot your password?"
        description={`Please enter the email address associated with your account and we'll email you a link to reset your password.`}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <FormReturnLink href={paths.authDemo.split.signIn} />
    </>
  );
}
