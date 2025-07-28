import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { SplitResetPasswordWithTokenView } from 'src/auth/view/auth-demo/split';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Reset password | Layout split - ${CONFIG.appName}` };

type Props = {
  params: { token: string };
};

export default function Page({ params }: Props) {
  return <SplitResetPasswordWithTokenView token={params.token} />;
}
