import { getGeneralEnquiryUrl, isWhatsAppConfigured } from '../utils/whatsapp';

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.02 3C9.4 3 4 8.37 4 15c0 2.36.66 4.56 1.8 6.44L4 29l7.76-1.75A11.9 11.9 0 0 0 16.02 27C22.63 27 28 21.63 28 15S22.63 3 16.02 3Zm0 21.7c-1.98 0-3.83-.55-5.41-1.5l-.39-.23-4.6 1.04 1.06-4.47-.25-.4A9.62 9.62 0 0 1 5.3 15c0-5.9 4.8-10.7 10.72-10.7S26.74 9.1 26.74 15 21.94 24.7 16.02 24.7Zm5.86-8.03c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.51-.16-.73.16-.21.32-.84 1.04-1.03 1.25-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.6-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.73-1.77-1-2.42-.26-.63-.53-.55-.73-.56h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.67 0 1.57 1.15 3.1 1.31 3.31.16.21 2.26 3.46 5.48 4.85.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
  </svg>
);

/**
 * Floating WhatsApp button for desktop, becomes a sticky full-width bar
 * on mobile. `message` overrides the default general enquiry link — pass
 * a product-specific URL from utils/whatsapp.js where relevant.
 */
export default function WhatsAppButton({ url, label = 'Chat on WhatsApp', variant = 'floating' }) {
  const href = url || getGeneralEnquiryUrl();
  const configured = isWhatsAppConfigured();

  if (variant === 'sticky-mobile') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-semibold text-white shadow-[0_-2px_10px_rgba(0,0,0,0.12)] sm:hidden"
        aria-label={label}
      >
        <WhatsAppIcon className="h-5 w-5" />
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={configured ? label : 'WhatsApp number not configured yet'}
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:flex"
      aria-label={label}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
