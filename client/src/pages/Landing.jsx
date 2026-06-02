import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const Landing = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between py-section-gap gap-12">
        <div className="lg:w-1/2 space-y-unit">
          <span className="font-label-caps text-label-caps text-tertiary uppercase tracking-widest">Performance Metrics</span>
          <h1 className="font-display-lg text-display-lg lg:text-[64px] leading-tight text-on-surface max-w-xl">
            Your Smart Health <span className="text-tertiary-fixed drop-shadow-sm">Companion</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md pb-8">
            Elevate your physical potential with AI-driven analytics that transform complex biological data into actionable daily insights.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="px-8 py-4 bg-on-surface text-on-tertiary font-label-caps text-label-caps rounded-full neon-glow-btn transition-all duration-300 flex items-center gap-2">
              Get Started <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link to="/dashboard" className="px-8 py-4 bg-transparent border border-on-surface text-on-surface font-label-caps text-label-caps rounded-full hover:bg-on-surface hover:text-white transition-all duration-300">
              View Dashboard
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 relative group">
          <div className="absolute -inset-4 bg-tertiary-fixed opacity-10 blur-3xl rounded-full"></div>
          <div className="glass-card p-card-padding rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <img alt="Health Analytics Preview" className="w-full h-auto rounded-lg shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz3B5OdqUtrb9KZabJUo-YshVl-Xhk7LQazGfoz_HsmD9WhpaQOy0VAKqHT51jfD-4Kd06wggSVhDVAByvyIogEwAZw6rltH11E9sUuLrCcB3QMMuegiA6yd-eFVnRHoYr-M2-x11FbTh-WuLvxQpSJucSPe5mjOCsKX9DJyck1xzjlm-fxRLCqH2Nfd3ZwnRKlFahI1X03e1iAHyFPTc0Tixp3sCDWACBKUERFdoGY8vhN7BRsMhwLNTGl5121AWBDbdILJFfZ8A"/>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-section-gap">
        <div className="text-center mb-12">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Integrated Wellness Ecosystem</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">Every metric matters. Track the core pillars of your vitality with medical-grade precision.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {/* Feature Cards */}
          {[
            { icon: 'footprint', title: 'Step Tracking', desc: 'Real-time gait analysis and step counts with precision GPS integration for every stride.', bg: 'bg-tertiary-fixed', color: 'text-on-tertiary-fixed' },
            { icon: 'bedtime', title: 'Sleep Monitoring', desc: 'Analyze REM cycles and deep sleep efficiency to wake up restored and fully optimized.', bg: 'bg-surface-container-highest', color: 'text-on-surface' },
            { icon: 'water_drop', title: 'Water Intake', desc: 'Smart hydration reminders based on your activity levels and metabolic requirements.', bg: 'bg-tertiary-fixed/20', color: 'text-tertiary' },
            { icon: 'restaurant', title: 'Calories Tracker', desc: 'Advanced macro breakdown with photo-recognition meal logging for absolute transparency.', bg: 'bg-on-surface', color: 'text-white' },
            { icon: 'calculate', title: 'BMI Analysis', desc: 'Track body composition trends over time with dynamic bio-metric visualization tools.', bg: 'bg-surface-container-high', color: 'text-on-surface' },
            { icon: 'insights', title: 'Health Reports', desc: 'Export professional-grade medical summaries to share with your primary care provider.', bg: 'bg-tertiary-fixed', color: 'text-on-tertiary-fixed' },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-card-padding rounded-lg hover:border-tertiary-fixed transition-all group">
              <div className={`w-12 h-12 ${feature.bg} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <span className={`material-symbols-outlined ${feature.color}`}>{feature.icon}</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">{feature.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-section-gap glass-card rounded-xl p-card-padding flex flex-col lg:flex-row gap-12 overflow-hidden relative">
        <div className="lg:w-1/3">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">Real-Time Core Performance</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-tertiary">bolt</span>
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant">Daily Energy</p>
                  <p className="font-headline-md text-headline-md">84%</p>
                </div>
              </div>
              <span className="text-tertiary font-bold">+5% vs Yesterday</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-tertiary">favorite</span>
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant">Heart Rate</p>
                  <p className="font-headline-md text-headline-md">72 BPM</p>
                </div>
              </div>
              <span className="text-on-surface-variant font-medium">Optimal Range</span>
            </div>
          </div>
          <Link to="/analytics" className="mt-8 block text-center w-full py-4 bg-on-surface text-white rounded-full font-label-caps text-label-caps">Expand Analytics</Link>
        </div>
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="bg-surface-container-lowest p-6 rounded-lg border border-glass-border flex flex-col items-center justify-center">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle className="text-tertiary/10" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="12"></circle>
              <circle className="text-tertiary-fixed activity-ring" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502" strokeDashoffset="125" strokeLinecap="round" strokeWidth="12"></circle>
              <text alignmentBaseline="middle" className="font-metric-xl text-metric-xl fill-on-surface" textAnchor="middle" transform="rotate(90)" x="96" y="-96">75%</text>
            </svg>
            <p className="mt-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Movement Goal</p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-lg border border-glass-border">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">VITALITY TREND</p>
            <div className="h-40 flex items-end gap-2">
              {[50, 75, 100, 66, 50, 83, 66].map((h, i) => (
                <div key={i} className={`w-full ${h === 100 ? 'bg-tertiary-fixed shadow-[0_0_15px_rgba(199,243,0,0.4)]' : h === 66 && i === 6 ? 'bg-on-surface' : 'bg-surface-container-high'} rounded-t-full`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-label-caps text-on-surface-variant">
              <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-section-gap">
        <h2 className="font-headline-lg text-headline-lg text-on-surface text-center mb-12">Performance Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {[
            {
              quote: "GoFit has completely redefined how I approach my marathon training. The precision is unmatched in any other consumer wearable.",
              name: "Marcus Thorne", role: "Elite Athlete", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLjG0GwSg2UhKEWTmWhDPjpz_E86W0I2jbQ56Sm-J0fN12k60-OBP1zs-I0_WQSWzM01fnSSt-3qoGXQ29HlaABfp_uubE-XOhZUirSMtQk6mM_VmpP_dE8uVSxo2MrobVh2z-74GFYNYZX8y6b0IJ-n664sJSe5ut2vwg2sa5mXhPsh6EAh1mbhzGWSMXYyka9GMvhgjAxwQqShecEp8f25JkrlWubcNvrFaPOc9mj0MpfVZeExbbYqRnN-P-pQbhnsAjmPm52IQ"
            },
            {
              quote: "The glassmorphic UI isn't just beautiful—it's functional. I can see all my vitals at a single glance without any clutter.",
              name: "Elena Rodriguez", role: "UI/UX Designer", border: "border-tertiary-fixed", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0fEjDT0NgHZHWo7vl8H_Zar5_3tBCzDdbg3VxJZ8jThMY-Astix2AdFrmsIhmmfOPZeNb-vae00mwOXrY-dHBIi6XTOUKjF10-B-1dXD4hhr4L2ZOfW2P1I0D4rHI1VFCp0n4dMp2ZWC8fmg8Xz5OX6f7HQ5noLNg8qoYRahKhEXb65uRckX9po6dSsegVBfUG2FRu84r8__QoXdj_419wO7Ug1-CgGHiFqMR-Llcht8VUoB6KdfD5AnqfGfjTKAMbBg7bfYa71s"
            },
            {
              quote: "Medical data used to be scary. Now it's motivating. GoFit makes health tracking feel like a premium lifestyle experience.",
              name: "Dr. David Chen", role: "Health Consultant", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUBFk6XMTApJdl2bAa7U_1-u03aMOlXIMFfIs_qpWKnl1FcBoKUKv9jOnrvylWhl8oAsiv1NyycRB53FqW5PWPZ9oX5UEDHsT4uzqbR2TMWdSR3VGIn2oidQNJJ1wcDa6v8hL2mADDnd0PXVdQORsl4lrMV2sxNADdISAnxLNL3u2-AT_dgC5nIO6ZKNDVqt5MQe7M5I-trFvfveWtnP-2RPeE0jWncMPFhkIpMVWLEhbW1_H6927wIIf0n91A7XDbYqOuBgYxvEw"
            }
          ].map((t, i) => (
            <div key={i} className={`glass-card p-card-padding rounded-lg ${t.border || ''}`}>
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-tertiary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
              </div>
              <p className="font-body-md text-body-md text-on-surface italic mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <img alt={t.name} className="w-10 h-10 rounded-full" src={t.img}/>
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface">{t.name}</p>
                  <p className="text-[10px] text-on-surface-variant">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Action Button */}
      <Link to="/register" className="fixed bottom-8 right-8 w-14 h-14 bg-tertiary-fixed text-on-tertiary-fixed rounded-full shadow-[0_10px_30px_rgba(199,243,0,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[100]">
        <span className="material-symbols-outlined font-bold">add</span>
      </Link>
    </MainLayout>
  );
};

export default Landing;
