import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SearchModal } from './SearchModal';
import { UserMenu } from './UserMenu';

interface HeaderProps {
  onNavigate: (page: 'home' | 'shop' | 'collections' | 'about' | 'product' | 'checkout', productId?: number) => void;
  onProductClick?: (id: number) => void;
  cartCount: number;
  onCartClick: () => void;
  currentPage: string;
}

export function Header({ onNavigate, onProductClick, cartCount, onCartClick, currentPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mobileNavItems = [
    { key: 'home' as const, label: 'Home' },
    { key: 'shop' as const, label: 'Shop' },
    { key: 'collections' as const, label: 'Collections' },
    { key: 'about' as const, label: 'About' },
  ];

  const handleMobileNavigate = (page: 'home' | 'shop' | 'collections' | 'about') => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl tracking-tight"
          >
            LUXE
          </motion.button>

          <nav className="hidden md:flex items-center gap-8">
            <motion.button
              onClick={() => onNavigate('home')}
              whileHover={{ y: -2 }}
              className={`transition-colors ${currentPage === 'home' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Home
            </motion.button>
            <motion.button
              onClick={() => onNavigate('shop')}
              whileHover={{ y: -2 }}
              className={`transition-colors ${currentPage === 'shop' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Shop
            </motion.button>
            <motion.button
              onClick={() => onNavigate('collections')}
              whileHover={{ y: -2 }}
              className={`transition-colors ${currentPage === 'collections' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Collections
            </motion.button>
            <motion.button
              onClick={() => onNavigate('about')}
              whileHover={{ y: -2 }}
              className={`transition-colors ${currentPage === 'about' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              About
            </motion.button>
          </nav>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setIsSearchOpen(true)}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="hidden md:flex p-2 hover:bg-accent rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </motion.button>
            <div className="hidden md:block">
              <UserMenu onNavigate={onNavigate} />
            </div>
            <motion.button
              onClick={onCartClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 hover:bg-accent rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>
            <motion.button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 hover:bg-accent rounded-full transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-2">
              {mobileNavItems.map((item) => (
                <motion.button
                  key={item.key}
                  onClick={() => handleMobileNavigate(item.key)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    currentPage === item.key
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onProductClick={onProductClick}
      />
    </motion.header>
  );
}
