import SEO from '../components/SEO';
import { storeConfig } from '../config/store';
import { getGeneralEnquiryUrl, getWhatsAppDisplayNumber } from '../utils/whatsapp';

export default function Contact() {
  return (
    <div className="container-page py-14">
      <SEO title="Contact Us" url="/contact" description={`Get in touch with ${storeConfig.name} — visit, call or WhatsApp us.`} />

      <h1 className="section-heading">Contact Us</h1>
      <p className="mt-3 max-w-prose text-sm text-ink-soft/70">
        We&apos;re happy to help with sizing, availability or anything else. WhatsApp is the fastest way to reach us.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-ink">Visit Us</h2>
            <p className="mt-2 text-sm text-ink-soft/70">
              {storeConfig.address.line1}
              <br />
              {storeConfig.address.line2}
              <br />
              {storeConfig.address.line3}
            </p>
            <a
              href={storeConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-medium text-rust hover:underline"
            >
              Open in Google Maps
            </a>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-ink">Call or Message</h2>
            <ul className="mt-2 space-y-1 text-sm text-ink-soft/70">
              <li>
                Phone:{' '}
                <a href={`tel:${storeConfig.phone}`} className="hover:underline">
                  {storeConfig.phone}
                </a>
              </li>
              {getWhatsAppDisplayNumber() && <li>WhatsApp: {getWhatsAppDisplayNumber()}</li>}
              <li>
                Email:{' '}
                <a href={`mailto:${storeConfig.email}`} className="hover:underline">
                  {storeConfig.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-ink">Opening Hours</h2>
            <ul className="mt-2 space-y-1 text-sm text-ink-soft/70">
              {storeConfig.openingHours.map((slot) => (
                <li key={slot.day} className="flex justify-between gap-6 max-w-xs">
                  <span>{slot.day}</span>
                  <span>{slot.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <a href={getGeneralEnquiryUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp inline-flex">
            Chat on WhatsApp
          </a>
        </div>

        <div className="aspect-[4/3] overflow-hidden bg-sand-100 md:aspect-auto">
          <iframe
            title="Store location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${storeConfig.address.line1} ${storeConfig.address.line2}`
            )}&output=embed`}
            className="h-full min-h-[320px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
