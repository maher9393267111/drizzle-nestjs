import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { SplitForgotPasswordView } from 'src/auth/view/auth-demo/split';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Forgot password | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return <SplitForgotPasswordView />;
} 