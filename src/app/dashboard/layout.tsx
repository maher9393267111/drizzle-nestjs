import 'src/global.css';

// ----------------------------------------------------------------------
import AdminGuard from 'src/guards/admin';
// import { AuthGuard } from 'src/auth/guard';
import { AuthProvider } from 'src/auth/context/jwt';
import { DashboardLayout } from 'src/layouts/dashboard';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthProvider>
      <AdminGuard>
        <DashboardLayout>{children}</DashboardLayout>
      </AdminGuard>
    </AuthProvider>
  );
}
