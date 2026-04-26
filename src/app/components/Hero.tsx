import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
}

export function Hero({ onShopClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-br from-background via-accent/20 to-background">
      <motion.div
        style={{ y, opacity, scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 text-muted-foreground tracking-widest uppercase text-sm"
          >
            New Collection 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl mb-6 tracking-tighter"
          >
            Elevate Your
            <br />
            <span className="italic">Everyday</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Discover our curated collection of premium products designed for those who appreciate quality and timeless style.
          </motion.p>

          <motion.button
            onClick={onShopClick}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05, gap: '1rem' }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}
