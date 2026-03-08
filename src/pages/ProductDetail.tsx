import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowLeft, Plus, Minus, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState('M');
  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-12 transition-colors font-medium"
        >
          <ArrowLeft size={20} /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-gray-50 shadow-2xl"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold">
              <Star size={16} className="text-yellow-500 fill-yellow-500" /> 4.9 (128 reviews)
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <span className="text-purple-600 font-bold tracking-widest uppercase text-sm mb-4">{product.category}</span>
            <h1 className="text-6xl font-black tracking-tighter mb-6 uppercase leading-none">{product.name}</h1>
            <p className="text-4xl font-black text-gray-900 mb-8">${product.price.toFixed(2)}</p>
            
            <div className="prose prose-lg text-gray-600 mb-10">
              <p>{product.description}</p>
            </div>

            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-900">Select Size</h3>
              <div className="flex gap-4">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold transition-all border-2 ${
                      selectedSize === size 
                        ? 'bg-black text-white border-black shadow-xl shadow-black/20' 
                        : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 py-5 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-purple-500/20 hover:shadow-blue-500/40 transition-all"
              >
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button className="px-8 py-5 border-2 border-gray-100 rounded-full font-bold hover:border-gray-300 transition-all">
                Wishlist
              </button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-gray-100 pt-12">
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Free Shipping</h4>
                <p className="text-gray-500 text-sm">On orders over $150</p>
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Easy Returns</h4>
                <p className="text-gray-500 text-sm">30-day return policy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
