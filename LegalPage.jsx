import SEO from '../../components/SEO';

export default function LegalPage({ title, url, children }) {
  return (
    <div className="container-page max-w-prose py-14">
      <SEO title={title} url={url} />
      <h1 className="section-heading">{title}</h1>
      <div className="prose-sm mt-6 space-y-4 text-sm leading-relaxed text-ink-soft/80">{children}</div>
    </div>
  );
}
