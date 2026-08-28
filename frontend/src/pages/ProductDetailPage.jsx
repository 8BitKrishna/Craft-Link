import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productApi, recommendationApi } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';
import { Sparkles, MapPin, ShieldCheck, MessageSquare, ArrowLeft, Eye, Award, User, Layers, Palette } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ContactArtisanModal from '../components/ContactArtisanModal';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { t } = useLanguage();

  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    productApi.getProduct(id)
      .then(res => {
        setProduct(res.data);
        return recommendationApi.getRecommendations(id);
      })
      .then(recRes => {
        setRecommendations(recRes.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-stone-400">
        <div className="animate-spin w-8 h-8 border-4 border-terracotta border-t-transparent rounded-full mx-auto mb-3" />
        <span className="text-xs font-semibold">Loading craft masterpiece...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold font-serif text-stone-900 mb-2">Product Not Found</h2>
        <Link to="/marketplace" className="text-xs text-terracotta hover:underline font-bold">
          ? Return to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <div>
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-terracotta transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-md">
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-100 relative group">
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-stone-900 backdrop-blur-md shadow-sm border border-stone-100 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                {product.craft_type}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/60 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-terracotta shrink-0" />
              <span>{t('verifiedHandmade')}</span>
            </div>
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-white px-2 py-0.5 rounded shadow-xs">
              AI Digitized
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1 font-bold text-terracotta bg-orange-50 px-2.5 py-1 rounded-lg">
                <MapPin className="w-3.5 h-3.5" />
                {product.region}, {product.state}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-stone-400">
                <Eye className="w-3.5 h-3.5" />
                {product.views || 0} views
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-stone-600">
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px]">
                <User className="w-3.5 h-3.5" />
              </div>
              <span>Crafted by <strong className="text-stone-900">{product.artisan_name}</strong></span>
            </div>

            {product.price > 0 && (
              <div className="pt-2">
                <span className="text-3xl font-extrabold text-stone-900">
                  ?{Number(product.price).toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-400 ml-2 font-medium">(Direct Artisan Price)</span>
              </div>
            )}

            <div className="pt-2 text-xs sm:text-sm text-stone-600 leading-relaxed space-y-2">
              <p>{product.description}</p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <div className="flex items-center gap-1.5 text-stone-400 font-bold uppercase text-[10px] mb-1">
                  <Layers className="w-3 h-3 text-terracotta" />
                  <span>Material</span>
                </div>
                <div className="font-semibold text-stone-900">{product.material}</div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <div className="flex items-center gap-1.5 text-stone-400 font-bold uppercase text-[10px] mb-1">
                  <Palette className="w-3 h-3 text-terracotta" />
                  <span>Colors</span>
                </div>
                <div className="font-semibold text-stone-900">
                  {product.colors && product.colors.length > 0 ? product.colors.join(', ') : 'Natural Tones'}
                </div>
              </div>
            </div>

            {product.buyer_segments && product.buyer_segments.length > 0 && (
              <div className="pt-2">
                <div className="text-[11px] font-bold uppercase text-stone-400 tracking-wider mb-1.5">
                  {t('potentialBuyers')}:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.buyer_segments.map((seg, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-xs bg-amber-50 text-amber-900 font-medium border border-amber-200/50">
                      {seg}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setContactModalOpen(true)}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-terracotta to-amber-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('contactArtisan')}</span>
            </button>
          </div>
        </div>
      </div>

      {product.craft_story && (
        <section className="bg-gradient-to-br from-amber-50/70 via-stone-50 to-orange-50/50 rounded-3xl p-6 sm:p-10 border border-amber-200/60 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-terracotta text-white flex items-center justify-center shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif text-stone-900">
                {t('craftProvenance')}
              </h2>
              <p className="text-xs text-stone-500">Cultural & Geographical Heritage of {product.craft_type}</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-4xl">
            {product.craft_story}
          </p>
        </section>
      )}

      {recommendations.length > 0 && (
        <section className="space-y-6 pt-4">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-bold text-terracotta mb-1">
              Curated Recommendations
            </h2>
            <p className="text-2xl font-bold font-serif text-stone-900">
              {t('youMayAlsoLike')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((rec) => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </section>
      )}

      <ContactArtisanModal
        product={product}
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
