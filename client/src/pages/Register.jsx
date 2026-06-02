import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [error, setError] = useState(null);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirm) {
      return setError('Passwords do not match');
    }
    if (formData.password.length < 8) {
      return setError('Password must be at least 8 characters');
    }
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-body-md text-on-surface selection:bg-tertiary-fixed selection:text-on-tertiary-fixed">
      <main className="flex-grow flex items-center justify-center relative py-section-gap px-margin-mobile">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[600px] overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-[200px] -left-[100px] w-[500px] h-[500px] bg-tertiary-fixed/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-[100px] -right-[50px] w-[400px] h-[400px] bg-secondary-container/20 rounded-full blur-[100px]"></div>
        </div>
        
        {/* Glassmorphic Container */}
        <div className="w-full max-w-[520px] glass-panel bg-glass-fill border border-glass-border shadow-[0_20px_40px_rgba(0,0,0,0.03)] rounded-lg overflow-hidden backdrop-blur-xl">
          <div className="p-card-padding">
            {/* Branding Anchor */}
            <div className="flex flex-col items-center mb-10">
              <h1 className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface mb-2">GoFit</h1>
              <p className="font-body-md text-on-surface-variant text-center">Enter your details to start your performance journey</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && <div className="text-error text-sm text-center">{error}</div>}
              {/* Full Name */}
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant ml-1" htmlFor="name">FULL NAME</label>
                <div className="relative group">
                  <input 
                    className="w-full bg-white border border-subtle-gray rounded-full px-6 py-4 focus:ring-2 focus:ring-neon-glow focus:border-on-surface transition-all outline-none text-body-md" 
                    id="name" 
                    placeholder="Johnathan Doe" 
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              {/* Email Address */}
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant ml-1" htmlFor="email">EMAIL ADDRESS</label>
                <div className="relative group">
                  <input 
                    className="w-full bg-white border border-subtle-gray rounded-full px-6 py-4 focus:ring-2 focus:ring-neon-glow focus:border-on-surface transition-all outline-none text-body-md" 
                    id="email" 
                    placeholder="name@performance.com" 
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              {/* Password Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant ml-1" htmlFor="password">PASSWORD</label>
                  <input 
                    className="w-full bg-white border border-subtle-gray rounded-full px-6 py-4 focus:ring-2 focus:ring-neon-glow focus:border-on-surface transition-all outline-none text-body-md" 
                    id="password" 
                    placeholder="••••••••" 
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant ml-1" htmlFor="confirm">CONFIRM</label>
                  <input 
                    className="w-full bg-white border border-subtle-gray rounded-full px-6 py-4 focus:ring-2 focus:ring-neon-glow focus:border-on-surface transition-all outline-none text-body-md" 
                    id="confirm" 
                    placeholder="••••••••" 
                    type="password"
                    value={formData.confirm}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              {/* Password Requirements & Strength Indicator */}
              <div className="p-4 bg-surface-container-low rounded-lg border border-glass-border">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-label-caps text-[10px] text-on-surface-variant">PASSWORD STRENGTH</span>
                  <span className="font-label-caps text-[10px] text-tertiary-fixed-dim">MODERATE</span>
                </div>
                {/* Strength Bars */}
                <div className="flex gap-1.5 h-1 mb-4">
                  <div className={`flex-1 ${formData.password.length > 0 ? 'bg-tertiary-fixed shadow-[0_0_8px_rgba(199,243,0,0.4)]' : 'bg-outline-variant'} rounded-full`}></div>
                  <div className={`flex-1 ${formData.password.length > 4 ? 'bg-tertiary-fixed shadow-[0_0_8px_rgba(199,243,0,0.4)]' : 'bg-outline-variant'} rounded-full`}></div>
                  <div className={`flex-1 ${formData.password.length > 7 ? 'bg-tertiary-fixed shadow-[0_0_8px_rgba(199,243,0,0.4)]' : 'bg-outline-variant'} rounded-full`}></div>
                  <div className="flex-1 bg-outline-variant rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[18px] ${formData.password.length >= 8 ? 'text-on-tertiary-container' : 'text-outline-variant opacity-50'}`} style={{fontVariationSettings: formData.password.length >= 8 ? "'FILL' 1" : "'FILL' 0"}}>check_circle</span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">8+ CHARS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[18px] ${/[A-Z]/.test(formData.password) ? 'text-on-tertiary-container' : 'text-outline-variant opacity-50'}`} style={{fontVariationSettings: /[A-Z]/.test(formData.password) ? "'FILL' 1" : "'FILL' 0"}}>check_circle</span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">UPPERCASE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[18px] ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-on-tertiary-container' : 'text-outline-variant opacity-50'}`} style={{fontVariationSettings: /[^A-Za-z0-9]/.test(formData.password) ? "'FILL' 1" : "'FILL' 0"}}>check_circle</span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">SPECIAL CHAR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[18px] ${formData.password && formData.password === formData.confirm ? 'text-on-tertiary-container' : 'text-outline-variant opacity-50'}`} style={{fontVariationSettings: formData.password && formData.password === formData.confirm ? "'FILL' 1" : "'FILL' 0"}}>check_circle</span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">MATCHING</span>
                  </div>
                </div>
              </div>
              
              <button type="submit" className="w-full bg-on-surface text-surface py-4 px-8 rounded-full font-headline-md text-body-md hover:ring-2 hover:ring-tertiary-fixed transition-all duration-300 flex justify-center items-center gap-2 group">
                <span>Initialize Profile</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-glass-border">
              <div className="flex flex-col items-center gap-4">
                <p className="font-body-md text-on-surface-variant">Already an elite member?</p>
                <Link to="/login" className="font-label-caps text-label-caps text-on-surface border border-on-surface px-8 py-3 rounded-full hover:bg-on-surface hover:text-surface transition-colors">LOGIN TO DASHBOARD</Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Side Graphic (Desktop) */}
        <div className="hidden lg:flex flex-col ml-gutter max-w-[400px] space-y-gutter z-10">
          <div className="glass-panel bg-glass-fill border border-glass-border p-card-padding rounded-lg">
            <div className="w-12 h-12 bg-tertiary-fixed rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(199,243,0,0.3)]">
              <span className="material-symbols-outlined text-on-tertiary-fixed">health_metrics</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg mb-4 text-on-surface">Data-Driven Vitality</h2>
            <p className="font-body-lg text-on-surface-variant">Join thousands of athletes and health enthusiasts optimizing their daily performance through our ultra-precise analytics engine.</p>
          </div>
          <div className="relative rounded-lg overflow-hidden h-[300px] border border-glass-border shadow-lg">
            <img alt="Bio-metrics interface" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV-RW37mhKANyS1gD0jug_EMZADH8TvblRHNu2WOZc8TDRnzInnqQbNoVnjbzBqA8Q6cwSSChx-Yxqm0Akq5wgw9x9cU7Fhr5FLw4yfyxWejakMAgMXMRuSG31gw3fq5xt5chcXKobxzseBwu2n-aYta6J4nABpd3dwAWhxXJeGckLxOh8FR5PoPpoa_e7__X6KYiQUR3Sltqy6SJjoR4rEmiBDZ_0kuy56KSnm03f3Cx7XXbi1O2ucIvDmJ1K6DDT5MJ3hiWqH3Q"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <p className="text-white font-label-caps text-[12px] tracking-widest uppercase">Clinical Grade Precision</p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer Identity */}
      <footer className="py-8 px-gutter flex justify-center border-t border-glass-border z-10">
        <div className="flex items-center gap-8 opacity-40">
          <span className="font-label-caps text-[10px] tracking-widest">ENCRYPTED PROTOCOL</span>
          <span className="font-label-caps text-[10px] tracking-widest">ISO 27001 CERTIFIED</span>
          <span className="font-label-caps text-[10px] tracking-widest">BIOMETRIC READY</span>
        </div>
      </footer>
    </div>
  );
};

export default Register;
