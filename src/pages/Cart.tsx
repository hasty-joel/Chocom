import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  onShop: () => void;
}

export default function Cart({ items, onUpdateQuantity, onRemove, onCheckout, onShop }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag size={40} className="text-gray-300" />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Explore our latest collection.</p>
        <button
          onClick={onShop}
          className="px-10 py-4 bg-white text-purple-600 border border-purple-100 rounded-full font-bold hover:bg-purple-50 transition-colors shadow-lg shadow-purple-500/10"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-12">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-6 rounded-[2rem] flex flex-col sm:flex-row gap-6 shadow-sm border border-gray-100"
                >
                  <div className="w-full sm:w-32 aspect-square rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                        <p className="text-gray-500 text-sm uppercase tracking-widest font-medium mt-1">{item.category}</p>
                      </div>
                      <p className="text-xl font-black text-purple-600">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center gap-4 bg-gray-50 p-1 rounded-xl border border-gray-100">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-white rounded-lg transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-bold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-white rounded-lg transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-32">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-bold text-gray-900">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-purple-600 font-medium">Add ${(150 - subtotal).toFixed(2)} more for free shipping!</p>
                )}
                <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-900 uppercase tracking-widest">Total</span>
                  <span className="text-3xl font-black text-purple-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-5 bg-white text-purple-600 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all border border-purple-50"
              >
                Checkout <ArrowRight size={20} />
              </button>
              
              <p className="text-center text-gray-400 text-xs mt-6">Secure encrypted checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
