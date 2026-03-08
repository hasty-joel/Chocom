import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 px-6 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-7xl font-black uppercase tracking-tighter mb-8">Get in Touch</h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Have a question about an order or just want to say hi? We'd love to hear from you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0">
                  <Instagram className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Instagram</h3>
                  <p className="text-gray-500">@choco_m_official</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0">
                  <Mail className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-500">hello@chocom.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-pink-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Studio</h3>
                  <p className="text-gray-500">123 Fashion Ave, New York, NY</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Name</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</label>
                  <input
                    type="email"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Subject</label>
                <input
                  type="text"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                <textarea
                  rows={6}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                />
              </div>
              <button className="w-full py-5 bg-black text-white rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-black/20 hover:bg-gray-800 transition-all">
                Send Message <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
