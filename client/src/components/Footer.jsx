import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-on-surface text-surface py-16 mt-section-gap">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-white">GoFit</span>
          <p className="text-surface-variant/70 font-body-md">Precision analytics for the modern high-performer. Experience the future of health.</p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined hover:text-tertiary-fixed cursor-pointer">public</span>
            <span className="material-symbols-outlined hover:text-tertiary-fixed cursor-pointer">share</span>
            <span className="material-symbols-outlined hover:text-tertiary-fixed cursor-pointer">mail</span>
          </div>
        </div>
        <div>
          <h4 className="font-label-caps text-label-caps text-white mb-6 uppercase">Product</h4>
          <ul className="space-y-3 text-surface-variant/70 font-body-md">
            <li><Link to="#" className="hover:text-tertiary-fixed transition-colors">Overview</Link></li>
            <li><Link to="#" className="hover:text-tertiary-fixed transition-colors">Features</Link></li>
            <li><Link to="#" className="hover:text-tertiary-fixed transition-colors">Integrations</Link></li>
            <li><Link to="#" className="hover:text-tertiary-fixed transition-colors">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-label-caps text-label-caps text-white mb-6 uppercase">Resources</h4>
          <ul className="space-y-3 text-surface-variant/70 font-body-md">
            <li><Link to="#" className="hover:text-tertiary-fixed transition-colors">Documentation</Link></li>
            <li><Link to="#" className="hover:text-tertiary-fixed transition-colors">API Reference</Link></li>
            <li><Link to="#" className="hover:text-tertiary-fixed transition-colors">Health Blog</Link></li>
            <li><Link to="#" className="hover:text-tertiary-fixed transition-colors">Community</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-label-caps text-label-caps text-white mb-6 uppercase">Newsletter</h4>
          <p className="text-surface-variant/70 font-body-md mb-4">Stay updated with our latest health insights.</p>
          <div className="flex gap-2">
            <input className="bg-surface/10 border border-white/20 rounded-full px-4 py-2 text-white w-full" placeholder="Email" type="email"/>
            <button className="bg-tertiary-fixed p-2 rounded-full text-on-tertiary-fixed">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter mt-16 pt-8 border-t border-white/10 flex justify-between items-center text-[12px] text-surface-variant/50 font-label-caps">
        <p>© {new Date().getFullYear()} GoFit Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="#" className="hover:text-white">Privacy Policy</Link>
          <Link to="#" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
