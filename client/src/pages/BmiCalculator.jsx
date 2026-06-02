import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const BmiCalculator = () => {
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState(28);
  const [height, setHeight] = useState(178);
  const [weight, setWeight] = useState(72.4);

  const [calculatedBmi, setCalculatedBmi] = useState(() => {
    const heightInMeters = 178 / 100;
    return (72.4 / (heightInMeters * heightInMeters)).toFixed(1);
  });

  const handleRecalculate = () => {
    if (height > 0) {
      const heightInMeters = height / 100;
      setCalculatedBmi((weight / (heightInMeters * heightInMeters)).toFixed(1));
    }
  };

  const getBmiStatus = () => {
    const numericBmi = parseFloat(calculatedBmi);
    if (numericBmi < 18.5) return { label: 'Underweight', color: 'text-blue-400' };
    if (numericBmi < 25) return { label: 'Healthy', color: 'text-tertiary-fixed' };
    if (numericBmi < 30) return { label: 'Overweight', color: 'text-yellow-400' };
    return { label: 'Obese', color: 'text-error' };
  };

  const status = getBmiStatus();
  const percentage = Math.min(Math.max((parseFloat(calculatedBmi) / 40) * 100, 0), 100);

  return (
    <DashboardLayout>
      <div className="pt-8 space-y-section-gap">
        <div className="mb-section-gap">
          <h2 className="font-display-lg text-display-lg text-on-surface mb-2">BMI Calculator</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Precision metrics for elite health monitoring. Calculate your Body Mass Index using our clinical-grade algorithm.</p>
        </div>

        {/* Bento Grid Layout for Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Inputs Section (Left/Top) */}
          <div className="lg:col-span-7 space-y-gutter">
            <div className="glass-fill backdrop-blur-[20px] bg-glass-fill rounded-lg p-card-padding border border-glass-border shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
              <h3 className="font-headline-md text-headline-md mb-8">Personal Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Gender Toggle */}
                <div className="space-y-3">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Gender Selection</label>
                  <div className="flex gap-2">
                    <button onClick={() => setGender('Male')} className={`flex-1 py-4 rounded-full border-2 transition-all font-bold ${gender === 'Male' ? 'border-on-surface bg-on-surface text-white' : 'border-subtle-gray hover:border-on-surface text-on-surface-variant'}`}>Male</button>
                    <button onClick={() => setGender('Female')} className={`flex-1 py-4 rounded-full border-2 transition-all font-bold ${gender === 'Female' ? 'border-on-surface bg-on-surface text-white' : 'border-subtle-gray hover:border-on-surface text-on-surface-variant'}`}>Female</button>
                  </div>
                </div>

                {/* Age Input */}
                <div className="space-y-3">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Age (Years)</label>
                  <div className="relative">
                    <input className="w-full bg-surface-container-highest border border-glass-border rounded-full py-4 px-6 focus:ring-2 focus:ring-neon-glow focus:border-on-surface outline-none transition-all font-metric-xl text-metric-xl" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                      <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-on-surface" onClick={() => setAge(age + 1)}>expand_less</span>
                      <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-on-surface" onClick={() => setAge(age > 1 ? age - 1 : 1)}>expand_more</span>
                    </div>
                  </div>
                </div>

                {/* Height Slider */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Height (cm)</label>
                    <span className="font-metric-xl text-metric-xl text-tertiary">{height} <span className="text-body-md font-normal text-on-surface-variant">cm</span></span>
                  </div>
                  <input className="w-full h-1.5 bg-surface-container rounded-full appearance-none cursor-pointer accent-on-surface" max="250" min="100" type="range" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
                  <div className="flex justify-between text-[10px] text-on-surface-variant font-bold">
                    <span>100 CM</span>
                    <span>250 CM</span>
                  </div>
                </div>

                {/* Weight Slider */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Weight (kg)</label>
                    <span className="font-metric-xl text-metric-xl text-tertiary">{weight} <span className="text-body-md font-normal text-on-surface-variant">kg</span></span>
                  </div>
                  <input className="w-full h-1.5 bg-surface-container rounded-full appearance-none cursor-pointer accent-on-surface" max="200" min="30" step="0.1" type="range" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
                  <div className="flex justify-between text-[10px] text-on-surface-variant font-bold">
                    <span>30 KG</span>
                    <span>200 KG</span>
                  </div>
                </div>
              </div>

              <button onClick={handleRecalculate} className="w-full mt-12 bg-on-surface text-white py-6 rounded-full font-headline-md hover:ring-2 hover:ring-tertiary-fixed transition-all flex items-center justify-center gap-3 group cursor-pointer">
                Recalculate Metrics
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>

            {/* Recommendation Card */}
            <div className="glass-fill border border-glass-border rounded-lg p-card-padding relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-[120px]">verified_user</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-on-tertiary-container">check_circle</span>
                Health Insights
              </h4>
              <p className="font-body-md text-on-surface-variant mb-6">Based on your metrics, you are in the <strong>Optimal Health Zone</strong>. Your body composition indicates high cardiovascular efficiency and balanced metabolic rate.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface-container-low p-4 rounded-xl border border-glass-border">
                  <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">RECOMMENDED CALORIES</p>
                  <p className="font-headline-md text-headline-md text-on-surface">2,450 <span className="text-body-md">kcal</span></p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-xl border border-glass-border">
                  <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">IDEAL WEIGHT RANGE</p>
                  <p className="font-headline-md text-headline-md text-on-surface">68 - 76 <span className="text-body-md">kg</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Result Gauge Section (Right/Bottom) */}
          <div className="lg:col-span-5 space-y-gutter">
            {/* Gauge Card */}
            <div className="glass-fill backdrop-blur-[20px] rounded-lg p-card-padding border border-glass-border shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col items-center text-center">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-8">BMI Analysis</h3>
              
              <div className="relative w-64 h-64 flex items-center justify-center mb-6">
                {/* SVG Gauge */}
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle className="text-tertiary-fixed opacity-10" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className={`text-tertiary-fixed drop-shadow-[0_0_12px_rgba(199,243,0,0.6)] ${status.color.replace('text', 'text')}`} cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeDasharray="283" strokeDashoffset={283 - (283 * percentage / 100)} strokeLinecap="round" strokeWidth="8"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-metric-xl text-[56px] text-on-surface leading-none">{calculatedBmi}</span>
                  <span className={`font-label-caps text-label-caps mt-2 ${status.color}`}>{status.label.toUpperCase()}</span>
                </div>
              </div>

              <div className="w-full space-y-6">
                <div className="flex justify-between items-end">
                  <div className="text-left">
                    <p className="font-label-caps text-[10px] text-on-surface-variant">CURRENT STATUS</p>
                    <p className={`font-headline-md text-headline-md ${status.color}`}>{status.label}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label-caps text-[10px] text-on-surface-variant">PERCENTILE</p>
                    <p className="font-headline-md text-headline-md">Top 12%</p>
                  </div>
                </div>
                
                {/* Scale Legend */}
                <div className="pt-6 border-t border-glass-border">
                  <div className="flex h-3 w-full bg-surface-container rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-blue-400 w-[15%]"></div>
                    <div className="h-full bg-tertiary-fixed w-[40%] relative">
                      {status.label === 'Healthy' && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-5 bg-on-surface rounded-full"></div>}
                    </div>
                    <div className="h-full bg-yellow-400 w-[20%]"></div>
                    <div className="h-full bg-error w-[25%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-on-surface-variant px-1">
                    <span>UNDER</span>
                    <span>IDEAL</span>
                    <span>OVER</span>
                    <span>OBESE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Metric Cards (Bento style) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-fill p-6 rounded-lg border border-glass-border shadow-sm">
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-2">BMR</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-md text-headline-md">1,740</span>
                  <span className="text-[10px] text-on-surface-variant">KCAL</span>
                </div>
                <div className="mt-4 h-1 bg-surface-container rounded-full overflow-hidden">
                  <div className="w-[65%] h-full bg-on-surface"></div>
                </div>
              </div>
              <div className="glass-fill p-6 rounded-lg border border-glass-border shadow-sm">
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-2">BODY FAT</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-md text-headline-md text-tertiary">14.2</span>
                  <span className="text-[10px] text-on-surface-variant">%</span>
                </div>
                <div className="mt-4 h-1 bg-surface-container rounded-full overflow-hidden">
                  <div className="w-[45%] h-full bg-tertiary-fixed"></div>
                </div>
              </div>
            </div>

            {/* Context Image */}
            <div className="relative h-48 rounded-lg overflow-hidden border border-glass-border group">
              <img alt="Healthy lifestyle" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpjksXQI7uzbmA-cW8PGB9ExodlGGn-n2tfBEsy9G0Gy2--A0UIuex9X29ulAgtvclZIqmLk13mKufFg70Ks24xap6FnwSb78RKd1F3Dm4zhTl1x41t9VoPxvemOVR51s2kGKbaJRrdAKZmEsrVswXWH5UB-O2inQdeWGzllAwlfTFWYStoEfn3nRaeoOYGttsnXHWoFESmIbMwbQ_Q6HLuWULHJCg0ls3Au_cODRdKvV-XMIaFY5xuBNEDJmvm2TTi3O-S3UQpEU"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <p className="text-white font-label-caps text-label-caps">PRO TIP</p>
                <p className="text-white font-body-md text-body-md font-medium">Muscle mass affects BMI. Use DEXA scans for higher precision.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BmiCalculator;
