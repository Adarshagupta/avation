import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, useInView } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { FaPlaneDeparture, FaPlaneArrival, FaPlane } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: false, amount: 0.3 });
  const [containerHeight, setContainerHeight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scroll position for animations
  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollPercentage = Math.min(latest / containerHeight, 1);
    setScrollProgress(scrollPercentage);
  });

  // Smooth spring animations for scroll-based effects
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const yParallax = useSpring(
    useTransform(scrollY, [0, containerHeight], [0, containerHeight * 0.5]),
    springConfig
  );
  const opacityValue = useSpring(
    useTransform(scrollY, [0, containerHeight * 0.5], [1, 0]),
    springConfig
  );
  const scaleValue = useSpring(
    useTransform(scrollY, [0, containerHeight * 0.3], [1, 0.92]),
    springConfig
  );

  // Text reveal animation on scroll
  const titleY = useTransform(scrollY, [0, 100], [0, -50]);
  const titleOpacity = useTransform(scrollY, [0, 100], [1, 0.2]);

  // Plane animations
  const planes = [
    {
      icon: <FaPlaneDeparture className="text-aviation-blue text-6xl md:text-8xl" />,
      path: {
        x: ["-10vw", "110vw"],
        y: ["20vh", "40vh"],
        rotate: [0, 5, 0, -5, 0]
      },
      duration: 20,
      delay: 0
    },
    {
      icon: <FaPlane className="text-aviation-accent text-4xl md:text-6xl" />,
      path: {
        x: ["110vw", "-10vw"],
        y: ["30vh", "15vh"],
        rotate: [180, 175, 180, 185, 180]
      },
      duration: 25,
      delay: 5
    },
    {
      icon: <FaPlaneArrival className="text-aviation-blue text-5xl md:text-7xl" />,
      path: {
        x: ["-10vw", "110vw"],
        y: ["60vh", "50vh"],
        rotate: [0, -5, 0, 5, 0]
      },
      duration: 30,
      delay: 10
    }
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Gradient background with zoom effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-aviation-light via-white to-white"
        style={{ 
          scale: scaleValue,
          opacity: opacityValue
        }}
      />

      {/* Decorative grid pattern */}
      <motion.div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDAgaDYwIHY2MCBIMHoiLz48cGF0aCBkPSJNMzAgMzAgaDEgdjEgaC0xeiIgZmlsbC1vcGFjaXR5PSIuNSIgZmlsbD0iIzAwNDdBQiIvPjwvZz48L3N2Zz4=')]"
        style={{ 
          opacity: useTransform(scrollY, [0, containerHeight * 0.5], [0.05, 0]),
          y: useTransform(scrollY, [0, containerHeight], [0, containerHeight * 0.2]) 
        }}
      />

      {/* Parallax aviation elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated path */}
        <motion.svg 
          viewBox="0 0 1000 1000" 
          className="absolute w-full h-full opacity-10"
          style={{
            y: useTransform(scrollY, [0, containerHeight], [0, 200]),
            opacity: useTransform(scrollY, [0, containerHeight * 0.8], [0.1, 0])
          }}
        >
          <motion.path
            d="M0,500 Q250,350 500,500 T1000,500"
            fill="none"
            stroke="#0047AB"
            strokeWidth="3"
            strokeDasharray="12,12"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: isContentInView ? 0.8 : 0 
            }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </motion.svg>

        {/* Cloud elements with parallax */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-32 rounded-full bg-white/20 blur-2xl"
          style={{ y: useTransform(scrollY, [0, containerHeight], [0, containerHeight * 0.2]) }}
          animate={{
            x: [0, 20, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/3 w-80 h-40 rounded-full bg-white/30 blur-2xl"
          style={{ y: useTransform(scrollY, [0, containerHeight], [0, containerHeight * 0.3]) }}
          animate={{
            x: [0, -30, 0],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div
          className="absolute top-1/2 right-1/4 w-48 h-24 rounded-full bg-white/15 blur-xl"
          style={{ y: useTransform(scrollY, [0, containerHeight], [0, containerHeight * 0.4]) }}
          animate={{
            x: [0, 15, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 h-screen flex flex-col justify-center relative z-10">
        <div 
          ref={contentRef}
          className="max-w-4xl relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div 
              className="inline-block mb-4 px-4 py-1 bg-aviation-blue/10 rounded-full text-aviation-blue font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Premier Aviation Academy
            </motion.div>
            
            <motion.h1
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold text-aviation-blue mb-6"
              style={{ 
                y: titleY,
                opacity: titleOpacity
              }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Your Journey to
              </motion.span>
              <motion.span
                className="block relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                the Skies
                <motion.svg
                  viewBox="0 0 300 20"
                  className="absolute -bottom-2 left-0 w-full h-5 text-aviation-accent"
                  initial={{ pathLength: 0 }}
                  animate={isContentInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <motion.path
                    d="M8,12 C60,5 150,5 292,12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isContentInView ? { pathLength: 1 } : { pathLength: 0 }}
                  />
                </motion.svg>
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                Begins Here
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Experience excellence in flight education with our comprehensive training programs designed for aspiring pilots and aviation professionals.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 71, 171, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Courses
              </motion.button>
              <motion.button
                className="btn btn-secondary"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 107, 0, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Tour
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <StatCard number="20+" label="Years Experience" delay={0} />
            <StatCard number="1000+" label="Graduates" delay={0.2} />
            <StatCard number="98%" label="Success Rate" delay={0.4} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ opacity: useTransform(scrollY, [0, 300], [1, 0]) }}
      >
        <a href="#about" className="flex flex-col items-center">
          <motion.div 
            className="text-sm text-aviation-blue/80 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.div>
          <FiChevronDown className="text-3xl text-aviation-blue" />
        </a>
      </motion.div>
    </section>
  );
};

// Stat card component with counter animation
const StatCard = ({ number, label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  
  // Parse the numeric value from the string
  const numericValue = parseInt(number.replace(/\D/g, ''));
  const suffix = number.replace(/[0-9]/g, '');
  
  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
      
      let startTime;
      const duration = 2000; // 2 seconds
      
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentCount = Math.floor(progress * numericValue);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isInView, numericValue, isVisible]);
  
  return (
    <motion.div
      ref={ref}
      className="p-4 rounded-xl border border-gray-100 shadow-sm bg-white/30 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div 
        className="text-3xl font-bold text-aviation-blue mb-1"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {count}{suffix}
      </motion.div>
      <div className="text-sm text-gray-600">{label}</div>
    </motion.div>
  );
};

export default Hero;
