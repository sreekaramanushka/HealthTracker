import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-gutter py-4 w-full max-w-container-max mx-auto bg-glass-fill border-b border-glass-border backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-8">
        <Link to="/" className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface">GoFit</Link>
        <nav className="hidden md:flex gap-6">
          <Link to="/dashboard" className="text-tertiary-fixed font-bold font-label-caps text-label-caps">Dashboard</Link>
          <Link to="#" className="text-on-surface-variant font-medium font-label-caps text-label-caps hover:text-tertiary-fixed transition-all duration-300">Features</Link>
          <Link to="#" className="text-on-surface-variant font-medium font-label-caps text-label-caps hover:text-tertiary-fixed transition-all duration-300">Community</Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="pl-10 pr-4 py-2 bg-surface-container rounded-full border-none focus:ring-2 focus:ring-neon-glow text-body-md font-body-md" placeholder="Search analytics..." type="text"/>
            </div>
            <span className="material-symbols-outlined text-on-surface hover:text-tertiary-fixed transition-all cursor-pointer">notifications</span>
            <div className="relative group cursor-pointer">
              <img alt="User profile" className="w-10 h-10 rounded-full border border-glass-border" src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}/>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-glass-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                <div className="p-4 border-b border-glass-border">
                  <p className="font-bold text-sm truncate">{user.name}</p>
                  <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
                </div>
                <button onClick={logout} className="w-full text-left p-4 hover:bg-surface-container text-sm text-error rounded-b-lg">Logout</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="text-on-surface font-label-caps text-label-caps hover:text-tertiary-fixed transition-all duration-300">Login</Link>
            <Link to="/register" className="px-6 py-2 bg-on-surface text-on-tertiary font-label-caps text-label-caps rounded-full neon-glow-btn transition-all duration-300">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
