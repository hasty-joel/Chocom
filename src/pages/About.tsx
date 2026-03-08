import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200"
              alt="About CHOCO M"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-tr from-blue-600/20 to-purple-600/20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-7xl font-black uppercase tracking-tighter mb-8 leading-none">
              Bold <br /> Expression.
            </h1>
            <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
              <p className="font-bold text-black">
                “CHOCOM represents modern youth fashion and creativity. Built for confidence, street culture, and bold expression.”
              </p>
              <p>
                Founded in 2024, CHOCOM was born from the desire to merge high-fashion aesthetics with raw street culture. We believe that what you wear is a direct reflection of your inner creative spirit.
              </p>
              <p>
                Every piece in our collection is meticulously designed to provide not just style, but a sense of belonging to a global community of innovators, dreamers, and rule-breakers.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-gray-100 pt-12">
              <div>
                <h4 className="text-3xl font-black text-purple-600">50k+</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Community</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-blue-600">12</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Countries</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-pink-600">100%</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Original</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
