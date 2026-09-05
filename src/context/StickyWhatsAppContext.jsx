import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getGeneralEnquiryUrl } from '../utils/whatsapp';

const StickyWhatsAppContext = createContext(null);

export function StickyWhatsAppProvider({ children }) {
  const [override, setOverride] = useState(null);

  const value = useMemo(
    () => ({
      url: override?.url || getGeneralEnquiryUrl(),
      label: override?.label || 'Chat on WhatsApp',
      setOverride,
    }),
    [override]
  );

  return <StickyWhatsAppContext.Provider value={value}>{children}</StickyWhatsAppContext.Provider>;
}

/** Call from a page to replace the sticky mobile CTA, e.g. with a product-specific link. */
export function useStickyWhatsApp(url, label) {
  const ctx = useContext(StickyWhatsAppContext);
  useEffect(() => {
    if (!ctx) return;
    ctx.setOverride(url ? { url, label } : null);
    return () => ctx.setOverride(null);
  }, [url, label]); // eslint-disable-line react-hooks/exhaustive-deps
}

export function useStickyWhatsAppValue() {
  return useContext(StickyWhatsAppContext);
}
