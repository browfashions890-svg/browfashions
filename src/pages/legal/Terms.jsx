import LegalPage from './LegalPage';
import { storeConfig } from '../../config/store';

export default function Terms() {
  return (
    <LegalPage title="Terms of Use" url="/terms">
      {/* DEMO copy — replace with terms reviewed for your business */}
      <p>
        This website displays {storeConfig.name}&apos;s product catalogue for browsing purposes only. It does not
        process online payments or orders — all purchases are confirmed and completed directly with our team via
        WhatsApp, phone or in-store.
      </p>
      <p>
        Product prices, availability, sizes and colours shown here are indicative and confirmed at the time of
        your enquiry. We reserve the right to update pricing and availability without prior notice.
      </p>
      <p>
        By using this website, you agree not to misuse the site, attempt to access restricted areas (such as the
        admin panel) without authorisation, or copy content without permission.
      </p>
    </LegalPage>
  );
}
