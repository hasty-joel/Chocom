import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, Star, TrendingUp } from 'lucide-react';

export default function Home({ onShopNow }: { onShopNow: () => void }) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#FDFBF7]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/20 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-[0.3em] text-slate-700 uppercase mb-12">
              Modern Street Fashion
            </h1>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onShopNow}
              className="px-12 py-5 bg-white text-purple-600 rounded-full font-bold text-lg flex items-center gap-3 mx-auto shadow-[0_15px_30px_-5px_rgba(147,51,234,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(147,51,234,0.5)] transition-all duration-300"
            >
              Explore Memories <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>

        {/* Enhanced Background Blobs */}
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-purple-400/30 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-200/10 blur-[180px] rounded-full" />

        {/* Floating Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 hidden lg:block p-4 bg-white/50 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl"
        >
          <Zap className="text-blue-500" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 hidden lg:block p-4 bg-white/50 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl"
        >
          <Star className="text-purple-500" />
        </motion.div>
      </section>

      {/* Featured Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter">Featured Collection</h2>
              <p className="text-gray-500 mt-2">Handpicked styles for the season</p>
            </div>
            <TrendingUp className="text-purple-600" size={32} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-gray-100"
              >
                <img
                  src={`https://picsum.photos/seed/fashion${i}/800/1200`}
                  alt="Featured"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <h3 className="text-white text-2xl font-bold">Street Style {i}</h3>
                  <button onClick={onShopNow} className="text-white/80 text-sm font-medium mt-2 flex items-center gap-2 hover:text-white transition-colors">
                    Explore <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter">Join the Movement</h2>
          <p className="text-gray-600 mb-10 text-lg">Subscribe to get early access to drops and exclusive content.</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-8 py-4 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <button className="px-10 py-4 bg-white text-purple-600 border border-purple-100 rounded-full font-bold hover:bg-purple-50 transition-colors shadow-lg shadow-purple-500/10">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
