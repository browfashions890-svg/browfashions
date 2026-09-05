import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/adminService';
import { isSupabaseConfigured } from '../../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: signInError } = await signIn(email, password);
    setLoading(false);
    if (signInError) {
      setError(signInError.message || 'Sign in failed. Check your email and password.');
      return;
    }
    navigate('/admin');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand-50 px-4">
      <div className="w-full max-w-sm rounded-sm border border-ink/10 bg-white p-8">
        <h1 className="font-display text-2xl text-ink">Admin Login</h1>
        <p className="mt-1 text-sm text-ink-soft/60">Sign in to manage products.</p>

        {!isSupabaseConfigured() && (
          <p className="mt-4 rounded-sm bg-rust/10 p-3 text-xs text-rust">
            Supabase isn&apos;t configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file,
            then create an admin user in your Supabase project (Authentication → Users).
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="text-sm">
            <span className="mb-1 block text-xs font-medium text-ink-soft/70">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-ink/15 px-3 py-2.5 text-sm focus:border-ink"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-xs font-medium text-ink-soft/70">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-ink/15 px-3 py-2.5 text-sm focus:border-ink"
            />
          </label>

          {error && <p className="text-sm text-rust">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary mt-2 disabled:opacity-60">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
