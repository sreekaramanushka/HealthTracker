import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { name: 'Daily Logs', path: '/health', icon: 'event_note' },
    { name: 'Nutrition', path: '/nutrition', icon: 'restaurant' },
    { name: 'Water Intake', path: '/water', icon: 'water_drop' },
    { name: 'Sleep Tracker', path: '/sleep', icon: 'bedtime' },
    { name: 'BMI Calculator', path: '/bmi-calculator', icon: 'calculate' },
    { name: 'Analytics', path: '/analytics', icon: 'insights' },
    { name: 'Goals', path: '/goals', icon: 'ads_click' },
  ];

  return (
    <aside className="h-screen fixed left-0 top-0 w-64 bg-surface dark:bg-surface-dim border-r border-glass-border flex flex-col p-margin-mobile gap-unit z-50">
      <div className="mb-8 px-4">
        <h1 className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface dark:text-inverse-on-surface">GoFit</h1>
      </div>
      <div className="mb-10 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary-container overflow-hidden">
            <img alt="User profile" className="w-full h-full object-cover" src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`}/>
          </div>
          <div>
            <p className="font-label-caps text-label-caps text-on-surface truncate w-32">{user?.name || 'User'}</p>
            <p className="font-body-md text-xs text-on-surface-variant">Premium Tier</p>
          </div>
        </div>
      </div>
      <nav className="flex flex-col gap-2 flex-grow overflow-y-auto">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`flex items-center gap-4 p-4 rounded-full transition-all duration-200 active:scale-95 ${isActive ? 'bg-on-tertiary-container text-tertiary-fixed shadow-[0_0_20px_rgba(199,243,0,0.25)]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span className="font-label-caps text-label-caps">{link.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="pt-4 mt-auto border-t border-glass-border flex flex-col gap-2">
        <Link to="/profile" className="flex items-center gap-4 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high p-4 rounded-full transition-all duration-200 active:scale-95">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-caps text-label-caps">Settings</span>
        </Link>
        <button onClick={logout} className="flex items-center gap-4 text-error p-4 rounded-full hover:bg-error-container/20 transition-all duration-200 active:scale-95 w-full text-left">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-label-caps text-label-caps">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
