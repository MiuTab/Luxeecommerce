import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Scene 1: 0-0.25 progress
  const scene1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const scene1Scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.8]);

  // Scene 2: 0.25-0.5 progress
  const scene2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const scene2X = useTransform(scrollYProgress, [0.25, 0.35], [100, 0]);

  // Scene 3: 0.5-0.75 progress
  const scene3Opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
  const scene3Y = useTransform(scrollYProgress, [0.5, 0.6], [100, 0]);
  const scene3Scale = useTransform(scrollYProgress, [0.5, 0.6], [0.8, 1]);

  // Scene 4: 0.75-1 progress
  const scene4Opacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);
  const scene4Rotate = useTransform(scrollYProgress, [0.75, 0.85], [-10, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky container que mantiene el contenido fijo mientras se hace scroll */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Scene 1: Hero introduction */}
        <motion.div
          style={{ opacity: scene1Opacity, scale: scene1Scale }}
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-primary/80"
        >
          <div className="text-center px-6 max-w-4xl text-primary-foreground">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6 text-sm uppercase tracking-widest opacity-80"
            >
              Scroll to Explore
            </motion.div>
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl mb-6 tracking-tighter text-primary-foreground"
            >
              The Art of
              <br />
              <span className="italic">Perfection</span>
            </motion.h2>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl opacity-90"
            >
              Every detail matters. Every moment counts.
            </motion.p>
          </div>
        </motion.div>

        {/* Scene 2: Product showcase with horizontal reveal */}
        <motion.div
          style={{ opacity: scene2Opacity }}
          className="absolute inset-0 flex items-center justify-center bg-background"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl px-6 items-center">
            <motion.div
              style={{ x: scene2X }}
              className="order-2 md:order-1"
            >
              <div className="aspect-square rounded-3xl overflow-hidden bg-accent">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1765279327575-bc9e453514dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Premium Product"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              style={{ x: useTransform(scrollYProgress, [0.25, 0.35], [-100, 0]) }}
              className="order-1 md:order-2"
            >
              <h3 className="text-5xl mb-6 tracking-tight">Crafted for Excellence</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Each product in our collection represents countless hours of design, engineering, and refinement.
              </p>
              <div className="space-y-3">
                {['Premium Materials', 'Expert Craftsmanship', 'Timeless Design'].map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scene 3: Multiple products with scale animation */}
        <motion.div
          style={{ opacity: scene3Opacity }}
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-accent/30 to-background"
        >
          <div className="max-w-7xl px-6 w-full">
            <motion.h3
              style={{ y: scene3Y }}
              className="text-5xl mb-12 text-center tracking-tight"
            >
              A World of Possibilities
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  image: 'https://images.unsplash.com/photo-1749831754129-3a84b9fdeb87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                  title: 'Timepieces',
                  desc: 'Precision meets elegance',
                },
                {
                  image: 'https://images.unsplash.com/photo-1625860191460-10a66c7384fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                  title: 'Footwear',
                  desc: 'Style in every step',
                },
                {
                  image: 'https://images.unsplash.com/photo-1763822085725-0b065668d7b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                  title: 'Audio',
                  desc: 'Sound perfected',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  style={{
                    scale: scene3Scale,
                    opacity: useTransform(scrollYProgress, [0.5 + i * 0.05, 0.55 + i * 0.05], [0, 1]),
                  }}
                  className="group"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden bg-accent mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full"
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                  <h4 className="text-2xl mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scene 4: Final message with rotation */}
        <motion.div
          style={{ opacity: scene4Opacity, rotate: scene4Rotate }}
          className="absolute inset-0 flex items-center justify-center bg-primary text-primary-foreground"
        >
          <div className="text-center px-6 max-w-4xl">
            <motion.div
              style={{ scale: useTransform(scrollYProgress, [0.75, 0.85], [0.8, 1]) }}
            >
              <h3 className="text-6xl md:text-7xl mb-8 tracking-tight text-primary-foreground">
                Your Journey
                <br />
                <span className="italic">Starts Here</span>
              </h3>
              <p className="text-xl mb-12 opacity-90">
                Discover products that inspire, empower, and elevate your everyday life.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-foreground text-primary px-10 py-5 rounded-full text-lg hover:shadow-2xl transition-shadow"
              >
                Explore Collection
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-16 bg-border rounded-full overflow-hidden">
              <motion.div
                style={{ scaleY: scrollYProgress }}
                className="w-full h-full bg-primary origin-top"
              />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Scroll</p>
          </div>
        </div>
      </div>
    </div>
  );
}
