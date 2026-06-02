import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-container-max mx-auto px-margin-mobile md:px-gutter w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
