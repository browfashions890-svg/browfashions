import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <SEO title="Page Not Found" />
      <p className="font-display text-6xl text-ink/20">404</p>
      <h1 className="font-display text-2xl text-ink">Page not found</h1>
      <p className="max-w-sm text-sm text-ink-soft/70">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}
