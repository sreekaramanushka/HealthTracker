import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen flex flex-col">
        <DashboardNavbar />
        <div className="max-w-container-max mx-auto w-full p-gutter flex-grow">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
