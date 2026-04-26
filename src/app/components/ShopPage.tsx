import { motion } from 'motion/react';
import { useState } from 'react';
import { SlidersHorizontal, Heart, ShoppingCart, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ShopPageProps {
  onProductClick: (id: number) => void;
  onAddToCart: (product: any) => void;
}

const allProducts = [
  { id: 1, name: 'Premium Wireless Headphones', price: 299, category: 'Audio', rating: 4.8, image: 'https://images.unsplash.com/photo-1765279327575-bc9e453514dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 2, name: 'Luxury Smartwatch', price: 599, category: 'Watches', rating: 4.9, image: 'https://images.unsplash.com/photo-1749831754129-3a84b9fdeb87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 3, name: 'Minimalist Sneakers', price: 189, category: 'Footwear', rating: 4.7, image: 'https://images.unsplash.com/photo-1625860191460-10a66c7384fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 4, name: 'Modern Tech Backpack', price: 159, category: 'Accessories', rating: 4.6, image: 'https://images.unsplash.com/photo-1594299447935-e5b840f54b9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 5, name: 'Wireless Earbuds Pro', price: 249, category: 'Audio', rating: 4.8, image: 'https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 6, name: 'Classic Leather Watch', price: 449, category: 'Watches', rating: 4.9, image: 'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 7, name: 'Performance Running Shoes', price: 199, category: 'Footwear', rating: 4.7, image: 'https://images.unsplash.com/photo-1631984564919-1f6b2313a71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 8, name: 'Premium Tech Bag', price: 189, category: 'Accessories', rating: 4.8, image: 'https://images.unsplash.com/photo-1667411424961-a942201b77ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
];

export function ShopPage({ onProductClick, onAddToCart }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const categories = ['All', 'Audio', 'Watches', 'Footwear', 'Accessories'];

  const filteredProducts = allProducts
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl mb-4 tracking-tight">Shop All Products</h1>
        <p className="text-muted-foreground text-lg mb-12">Discover our complete collection</p>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-64 flex-shrink-0"
          >
            <div className="sticky top-32 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <SlidersHorizontal className="w-5 h-5" />
                  <h3>Filters</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Category</p>
                    <div className="space-y-2">
                      {categories.map(cat => (
                        <motion.button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          whileHover={{ x: 4 }}
                          className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                          }`}
                        >
                          {cat}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Price Range</p>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <p className="text-sm">Up to ${priceRange[1]}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Sort By</p>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-accent border-none"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProductCard({ product, index, onProductClick, onAddToCart }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-square mb-4 rounded-2xl overflow-hidden bg-accent">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        />

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg z-10"
        >
          <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
        </motion.button>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart({ ...product, selectedSize: 'M' });
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-4 left-4 right-4 bg-primary text-primary-foreground py-3 rounded-full flex items-center justify-center gap-2 shadow-xl"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Quick Add</span>
        </motion.button>
      </div>

      <div onClick={() => onProductClick(product.id)}>
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs">{product.rating}</span>
          </div>
        </div>
        <h3 className="mb-2">{product.name}</h3>
        <p className="text-lg">${product.price}</p>
      </div>
    </motion.div>
  );
}
