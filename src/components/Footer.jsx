import { Link } from 'react-router-dom';
import { storeConfig } from '../config/store';
import { getWhatsAppDisplayNumber } from '../utils/whatsapp';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-ink text-sand-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-xl text-sand-50">{storeConfig.name}</h3>
          <p className="mt-2 max-w-xs text-sm text-sand-200/70">{storeConfig.tagline}</p>
          <div className="mt-4 flex gap-4 text-sm">
            {storeConfig.instagramUrl && (
              <a href={storeConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">
                Instagram
              </a>
            )}
            {storeConfig.facebookUrl && (
              <a href={storeConfig.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">
                Facebook
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wide text-sand-50">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-sand-200/70">
            <li>{storeConfig.address.line1}</li>
            <li>{storeConfig.address.line2}</li>
            <li>{storeConfig.address.line3}</li>
            <li>
              <a href={`tel:${storeConfig.phone}`} className="hover:text-gold-light">
                {storeConfig.phone}
              </a>
            </li>
            {getWhatsAppDisplayNumber() && <li>WhatsApp: {getWhatsAppDisplayNumber()}</li>}
            <li>
              <a href={`mailto:${storeConfig.email}`} className="hover:text-gold-light">
                {storeConfig.email}
              </a>
            </li>
            <li>
              <a href={storeConfig.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">
                View on Google Maps
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wide text-sand-50">Opening Hours</h4>
          <ul className="mt-3 space-y-2 text-sm text-sand-200/70">
            {storeConfig.openingHours.map((slot) => (
              <li key={slot.day} className="flex justify-between gap-4">
                <span>{slot.day}</span>
                <span>{slot.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wide text-sand-50">Store Policies</h4>
          <ul className="mt-3 space-y-2 text-sm text-sand-200/70">
            <li>
              <Link to="/privacy-policy" className="hover:text-gold-light">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-gold-light">Terms of Use</Link>
            </li>
            <li>
              <Link to="/returns-exchange" className="hover:text-gold-light">Return &amp; Exchange Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-page text-center text-xs text-sand-200/50">
          © {year} {storeConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
