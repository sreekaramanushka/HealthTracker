import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DashboardNavbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-40 bg-glass-fill backdrop-blur-xl border-b border-glass-border shadow-[0_20px_40px_rgba(0,0,0,0.03)] px-gutter py-4 w-full max-w-container-max flex justify-between items-center">
      <div className="flex items-center gap-8 flex-1">
        <div className="relative max-w-md w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input className="w-full bg-surface-container-low border-none rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-neon-glow transition-all" placeholder="Search metrics, reports or data..." type="text"/>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-on-surface-variant hover:text-on-surface transition-all">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-tertiary-fixed rounded-full shadow-[0_0_10px_rgba(199,243,0,0.8)]"></span>
        </button>
        <div className="w-10 h-10 rounded-full border-2 border-tertiary-fixed p-0.5">
          <img alt="User profile" className="w-full h-full object-cover rounded-full" src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`}/>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
