import React, { useContext, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [location, setLocation] = useState(user?.location || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const res = await api.put('/auth/profile', {
        name,
        email,
        phoneNumber,
        location
      });
      updateUser(res.data);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSimulatedAction = (actionName) => {
    alert(`Simulated Action: ${actionName} flow started. (This is a functional placeholder)`);
  };

  const handleDeactivate = () => {
    if (confirm('Are you absolutely sure you want to deactivate your account? This action cannot be undone.')) {
      alert('Account deactivation sequence initiated.');
    }
  };

  return (
    <DashboardLayout>
      <div className="pb-24 pt-8">
        {/* Page Header */}
        <div className="mb-10">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Account Management</h2>
          <p className="font-body-lg text-on-surface-variant">Optimize your personal performance and platform preferences.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Profile & Stats */}
          <div className="lg:col-span-8 space-y-8">
            {/* Profile Card */}
            <section className="glass-card border border-glass-border rounded-lg p-card-padding">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-headline-md text-headline-md">Personal Information</h3>
                    <button onClick={handleSaveProfile} disabled={isSaving} className="bg-on-surface text-white px-6 py-2 rounded-full font-label-caps text-label-caps hover:ring-2 hover:ring-tertiary-fixed transition-all cursor-pointer disabled:opacity-50">
                      {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="font-label-caps text-[10px] text-on-surface-variant">FULL NAME</label>
                      <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-white border border-subtle-gray rounded px-4 py-2 font-body-md focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none" type="text" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-label-caps text-[10px] text-on-surface-variant">EMAIL ADDRESS</label>
                      <input value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white border border-subtle-gray rounded px-4 py-2 font-body-md focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none" type="email" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-label-caps text-[10px] text-on-surface-variant">PHONE NUMBER</label>
                      <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="+1 (555) 0123" className="w-full bg-white border border-subtle-gray rounded px-4 py-2 font-body-md focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none" type="tel" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-label-caps text-[10px] text-on-surface-variant">LOCATION</label>
                      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. San Francisco, CA" className="w-full bg-white border border-subtle-gray rounded px-4 py-2 font-body-md focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none" type="text" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Bento Stats Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card border border-glass-border rounded-lg p-6 border-l-4 border-l-tertiary-fixed">
                <span className="material-symbols-outlined text-tertiary mb-2">fitness_center</span>
                <p className="font-label-caps text-label-caps text-on-surface-variant">TOTAL WORKOUTS</p>
                <p className="font-metric-xl text-metric-xl mt-1">128</p>
              </div>
              <div className="glass-card border border-glass-border rounded-lg p-6 border-l-4 border-l-tertiary-fixed">
                <span className="material-symbols-outlined text-tertiary mb-2">speed</span>
                <p className="font-label-caps text-label-caps text-on-surface-variant">AVG PERFORMANCE</p>
                <p className="font-metric-xl text-metric-xl mt-1">94%</p>
              </div>
              <div className="glass-card border border-glass-border rounded-lg p-6 border-l-4 border-l-tertiary-fixed">
                <span className="material-symbols-outlined text-tertiary mb-2">favorite</span>
                <p className="font-label-caps text-label-caps text-on-surface-variant">VO2 MAX</p>
                <p className="font-metric-xl text-metric-xl mt-1">52</p>
              </div>
            </section>
            
            {/* Connected Devices */}
            <section className="glass-card border border-glass-border rounded-lg p-card-padding">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-md text-headline-md">Connected Devices</h3>
                <button onClick={() => handleSimulatedAction('Device Pairing')} className="flex items-center gap-2 text-tertiary font-bold hover:underline cursor-pointer">
                  <span className="material-symbols-outlined">add_circle</span>
                  <span className="font-label-caps text-label-caps">LINK NEW DEVICE</span>
                </button>
              </div>
              <div className="space-y-4">
                {/* Device 1 */}
                <div className="flex items-center justify-between p-4 bg-white border border-glass-border rounded-lg shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-surface-container rounded-full">
                      <span className="material-symbols-outlined text-on-surface">watch</span>
                    </div>
                    <div>
                      <p className="font-body-md font-bold">Boult Drift Pro</p>
                      <p className="text-xs text-on-surface-variant">Last synced: 2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-on-tertiary-container/10 text-on-tertiary-container rounded-full text-[10px] font-bold">ACTIVE</span>
                    <button className="material-symbols-outlined text-on-surface-variant">settings</button>
                  </div>
                </div>
                {/* Device 2 */}
                <div className="flex items-center justify-between p-4 bg-white border border-glass-border rounded-lg shadow-sm opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-surface-container rounded-full">
                      <span className="material-symbols-outlined text-on-surface">scale</span>
                    </div>
                    <div>
                      <p className="font-body-md font-bold">Smart Scale V2</p>
                      <p className="text-xs text-on-surface-variant">Not connected</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant rounded-full text-[10px] font-bold">OFFLINE</span>
                    <button className="material-symbols-outlined text-on-surface-variant">settings</button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Settings & Preferences */}
          <div className="lg:col-span-4 space-y-8">
            {/* Notifications */}
            <section className="glass-card border border-glass-border rounded-lg p-card-padding">
              <h3 className="font-headline-md text-headline-md mb-6">Notifications</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body-md font-semibold">Activity Reminders</p>
                    <p className="text-xs text-on-surface-variant">Daily nudge to meet goals</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-tertiary-fixed shadow-inner cursor-pointer">
                    <div className="absolute left-6 top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body-md font-semibold">Achievement Alerts</p>
                    <p className="text-xs text-on-surface-variant">When you hit milestones</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-tertiary-fixed shadow-inner cursor-pointer">
                    <div className="absolute left-6 top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body-md font-semibold">Weekly Report</p>
                    <p className="text-xs text-on-surface-variant">Digest of your progress</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-surface-container-highest shadow-inner cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy & Security */}
            <section className="glass-card border border-glass-border rounded-lg p-card-padding">
              <h3 className="font-headline-md text-headline-md mb-6">Privacy & Security</h3>
              <div className="space-y-4">
                <button onClick={() => handleSimulatedAction('Password Change')} className="w-full flex items-center justify-between p-3 hover:bg-surface-container rounded-lg transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">lock</span>
                    <span className="font-body-md font-medium">Password Management</span>
                  </div>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
                <button onClick={() => handleSimulatedAction('2FA Setup')} className="w-full flex items-center justify-between p-3 hover:bg-surface-container rounded-lg transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">verified_user</span>
                    <span className="font-body-md font-medium">Two-Factor Auth</span>
                  </div>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
                <button onClick={() => handleSimulatedAction('Data Privacy Settings')} className="w-full flex items-center justify-between p-3 hover:bg-surface-container rounded-lg transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">visibility</span>
                    <span className="font-body-md font-medium">Data Sharing</span>
                  </div>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
              </div>
            </section>

            {/* Support Card */}
            <div className="relative overflow-hidden bg-on-surface text-white rounded-lg p-card-padding shadow-xl">
              <div className="relative z-10">
                <h4 className="font-headline-md text-white mb-2">Need Help?</h4>
                <p className="text-sm text-surface-variant mb-6">Our concierge medical team is available 24/7 for Premium members.</p>
                <button onClick={() => handleSimulatedAction('Support Chat Live')} className="w-full bg-tertiary-fixed text-on-tertiary-fixed py-3 rounded-full font-bold hover:scale-[1.02] transition-transform cursor-pointer">CHAT WITH SUPPORT</button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-tertiary-fixed opacity-10 rounded-full blur-3xl"></div>
            </div>
            
            {/* Danger Zone */}
            <div className="p-card-padding pt-0">
              <button onClick={handleDeactivate} className="w-full py-3 border border-error/30 text-error rounded-full font-label-caps text-label-caps hover:bg-error/5 transition-colors cursor-pointer">DEACTIVATE ACCOUNT</button>
            </div>
          </div>
        </div>

        <button onClick={() => handleSimulatedAction('Support Chat Mobile')} className="fixed bottom-8 right-8 w-16 h-16 bg-tertiary-fixed text-on-tertiary-fixed rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 md:hidden cursor-pointer">
          <span className="material-symbols-outlined text-[32px]">support_agent</span>
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
