import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, Search, X } from 'lucide-react';
import { Product } from '../types';

interface ShopProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function Shop({ onProductClick, onAddToCart }: ShopProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Memories</h1>
            <p className="text-gray-500">Relive the moments with our exclusive collections.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto">
            {/* Search Bar */}
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    activeCategory === cat 
                      ? 'bg-black text-white border-black shadow-lg' 
                      : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                      onClick={() => onProductClick(product)}
                      className="p-4 bg-white rounded-full text-black hover:bg-purple-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-4 bg-white rounded-full text-black hover:bg-blue-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{product.name}</h3>
                    <span className="font-black text-purple-600">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
                  <button
                    onClick={() => onProductClick(product)}
                    className="w-full py-3 rounded-xl bg-gray-50 text-gray-900 font-bold text-sm hover:bg-black hover:text-white transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-400 font-medium">No memories found matching your search.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-4 text-purple-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
