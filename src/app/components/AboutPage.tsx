import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef } from 'react';
import { Award, Heart, Shield, Sparkles, Users, Globe } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description: 'Every product is meticulously selected and tested to meet our exacting standards of excellence.',
  },
  {
    icon: Heart,
    title: 'Customer Obsessed',
    description: 'Your satisfaction drives everything we do. We\'re here to create experiences that delight.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Transparency and honesty in every interaction. We build trust through our actions.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'Constantly evolving to bring you the latest in design, technology, and lifestyle trends.',
  },
  {
    icon: Globe,
    title: 'Sustainability',
    description: 'Committed to responsible practices that protect our planet for future generations.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a global family of individuals who appreciate quality and authentic living.',
  },
];

const stats = [
  { number: '50K+', label: 'Happy Customers' },
  { number: '200+', label: 'Premium Products' },
  { number: '98%', label: 'Satisfaction Rate' },
  { number: '24/7', label: 'Customer Support' },
];

const timeline = [
  { year: '2020', title: 'The Beginning', description: 'LUXE was founded with a vision to curate the finest products for modern living.' },
  { year: '2021', title: 'Global Expansion', description: 'Expanded our reach to serve customers in over 50 countries worldwide.' },
  { year: '2023', title: 'Sustainability Initiative', description: 'Launched our commitment to eco-friendly packaging and carbon-neutral shipping.' },
  { year: '2026', title: 'Innovation Hub', description: 'Opened our design studio to collaborate with emerging creators and artisans.' },
];

export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      <div ref={heroRef} className="relative h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-background via-accent/30 to-background">
        <motion.div
          style={{ y, opacity }}
          className="text-center px-6 max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 text-muted-foreground tracking-widest uppercase text-sm"
          >
            About LUXE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl mb-8 tracking-tighter"
          >
            Crafting Experiences,
            <br />
            <span className="italic">Not Just Products</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            We believe that the objects you choose to surround yourself with should inspire, empower, and bring joy to your everyday life. This is our story.
          </motion.p>
        </motion.div>
      </div>

      <StatsSection />
      <StorySection />
      <ValuesSection />
      <TimelineSection />
      <ClosingSection />
    </div>
  );
}

function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: 'spring', damping: 15, delay: index * 0.1 + 0.2 }}
                className="text-5xl md:text-6xl mb-3 text-primary-foreground"
              >
                {stat.number}
              </motion.div>
              <p className="text-primary-foreground/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl mb-6 tracking-tight">Our Story</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 text-lg text-muted-foreground leading-relaxed"
        >
          <p>
            LUXE began in 2020 with a simple observation: in a world of mass production and disposable culture, people were craving authenticity, quality, and meaning in their purchases.
          </p>
          <p>
            We set out to create more than just an online store. We envisioned a carefully curated destination where every product tells a story, where craftsmanship meets innovation, and where the pursuit of quality is never compromised.
          </p>
          <p>
            Today, we work with artisans, designers, and brands from around the world who share our values. Each item in our collection is chosen not just for its aesthetic appeal, but for the thought, care, and expertise that went into creating it.
          </p>
          <p className="text-foreground italic text-xl">
            "We don't just sell products. We curate experiences that enrich lives."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-gradient-to-b from-background to-accent/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl mb-6 tracking-tight">Our Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These principles guide every decision we make and every relationship we build.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6"
                >
                  <Icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-2xl mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl mb-6 tracking-tight">Our Journey</h2>
          <p className="text-lg text-muted-foreground">
            Key milestones that shaped who we are today
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative mb-16 md:mb-24 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'} md:w-1/2`}
            >
              <div className="absolute left-1/2 top-0 w-4 h-4 bg-primary rounded-full -ml-2 hidden md:block" />

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-card p-8 rounded-2xl shadow-lg"
              >
                <div className="text-4xl mb-4 text-primary">{item.year}</div>
                <h3 className="text-2xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl mb-8 tracking-tight text-primary-foreground">
            Join Our Story
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Be part of a community that values quality, authenticity, and thoughtful living. Together, we're redefining what modern luxury means.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-foreground text-primary px-10 py-5 rounded-full text-lg hover:shadow-2xl transition-shadow"
          >
            Explore Collections
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
