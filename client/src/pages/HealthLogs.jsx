import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api/axios';

const HealthLogs = () => {
  const [logs, setLogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [logType, setLogType] = useState('Weight');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('kg');
  const [mealType, setMealType] = useState('Snack');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      // In a real scenario, this would aggregate from different endpoints based on the "metric"
      // or we'd have a unified logs endpoint. For now, fetch health logs as steps/hr.
      const res = await api.get('/health');
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (logType === 'Weight' || logType === 'Steps') {
        await api.post('/health', { steps: value });
      } else if (logType === 'Calories') {
        await api.post('/nutrition', { calories: value, mealType: mealType });
      } else if (logType === 'Water') {
        let amountInMl = Number(value);
        if (unit === 'L') amountInMl = amountInMl * 1000;
        await api.post('/water', { amount: amountInMl });
      }
      setShowModal(false);
      fetchLogs();
      setValue('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-section-gap">
        <div className="flex flex-col gap-6">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Daily Health Logs</h1>
              <p className="text-on-surface-variant mt-2">Track and manage your performance metrics with precision.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex bg-surface-container-low rounded-full p-1 border border-glass-border">
                <button className="px-6 py-2 bg-primary-container shadow-sm rounded-full font-label-caps text-label-caps">All Logs</button>
                <button className="px-6 py-2 text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps">Trends</button>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-lg p-card-padding shadow-[0_20px_40px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-tertiary">filter_list</span>
                  <span className="font-label-caps text-label-caps">Filter by Metric</span>
                </div>
                <div className="flex gap-2">
                  <span className="px-4 py-1.5 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-semibold">Weight</span>
                  <span className="px-4 py-1.5 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-semibold">Calories</span>
                  <span className="px-4 py-1.5 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-semibold">Steps</span>
                </div>
              </div>
              <button className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">download</span>
                <span className="font-label-caps text-label-caps">Export Data</span>
              </button>
            </div>
            
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-glass-border">
                    <th className="pb-4 font-label-caps text-label-caps text-on-surface-variant opacity-70 px-4">Date & Time</th>
                    <th className="pb-4 font-label-caps text-label-caps text-on-surface-variant opacity-70 px-4">Metric</th>
                    <th className="pb-4 font-label-caps text-label-caps text-on-surface-variant opacity-70 px-4">Value</th>
                    <th className="pb-4 font-label-caps text-label-caps text-on-surface-variant opacity-70 px-4">Status</th>
                    <th className="pb-4 font-label-caps text-label-caps text-on-surface-variant opacity-70 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-glass-border">
                  {logs.length === 0 ? (
                    <tr className="group hover:bg-surface-container-low transition-colors">
                      <td className="py-5 px-4 font-bold">Oct 24, 08:30 AM</td>
                      <td className="py-5 px-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary"><span className="material-symbols-outlined text-[20px]">monitor_weight</span></div><span className="font-medium">Weight</span></div></td>
                      <td className="py-5 px-4"><span className="font-metric-xl text-2xl text-tertiary">74.2 <span className="text-sm font-normal text-on-surface-variant uppercase">kg</span></span></td>
                      <td className="py-5 px-4"><span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-on-tertiary-container/10 text-on-tertiary-container text-xs font-bold uppercase tracking-wider">Stable</span></td>
                      <td className="py-5 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 hover:bg-white rounded-full transition-all text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined">edit</span></button>
                          <button className="p-2 hover:bg-error-container/20 rounded-full transition-all text-on-surface-variant hover:text-error"><span className="material-symbols-outlined">delete</span></button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log._id} className="group hover:bg-surface-container-low transition-colors">
                        <td className="py-5 px-4 font-bold">{new Date(log.date).toLocaleString()}</td>
                        <td className="py-5 px-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary"><span className="material-symbols-outlined text-[20px]">directions_walk</span></div><span className="font-medium">Steps</span></div></td>
                        <td className="py-5 px-4"><span className="font-metric-xl text-2xl text-tertiary">{log.steps} <span className="text-sm font-normal text-on-surface-variant uppercase">steps</span></span></td>
                        <td className="py-5 px-4"><span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-on-tertiary-container/10 text-on-tertiary-container text-xs font-bold uppercase tracking-wider">Logged</span></td>
                        <td className="py-5 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 hover:bg-white rounded-full transition-all text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined">edit</span></button>
                            <button onClick={() => api.delete(`/health/${log._id}`).then(fetchLogs)} className="p-2 hover:bg-error-container/20 rounded-full transition-all text-on-surface-variant hover:text-error"><span className="material-symbols-outlined">delete</span></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => setShowModal(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-tertiary-fixed text-on-tertiary-fixed rounded-full shadow-[0_0_30px_rgba(199,243,0,0.5)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-50">
        <span className="material-symbols-outlined text-[32px] font-bold">add</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-gutter bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-card bg-glass-fill rounded-lg p-card-padding shadow-[0_40px_80px_rgba(0,0,0,0.15)] ring-1 ring-glass-border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline-md text-headline-md">Add New Log</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-surface-container-high rounded-full transition-all">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant px-1">Log Type</label>
                <div className="grid grid-cols-3 gap-3">
                  <button type="button" onClick={() => setLogType('Weight')} className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${logType === 'Weight' ? 'border-tertiary-fixed bg-tertiary-container/30 text-on-tertiary-container shadow-[0_0_15px_rgba(199,243,0,0.1)]' : 'border-glass-border hover:border-tertiary'} transition-all`}>
                    <span className="material-symbols-outlined">monitor_weight</span>
                    <span className="text-xs font-bold uppercase">Weight</span>
                  </button>
                  <button type="button" onClick={() => setLogType('Calories')} className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${logType === 'Calories' ? 'border-tertiary-fixed bg-tertiary-container/30 text-on-tertiary-container shadow-[0_0_15px_rgba(199,243,0,0.1)]' : 'border-glass-border hover:border-tertiary'} transition-all`}>
                    <span className="material-symbols-outlined">restaurant</span>
                    <span className="text-xs font-bold uppercase">Calories</span>
                  </button>
                  <button type="button" onClick={() => setLogType('Water')} className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${logType === 'Water' ? 'border-tertiary-fixed bg-tertiary-container/30 text-on-tertiary-container shadow-[0_0_15px_rgba(199,243,0,0.1)]' : 'border-glass-border hover:border-tertiary'} transition-all`}>
                    <span className="material-symbols-outlined">water_drop</span>
                    <span className="text-xs font-bold uppercase">Water</span>
                  </button>
                </div>
              </div>
              {logType === 'Weight' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant px-1">Value</label>
                    <input value={value} onChange={e => setValue(e.target.value)} required className="w-full bg-white border border-subtle-gray rounded-full px-6 py-3 focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none" placeholder="0.0" type="number" step="0.1"/>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant px-1">Unit</label>
                    <select value={unit} onChange={e => setUnit(e.target.value)} className="w-full bg-white border border-subtle-gray rounded-full px-6 py-3 focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none appearance-none">
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </select>
                  </div>
                </div>
              )}

              {logType === 'Calories' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant px-1">Calories</label>
                    <input value={value} onChange={e => setValue(e.target.value)} required className="w-full bg-white border border-subtle-gray rounded-full px-6 py-3 focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none" placeholder="0" type="number"/>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant px-1">Meal Type</label>
                    <select value={mealType} onChange={e => setMealType(e.target.value)} className="w-full bg-white border border-subtle-gray rounded-full px-6 py-3 focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none appearance-none">
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                      <option value="Snack">Snack</option>
                    </select>
                  </div>
                </div>
              )}

              {logType === 'Water' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant px-1">Amount</label>
                    <input value={value} onChange={e => setValue(e.target.value)} required className="w-full bg-white border border-subtle-gray rounded-full px-6 py-3 focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none" placeholder="0" type="number"/>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant px-1">Unit</label>
                    <select value={unit} onChange={e => setUnit(e.target.value)} className="w-full bg-white border border-subtle-gray rounded-full px-6 py-3 focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none appearance-none">
                      <option value="ml">ml</option>
                      <option value="L">L</option>
                    </select>
                  </div>
                </div>
              )}
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-surface-container-high text-on-surface font-label-caps text-label-caps py-4 rounded-full hover:bg-primary-fixed transition-all">Discard</button>
                <button type="submit" className="flex-1 bg-on-surface text-white font-label-caps text-label-caps py-4 rounded-full hover:ring-2 hover:ring-tertiary-fixed transition-all shadow-lg">Save Log</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default HealthLogs;
