import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api/axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [healthLogs, setHealthLogs] = useState([]);
  const [waterLogs, setWaterLogs] = useState([]);
  const [nutritionLogs, setNutritionLogs] = useState([]);
  const [sleepLogs, setSleepLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [healthRes, waterRes, nutritionRes, sleepRes] = await Promise.all([
          api.get('/health').catch(() => ({ data: [] })),
          api.get('/water').catch(() => ({ data: [] })),
          api.get('/nutrition').catch(() => ({ data: [] })),
          api.get('/sleep').catch(() => ({ data: [] }))
        ]);
        
        setHealthLogs(healthRes.data);
        setWaterLogs(waterRes.data);
        setNutritionLogs(nutritionRes.data);
        setSleepLogs(sleepRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const today = new Date().toDateString();

  const todayHealth = healthLogs.filter(log => new Date(log.date).toDateString() === today);
  const totalSteps = todayHealth.reduce((acc, curr) => acc + (curr.steps || 0), 0);
  const latestHeartRate = healthLogs.length > 0 ? healthLogs[0].heartRate || 0 : 0;

  const todayNutrition = nutritionLogs.filter(log => new Date(log.date).toDateString() === today);
  const totalCalories = todayNutrition.reduce((acc, curr) => acc + (curr.calories || 0), 0);

  const todayWater = waterLogs.filter(log => new Date(log.date).toDateString() === today);
  const totalWaterMl = todayWater.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const totalWaterL = (totalWaterMl / 1000).toFixed(1);

  const todaySleep = sleepLogs.filter(log => new Date(log.date).toDateString() === today);
  const totalSleepHours = todaySleep.reduce((acc, curr) => acc + (curr.duration || 0), 0).toFixed(1);

  // Data for charts
  let data = healthLogs.slice(0, 7).map(log => ({
    name: new Date(log.date).toLocaleDateString('en-US', { weekday: 'short' }),
    steps: log.steps || 0
  })).reverse();

  // Provide realistic placeholder data if the user hasn't logged enough activity yet
  if (data.length === 0) {
    data = [
      { name: 'Mon', steps: 4200 },
      { name: 'Tue', steps: 5100 },
      { name: 'Wed', steps: 4800 },
      { name: 'Thu', steps: 7200 },
      { name: 'Fri', steps: 6800 },
      { name: 'Sat', steps: 9500 },
      { name: 'Sun', steps: 8100 },
    ];
  } else if (data.length < 7) {
    // Pad with zeros for missing days to keep the chart structure
    const paddedData = [...data];
    while (paddedData.length < 7) {
      paddedData.unshift({ name: '-', steps: 0 });
    }
    data = paddedData;
  }

  return (
    <DashboardLayout>
      <div className="space-y-section-gap">
        {/* Hero / Greeting */}
        <section className="mt-8">
          <h2 className="font-display-lg text-display-lg text-on-surface">Hello, {user?.name.split(' ')[0]}</h2>
          <p className="font-body-lg text-on-surface-variant mt-2">Here's your real-time physiological snapshot for today.</p>
        </section>

        {/* Health Summary Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-5 gap-gutter">
          {/* Steps Card */}
          <div onClick={() => navigate('/health')} className="bg-glass-fill glass-card border border-glass-border rounded-lg p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] group hover:border-tertiary-fixed transition-all duration-300 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-tertiary-fixed p-3 bg-on-tertiary-container rounded-xl">directions_walk</span>
              <span className="text-xs font-label-caps text-on-surface-variant">+12%</span>
            </div>
            <p className="font-label-caps text-label-caps text-on-surface-variant">Steps</p>
            <p className="font-metric-xl text-metric-xl mt-2 text-on-surface">{totalSteps.toLocaleString()}</p>
            <div className="mt-6 h-1 w-full bg-surface-container overflow-hidden rounded-full">
              <div className="h-full bg-tertiary-fixed w-[65%] shadow-[0_0_10px_rgba(199,243,0,0.5)]"></div>
            </div>
          </div>
          
          {/* Calories Card */}
          <div onClick={() => navigate('/nutrition')} className="bg-glass-fill glass-card border border-glass-border rounded-lg p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] group hover:border-tertiary-fixed transition-all duration-300 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-tertiary-fixed p-3 bg-on-tertiary-container rounded-xl">local_fire_department</span>
              <span className="text-xs font-label-caps text-on-surface-variant">-5%</span>
            </div>
            <p className="font-label-caps text-label-caps text-on-surface-variant">Calories</p>
            <p className="font-metric-xl text-metric-xl mt-2 text-on-surface">{totalCalories.toLocaleString()}</p>
            <div className="mt-6 h-1 w-full bg-surface-container overflow-hidden rounded-full">
              <div className="h-full bg-tertiary-fixed w-[45%] shadow-[0_0_10px_rgba(199,243,0,0.5)]"></div>
            </div>
          </div>
          
          {/* Water Card */}
          <div onClick={() => navigate('/water')} className="bg-glass-fill glass-card border border-glass-border rounded-lg p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] group hover:border-tertiary-fixed transition-all duration-300 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-tertiary-fixed p-3 bg-on-tertiary-container rounded-xl">water_drop</span>
              <span className="text-xs font-label-caps text-on-surface-variant">Optimal</span>
            </div>
            <p className="font-label-caps text-label-caps text-on-surface-variant">Water</p>
            <p className="font-metric-xl text-metric-xl mt-2 text-on-surface">{totalWaterL}L</p>
            <div className="mt-6 h-1 w-full bg-surface-container overflow-hidden rounded-full">
              <div className="h-full bg-tertiary-fixed w-[80%] shadow-[0_0_10px_rgba(199,243,0,0.5)]"></div>
            </div>
          </div>
          
          {/* Sleep Card */}
          <div onClick={() => navigate('/sleep')} className="bg-glass-fill glass-card border border-glass-border rounded-lg p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] group hover:border-tertiary-fixed transition-all duration-300 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-tertiary-fixed p-3 bg-on-tertiary-container rounded-xl">bedtime</span>
              <span className="text-xs font-label-caps text-on-surface-variant">Rem 2h</span>
            </div>
            <p className="font-label-caps text-label-caps text-on-surface-variant">Sleep</p>
            <p className="font-metric-xl text-metric-xl mt-2 text-on-surface">{totalSleepHours}h</p>
            <div className="mt-6 h-1 w-full bg-surface-container overflow-hidden rounded-full">
              <div className="h-full bg-tertiary-fixed w-[90%] shadow-[0_0_10px_rgba(199,243,0,0.5)]"></div>
            </div>
          </div>
          
          {/* Heart Rate Card */}
          <div onClick={() => navigate('/health')} className="bg-glass-fill glass-card border border-glass-border rounded-lg p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] group hover:border-tertiary-fixed transition-all duration-300 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-tertiary-fixed p-3 bg-on-tertiary-container rounded-xl">favorite</span>
              <span className="text-xs font-label-caps text-on-surface-variant">Resting</span>
            </div>
            <p className="font-label-caps text-label-caps text-on-surface-variant">Heart Rate</p>
            <p className="font-metric-xl text-metric-xl mt-2 text-on-surface">{latestHeartRate}</p>
            <div className="mt-6 h-1 w-full bg-surface-container overflow-hidden rounded-full">
              <div className="h-full bg-tertiary-fixed w-[40%] shadow-[0_0_10px_rgba(199,243,0,0.5)]"></div>
            </div>
          </div>
        </section>

        {/* Charts and Analytics */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Weekly Activity Line Chart */}
          <div className="lg:col-span-8 bg-glass-fill glass-card border border-glass-border rounded-lg p-card-padding shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Weekly Activity</h3>
                <p className="font-body-md text-on-surface-variant">Movement analysis from the last 7 days</p>
              </div>
              <select className="bg-surface-container-low border-none rounded-full px-4 py-2 font-label-caps text-label-caps focus:ring-2 focus:ring-neon-glow">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-64 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c7f300" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#c7f300" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#444748', fontSize: 10, fontFamily: 'Inter'}} />
                  <Tooltip contentStyle={{backgroundColor: '#fcf8f8', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}/>
                  <Area type="monotone" dataKey="steps" stroke="#1c1b1b" strokeWidth={1.5} fillOpacity={1} fill="url(#colorSteps)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Daily Progress Rings */}
          <div className="lg:col-span-4 bg-glass-fill glass-card border border-glass-border rounded-lg p-card-padding shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-center items-center">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-8 text-center">Daily Goals</h3>
            <div className="relative w-64 h-64">
              {/* Calorie Ring */}
              <svg className="w-full h-full -rotate-90">
                <circle cx="128" cy="128" fill="none" r="110" stroke="#f1edec" strokeWidth="14"></circle>
                <circle className="filter drop-shadow-[0_0_8px_rgba(199,243,0,0.6)]" cx="128" cy="128" fill="none" r="110" stroke="#c7f300" strokeDasharray="691" strokeDashoffset="200" strokeLinecap="round" strokeWidth="14"></circle>
                {/* Steps Ring */}
                <circle cx="128" cy="128" fill="none" r="90" stroke="#f1edec" strokeWidth="14"></circle>
                <circle cx="128" cy="128" fill="none" r="90" stroke="#1c1b1b" strokeDasharray="565" strokeDashoffset="150" strokeLinecap="round" strokeWidth="14"></circle>
                {/* Hydration Ring */}
                <circle cx="128" cy="128" fill="none" r="70" stroke="#f1edec" strokeWidth="14"></circle>
                <circle cx="128" cy="128" fill="none" r="70" stroke="#5d5f5f" strokeDasharray="439" strokeDashoffset="300" strokeLinecap="round" strokeWidth="14"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-metric-xl text-metric-xl text-on-surface">82%</span>
                <span className="font-label-caps text-[10px] text-on-surface-variant">OVERALL</span>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-tertiary-fixed"></div>
                  <span className="font-label-caps text-xs text-on-surface">Calories</span>
                </div>
                <span className="font-body-md text-sm text-on-surface-variant">{totalCalories.toLocaleString()}/2,400</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-on-surface"></div>
                  <span className="font-label-caps text-xs text-on-surface">Steps</span>
                </div>
                <span className="font-body-md text-sm text-on-surface-variant">{totalSteps.toLocaleString()}/10,000</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Row: AI Suggestions & Hydration Analytics */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* AI Suggestions */}
          <div className="lg:col-span-1 bg-on-tertiary-fixed text-tertiary-fixed rounded-lg p-card-padding relative overflow-hidden shadow-[0_30px_60px_rgba(199,243,0,0.15)]">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-tertiary-fixed opacity-10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined">smart_toy</span>
                <h4 className="font-headline-md text-headline-md text-tertiary-fixed">AI Insights</h4>
              </div>
              <p className="font-body-lg text-lg leading-relaxed mb-8">"Your metabolic rate is peaking. You need <span className="font-bold underline decoration-tertiary-fixed/40">2 more glasses</span> of water to maintain optimal hydration for your evening session."</p>
              <button onClick={() => navigate('/water')} className="w-full py-4 bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-label-caps rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
                  LOG WATER NOW
              </button>
            </div>
          </div>
          
          {/* Hydration Bar Chart */}
          <div className="lg:col-span-1 bg-glass-fill glass-card border border-glass-border rounded-lg p-card-padding shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Hydration</h3>
            <p className="font-body-md text-on-surface-variant mb-6">Daily hourly distribution</p>
            <div className="flex items-end justify-between h-40 gap-2">
              <div className="flex-1 bg-surface-container-high hover:bg-tertiary-fixed transition-colors h-1/4 rounded-t-sm"></div>
              <div className="flex-1 bg-surface-container-high hover:bg-tertiary-fixed transition-colors h-2/4 rounded-t-sm"></div>
              <div className="flex-1 bg-tertiary-fixed h-3/4 rounded-t-sm"></div>
              <div className="flex-1 bg-surface-container-high hover:bg-tertiary-fixed transition-colors h-full rounded-t-sm"></div>
              <div className="flex-1 bg-surface-container-high hover:bg-tertiary-fixed transition-colors h-2/3 rounded-t-sm"></div>
              <div className="flex-1 bg-surface-container-high hover:bg-tertiary-fixed transition-colors h-1/3 rounded-t-sm"></div>
              <div className="flex-1 bg-surface-container-high hover:bg-tertiary-fixed transition-colors h-1/2 rounded-t-sm"></div>
            </div>
            <div className="flex justify-between mt-4 font-label-caps text-[10px] text-on-surface-variant">
              <span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span>
            </div>
          </div>
          
          {/* Sleep Quality Chart */}
          <div className="lg:col-span-1 bg-glass-fill glass-card border border-glass-border rounded-lg p-card-padding shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Sleep Quality</h3>
            <p className="font-body-md text-on-surface-variant mb-6">Deep sleep vs REM cycles</p>
            <div className="h-40 w-full relative overflow-hidden rounded-xl bg-gradient-to-br from-on-surface to-on-surface-variant">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_120%,rgba(199,243,0,1)_0%,rgba(0,0,0,0)_70%)]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white font-metric-xl text-metric-xl">94%</p>
                  <p className="text-tertiary-fixed font-label-caps text-[10px]">REGENERATIVE</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xs text-tertiary-fixed" style={{fontVariationSettings: "'FILL' 1"}}>circle</span>
                <span className="font-label-caps text-xs text-on-surface-variant">Deep Sleep</span>
              </div>
              <span className="font-body-md text-sm font-bold text-on-surface">4h 12m</span>
            </div>
          </div>
        </section>
      </div>

      {/* Contextual FAB - Dashboard Only */}
      <button onClick={() => navigate('/health')} className="fixed bottom-10 right-10 w-16 h-16 bg-tertiary-fixed rounded-full shadow-[0_15px_30px_rgba(199,243,0,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 cursor-pointer">
        <span className="material-symbols-outlined text-on-tertiary-fixed text-3xl">add</span>
      </button>
    </DashboardLayout>
  );
};

export default Dashboard;
