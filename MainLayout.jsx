import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { StickyWhatsAppProvider, useStickyWhatsAppValue } from '../context/StickyWhatsAppContext';

function StickyMobileCta() {
  const sticky = useStickyWhatsAppValue();
  return <WhatsAppButton url={sticky.url} label={sticky.label} variant="sticky-mobile" />;
}

export default function MainLayout() {
  return (
    <StickyWhatsAppProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pb-16 sm:pb-0">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppButton variant="floating" />
        <StickyMobileCta />
      </div>
    </StickyWhatsAppProvider>
  );
}
