import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api/axios';

const Goals = () => {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalType, setGoalType] = useState('Cardio');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('');

  const handleSimulatedAction = (actionName) => {
    alert(`Simulated Action: ${actionName} feature launched. (Functional placeholder)`);
  };

  const submitNewGoal = async (e) => {
    e.preventDefault();
    try {
      await api.post('/goals', {
        type: goalType,
        target: goalTarget,
        deadline: goalDeadline
      });
      alert('New goal set successfully!');
      setShowGoalModal(false);
      setGoalTarget('');
      setGoalDeadline('');
      // In a real app we'd fetchGoals() here to update the UI
    } catch (err) {
      console.error(err);
      alert('Failed to set goal');
    }
  };

  return (
    <DashboardLayout>
      <div className="py-10">
        {/* Hero Section */}
        <section className="mb-section-gap">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
            <div>
              <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Performance Metrics</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Visualizing your journey towards peak performance. Track your milestones and unlock the future of your well-being.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setShowGoalModal(true)} className="bg-on-surface text-surface py-3 px-8 rounded-full font-label-caps text-label-caps uppercase hover:ring-2 hover:ring-tertiary-fixed transition-all cursor-pointer">Set New Goal</button>
            </div>
          </div>

          {/* Bento Grid: Main Stats & Progress */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Daily Goals Progress (Left) */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-gutter">
              <div className="glass-card p-card-padding rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-headline-md text-headline-md mb-1">Weekly Cardio</h3>
                    <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Goal: 150 mins</p>
                  </div>
                  <span className="material-symbols-outlined text-tertiary-fixed text-4xl">directions_run</span>
                </div>
                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-metric-xl text-metric-xl text-tertiary-fixed">120</span>
                    <span className="font-body-md text-on-surface-variant">/ 150 min</span>
                  </div>
                  <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary-fixed shadow-[0_0_15px_rgba(199,243,0,0.5)]" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-card-padding rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-headline-md text-headline-md mb-1">Deep Sleep</h3>
                    <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Goal: 7h Average</p>
                  </div>
                  <span className="material-symbols-outlined text-tertiary-fixed text-4xl">bedtime</span>
                </div>
                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-metric-xl text-metric-xl text-tertiary-fixed">6.4</span>
                    <span className="font-body-md text-on-surface-variant">/ 7 hours</span>
                  </div>
                  <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary-fixed shadow-[0_0_15px_rgba(199,243,0,0.5)]" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-on-surface text-surface p-card-padding rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.1)] col-span-1 sm:col-span-2">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex-1">
                    <h3 className="font-headline-md text-headline-md mb-4 text-surface">Overall Health Score</h3>
                    <p className="font-body-md text-surface-variant mb-6">You're in the top 2% of performers this month. Keep your streak to unlock the "Titan" badge.</p>
                    <div className="flex gap-4">
                      <div className="px-4 py-2 bg-surface/10 rounded-full border border-surface/20 font-label-caps text-xs uppercase">Strength: Elite</div>
                      <div className="px-4 py-2 bg-surface/10 rounded-full border border-surface/20 font-label-caps text-xs uppercase">Recovery: High</div>
                    </div>
                  </div>
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle className="text-surface/10" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="12"></circle>
                      <circle className="text-tertiary-fixed" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502.6" strokeDashoffset="50.2" strokeLinecap="round" strokeWidth="12"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-metric-xl text-metric-xl text-surface">92</span>
                      <span className="font-label-caps text-[10px] text-surface-variant uppercase">Optimal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Side Highlights (Right) */}
            <div className="md:col-span-4 space-y-gutter">
              <div className="bg-surface-container-lowest border border-glass-border p-card-padding rounded-lg shadow-sm">
                <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-6">Hydration Master</h4>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-tertiary-fixed/20 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(199,243,0,0.3)] border border-tertiary-fixed/30 relative">
                    <span className="material-symbols-outlined text-4xl text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>water_drop</span>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-on-surface text-surface text-[10px] flex items-center justify-center rounded-full font-bold">14</div>
                  </div>
                  <div>
                    <p className="font-headline-md text-lg font-bold">Lvl 4 Achieved</p>
                    <p className="font-body-md text-sm text-on-surface-variant">3 liters/day for 14 consecutive days.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface-container-lowest border border-glass-border p-card-padding rounded-lg shadow-sm overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-tertiary-fixed/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-6">Social Comparison</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden">
                      <img alt="Friend 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFA4RjzL1U8mfy1er07Pqi1ueDsU6Z1TrWb_lVDs4RVwvwqpjMXE6YX7fYssK2D3JORcu8yDweBV4cZeMBotZwJe5J0pFY5rodBrkEl-nXaD29eN8qK2QXeawZye2vh0JnZ2NQvCwy0-RVe3JUEBGSGwU8UD3CfCBGsZ_fRbn-5h_E2U6gcZW5Q_A0vGKTCA-dkLl5-Lr3HTZqF-89ezmTf7nGE0tr2OTRWqM82xrTINOdgqcilcuA7RJkcN2leAXT1pJZT2cZM88"/>
                    </div>
                    <div className="flex-grow h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-on-surface-variant w-[85%]"></div>
                    </div>
                    <span className="font-label-caps text-xs">85%</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-tertiary-fixed bg-surface-container-high overflow-hidden shadow-[0_0_10px_rgba(199,243,0,0.4)]">
                      <img alt="You" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXbMWJXEGKO188k0r4GnPhr8zcvh3juriajZVLKHnzCpElZNJarhociSYofpHMvJcwVUOHb9cYZPHxj5Yl6KhYLiKg13jvPqb9J28qyR1IwHwETDFsFfh6aKOQp9_0Dysz7yz7CdAo1dxUjM4wL94Uv6FrzAFZZb8Yhx_fK8gD509YLn3DOqYvB5oLoom6RnzvANCTDoppcJ_xi7pEl2d9U8GE3IiHH0giMWWZ4nzhMbT67f5hJQdaHtlJ9gPZkt9_bPX0xzw0eGk"/>
                    </div>
                    <div className="flex-grow h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary-fixed w-[92%] shadow-[0_0_10px_rgba(199,243,0,0.5)]"></div>
                    </div>
                    <span className="font-label-caps text-xs text-tertiary-fixed font-bold">92%</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-on-surface-variant opacity-50">
                    <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden">
                      <img alt="Friend 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkiDlpS-aLwwGwql_GTDzhpEU1dIz5wTzMLH1T2B7Ffh23K861FRoi28McALBXtrq4GT9C2qYrp3d0v0Zg0oqRfaCePVfazGb7oe3wVc_6wNuJt4gaEHYmgLOJUpZk5DcrSOSOIoZ6Kdm7QXhtzhZR10SGUohTsJZtExpJY21iJfICAA03KA0LbkHokHxFOagDKhHRhNKikaUK6CP_B16SkpRVfvoLgiBRVQUJsdPQrh2v596P0e33r6m9SaKJgH3_dFwJLmyObE0"/>
                    </div>
                    <div className="flex-grow h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-on-surface-variant w-[72%]"></div>
                    </div>
                    <span className="font-label-caps text-xs">72%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievement Badge Grid */}
        <section className="mb-section-gap">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-headline-lg text-headline-lg">Unlocked Badges</h2>
            <button onClick={() => handleSimulatedAction('View All Badges')} className="text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps uppercase flex items-center gap-2 cursor-pointer">View All <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="glass-card p-6 rounded-lg flex flex-col items-center text-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all group">
              <div className="w-20 h-20 bg-surface-container mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform relative">
                <div className="absolute inset-0 bg-tertiary-fixed opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity"></div>
                <span className="material-symbols-outlined text-4xl text-on-surface" style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
              </div>
              <p className="font-label-caps text-xs uppercase text-on-surface-variant">Early Bird</p>
            </div>
            
            <div className="glass-card p-6 rounded-lg flex flex-col items-center text-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all group">
              <div className="w-20 h-20 bg-tertiary-fixed/10 mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform relative border border-tertiary-fixed/30">
                <div className="absolute inset-0 bg-tertiary-fixed opacity-30 rounded-full blur-lg"></div>
                <span className="material-symbols-outlined text-4xl text-tertiary-fixed" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
              </div>
              <p className="font-label-caps text-xs uppercase text-on-surface">7 Day Streak</p>
            </div>
            
            <div className="glass-card p-6 rounded-lg flex flex-col items-center text-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all group">
              <div className="w-20 h-20 bg-surface-container mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform relative">
                <span className="material-symbols-outlined text-4xl text-on-surface" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
              </div>
              <p className="font-label-caps text-xs uppercase text-on-surface-variant">Heart Hero</p>
            </div>
            
            <div className="glass-card p-6 rounded-lg flex flex-col items-center text-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all group">
              <div className="w-20 h-20 bg-surface-container mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform relative">
                <span className="material-symbols-outlined text-4xl text-on-surface" style={{fontVariationSettings: "'FILL' 1"}}>nutrition</span>
              </div>
              <p className="font-label-caps text-xs uppercase text-on-surface-variant">Macro Pro</p>
            </div>
            
            <div className="glass-card p-6 rounded-lg flex flex-col items-center text-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all group opacity-40 grayscale">
              <div className="w-20 h-20 bg-surface-container mb-4 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-on-surface">lock</span>
              </div>
              <p className="font-label-caps text-xs uppercase text-on-surface-variant">Peak Titan</p>
            </div>
            
            <div className="glass-card p-6 rounded-lg flex flex-col items-center text-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all group opacity-40 grayscale">
              <div className="w-20 h-20 bg-surface-container mb-4 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-on-surface">lock</span>
              </div>
              <p className="font-label-caps text-xs uppercase text-on-surface-variant">Zen Master</p>
            </div>
          </div>
        </section>

        {/* Milestone Timeline */}
        <section className="mb-section-gap">
          <h2 className="font-headline-lg text-headline-lg mb-10">Journey Timeline</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-surface-container-high hidden md:block"></div>
            <div className="space-y-12 relative">
              {/* Past Milestone */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 rounded-full bg-on-surface flex items-center justify-center shrink-0 z-10 shadow-lg">
                  <span className="material-symbols-outlined text-surface text-3xl">check_circle</span>
                </div>
                <div className="glass-card p-card-padding rounded-lg flex-grow shadow-sm border border-glass-border">
                  <span className="font-label-caps text-xs text-on-surface-variant uppercase mb-2 block">October 12, 2023</span>
                  <h4 className="font-headline-md text-headline-md mb-2">Weight Goal Achieved: 75kg</h4>
                  <p className="font-body-md text-on-surface-variant">You successfully maintained your target weight for 3 months. System reward: +500 XP and Lifetime 'Sustainer' Badge.</p>
                </div>
              </div>
              
              {/* Current Milestone */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(199,243,0,0.5)]">
                  <span className="material-symbols-outlined text-on-tertiary-fixed text-3xl">trending_up</span>
                </div>
                <div className="bg-on-tertiary-container text-tertiary-fixed p-card-padding rounded-lg flex-grow shadow-md border-2 border-tertiary-fixed/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4">
                    <span className="inline-block px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-[10px] uppercase rounded-full">In Progress</span>
                  </div>
                  <span className="font-label-caps text-xs text-tertiary-fixed/80 uppercase mb-2 block">Present Journey</span>
                  <h4 className="font-headline-md text-headline-md mb-2">Marathon Readiness</h4>
                  <p className="font-body-md text-tertiary-fixed/90 mb-6">Running endurance is currently at 84%. Complete 3 more 10k sessions to reach 100%.</p>
                  <div className="w-full h-1.5 bg-on-tertiary-fixed/20 rounded-full">
                    <div className="h-full bg-tertiary-fixed" style={{ width: '84%' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Upcoming Milestone */}
              <div className="flex flex-col md:flex-row gap-8 items-start opacity-50">
                <div className="w-16 h-16 rounded-full bg-surface-container-high border-2 border-dashed border-outline-variant flex items-center justify-center shrink-0 z-10">
                  <span className="material-symbols-outlined text-on-surface-variant text-3xl">flag</span>
                </div>
                <div className="bg-surface-container-low border border-glass-border border-dashed p-card-padding rounded-lg flex-grow">
                  <span className="font-label-caps text-xs text-on-surface-variant uppercase mb-2 block">December 2023 Projection</span>
                  <h4 className="font-headline-md text-headline-md mb-2">Iron Core Challenge</h4>
                  <p className="font-body-md text-on-surface-variant">Unlocked after completing the Marathon Readiness journey. Requires consistent core stability metrics.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Bottom Action */}
        <section className="bg-surface-container rounded-lg p-card-padding text-center border border-glass-border">
          <h3 className="font-headline-md text-headline-md mb-4">Want more challenges?</h3>
          <p className="font-body-md text-on-surface-variant mb-8 max-w-xl mx-auto">Connect with the GoFit Community to participate in global challenges and win exclusive performance gear.</p>
          <div className="flex justify-center gap-4">
            <button onClick={() => handleSimulatedAction('Explore Global Challenges')} className="bg-on-surface text-surface py-3 px-10 rounded-full font-label-caps text-label-caps uppercase hover:ring-2 hover:ring-tertiary-fixed transition-all cursor-pointer">Explore Challenges</button>
            <button onClick={() => handleSimulatedAction('Squad Creation Flow')} className="border border-on-surface text-on-surface py-3 px-10 rounded-full font-label-caps text-label-caps uppercase hover:bg-on-surface hover:text-surface transition-all cursor-pointer">Create Squad</button>
          </div>
        </section>
      </div>

      {/* Set New Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-gutter bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-card bg-glass-fill rounded-lg p-card-padding shadow-[0_40px_80px_rgba(0,0,0,0.15)] ring-1 ring-glass-border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline-md text-headline-md">Set New Goal</h2>
              <button onClick={() => setShowGoalModal(false)} className="p-2 hover:bg-surface-container-high rounded-full transition-all">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-6" onSubmit={submitNewGoal}>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant px-1">Goal Category</label>
                <select value={goalType} onChange={e => setGoalType(e.target.value)} className="w-full bg-white border border-subtle-gray rounded-full px-6 py-3 focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none appearance-none">
                  <option value="Cardio">Cardio</option>
                  <option value="Weight">Weight</option>
                  <option value="Sleep">Sleep</option>
                  <option value="Steps">Steps</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant px-1">Target Description</label>
                <input value={goalTarget} onChange={e => setGoalTarget(e.target.value)} required placeholder="e.g. Run 10k or Lose 5kg" className="w-full bg-white border border-subtle-gray rounded-full px-6 py-3 focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none" type="text"/>
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant px-1">Target Deadline</label>
                <input value={goalDeadline} onChange={e => setGoalDeadline(e.target.value)} required className="w-full bg-white border border-subtle-gray rounded-full px-6 py-3 focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none" type="date"/>
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setShowGoalModal(false)} className="flex-1 bg-surface-container-high text-on-surface font-label-caps text-label-caps py-4 rounded-full hover:bg-primary-fixed transition-all">Discard</button>
                <button type="submit" className="flex-1 bg-on-surface text-white font-label-caps text-label-caps py-4 rounded-full hover:ring-2 hover:ring-tertiary-fixed transition-all shadow-lg">Commit Goal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Goals;
