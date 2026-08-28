import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Award, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-14 pb-8 border-t border-stone-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & SIH Badge */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2.5">
              <img
                src="/icon.png"
                alt="CraftLink Logo"
                className="h-10 w-auto object-contain bg-white/90 p-1 rounded-xl shadow-sm"
              />
              <div className="flex flex-col">
                <div className="text-xl font-extrabold font-serif flex items-center leading-none">
                  <span className="text-emerald-400">Craft</span>
                  <span className="text-amber-500">Link</span>
                  <span className="text-amber-400 text-xs ml-0.5 font-bold font-sans">✦</span>
                </div>
                <span className="text-[8px] uppercase tracking-widest text-stone-400 font-bold mt-1">
                  AI-POWERED MARKETPLACE
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Bridging India's heritage craft ecosystems to global markets using multimodal AI vision, storytelling copilot, and semantic intent search.
            </p>
            <div className="text-[10px] text-emerald-400/90 font-medium space-y-1">
              <div>🌱 Empowering Artisans</div>
              <div>✨ Intelligent Discovery</div>
              <div>🌐 Stronger Connections</div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-950/80 text-amber-400 border border-amber-800/50">
              <Award className="w-3.5 h-3.5" />
              <span>Smart India Hackathon (SIH) 2026</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link to="/marketplace" className="hover:text-amber-400 transition-colors">Explore Marketplace</Link></li>
              <li><Link to="/artisan/products/new" className="hover:text-amber-400 transition-colors">AI Catalogue Copilot</Link></li>
              <li><Link to="/artisan/dashboard" className="hover:text-amber-400 transition-colors">Artisan Studio</Link></li>
              <li><Link to="/login" className="hover:text-amber-400 transition-colors">Instant Demo Login</Link></li>
            </ul>
          </div>

          {/* Regional Heritage Clusters */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Heritage Crafts</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Jaipur Blue Pottery (Rajasthan)</li>
              <li>Kashmiri Pashmina & Sozni (J&K)</li>
              <li>Bastar Dhokra Lost-Wax (Chhattisgarh)</li>
              <li>Kutch Rogan Silk Art (Gujarat)</li>
              <li>Banarasi Handloom Zari (UP)</li>
              <li>Channapatna Lacquer Wood (Karnataka)</li>
            </ul>
          </div>

          {/* Impact & Values */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Artisan Impact</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero-typing catalogue creation for low digital literacy.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Direct market linkage without predatory middlemen.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Preserving cultural provenance & GI identities.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
          <p>© 2026 CraftLink. Built for Smart India Hackathon. Made with craft pride in India.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1">
            Honoring India's Karigars <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
