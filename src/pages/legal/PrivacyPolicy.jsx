import LegalPage from './LegalPage';
import { storeConfig } from '../../config/store';

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" url="/privacy-policy">
      {/* DEMO copy — have this reviewed to match your actual data practices before going live */}
      <p>
        This website is a product catalogue for {storeConfig.name}. We do not collect payment details or create
        customer accounts on this site.
      </p>
      <p>
        When you contact us via WhatsApp, the message and any details you share (such as your name or phone
        number) are received directly in WhatsApp, subject to WhatsApp&apos;s own privacy policy.
      </p>
      <p>
        We may use basic, privacy-friendly analytics to understand overall site usage. We do not sell your
        personal information to third parties.
      </p>
      <p>
        For questions about this policy, contact us at{' '}
        <a href={`mailto:${storeConfig.email}`} className="underline">{storeConfig.email}</a>.
      </p>
    </LegalPage>
  );
}
