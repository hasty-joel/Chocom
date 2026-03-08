import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { useCart } from './hooks/useCart';
import { Product } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { cart, addToCart, removeFromCart, updateQuantity, total } = useCart();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // Optional: Show a toast or feedback
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onShopNow={() => setCurrentPage('shop')} />;
      case 'shop':
        return <Shop onProductClick={handleProductClick} onAddToCart={handleAddToCart} />;
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setCurrentPage('shop')} 
            onAddToCart={handleAddToCart} 
          />
        ) : <Shop onProductClick={handleProductClick} onAddToCart={handleAddToCart} />;
      case 'cart':
        return (
          <Cart 
            items={cart} 
            onUpdateQuantity={updateQuantity} 
            onRemove={removeFromCart} 
            onCheckout={() => alert('Checkout functionality would go here!')}
            onShop={() => setCurrentPage('shop')}
          />
        );
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return <Admin />;
      default:
        return <Home onShopNow={() => setCurrentPage('shop')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans selection:bg-purple-200 selection:text-purple-900">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={(page) => {
          setCurrentPage(page);
          window.scrollTo(0, 0);
        }} 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
      />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-black text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-black tracking-tighter mb-6 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">CHOCOM</h2>
            <p className="text-gray-400 max-w-sm mb-8">
              Redefining street fashion for the modern era. Quality, expression, and culture in every stitch.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'TikTok'].map(social => (
                <a key={social} href="#" className="text-sm font-bold uppercase tracking-widest hover:text-purple-400 transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Memories</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => setCurrentPage('shop')} className="hover:text-purple-400 transition-colors">New Arrivals</button></li>
              <li><button onClick={() => setCurrentPage('shop')} className="hover:text-purple-400 transition-colors">Best Sellers</button></li>
              <li><button onClick={() => setCurrentPage('shop')} className="hover:text-purple-400 transition-colors">Collections</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-purple-400 transition-colors">Contact Us</button></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-widest">
          <p>© 2024 CHOCOM. All rights reserved.</p>
          <p>Designed for the bold.</p>
        </div>
      </footer>
    </div>
  );
}
