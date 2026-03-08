import React from 'react';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cartCount: number;
}

export default function Navbar({ currentPage, setCurrentPage, cartCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => setCurrentPage('home')}
          className="text-2xl font-black tracking-tighter text-black flex items-center gap-1 group"
        >
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">CHOCOM</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setCurrentPage(link.id)}
              className={cn(
                "text-[11px] font-bold transition-all hover:text-purple-600 uppercase tracking-[0.2em]",
                currentPage === link.id ? "text-purple-600" : "text-gray-500"
              )}
            >
              {link.id === 'shop' ? 'Memories' : link.name}
            </button>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentPage('admin')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          >
            <User size={20} />
          </button>
          <button 
            onClick={() => setCurrentPage('cart')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 relative"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "text-lg font-bold text-left uppercase tracking-widest",
                    currentPage === link.id ? "text-purple-600" : "text-gray-900"
                  )}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
