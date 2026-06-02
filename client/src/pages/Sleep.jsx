import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api/axios';

const Sleep = () => {
  const [sleepLogs, setSleepLogs] = useState([]);
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [duration, setDuration] = useState('');
  const [quality, setQuality] = useState('Good');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/sleep');
      setSleepLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSleepLog = async (e) => {
    e.preventDefault();
    try {
      await api.post('/sleep', {
        duration: Number(duration),
        quality
      });
      setShowSleepModal(false);
      setDuration('');
      setQuality('Good');
      fetchLogs();
      alert('Sleep log added successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to log sleep');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-section-gap pb-20">
        {/* Hero Sleep Score Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-2 relative glass-card border border-glass-border rounded-lg overflow-hidden p-card-padding flex flex-col justify-between min-h-[360px] group shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-tertiary-fixed/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-on-tertiary-container/5 blur-[80px] rounded-full"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">Last Night's Analysis</span>
              </div>
              <h2 className="font-display-lg text-display-lg mb-2">94 <span className="text-tertiary">/100</span></h2>
              <p className="font-headline-lg text-headline-lg text-on-surface">Regenerative Sleep</p>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-md">Your deep sleep duration increased by 15% compared to your weekly average. Your body is well-rested and recovered for today's activities.</p>
            </div>
            
            <div className="relative z-10 flex gap-4 mt-8">
              <button className="px-8 py-3 bg-on-surface text-surface-container-lowest font-semibold rounded-full hover:shadow-[0_0_15px_rgba(199,243,0,0.4)] hover:border-tertiary-fixed border border-transparent transition-all">View Trends</button>
              <button className="px-8 py-3 bg-transparent border border-on-surface text-on-surface font-semibold rounded-full hover:bg-surface-container-low transition-all">Detailed Log</button>
            </div>
          </div>
          
          {/* Bedtime AI Widget */}
          <div className="glass-card border border-tertiary-fixed/30 rounded-lg p-card-padding flex flex-col justify-between shadow-[0_0_20px_rgba(199,243,0,0.15)] bg-surface-container-lowest">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Bedtime AI Recommendation</span>
                <span className="material-symbols-outlined text-tertiary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>dark_mode</span>
              </div>
              <div className="text-center py-6">
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">Target Bedtime</p>
                <p className="font-metric-xl text-metric-xl text-on-surface">22:45 <span className="text-body-md font-normal text-on-surface-variant">PM</span></p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-surface-container-low rounded-xl">
                <span className="material-symbols-outlined text-tertiary mt-0.5">tips_and_updates</span>
                <p className="text-sm text-on-surface-variant">Lower room temperature to <span className="font-bold text-on-surface">18°C</span> for optimal REM cycles tonight.</p>
              </div>
              <button onClick={() => setShowSleepModal(true)} className="w-full py-4 bg-tertiary-fixed text-on-tertiary-fixed font-bold rounded-full shadow-sm hover:brightness-105 transition-all cursor-pointer">Set Routine</button>
            </div>
          </div>
        </section>

        {/* Stats & Chart Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {/* Sleep Duration Graph */}
          <div className="lg:col-span-2 glass-card border border-glass-border rounded-lg p-card-padding shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline-md text-headline-md">Weekly Duration</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-semibold">7 Days</span>
                <span className="px-3 py-1 text-xs font-semibold text-on-surface-variant">30 Days</span>
              </div>
            </div>
            <div className="relative h-64 w-full flex items-end justify-between px-2">
              {/* Custom SVG Chart Simulation */}
              <div className="absolute inset-0 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 800 200">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#c7f300" stopOpacity="0.15"></stop>
                      <stop offset="100%" stopColor="#c7f300" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,160 Q100,140 200,120 T400,100 T600,140 T800,90 L800,200 L0,200 Z" fill="url(#chartGradient)"></path>
                  <path d="M0,160 Q100,140 200,120 T400,100 T600,140 T800,90" fill="none" stroke="#1c1b1b" strokeWidth="1.5"></path>
                </svg>
              </div>
              
              {/* Chart Labels */}
              <div className="relative z-10 w-full flex justify-between pt-4">
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, i) => (
                  <div key={day} className="flex flex-col items-center gap-2">
                    <div className="h-40 w-1 bg-surface-container-highest rounded-full overflow-hidden">
                      {i === 0 && <div className="h-3/4 w-full bg-on-surface opacity-10"></div>}
                    </div>
                    <span className="text-[10px] font-label-caps text-on-surface-variant">{day}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center gap-2">
                  <div className="h-40 w-1 bg-tertiary-fixed rounded-full shadow-[0_0_10px_rgba(199,243,0,0.5)]"></div>
                  <span className="text-[10px] font-label-caps text-on-surface font-bold">SUN</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Breakdown Cards */}
          <div className="flex flex-col gap-gutter">
            {/* Deep Sleep Card */}
            <div className="glass-card border border-glass-border rounded-lg p-6 flex items-center justify-between border-l-4 border-l-tertiary">
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase">Deep Sleep</p>
                <h4 className="font-headline-md text-headline-md">2h 14m</h4>
              </div>
              <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary">stat_3</span>
              </div>
            </div>
            
            {/* REM Card */}
            <div className="glass-card border border-glass-border rounded-lg p-6 flex items-center justify-between border-l-4 border-l-on-surface">
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase">REM Cycle</p>
                <h4 className="font-headline-md text-headline-md">1h 58m</h4>
              </div>
              <div className="w-12 h-12 bg-on-surface/5 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface">neurology</span>
              </div>
            </div>
            
            {/* Awake Card */}
            <div className="glass-card border border-glass-border rounded-lg p-6 flex items-center justify-between border-l-4 border-l-error/20">
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase">Awake Time</p>
                <h4 className="font-headline-md text-headline-md">12m</h4>
              </div>
              <div className="w-12 h-12 bg-error/5 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-error">alarm</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Contextual Section */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-gutter">
          <div className="lg:col-span-3 glass-card border border-glass-border rounded-lg p-card-padding">
            <div className="flex items-center gap-4 mb-8">
              <span className="material-symbols-outlined text-tertiary" style={{fontVariationSettings: "'wght' 600"}}>cycle</span>
              <h3 className="font-headline-md text-headline-md">Sleep Stage Timeline</h3>
            </div>
            <div className="relative w-full h-12 flex gap-1 rounded-full overflow-hidden bg-surface-container-low mb-6">
              <div className="h-full bg-on-surface-variant w-[10%] opacity-40 hover:opacity-100 transition-opacity cursor-pointer group relative">
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Awake (12m)</div>
              </div>
              <div className="h-full bg-on-surface w-[40%] hover:opacity-100 transition-opacity cursor-pointer group relative">
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Light Sleep (3h 12m)</div>
              </div>
              <div className="h-full bg-tertiary-fixed w-[30%] hover:opacity-100 transition-opacity cursor-pointer group relative">
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Deep Sleep (2h 14m)</div>
              </div>
              <div className="h-full bg-on-secondary-fixed-variant w-[20%] hover:opacity-100 transition-opacity cursor-pointer group relative">
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">REM (1h 58m)</div>
              </div>
            </div>
            <div className="flex justify-between text-xs font-label-caps text-on-surface-variant">
              <span>23:00 PM</span>
              <span>01:30 AM</span>
              <span>04:00 AM</span>
              <span>06:30 AM</span>
              <span>07:34 AM</span>
            </div>
          </div>
          
          <div className="glass-card border border-glass-border rounded-lg p-card-padding bg-on-surface text-surface-container-lowest flex flex-col justify-center items-center text-center">
            <span className="material-symbols-outlined text-tertiary-fixed text-4xl mb-4">military_tech</span>
            <h4 className="font-headline-md text-headline-md mb-2">Sleep Streak</h4>
            <p className="text-3xl font-bold mb-4">12 <span className="text-sm font-normal text-surface-variant/70 uppercase tracking-widest">Days</span></p>
            <p className="text-sm text-surface-variant/80">You're in the top 3% of users this week for consistent sleep habits.</p>
          </div>
        </section>
      </div>

      {/* Sleep Log Modal */}
      {showSleepModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-gutter bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-card bg-glass-fill rounded-lg p-card-padding shadow-[0_40px_80px_rgba(0,0,0,0.15)] ring-1 ring-glass-border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline-md text-headline-md">Log Sleep</h2>
              <button onClick={() => setShowSleepModal(false)} className="p-2 hover:bg-surface-container-high rounded-full transition-all cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-6" onSubmit={handleAddSleepLog}>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant px-1">Duration (Hours)</label>
                <input value={duration} onChange={e => setDuration(e.target.value)} required placeholder="e.g. 7.5" step="0.1" className="w-full bg-white border border-subtle-gray rounded-full px-6 py-3 focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none" type="number"/>
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant px-1">Sleep Quality</label>
                <select value={quality} onChange={e => setQuality(e.target.value)} className="w-full bg-white border border-subtle-gray rounded-full px-6 py-3 focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none appearance-none">
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setShowSleepModal(false)} className="flex-1 bg-surface-container-high text-on-surface font-label-caps text-label-caps py-4 rounded-full hover:bg-primary-fixed transition-all cursor-pointer">Discard</button>
                <button type="submit" className="flex-1 bg-on-surface text-white font-label-caps text-label-caps py-4 rounded-full hover:ring-2 hover:ring-tertiary-fixed transition-all shadow-lg cursor-pointer">Log Sleep</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Sleep;
