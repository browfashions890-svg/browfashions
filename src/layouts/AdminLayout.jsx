import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { signOut } from '../services/adminService';

export default function AdminLayout() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div className="container-page py-16 text-sm text-ink-soft">Checking session…</div>;
  }

  if (!isAuthenticated) {
    navigate('/admin/login', { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <header className="border-b border-ink/10 bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/admin" className="font-display text-lg">Admin — Products</Link>
          <button
            onClick={async () => {
              await signOut();
              navigate('/admin/login');
            }}
            className="text-sm font-medium text-rust hover:underline"
          >
            Sign out
          </button>
        </div>
      </header>
      <main className="container-page py-8">
        <Outlet />
      </main>
    </div>
  );
}
