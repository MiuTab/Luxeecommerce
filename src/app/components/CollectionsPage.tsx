import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CollectionsPageProps {
  onProductClick: (id: number) => void;
  onAddToCart: (product: any) => void;
  onViewCollection: (category: string) => void;
}

const collections = [
  {
    id: 'tech-essentials',
    name: 'Tech Essentials',
    category: 'Audio',
    description: 'Curated technology for the modern professional',
    tagline: 'Stay Connected',
    hero: 'https://images.unsplash.com/photo-1765279327575-bc9e453514dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    products: [
      { id: 1, name: 'Premium Wireless Headphones', price: 299, image: 'https://images.unsplash.com/photo-1763822085725-0b065668d7b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { id: 5, name: 'Wireless Earbuds Pro', price: 249, image: 'https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { id: 8, name: 'Premium Tech Bag', price: 189, image: 'https://images.unsplash.com/photo-1667411424961-a942201b77ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    ],
  },
  {
    id: 'timepiece-collection',
    name: 'Timepiece Collection',
    category: 'Watches',
    description: 'Elegant watches that define sophistication',
    tagline: 'Timeless Elegance',
    hero: 'https://images.unsplash.com/photo-1749831754129-3a84b9fdeb87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    products: [
      { id: 2, name: 'Luxury Smartwatch', price: 599, image: 'https://images.unsplash.com/photo-1741288070480-914dfbc642e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { id: 6, name: 'Classic Leather Watch', price: 449, image: 'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    ],
  },
  {
    id: 'athletic-performance',
    name: 'Athletic Performance',
    category: 'Footwear',
    description: 'Premium footwear engineered for excellence',
    tagline: 'Move Forward',
    hero: 'https://images.unsplash.com/photo-1625860191460-10a66c7384fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    products: [
      { id: 3, name: 'Minimalist Sneakers', price: 189, image: 'https://images.unsplash.com/photo-1631984564919-1f6b2313a71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { id: 7, name: 'Performance Running Shoes', price: 199, image: 'https://images.unsplash.com/photo-1631984564919-1f6b2313a71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    ],
  },
];

export function CollectionsPage({ onProductClick, onAddToCart, onViewCollection }: CollectionsPageProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <div className="min-h-screen pt-24">
      <div ref={headerRef} className="relative h-[60vh] overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

        <div className="relative z-10 text-center px-6 max-w-4xl text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 uppercase tracking-widest text-sm opacity-80"
          >
            Curated Collections
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl mb-6 tracking-tighter text-primary-foreground"
          >
            Discover Your Style
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl opacity-90 max-w-2xl mx-auto"
          >
            Explore our handpicked collections, each telling a unique story of quality, craftsmanship, and modern design.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        {collections.map((collection, index) => (
          <CollectionSection
            key={collection.id}
            collection={collection}
            index={index}
            onProductClick={onProductClick}
            onAddToCart={onAddToCart}
            onViewCollection={onViewCollection}
          />
        ))}
      </div>
    </div>
  );
}

function CollectionSection({ collection, index, onProductClick, onAddToCart, onViewCollection }: any) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isReversed = index % 2 === 1;

  return (
    <div ref={sectionRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:grid-flow-dense' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className={isReversed ? 'lg:col-start-2' : ''}
      >
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-accent group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={collection.hero}
              alt={collection.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}
      >
        <div className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">
          {collection.tagline}
        </div>
        <h2 className="text-4xl md:text-5xl mb-6 tracking-tight">{collection.name}</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          {collection.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {collection.products.map((product: any, idx: number) => (
            <CollectionProductCard
              key={product.id}
              product={product}
              index={idx}
              isInView={isInView}
              onProductClick={onProductClick}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        <motion.button
          onClick={() => onViewCollection(collection.category)}
          whileHover={{ scale: 1.05, gap: '1rem' }}
          whileTap={{ scale: 0.95 }}
          className="group inline-flex items-center gap-3 text-primary"
        >
          <span>View Full Collection</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </div>
  );
}

function CollectionProductCard({ product, index, isInView, onProductClick, onAddToCart }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onProductClick(product.id)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-square mb-3 rounded-xl overflow-hidden bg-accent">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
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
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        />

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart({ ...product, selectedSize: 'M' });
          }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
        >
          <ShoppingCart className="w-4 h-4 text-foreground" />
        </motion.button>
      </div>

      <div>
        <h4 className="text-sm mb-1 truncate">{product.name}</h4>
        <p className="text-sm">${product.price}</p>
      </div>
    </motion.div>
  );
}
