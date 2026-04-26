import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CategoryHighlightsProps {
  onCategoryClick: () => void;
}

const categories = [
  {
    name: 'Audio',
    image: 'https://images.unsplash.com/photo-1763822085725-0b065668d7b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Premium sound experience',
  },
  {
    name: 'Watches',
    image: 'https://images.unsplash.com/photo-1741288070480-914dfbc642e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Timeless elegance',
  },
  {
    name: 'Footwear',
    image: 'https://images.unsplash.com/photo-1631984564919-1f6b2313a71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Step in style',
  },
];

export function CategoryHighlights({ onCategoryClick }: CategoryHighlightsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-24 px-6 bg-gradient-to-b from-background to-accent/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl mb-4 tracking-tight">Shop by Category</h2>
          <p className="text-muted-foreground text-lg">Explore our carefully curated collections</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              onClick={onCategoryClick}
              className="group cursor-pointer relative aspect-[4/5] rounded-3xl overflow-hidden bg-accent"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className="w-full h-full"
              >
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                className="absolute bottom-0 left-0 right-0 p-8 text-white"
              >
                <h3 className="text-3xl mb-2 text-white">{category.name}</h3>
                <p className="text-white/80 mb-4">{category.description}</p>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-wider"
                >
                  <span>Explore</span>
                  <span>→</span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
