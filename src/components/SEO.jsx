import { Helmet } from 'react-helmet-async';
import { storeConfig } from '../config/store';

export default function SEO({ title, description, image, url, type = 'website' }) {
  const fullTitle = title ? `${title} | ${storeConfig.name}` : storeConfig.seo.defaultTitle;
  const desc = description || storeConfig.seo.defaultDescription;
  const ogImage = image || `${storeConfig.seo.siteUrl}/og-default.jpg`;
  const canonical = url ? `${storeConfig.seo.siteUrl}${url}` : storeConfig.seo.siteUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
