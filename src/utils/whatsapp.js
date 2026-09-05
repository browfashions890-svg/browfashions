import { storeConfig } from '../config/store';

/**
 * Reusable WhatsApp click-to-chat helpers.
 * The store's WhatsApp number lives ONLY in VITE_WHATSAPP_NUMBER (.env),
 * surfaced here via storeConfig.whatsappNumber. Never hard-code the
 * number anywhere else in the app — always call these helpers.
 */

const formatPrice = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const num = Number(value);
  if (Number.isNaN(num)) return null;
  return `₹${num.toLocaleString('en-IN')}`;
};

const buildWhatsAppUrl = (message) => {
  const number = (storeConfig.whatsappNumber || '').replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(message);
  if (!number) {
    // Missing-number fallback: still return a wa.me link without a number
    // so the button doesn't crash, but callers should show a warning.
    return `https://wa.me/?text=${encoded}`;
  }
  return `https://wa.me/${number}?text=${encoded}`;
};

/** Generic "just browsing" enquiry, e.g. from the homepage CTA. */
export function getGeneralEnquiryUrl() {
  const message = "Hi, I would like to know more about your latest clothing collection.";
  return buildWhatsAppUrl(message);
}

/**
 * Product-specific enquiry. Automatically includes the selected size and
 * colour when provided, and falls back gracefully when they are not.
 */
export function getProductEnquiryUrl(product, { size, colour } = {}) {
  if (!product) return getGeneralEnquiryUrl();

  const lines = ['Hi, I am interested in this product.', ''];
  lines.push(`Product: ${product.name}`);
  if (product.product_code) lines.push(`Product Code: ${product.product_code}`);

  const price = formatPrice(product.price);
  if (price) lines.push(`Price: ${price}`);

  if (size) lines.push(`Size: ${size}`);
  if (colour) lines.push(`Colour: ${colour}`);

  lines.push('', 'Please confirm availability.');

  return buildWhatsAppUrl(lines.join('\n'));
}

/** Enquiry from a catalogue card, before size/colour is chosen. */
export function getCatalogueEnquiryUrl(product) {
  return getProductEnquiryUrl(product);
}

export function isWhatsAppConfigured() {
  return Boolean((storeConfig.whatsappNumber || '').trim());
}

export function getWhatsAppDisplayNumber() {
  const num = storeConfig.whatsappNumber || '';
  if (!num) return '';
  // Best-effort display formatting for an Indian number, falls back to raw digits.
  if (num.length === 12 && num.startsWith('91')) {
    return `+91 ${num.slice(2, 7)} ${num.slice(7)}`;
  }
  return `+${num}`;
}
