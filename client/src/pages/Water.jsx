import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api/axios';

const Water = () => {
  const [waterLogs, setWaterLogs] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(0);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/water');
      setWaterLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitWaterLog = async () => {
    if (selectedAmount > 0) {
      try {
        await api.post('/water', { amount: selectedAmount });
        fetchLogs();
        setSelectedAmount(0); // reset selection
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Please select a water quantity first.");
    }
  };

  const totalWater = waterLogs.reduce((acc, curr) => acc + curr.amount, 0);
  const targetWater = 3500; // 3.5L
  const percentage = Math.min(Math.round((totalWater / targetWater) * 100), 100);

  return (
    <DashboardLayout>
      <div className="py-10 space-y-section-gap">
        {/* Hero Stats: Circular Tracker & Quick Add */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          {/* Bento Cell: Hydration Ring */}
          <div className="lg:col-span-7 glass-card border border-glass-border rounded-xl p-card-padding flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_40px_rgba(0,0,0,0.03)] overflow-hidden relative">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-tertiary-fixed opacity-10 blur-[80px] rounded-full"></div>
            <div className="relative z-10 space-y-4 text-center md:text-left">
              <span className="font-label-caps text-label-caps text-tertiary uppercase tracking-widest">Current Status</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Daily Hydration</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xs">You're making great progress today! Keep the flow going to hit your peak performance.</p>
              <div className="pt-4 flex gap-4 justify-center md:justify-start">
                <div className="bg-surface-container-high px-4 py-2 rounded-full">
                  <span className="font-label-caps text-label-caps text-on-surface">Target: 3.5L</span>
                </div>
                <div className="bg-surface-container-high px-4 py-2 rounded-full">
                  <span className="font-label-caps text-label-caps text-on-surface">Logged: {(totalWater/1000).toFixed(1)}L</span>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-center w-64 h-64 z-10">
              {/* Background Circle */}
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-tertiary/10" cx="50%" cy="50%" fill="transparent" r="90" stroke="currentColor" strokeWidth="16"></circle>
                {/* Progress Circle with Neon Glow */}
                <circle className="text-tertiary-fixed drop-shadow-[0_0_8px_rgba(199,243,0,0.6)]" cx="50%" cy="50%" fill="transparent" r="90" stroke="currentColor" strokeDasharray="565" strokeDashoffset={565 - (565 * percentage / 100)} strokeLinecap="round" strokeWidth="16"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-metric-xl text-metric-xl text-on-surface">{percentage}<span className="text-headline-md">%</span></span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">COMPLETE</span>
              </div>
            </div>
          </div>
          
          {/* Bento Cell: Interactive Add Water */}
          <div className="lg:col-span-5 glass-card border border-glass-border rounded-xl p-card-padding flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.03)] border-t-4 border-t-tertiary-fixed">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-headline-md text-headline-md text-on-surface">Quick Log</h3>
                <span className="material-symbols-outlined text-tertiary">local_drink</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">Log your recent intake with a single tap.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 my-8">
              <button onClick={() => setSelectedAmount(250)} className={`bg-surface-container border p-4 rounded-lg text-center transition-all group ${selectedAmount === 250 ? 'border-tertiary-fixed shadow-[0_0_15px_rgba(199,243,0,0.2)]' : 'border-glass-border hover:border-tertiary-fixed'}`}>
                <span className={`font-label-caps text-label-caps block mb-1 transition-colors ${selectedAmount === 250 ? 'text-tertiary' : 'group-hover:text-tertiary'}`}>GLASS</span>
                <span className="font-headline-md text-headline-md">250ml</span>
              </button>
              <button onClick={() => setSelectedAmount(500)} className={`bg-surface-container border p-4 rounded-lg text-center transition-all group ${selectedAmount === 500 ? 'border-tertiary-fixed shadow-[0_0_15px_rgba(199,243,0,0.2)]' : 'border-glass-border hover:border-tertiary-fixed'}`}>
                <span className={`font-label-caps text-label-caps block mb-1 transition-colors ${selectedAmount === 500 ? 'text-tertiary' : 'group-hover:text-tertiary'}`}>BOTTLE</span>
                <span className="font-headline-md text-headline-md">500ml</span>
              </button>
            </div>
            <button onClick={submitWaterLog} className="w-full bg-on-surface text-on-primary py-4 px-8 rounded-full font-label-caps text-label-caps flex items-center justify-center gap-2 hover:ring-2 hover:ring-neon-glow transition-all active:scale-95 group cursor-pointer">
              <span className="material-symbols-outlined text-tertiary-fixed group-hover:animate-bounce">add_circle</span>
              ADD WATER LOG
            </button>
          </div>
        </section>

        {/* Distribution & AI Insights */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Hourly Distribution Chart */}
          <div className="lg:col-span-8 glass-card border border-glass-border rounded-xl p-card-padding shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Consumption Flow</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Hourly hydration distribution for today</p>
              </div>
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-tertiary-fixed rounded-full"></span>
                <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">REAL-TIME SYNC</span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {/* Bar chart items */}
              <div className="flex-1 bg-surface-container rounded-t-full h-[20%] hover:bg-tertiary-fixed transition-all duration-300 relative group">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">100ml</div>
              </div>
              <div className="flex-1 bg-surface-container rounded-t-full h-[40%] hover:bg-tertiary-fixed transition-all duration-300"></div>
              <div className="flex-1 bg-surface-container rounded-t-full h-[30%] hover:bg-tertiary-fixed transition-all duration-300"></div>
              <div className="flex-1 bg-tertiary-fixed rounded-t-full h-[85%] relative shadow-[0_0_15px_rgba(199,243,0,0.3)]"></div>
              <div className="flex-1 bg-surface-container rounded-t-full h-[50%] hover:bg-tertiary-fixed transition-all duration-300"></div>
              <div className="flex-1 bg-surface-container rounded-t-full h-[25%] hover:bg-tertiary-fixed transition-all duration-300"></div>
              <div className="flex-1 bg-surface-container rounded-t-full h-[60%] hover:bg-tertiary-fixed transition-all duration-300"></div>
              <div className="flex-1 bg-surface-container rounded-t-full h-[45%] hover:bg-tertiary-fixed transition-all duration-300"></div>
              <div className="flex-1 bg-tertiary-fixed rounded-t-full h-[70%] relative shadow-[0_0_15px_rgba(199,243,0,0.3)]"></div>
              <div className="flex-1 bg-surface-container rounded-t-full h-[30%] hover:bg-tertiary-fixed transition-all duration-300"></div>
              <div className="flex-1 bg-surface-container rounded-t-full h-[15%] hover:bg-tertiary-fixed transition-all duration-300"></div>
              <div className="flex-1 bg-surface-container rounded-t-full h-[10%] hover:bg-tertiary-fixed transition-all duration-300"></div>
            </div>
            <div className="flex justify-between mt-4 px-2">
              <span className="font-label-caps text-[10px] text-on-surface-variant">08:00</span>
              <span className="font-label-caps text-[10px] text-on-surface-variant">12:00</span>
              <span className="font-label-caps text-[10px] text-on-surface-variant">16:00</span>
              <span className="font-label-caps text-[10px] text-on-surface-variant">20:00</span>
            </div>
          </div>
          
          {/* AI Hydration Insights */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            <div className="glass-card border border-glass-border rounded-xl p-card-padding flex-1 shadow-[0_20px_40px_rgba(0,0,0,0.03)] border-l-4 border-l-tertiary">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm">auto_awesome</span>
                </div>
                <h4 className="font-label-caps text-label-caps text-on-surface">HYDRATION AI</h4>
              </div>
              <p className="font-body-md text-body-md text-on-surface italic">"Drink 2 more glasses (500ml) in the next hour for optimal cognitive performance during your evening session."</p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-sm">check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface-variant text-sm">Metabolism peak reached</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-sm">check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface-variant text-sm">Electrolyte balance: Stable</span>
                </div>
              </div>
            </div>
            <div className="bg-on-surface rounded-xl p-card-padding shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-tertiary-fixed opacity-10 rounded-full blur-3xl"></div>
              <h4 className="font-label-caps text-label-caps text-primary-fixed mb-2 uppercase">Smart Tip</h4>
              <p className="font-headline-md text-headline-md text-white leading-tight">Room temperature water absorbs 20% faster.</p>
              <button className="mt-4 flex items-center gap-2 text-tertiary-fixed font-label-caps text-label-caps group">
                  LEARN MORE
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Bottom Floating CTA (Mobile Only) */}
        <button className="md:hidden fixed bottom-8 right-8 w-16 h-16 bg-tertiary-fixed text-on-tertiary-fixed rounded-full shadow-[0_10px_30px_rgba(199,243,0,0.5)] flex items-center justify-center z-50 active:scale-90 transition-transform">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>add</span>
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Water;
