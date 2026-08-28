import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play, Youtube, ExternalLink, Sparkles, Film,
  Clock, MapPin, Award, CheckCircle2
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import LiquidGlassCard from './LiquidGlassCard';

export const CRAFT_VIDEOS = [
  {
    id: 'blue-pottery-jaipur',
    title: '????? ?? ???????? \'???? ?????\' ?? ???? ?? ?????? ?? ?????',
    englishTitle: 'Jaipur Blue Pottery: The 400-Year Persian-Rajput Quartz Craft',
    channel: 'BBC Hindi & Culturebox',
    language: '?????? (Hindi)',
    duration: '12:45',
    region: 'Jaipur, Rajasthan',
    category: 'Pottery & Ceramics',
    tag: 'GI Tag Heritage',
    thumbnail: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Jaipur+Blue+Pottery+making+in+Hindi',
    description: '????? ???? ???? ?????? ?? ????? ????????? ?????, ????????? ???? ?? ??????? ???? ????? ?? ????? ???? ?? ????????????? ????? ???? ??????'
  },
  {
    id: 'dhokra-bastar',
    title: '????? ????? ?????: 4000 ??? ?????? ?????-????? ???? ???',
    englishTitle: 'Bastar Dhokra: The 4,000-Year Ancient Lost-Wax Bronze Craft',
    channel: 'Shades of Rural India / Aditya Birla Kaarigari',
    language: '?????? (Hindi)',
    duration: '15:20',
    region: 'Bastar, Chhattisgarh',
    category: 'Tribal Metal Craft',
    tag: 'Ancient Bronze Age',
    thumbnail: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Bastar+Dhokra+art+making+in+Hindi',
    description: '????? ???? ?????? ?? ??????? ???? ?? ???? ?? ??, ????? ???? ????? ?? ??????? ?????? ???????? ?? ??? ?? ????? ?????????? ????? ????'
  },
  {
    id: 'banarasi-silk',
    title: '?????? ????? ?? ??????: ?????? ? ???? ???? ?? ?????',
    englishTitle: 'Banarasi Handloom Silk: Heritage Kadwa Weaving & Pure Zari',
    channel: 'Doordarshan Heritage Hindi',
    language: '?????? (Hindi)',
    duration: '18:10',
    region: 'Varanasi, Uttar Pradesh',
    category: 'Handloom & Textiles',
    tag: 'GI Protected Silk',
    thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Banarasi+Saree+weaving+documentary+hindi',
    description: '?? ?????? ????? ?? ????? ???? ??? 3 ?? 6 ????? ?? ??? ???? ??? ????? ???? ?? ??????? ?? ?????-??-????? ???????'
  },
  {
    id: 'channapatna-toys',
    title: '????????? ??????: 100% ????????? ????? ?? ????? ?? ???????',
    englishTitle: 'Channapatna Wooden Craft: Eco-Friendly Lacquer Toys',
    channel: 'Epic On India / The Better India Hindi',
    language: '?????? (Hindi)',
    duration: '10:35',
    region: 'Channapatna, Karnataka',
    category: 'Woodwork & Lacquer',
    tag: 'Zero Chemical Woodcraft',
    thumbnail: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Channapatna+wooden+toys+making+in+Hindi',
    description: '???? ??????? ?? ??? ?? ??? ? ??? ????? ????? ?? ?????-?????? ???? ????????? ????? ?? ??? ??????? ?? ?????? ???????'
  },
  {
    id: 'pashmina-kashmir',
    title: '???? ??????? ??????? ? ????? ???-????? ?? ?????',
    englishTitle: 'Kashmiri Pashmina & Sozni Needle Embroidery Masterclass',
    channel: 'Kashmir Craft Lineage',
    language: '?????? (Hindi)',
    duration: '14:05',
    region: 'Srinagar, Jammu & Kashmir',
    category: 'Handloom & Embroidery',
    tag: 'GI Certified Pashmina',
    thumbnail: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Kashmiri+Pashmina+making+process+in+Hindi',
    description: '?????? ?? ????????? ??????? ?? ???? ?? ?? ???? ??????? ?? ???? ????? ????? ?? ??????? ???????? ?? ?????'
  },
  {
    id: 'ai-digital-artisan',
    title: 'AI ?? ?????? ??????: ????? ?? ?????? ???????? ?? ?????????',
    englishTitle: 'AI & Digital India: Empowering Rural Artisans for Global Markets',
    channel: 'Digital India & Smart India Hackathon',
    language: '?????? (Hindi)',
    duration: '11:50',
    region: 'Pan-India ODOP Clusters',
    category: 'AI & Digital Empowerment',
    tag: 'SIH 2026 Vision',
    thumbnail: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Digital+India+artisan+empowerment+ODOP+Hindi',
    description: '????????? AI ????? ?? ?????? ???????????? ?? ???? ????????? ?? ???? ???? ???????? ?? ??????? ?? ?????? ?????'
  }
];

export default function CraftVideoShowcase() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Pottery & Ceramics', 'Tribal Metal Craft', 'Handloom & Textiles', 'Woodwork & Lacquer', 'AI & Digital Empowerment'];

  const filteredVideos = activeCategory === 'All'
    ? CRAFT_VIDEOS
    : CRAFT_VIDEOS.filter(v => v.category === activeCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 relative">
      {/* Header */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200 mb-2">
              <Youtube className="w-3.5 h-3.5 text-red-600 fill-red-600" />
              <span>?????? ???????? ?????????? ? Indian Craft Documentaries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 tracking-tight">
              Watch the Stories Behind India's Master Karigars
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-2xl mt-1 leading-relaxed">
              Explore authentic Hindi documentaries showcasing centuries-old crafting techniques, GI heritage traditions, and the AI digital empowerment revolution.
            </p>
          </div>

          <a
            href="https://www.youtube.com/results?search_query=Indian+artisan+craft+documentary+hindi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-stone-900 hover:bg-black text-white text-xs font-bold shadow-md hover:shadow-lg transition-all shrink-0"
          >
            <Youtube className="w-4 h-4 text-red-500 fill-red-500" />
            <span>Open Craft Documentaries</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>
        </div>
      </ScrollReveal>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={'px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ' + (
              activeCategory === cat
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white/80 hover:bg-stone-100 text-stone-600 border border-stone-200'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, idx) => (
          <ScrollReveal key={video.id} delay={idx * 0.08}>
            <LiquidGlassCard className="rounded-3xl overflow-hidden h-full flex flex-col group border border-stone-200/80">
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-stone-900">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-mono font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{video.duration}</span>
                </div>

                {/* Tag & Region */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 text-[10px] font-bold border border-emerald-700/50">
                    {video.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-stone-900/90 text-stone-300 text-[10px] font-medium flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-[#C85A27]" />
                    <span>{video.region.split(',')[0]}</span>
                  </span>
                </div>

                {/* Play Button Overlay */}
                <a
                  href={video.youtubeSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
                  title="Watch on YouTube in Hindi"
                >
                  <div className="w-12 h-12 rounded-full bg-red-600/95 text-white flex items-center justify-center shadow-2xl ring-4 ring-white/30 group-hover:bg-red-500 transition-colors">
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </div>
                </a>
              </div>

              {/* Video Info Content */}
              <div className="p-5 flex flex-col justify-between flex-grow space-y-3 bg-white/70">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-red-600 flex items-center gap-1">
                    <Youtube className="w-3 h-3 fill-red-600" />
                    <span>{video.channel} ? {video.language}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-stone-900 line-clamp-2 leading-snug group-hover:text-[#C85A27] transition-colors">
                    {video.title}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                {/* Bottom Direct Links */}
                <div className="pt-2 flex items-center justify-between border-t border-stone-100 text-xs">
                  <span className="text-[11px] text-stone-400 font-mono">
                    {video.category}
                  </span>

                  <a
                    href={video.youtubeSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-red-600 hover:text-red-700 hover:underline"
                  >
                    <span>Watch in Hindi</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </LiquidGlassCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
