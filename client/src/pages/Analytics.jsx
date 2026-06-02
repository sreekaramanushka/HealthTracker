import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const Analytics = () => {
  const handleDownloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Date,Steps,Calories,Water,Sleep\n2023-10-01,8432,1840,2.4,7.2\n2023-10-02,9120,2100,3.0,8.1";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "gofit_analytics_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSimulatedAction = (actionName) => {
    alert(`Simulated Action: ${actionName} feature launched. (Functional placeholder)`);
  };

  return (
    <DashboardLayout>
      <div className="py-8">
        {/* Page Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="font-display-lg text-display-lg text-on-surface">Analytics Deep-Dive</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Comprehensive breakdown of your physiological performance indicators.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={handleDownloadCSV} className="px-8 py-3 bg-white border border-subtle-gray text-on-surface rounded-full font-label-caps text-label-caps hover:border-on-surface transition-all active:scale-95 cursor-pointer">
              Download PDF
            </button>
            <button onClick={handleDownloadCSV} className="px-8 py-3 bg-on-surface text-white rounded-full font-label-caps text-label-caps hover:shadow-[0_0_20px_rgba(199,243,0,0.4)] hover:border-tertiary-fixed border border-transparent transition-all active:scale-95 cursor-pointer">
              Export Report
            </button>
          </div>
        </div>

        {/* Bento Grid Content */}
        <div className="grid grid-cols-12 gap-gutter">
          {/* Main Trend Chart */}
          <div className="col-span-12 lg:col-span-8 glass-card border border-glass-border rounded-lg p-card-padding shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">30-Day Health Trends</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Core performance trajectory</p>
              </div>
              <div className="flex gap-2">
                <span className="bg-tertiary-fixed/10 text-on-tertiary-container text-[10px] px-2 py-1 rounded font-bold uppercase">Live Data</span>
              </div>
            </div>
            <div className="h-64 relative w-full overflow-hidden">
              {/* Simplified SVG Chart Representation */}
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{stopColor:'rgba(199, 243, 0, 0.2)'}}></stop>
                    <stop offset="100%" style={{stopColor:'rgba(199, 243, 0, 0)'}}></stop>
                  </linearGradient>
                </defs>
                <path d="M0,80 Q50,75 100,40 T200,60 T300,20 T400,30 V100 H0 Z" fill="url(#chartGradient)"></path>
                <path d="M0,80 Q50,75 100,40 T200,60 T300,20 T400,30" fill="none" stroke="#1c1b1b" strokeWidth="1.5"></path>
              </svg>
              <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-[10px] font-label-caps text-on-surface-variant opacity-50">
                <span>01 OCT</span>
                <span>10 OCT</span>
                <span>20 OCT</span>
                <span>30 OCT</span>
              </div>
            </div>
          </div>

          {/* Monthly Goals Radial */}
          <div className="col-span-12 lg:col-span-4 glass-card border border-glass-border rounded-lg p-card-padding shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center">
            <h3 className="font-label-caps text-label-caps text-on-surface mb-6">Monthly Goal Completion</h3>
            <div className="relative w-48 h-48 mb-6">
              {/* Progress Ring 1 */}
              <svg className="w-full h-full -rotate-90">
                <circle className="text-tertiary-fixed/10" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="12"></circle>
                <circle className="text-tertiary-fixed" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502" strokeDashoffset="120" strokeLinecap="round" strokeWidth="12"></circle>
                {/* Inner Ring */}
                <circle className="text-on-surface/5" cx="96" cy="96" fill="transparent" r="60" stroke="currentColor" strokeWidth="12"></circle>
                <circle className="text-on-surface" cx="96" cy="96" fill="transparent" r="60" stroke="currentColor" strokeDasharray="377" strokeDashoffset="100" strokeLinecap="round" strokeWidth="12"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-metric-xl text-metric-xl text-on-surface">82%</span>
                <span className="font-label-caps text-[10px] text-on-surface-variant">Combined</span>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tertiary-fixed"></span>
                <span className="text-[10px] font-label-caps text-on-surface-variant">Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-on-surface"></span>
                <span className="text-[10px] font-label-caps text-on-surface-variant">Sleep</span>
              </div>
            </div>
          </div>

          {/* Metrics Summary Section */}
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-gutter mt-unit">
            <div className="bg-surface-container-low p-card-padding rounded-lg border border-glass-border">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-tertiary-fixed bg-on-surface p-2 rounded-full">favorite</span>
                <span className="text-on-tertiary-container font-bold text-xs">+4.2%</span>
              </div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Resting Heart Rate</p>
              <p className="font-metric-xl text-metric-xl text-on-surface">62 <span className="text-body-md font-normal opacity-50">BPM</span></p>
            </div>
            <div className="bg-surface-container-low p-card-padding rounded-lg border border-glass-border">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-tertiary-fixed bg-on-surface p-2 rounded-full">bolt</span>
                <span className="text-on-tertiary-container font-bold text-xs">+12.8%</span>
              </div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Active Calories</p>
              <p className="font-metric-xl text-metric-xl text-on-surface">1,240 <span className="text-body-md font-normal opacity-50">KCAL</span></p>
            </div>
            <div className="bg-surface-container-low p-card-padding rounded-lg border border-glass-border">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-tertiary-fixed bg-on-surface p-2 rounded-full">speed</span>
                <span className="text-error font-bold text-xs">-2.1%</span>
              </div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">VO2 Max</p>
              <p className="font-metric-xl text-metric-xl text-on-surface">48.5 <span className="text-body-md font-normal opacity-50">ML/KG</span></p>
            </div>
          </div>

          {/* Comparison Bar Chart */}
          <div className="col-span-12 lg:col-span-6 glass-card border border-glass-border rounded-lg p-card-padding shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-8">Performance vs. Last Month</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between font-label-caps text-[11px] text-on-surface-variant uppercase">
                  <span>Endurance</span>
                  <span className="text-on-surface font-bold">88%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary-fixed" style={{width: '88%'}}></div>
                </div>
                <div className="h-1 w-full bg-surface-container-highest/50 rounded-full overflow-hidden opacity-50">
                  <div className="h-full bg-on-surface" style={{width: '76%'}}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between font-label-caps text-[11px] text-on-surface-variant uppercase">
                  <span>Recovery speed</span>
                  <span className="text-on-surface font-bold">94%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary-fixed" style={{width: '94%'}}></div>
                </div>
                <div className="h-1 w-full bg-surface-container-highest/50 rounded-full overflow-hidden opacity-50">
                  <div className="h-full bg-on-surface" style={{width: '82%'}}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between font-label-caps text-[11px] text-on-surface-variant uppercase">
                  <span>Nutritional Balance</span>
                  <span className="text-on-surface font-bold">72%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary-fixed" style={{width: '72%'}}></div>
                </div>
                <div className="h-1 w-full bg-surface-container-highest/50 rounded-full overflow-hidden opacity-50">
                  <div className="h-full bg-on-surface" style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Report Section */}
          <div className="col-span-12 lg:col-span-6 bg-on-surface text-white rounded-lg p-card-padding relative overflow-hidden">
            {/* Subtle decorative gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary-fixed/10 blur-[100px] -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-tertiary-fixed">verified_user</span>
                <h3 className="font-headline-md text-headline-md">Oct Health Insight</h3>
              </div>
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                  <p className="text-tertiary-fixed font-bold font-label-caps text-[10px] mb-2 uppercase tracking-widest">Key Takeaway</p>
                  <p className="font-body-md text-white/80 leading-relaxed">Your cardiovascular recovery time has improved by 15% this month, likely due to consistent HIIT sessions on Tuesdays and Thursdays. Maintain this rhythm.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/50 text-[10px] font-label-caps uppercase">Sleep Efficiency</p>
                    <p className="text-headline-md font-bold text-tertiary-fixed">Optimum</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] font-label-caps uppercase">Stress Levels</p>
                    <p className="text-headline-md font-bold text-white">Low</p>
                  </div>
                </div>
                <button onClick={() => handleSimulatedAction('Clinical Breakdown Modal')} className="w-full py-4 border border-white/20 hover:border-tertiary-fixed hover:text-tertiary-fixed rounded-full transition-all text-white font-label-caps text-label-caps cursor-pointer">
                  View Full Clinical Breakdown
                </button>
              </div>
            </div>
          </div>

          {/* Comparison Analytics */}
          <div className="col-span-12 bg-surface-container-highest/30 rounded-lg p-card-padding border border-glass-border">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline-md text-headline-md text-on-surface">Category Comparison</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-tertiary-fixed rounded-full"></span>
                  <span className="text-xs font-label-caps text-on-surface">You</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-subtle-gray rounded-full"></span>
                  <span className="text-xs font-label-caps text-on-surface">Peer Avg</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="h-40 flex items-end justify-center gap-2 mb-4">
                  <div className="w-8 bg-subtle-gray/30 rounded-t-lg h-3/4"></div>
                  <div className="w-8 bg-tertiary-fixed rounded-t-lg h-full shadow-[0_0_20px_rgba(199,243,0,0.3)]"></div>
                </div>
                <span className="font-label-caps text-[11px] text-on-surface-variant uppercase">Activity</span>
              </div>
              <div className="text-center">
                <div className="h-40 flex items-end justify-center gap-2 mb-4">
                  <div className="w-8 bg-subtle-gray/30 rounded-t-lg h-full"></div>
                  <div className="w-8 bg-tertiary-fixed rounded-t-lg h-4/5 shadow-[0_0_20px_rgba(199,243,0,0.3)]"></div>
                </div>
                <span className="font-label-caps text-[11px] text-on-surface-variant uppercase">Sleep</span>
              </div>
              <div className="text-center">
                <div className="h-40 flex items-end justify-center gap-2 mb-4">
                  <div className="w-8 bg-subtle-gray/30 rounded-t-lg h-1/2"></div>
                  <div className="w-8 bg-tertiary-fixed rounded-t-lg h-3/4 shadow-[0_0_20px_rgba(199,243,0,0.3)]"></div>
                </div>
                <span className="font-label-caps text-[11px] text-on-surface-variant uppercase">Hydration</span>
              </div>
              <div className="text-center">
                <div className="h-40 flex items-end justify-center gap-2 mb-4">
                  <div className="w-8 bg-subtle-gray/30 rounded-t-lg h-3/5"></div>
                  <div className="w-8 bg-tertiary-fixed rounded-t-lg h-2/3 shadow-[0_0_20px_rgba(199,243,0,0.3)]"></div>
                </div>
                <span className="font-label-caps text-[11px] text-on-surface-variant uppercase">Recovery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
