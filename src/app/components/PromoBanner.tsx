import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef } from 'react';
import { Sparkles } from 'lucide-react';

export function PromoBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section ref={containerRef} className="relative py-24 px-6 overflow-hidden">
      <motion.div
        style={{ x, rotate }}
        className="max-w-6xl mx-auto relative"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-16 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

          <div className="relative z-10 text-center text-primary-foreground">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm uppercase tracking-wider">Limited Time Offer</span>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl mb-6 tracking-tight text-primary-foreground"
            >
              Get 20% Off Your First Order
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-xl mb-8 text-primary-foreground/80 max-w-2xl mx-auto"
            >
              Join our community and enjoy exclusive access to new arrivals, special promotions, and insider updates.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 rounded-full w-full sm:w-80 bg-white/10 backdrop-blur-sm border border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary-foreground text-primary rounded-full whitespace-nowrap hover:shadow-xl transition-shadow"
              >
                Subscribe Now
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
