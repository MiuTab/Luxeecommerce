import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeaturedProductsProps {
  onProductClick: (id: number) => void;
  onAddToCart: (product: any) => void;
}

const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 299,
    image: 'https://images.unsplash.com/photo-1765279327575-bc9e453514dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'Audio',
  },
  {
    id: 2,
    name: 'Luxury Smartwatch',
    price: 599,
    image: 'https://images.unsplash.com/photo-1749831754129-3a84b9fdeb87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'Watches',
  },
  {
    id: 3,
    name: 'Minimalist Sneakers',
    price: 189,
    image: 'https://images.unsplash.com/photo-1625860191460-10a66c7384fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'Footwear',
  },
  {
    id: 4,
    name: 'Modern Tech Backpack',
    price: 159,
    image: 'https://images.unsplash.com/photo-1594299447935-e5b840f54b9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'Accessories',
  },
];

export function FeaturedProducts({ onProductClick, onAddToCart }: FeaturedProductsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl mb-4 tracking-tight">Featured Products</h2>
        <p className="text-muted-foreground text-lg">Handpicked essentials for the modern lifestyle</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            isInView={isInView}
            onProductClick={onProductClick}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, index, isInView, onProductClick, onAddToCart }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onProductClick(product.id)}
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
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
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

      <div>
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{product.category}</p>
        <h3 className="mb-2">{product.name}</h3>
        <p className="text-lg">${product.price}</p>
      </div>
    </motion.div>
  );
}
