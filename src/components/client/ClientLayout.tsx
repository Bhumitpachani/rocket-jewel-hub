import { Outlet } from 'react-router-dom';
import ClientNavbar from './ClientNavbar';
import Footer from './Footer';

const ClientLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ClientNavbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
