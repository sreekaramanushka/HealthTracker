import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-tertiary-fixed opacity-10 blur-[100px]"></div>
        <div className="absolute bottom-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-surface-container-high opacity-40 blur-[120px]"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-tertiary-fixed/20 rounded-full rotate-45"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 border border-outline-variant/10 rounded-xl -rotate-12"></div>
      </div>
      
      {/* Main Container */}
      <main className="relative z-10 w-full max-w-[480px] px-margin-mobile">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-section-gap/2 mb-10">
          <h1 className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface">GoFit</h1>
          <p className="font-label-caps text-label-caps text-on-surface-variant mt-2">Performance Medical Intelligence</p>
        </div>
        
        {/* Login Card */}
        <div className="glass-card shadow-[0_20px_40px_rgba(0,0,0,0.03)] rounded-lg p-card-padding">
          <div className="mb-8">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Welcome Back</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Access your premium health dashboard.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="text-error text-sm text-center">{error}</div>}
            {/* Email Input */}
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface pl-1">Email Address</label>
              <div className="relative group neon-focus rounded-full border border-subtle-gray transition-all duration-300">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">mail</span>
                <input 
                  className="w-full bg-transparent border-none rounded-full py-4 pl-12 pr-4 focus:ring-0 text-body-md placeholder:text-outline-variant" 
                  placeholder="name@example.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="font-label-caps text-label-caps text-on-surface">Password</label>
                <Link to="#" className="text-[11px] font-semibold text-tertiary hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative group neon-focus rounded-full border border-subtle-gray transition-all duration-300">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">lock</span>
                <input 
                  className="w-full bg-transparent border-none rounded-full py-4 pl-12 pr-4 focus:ring-0 text-body-md placeholder:text-outline-variant" 
                  placeholder="••••••••" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {/* Login Button */}
            <button className="w-full bg-on-surface text-on-tertiary font-label-caps text-label-caps py-5 rounded-full transition-all duration-300 neon-btn-glow border border-transparent hover:border-tertiary-fixed active:scale-[0.98] mt-2" type="submit">
              Login
            </button>
            
            {/* Divider */}
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-glass-border"></div>
              <span className="flex-shrink mx-4 font-label-caps text-[10px] text-outline-variant uppercase tracking-widest">or continue with</span>
              <div className="flex-grow border-t border-glass-border"></div>
            </div>
            
            {/* Google Button */}
            <button className="w-full bg-transparent border border-on-surface text-on-surface font-label-caps text-label-caps py-4 rounded-full flex items-center justify-center gap-3 hover:bg-on-surface hover:text-on-tertiary transition-all duration-300 active:scale-[0.98]" type="button">
              <img alt="Google Logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnV2uEQx1BHWpcel6M1M2kEmY6U78XD48N1aJGlbzZ2raXRWdzqskEmCcLd8YzhpB2Ru5tNSgMabYUx4J96D9xiOxjCUhpHrlOP9LOLTJdqQ8giHXGhcJirCNHGFKE7bXEDxFdT_2PfrJVUBefM-bb5MZ11gXUUS9U4Wje6uwlHC7nZKMYtHzoHSUM1V5IqJu6RHOO8gSf_1vz3jtbxzDH8BLNNrhrBr2UcvNVuP71sRiXgn9OQW8E-m5SGoqYSc-1RxgV--UlXDk"/>
              Continue with Google
            </button>
          </form>
          
          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Don't have an account? <Link className="text-on-surface font-bold hover:text-tertiary-fixed transition-colors" to="/register">Register</Link>
            </p>
          </div>
        </div>
        
        {/* Footer Visual Decor */}
        <div className="mt-10 flex justify-center items-center gap-8 opacity-40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="font-label-caps text-[10px] tracking-widest">ENCRYPTED</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span className="font-label-caps text-[10px] tracking-widest">REAL-TIME</span>
          </div>
        </div>
      </main>
      
      {/* Decoration Images */}
      <div className="hidden lg:block absolute left-gutter bottom-gutter w-64 h-64 opacity-20 pointer-events-none">
        <img alt="Abstract DNA" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO-uB0r4zZ70IB_3nwQK39ewdtogLtdHub2qecylUHeocHY1QHm2Zr6qhSzmSwcrgVItz-u8ELRjqVplbfnfOtxOoOWumFHIgEVOJ7AgmoVOluXQqSZL-Skn8lMmNLN89Irgk2axM5LIDYnUOSkt0VgEtIIGLVOGe6VDAiMshxLsV5-R5_3rwXfQgx_bz_6I0cbThdxRcRRleYR2Funu876y5LMLZHHSSRCmHtHUZDsc1RwkkLwXzuQsRKDCPbh3LpLetQyn6Vv2s"/>
      </div>
      <div className="hidden lg:block absolute right-gutter top-gutter w-72 h-72 opacity-20 pointer-events-none">
        <img alt="Geometric Metric" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcPLRJ4foZhbWJ9qCEaP8liGxYP4U2WW4AmXoC-ffY3OxiKxCl20lvbqzU_HeY3HX5GqnFfPYHKt2DucgM7m6OSvSTisuugiTlbOQ-2dKdiS884v4EYXeu6dSadPoYyqYVA9ROO0NLcspSF-vqFQ5-8HUgCyYRPsQc25JEMCgql4_0lsC1sG2WmpLNefOzaCNqJu_71IdSxj6F2Ac4as-sAPqKGFOi_8UJSFUVjxh3PDK10STQnNCToOAgHUwcpAkZeNPXsjtPNxA"/>
      </div>
    </div>
  );
};

export default Login;
