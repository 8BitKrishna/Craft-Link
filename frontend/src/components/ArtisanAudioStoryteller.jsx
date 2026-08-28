import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Sparkles, Mic, Globe, CheckCircle2, RotateCcw } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export const AUDIO_STORIES = [
  {
    id: 'story-blue-pottery',
    craftName: 'Jaipur Blue Pottery',
    artisanName: 'Ramesh Kumawat',
    region: 'Kot Jewar, Rajasthan',
    language: 'हिन्दी (Hindi)',
    duration: '0:48',
    audioTextHindi: 'राम-राम सा! मैं रमेश कुमावत, जयपुर के कोट जेवर गाँव से। हमारी यह नीली मिट्टी की कला 400 साल पुरानी है। इसमें सामान्य चिकनी मिट्टी नहीं, बल्कि क्वार्ट्ज पत्थर, प्राकृतिक गोंद और साजी का उपयोग होता है। हर फूल-पत्ती को हम हाथ से प्राकृतिक रंगों से सजाते हैं।',
    audioTextEnglish: 'Greetings! I am Ramesh Kumawat from Kot Jewar village, Jaipur. Our blue pottery craft is over 400 years old. Instead of regular clay, we use powdered quartz, natural tree gum, and natural minerals. Every peacock and floral motif is painted entirely by hand.',
    waveform: [35, 60, 45, 80, 95, 60, 40, 85, 90, 75, 45, 60, 90, 100, 70, 50, 85, 60, 40, 70, 85, 95, 60, 45, 30]
  },
  {
    id: 'story-dhokra',
    craftName: 'Bastar Dhokra Lost-Wax',
    artisanName: 'Sukhlal Baghel',
    region: 'Kondagaon, Bastar',
    language: 'हिन्दी (Hindi)',
    duration: '0:55',
    audioTextHindi: 'जोहार! मैं सुखलाल बघेल, बस्तर छत्तीसगढ़ से। हमारी ढोकरा धातु कला मोहन जोदड़ो की कांस्य नृत्यांगना जितनी प्राचीन है। साल के जंगलों से मधुमक्खी का मोम लाकर पहले सांचा बनाते हैं, फिर मिट्टी की तीन परतें चढ़ाकर पिघले पीतल से ढालते हैं।',
    audioTextEnglish: 'Johar! I am Sukhlal Baghel from Bastar, Chhattisgarh. Our Dhokra craft dates back 4,000 years to the Indus Valley dancing girl. We harvest natural beeswax from Sal forests to sculpt the initial wax model, coat it in sacred river clay, and cast in melted brass.',
    waveform: [40, 75, 90, 65, 50, 85, 100, 70, 45, 80, 95, 60, 40, 75, 90, 85, 50, 65, 80, 95, 70, 50, 40, 30, 20]
  },
  {
    id: 'story-banarasi',
    craftName: 'Banarasi Kadwa Silk',
    artisanName: 'Master Ansari',
    region: 'Chowk, Varanasi',
    language: 'हिन्दी (Hindi)',
    duration: '0:52',
    audioTextHindi: 'अस्सलाम वालेकुम। बनारस की कढ़वा बुनाई में हर ज़री का बूटा अलग-अलग सुइयों से हाथों से गूँथा जाता है। एक शाही साड़ी को पूरा होने में 3 से 4 महीने लगते हैं। यह सिर्फ कपड़ा नहीं, गंगा-जमुनी तहज़ीब और पुरखों की नेमत है।',
    audioTextEnglish: 'Greetings. In Banarasi Kadwa weaving, each gold zari motif is individually woven with micro-needles by hand. A single bridal saree takes 3 to 4 months of patient dedication on pit looms. It is living poetry of Indian handloom.',
    waveform: [30, 50, 70, 85, 95, 60, 45, 80, 100, 75, 60, 85, 90, 65, 45, 70, 85, 95, 60, 45, 55, 75, 60, 40, 25]
  }
];

export default function ArtisanAudioStoryteller() {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [langTab, setLangTab] = useState('hi'); // 'hi' or 'en'
  const [isMuted, setIsMuted] = useState(false);

  const activeStory = AUDIO_STORIES[activeStoryIdx];

  // Simulated playback timer
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    // Web Speech API Voice synthesis for authentic immersive audio demonstration
    if (!isPlaying && 'speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();
      const textToSpeak = langTab === 'hi' ? activeStory.audioTextHindi : activeStory.audioTextEnglish;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.lang = langTab === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
      };
      window.speechSynthesis.speak(utterance);
    } else if (isPlaying && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  };

  const handleSelectStory = (idx) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setActiveStoryIdx(idx);
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <ScrollReveal>
        <div className="bg-gradient-to-br from-stone-900 via-[#131B2A] to-[#0A120E] rounded-3xl p-6 sm:p-10 border border-amber-500/20 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info & Story Selection */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                <Mic className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>कारीगर की अपनी आवाज़ • Master Karigar Audio Lineage</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-luxury font-extrabold text-white leading-tight">
                Listen to the Living Soul of Indian Craftsmanship
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Experience raw audio voice notes recorded directly in village workshops across India, narrated in authentic native dialects with real-time AI bilingual transcripts.
              </p>

              {/* Story Pills */}
              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Select Artisan Lineage:
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  {AUDIO_STORIES.map((story, idx) => (
                    <button
                      key={story.id}
                      type="button"
                      onClick={() => handleSelectStory(idx)}
                      className={`text-left px-3.5 py-2 rounded-xl text-xs transition-all border ${
                        activeStoryIdx === idx
                          ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md scale-[1.02]'
                          : 'bg-white/5 hover:bg-white/10 text-stone-300 border-white/10'
                      }`}
                    >
                      <div className="font-serif">{story.craftName}</div>
                      <div className="text-[10px] opacity-80">{story.artisanName}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Audio Player & Transcript */}
            <div className="lg:col-span-7 bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-6">
              {/* Player Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="text-base sm:text-lg font-bold font-serif text-amber-300">
                    {activeStory.artisanName}
                  </div>
                  <div className="text-xs text-stone-400 font-sans">
                    {activeStory.craftName} • {activeStory.region}
                  </div>
                </div>

                {/* Language Transcript Toggle */}
                <div className="flex items-center bg-stone-900 rounded-lg p-1 border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => setLangTab('hi')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                      langTab === 'hi' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    हिन्दी
                  </button>
                  <button
                    type="button"
                    onClick={() => setLangTab('en')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                      langTab === 'en' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Dynamic Animated Waveform */}
              <div className="flex items-end justify-between gap-1.5 h-16 px-2 py-2 bg-stone-950/60 rounded-xl border border-white/5 overflow-hidden">
                {activeStory.waveform.map((height, i) => {
                  const isPassed = (i / activeStory.waveform.length) * 100 <= progress;
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        height: isPlaying ? [height * 0.4 + '%', height + '%', height * 0.6 + '%'] : height + '%'
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 0.5 + (i % 5) * 0.1,
                        ease: 'easeInOut'
                      }}
                      className={`w-full rounded-full transition-colors ${
                        isPassed ? 'bg-amber-400 shadow-sm shadow-amber-400/50' : 'bg-stone-700'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Spoken Transcript Box */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-xs sm:text-sm leading-relaxed text-stone-200 font-sans italic relative">
                <span className="text-amber-400 font-bold not-italic mr-1.5">“</span>
                {langTab === 'hi' ? activeStory.audioTextHindi : activeStory.audioTextEnglish}
                <span className="text-amber-400 font-bold not-italic ml-1.5">”</span>
              </div>

              {/* Playback Controls Bar */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold flex items-center justify-center shadow-lg hover:scale-105 transition-all"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-stone-950" /> : <Play className="w-5 h-5 ml-0.5 fill-stone-950" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                      setIsPlaying(false);
                      setProgress(0);
                    }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                    title="Restart Audio"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                  <span className="text-amber-400 font-bold">
                    {Math.floor((progress / 100) * 48)}s
                  </span>
                  <span>/</span>
                  <span>{activeStory.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
