import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api/axios';

const Nutrition = () => {
  const [nutritionLogs, setNutritionLogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMealType, setModalMealType] = useState('Snack');
  const [calories, setCalories] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/nutrition');
      setNutritionLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/nutrition/${id}`);
      fetchLogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogMeal = (mealType) => {
    setModalMealType(mealType);
    setShowModal(true);
  };

  const submitMealLog = async (e) => {
    e.preventDefault();
    if (calories && !isNaN(calories)) {
      try {
        await api.post('/nutrition', {
          mealType: modalMealType,
          calories: parseInt(calories)
        });
        fetchLogs();
        setShowModal(false);
        setCalories('');
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Mock data for display, in a real app this would aggregate today's logs
  const totalCalories = nutritionLogs.reduce((acc, curr) => acc + curr.calories, 0);

  return (
    <DashboardLayout>
      <div className="py-12 space-y-section-gap">
        {/* Hero Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-label-caps text-label-caps text-tertiary tracking-widest mb-2 block uppercase">Current Progress</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Daily Fuel Overview</h2>
          </div>
          <div className="text-right">
            <p className="font-metric-xl text-metric-xl text-on-surface">{totalCalories || 1840} <span className="text-body-md font-normal text-on-surface-variant">/ 2,400 kcal</span></p>
            <p className="text-on-surface-variant font-body-md">{2400 - (totalCalories || 1840)} kcal remaining</p>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-gutter">
          {/* Main Radial Breakdown */}
          <div className="col-span-12 lg:col-span-5 glass-card border border-glass-border rounded-lg p-card-padding flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
              {/* Progress Ring SVG */}
              <svg className="w-full h-full -rotate-90">
                <circle className="text-tertiary-fixed/10" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeWidth="12"></circle>
                <circle className="text-tertiary-fixed" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeDasharray="691" strokeDashoffset="172" strokeLinecap="round" strokeWidth="12"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-metric-xl text-metric-xl">76%</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">CALORIE GOAL</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8 w-full">
              <div className="text-center">
                <p className="font-headline-md text-headline-md text-on-surface">142g</p>
                <p className="font-label-caps text-[10px] text-on-surface-variant">PROTEIN</p>
                <div className="h-1.5 w-full bg-tertiary-fixed/20 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-tertiary-fixed w-4/5"></div>
                </div>
              </div>
              <div className="text-center">
                <p className="font-headline-md text-headline-md text-on-surface">210g</p>
                <p className="font-label-caps text-[10px] text-on-surface-variant">CARBS</p>
                <div className="h-1.5 w-full bg-on-surface/10 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-on-surface w-1/2"></div>
                </div>
              </div>
              <div className="text-center">
                <p className="font-headline-md text-headline-md text-on-surface">54g</p>
                <p className="font-label-caps text-[10px] text-on-surface-variant">FATS</p>
                <div className="h-1.5 w-full bg-outline-variant rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-outline w-2/3"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Meal Cards Section */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-gutter">
            {/* Breakfast */}
            <div className="glass-card border border-glass-border rounded-lg p-6 flex items-center gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all hover:border-tertiary-fixed cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <img alt="Breakfast bowl" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1zhWwEzv7jS6vgkySs4BtYSWc1nLH7uy6x27rQBOkvrKuUoUrfmY6q90-r952rU2QFCGQPKwt0mqZKcWmChz_vHfKEk9Nyzxf9Vn8sAVh4E1YKhSqv9iDBmMHC8JvIuMNZCGriPvqhqcCVXwRRKffWV9CgMdbB-G4AHiU-yEmWEe7mASY6GzuN12nqAkNJ0sSHE_kvI_-1ohyPT4uwNyoOYNjdcDK_73Ph4D1f26_lXBsJlIUQMqJD59njT9kEQz5oy2GUiQyY54"/>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Breakfast</h3>
                    <p className="text-on-surface-variant font-body-md">Acai Bowl & Coffee • 8:30 AM</p>
                  </div>
                  <span className="font-headline-md text-headline-md">420 <span className="text-body-md text-on-surface-variant">kcal</span></span>
                </div>
                <div className="flex gap-4">
                  <div className="flex-grow">
                    <div className="flex justify-between text-[10px] font-label-caps text-on-surface-variant mb-1">
                      <span>Macros</span>
                      <span>65% Clean</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden flex">
                      <div className="h-full bg-tertiary-fixed" style={{ width: '30%' }}></div>
                      <div className="h-full bg-on-surface" style={{ width: '50%' }}></div>
                      <div className="h-full bg-subtle-gray" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lunch */}
            <div className="glass-card border border-glass-border rounded-lg p-6 flex items-center gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all hover:border-tertiary-fixed cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <img alt="Lunch salad" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfaPQzxbOEpuAoYjRjk5osRz5UhPz35QmtY3L_7F4aBeWv88YeVzqSejoeXmiPtizFSOhamo2Z0ct2sgXlj_GBPBlci9e0AnVpsREFZNgSsv631WzdHtu-a2HqLY_W1blDCHNyCkhx4vo4q3TOHQZM_wXPJAjLcl-wiCvY828tE1BuSlHE3EWsUmWKMP278PEhhh1NLiPAfswT4-m2IlrhQjK-4CpLymixCKD7J2nvqA9w5_ewF5iLAy--hpvY0reNe22lxmI5c1w"/>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Lunch</h3>
                    <p className="text-on-surface-variant font-body-md">Salmon Avocado Salad • 1:15 PM</p>
                  </div>
                  <span className="font-headline-md text-headline-md">680 <span className="text-body-md text-on-surface-variant">kcal</span></span>
                </div>
                <div className="flex gap-4">
                  <div className="flex-grow">
                    <div className="flex justify-between text-[10px] font-label-caps text-on-surface-variant mb-1">
                      <span>Macros</span>
                      <span>92% Clean</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden flex">
                      <div className="h-full bg-tertiary-fixed" style={{ width: '45%' }}></div>
                      <div className="h-full bg-on-surface" style={{ width: '30%' }}></div>
                      <div className="h-full bg-subtle-gray" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dinner (Target) */}
            <div onClick={() => handleLogMeal('Dinner')} className="border-2 border-dashed border-outline-variant rounded-lg p-6 flex items-center justify-center gap-4 bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full border border-outline flex items-center justify-center group-hover:bg-on-surface group-hover:text-white transition-all">
                <span className="material-symbols-outlined">add</span>
              </div>
              <div className="text-left">
                <h3 className="font-headline-md text-headline-md text-on-surface-variant">Log Dinner</h3>
                <p className="text-on-surface-variant font-body-md">Recommended: 800 - 1,000 kcal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Food Log */}
        <section className="mt-section-gap">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Recent Activity</h2>
            <button className="text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps flex items-center gap-1">
                VIEW HISTORY <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
          <div className="glass-card border border-glass-border rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low border-b border-glass-border">
                <tr>
                  <th className="px-card-padding py-4 font-label-caps text-label-caps text-on-surface-variant">FOOD ITEM</th>
                  <th className="px-card-padding py-4 font-label-caps text-label-caps text-on-surface-variant">MEAL</th>
                  <th className="px-card-padding py-4 font-label-caps text-label-caps text-on-surface-variant">CALORIES</th>
                  <th className="px-card-padding py-4 font-label-caps text-label-caps text-on-surface-variant">STATUS</th>
                  <th className="px-card-padding py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border">
                {nutritionLogs.length === 0 ? (
                  <>
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-card-padding py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-md bg-tertiary-fixed/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-tertiary">restaurant_menu</span>
                          </div>
                          <span className="font-body-lg font-semibold">Organic Greek Yogurt</span>
                        </div>
                      </td>
                      <td className="px-card-padding py-5 text-on-surface-variant">Breakfast</td>
                      <td className="px-card-padding py-5 font-headline-md">130</td>
                      <td className="px-card-padding py-5">
                        <span className="px-3 py-1 rounded-full bg-on-tertiary-container/10 text-on-tertiary-container font-label-caps text-[10px]">OPTIMAL</span>
                      </td>
                      <td className="px-card-padding py-5 text-right">
                        <button className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors">delete</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-card-padding py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-md bg-on-surface/5 flex items-center justify-center">
                            <span className="material-symbols-outlined text-on-surface">coffee</span>
                          </div>
                          <span className="font-body-lg font-semibold">Oat Milk Latte</span>
                        </div>
                      </td>
                      <td className="px-card-padding py-5 text-on-surface-variant">Breakfast</td>
                      <td className="px-card-padding py-5 font-headline-md">190</td>
                      <td className="px-card-padding py-5">
                        <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-caps text-[10px]">MODERATE</span>
                      </td>
                      <td className="px-card-padding py-5 text-right">
                        <button className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors">delete</button>
                      </td>
                    </tr>
                  </>
                ) : (
                  nutritionLogs.map((log) => (
                    <tr key={log._id} className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-card-padding py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-md bg-tertiary-fixed/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-tertiary">restaurant_menu</span>
                          </div>
                          <span className="font-body-lg font-semibold">{log.mealType} Log</span>
                        </div>
                      </td>
                      <td className="px-card-padding py-5 text-on-surface-variant">{log.mealType}</td>
                      <td className="px-card-padding py-5 font-headline-md">{log.calories}</td>
                      <td className="px-card-padding py-5">
                        <span className="px-3 py-1 rounded-full bg-on-tertiary-container/10 text-on-tertiary-container font-label-caps text-[10px]">LOGGED</span>
                      </td>
                      <td className="px-card-padding py-5 text-right">
                        <button onClick={() => handleDelete(log._id)} className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors">delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Floating Action for Quick Add (FAB) - Contextual */}
        <button onClick={() => handleLogMeal('Snack')} className="fixed bottom-12 right-12 w-16 h-16 rounded-full bg-tertiary-fixed text-on-tertiary-fixed shadow-[0_0_30px_rgba(199,243,0,0.5)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 cursor-pointer">
          <span className="material-symbols-outlined text-[32px]">add</span>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-gutter bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-card bg-glass-fill rounded-lg p-card-padding shadow-[0_40px_80px_rgba(0,0,0,0.15)] ring-1 ring-glass-border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline-md text-headline-md">Add New Log</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-surface-container-high rounded-full transition-all">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-6" onSubmit={submitMealLog}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant px-1">Calories</label>
                  <input value={calories} onChange={e => setCalories(e.target.value)} required className="w-full bg-white border border-subtle-gray rounded-full px-6 py-3 focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none" placeholder="0" type="number"/>
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant px-1">Meal Type</label>
                  <select value={modalMealType} onChange={e => setModalMealType(e.target.value)} className="w-full bg-white border border-subtle-gray rounded-full px-6 py-3 focus:border-on-surface focus:ring-2 focus:ring-neon-glow transition-all outline-none appearance-none">
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>
              </div>
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

export default Nutrition;
