import SEO from '../components/SEO';
import { storeConfig } from '../config/store';
import { getGeneralEnquiryUrl } from '../utils/whatsapp';

export default function About() {
  return (
    <div className="container-page py-14">
      <SEO title="About Us" url="/about" description={`Learn about ${storeConfig.name} and what we stand for.`} />

      <h1 className="section-heading">About {storeConfig.name}</h1>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="aspect-[4/3] overflow-hidden bg-sand-100">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1000&q=70"
            alt={`${storeConfig.name} store`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="max-w-prose text-sm leading-relaxed text-ink-soft/80">
          <p className="mb-4">
            {/* DEMO copy — replace with your real store story */}
            {storeConfig.name} started as a small neighbourhood shop with one belief: good clothing should feel as
            good as it looks. Today we curate everyday and festive wear for men, sourced for 
            fabric quality, fit and value.
          </p>
          <p className="mb-4">
            We keep things simple — no accounts, no complicated checkout. Browse the catalogue, find something you
            love, and send us a WhatsApp message. We&apos;ll confirm availability, sizing and delivery details
            directly with you.
          </p>
          <p>
            Have a question about a fabric, size, or upcoming collection? We&apos;re a message away.
          </p>
          <a href={getGeneralEnquiryUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6 inline-flex">
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
