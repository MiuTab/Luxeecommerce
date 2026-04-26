import { motion, AnimatePresence } from 'motion/react';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick?: (id: number) => void;
}

const trendingSearches = ['Wireless Headphones', 'Smartwatch', 'Sneakers', 'Tech Bag'];
const recentSearches = ['Premium Audio', 'Luxury Watch'];

const searchResults = [
  { id: 1, name: 'Premium Wireless Headphones', price: 299, category: 'Audio', image: 'https://images.unsplash.com/photo-1765279327575-bc9e453514dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 2, name: 'Luxury Smartwatch', price: 599, category: 'Watches', image: 'https://images.unsplash.com/photo-1749831754129-3a84b9fdeb87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 3, name: 'Minimalist Sneakers', price: 189, category: 'Footwear', image: 'https://images.unsplash.com/photo-1625860191460-10a66c7384fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 4, name: 'Modern Tech Backpack', price: 159, category: 'Accessories', image: 'https://images.unsplash.com/photo-1594299447935-e5b840f54b9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
];

export function SearchModal({ isOpen, onClose, onProductClick }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof searchResults>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchResults.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleProductClick = (id: number) => {
    onProductClick?.(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
          />

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-50 p-6"
          >
            <div className="max-w-3xl mx-auto bg-background rounded-3xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <Search className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="flex-1 bg-transparent outline-none text-lg placeholder:text-muted-foreground"
                  />
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full hover:bg-accent flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.length === 0 ? (
                  <div className="p-6 space-y-6">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm uppercase tracking-wider">Recent</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((term, index) => (
                            <motion.button
                              key={term}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => setQuery(term)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-accent hover:bg-accent/80 rounded-full text-sm transition-colors"
                            >
                              {term}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trending */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm uppercase tracking-wider">Trending</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((term, index) => (
                          <motion.button
                            key={term}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setQuery(term)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full text-sm transition-colors"
                          >
                            {term}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="p-6 space-y-3">
                    {results.map((product, index) => (
                      <motion.button
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleProductClick(product.id)}
                        whileHover={{ x: 4 }}
                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-accent transition-colors text-left"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-accent flex-shrink-0">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="truncate mb-1">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <p className="text-lg flex-shrink-0">${product.price}</p>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No results found for "{query}"</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
