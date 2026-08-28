import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Sparkles, Eye, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ProductCard({ product, matchReasons = [] }) {
  const { t } = useLanguage();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 craft-card-shadow flex flex-col h-full">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={product.image_url}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Craft Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-stone-900 backdrop-blur-md shadow-sm border border-stone-100 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-terracotta" />
            {product.craft_type}
          </span>
        </div>

        {/* Price Tag if available */}
        {product.price > 0 && (
          <div className="absolute bottom-3 right-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-900/90 text-white backdrop-blur-md shadow">
              ?{Number(product.price).toLocaleString('en-IN')}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Region & Views */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
          <span className="flex items-center gap-1 font-medium text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
            <MapPin className="w-3 h-3 text-terracotta" />
            {product.region}, {product.state}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-stone-400">
            <Eye className="w-3 h-3" />
            {product.views || 0} views
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-terracotta transition-colors line-clamp-1 mb-2">
          <Link to={'/product/' + product.id}>{product.title}</Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4 flex-grow">
          {product.short_description || product.description}
        </p>

        {/* Match Reasons (if from semantic search) */}
        {matchReasons && matchReasons.length > 0 && (
          <div className="mb-3 p-2 bg-amber-50/80 rounded-lg border border-amber-200/60">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              {t('whyMatch')}
            </div>
            <ul className="text-[11px] text-amber-800 space-y-0.5 list-disc list-inside">
              {matchReasons.slice(0, 2).map((reason, idx) => (
                <li key={idx} className="line-clamp-1">{reason}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags & Action */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-1 max-w-[70%]">
            {product.tags && product.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="text-[10px] px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>

          <Link
            to={'/product/' + product.id}
            className="inline-flex items-center gap-1 text-xs font-bold text-terracotta hover:text-terracotta-dark group/link"
          >
            <span>{t('viewDetails')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
