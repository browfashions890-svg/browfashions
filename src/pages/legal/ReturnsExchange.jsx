import LegalPage from './LegalPage';
import { storeConfig } from '../../config/store';

export default function ReturnsExchange() {
  return (
    <LegalPage title="Return & Exchange Policy" url="/returns-exchange">
      {/* DEMO copy — replace with your actual returns/exchange terms */}
      <p>
        Since purchases are finalised directly with our team, return and exchange requests are handled on a
        case-by-case basis. Please reach out to us on WhatsApp within 3 days of receiving your order with your
        product code and a description of the issue.
      </p>
      <p>
        Items must be unused, unwashed, and in their original condition with tags attached to be eligible for
        exchange. Sale or clearance items may not be eligible — we&apos;ll confirm this with you at the time of
        purchase.
      </p>
      <p>
        For any questions, contact us at{' '}
        <a href={`mailto:${storeConfig.email}`} className="underline">{storeConfig.email}</a> or via WhatsApp.
      </p>
    </LegalPage>
  );
}
