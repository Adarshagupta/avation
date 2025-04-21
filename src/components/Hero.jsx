import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { FiChevronDown, FiCompass, FiMap } from 'react-icons/fi';
import { FaPlaneDeparture, FaPlaneArrival, FaPlane, FaGraduationCap, FaUserTie } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { CockpitButton } from './CockpitUI';

// Import SVG assets
import cockpitSvg from '../assets/images/cockpit.svg';
import flightPathSvg from '../assets/images/flight-path.svg';
import airplaneSilhouetteSvg from '../assets/images/airplane-silhouette.svg';
import compassSvg from '../assets/images/compass.svg';
import cloudsSvg from '../assets/images/clouds.svg';

const Hero = () => {
  // Force animations to restart when component is remounted after loading screen
  const forceRestart = useRef(Date.now());
  const { scrollY } = useScroll();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: false, amount: 0.3 });
  const [containerHeight, setContainerHeight] = useState(0);
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

  // Smooth spring animations for scroll-based effects
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
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

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden navbar-spacing"
    >
      {/* Gradient background with zoom effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-aviation-light via-white to-white"
        style={{
          scale: scaleValue,
          opacity: opacityValue
        }}
      />

      {/* Small animated planes flying across */}
      <motion.div
        className="absolute z-20"
        initial={{ x: "-10vw", y: "15vh", opacity: 0 }}
        animate={{
          x: ["0vw", "100vw"],
          y: ["15vh", "25vh", "20vh", "30vh", "15vh"],
          opacity: 1,
          rotate: [0, 5, -5, 3, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          times: [0, 0.2, 0.5, 0.8, 1]
        }}
      >
        <FaPlane className="text-aviation-accent text-xl md:text-3xl" />
      </motion.div>

      {/* Second plane */}
      <motion.div
        className="absolute z-20"
        initial={{ x: "110vw", y: "40vh", opacity: 0 }}
        animate={{
          x: ["100vw", "-10vw"],
          y: ["40vh", "35vh", "45vh", "38vh", "40vh"],
          opacity: 1,
          rotate: [180, 175, 185, 177, 180]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          times: [0, 0.2, 0.5, 0.8, 1],
          delay: 5
        }}
      >
        <FaPlaneDeparture className="text-aviation-blue text-xl md:text-3xl" />
      </motion.div>

      {/* Third plane */}
      <motion.div
        className="absolute z-20"
        initial={{ x: "-10vw", y: "60vh", opacity: 0 }}
        animate={{
          x: ["0vw", "100vw"],
          y: ["60vh", "55vh", "65vh", "58vh", "60vh"],
          opacity: 0.7,
          rotate: [0, -3, 3, -2, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          times: [0, 0.3, 0.5, 0.7, 1],
          delay: 8
        }}
      >
        <FaPlaneArrival className="text-aviation-blue/70 text-sm md:text-xl" />
      </motion.div>

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
      <div className="container mx-auto px-4 md:px-6 h-screen flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          {/* Left side - Text content */}
          <div
            ref={contentRef}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              {/* Redesigned modern badge */}
              <motion.div
                className="inline-block mb-6 py-1.5 px-4 bg-aviation-blue/5 rounded-full text-aviation-blue font-medium border border-aviation-blue/10 backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-aviation-accent animate-pulse"></span>
                Premier Aviation Academy
                </span>
              </motion.div>

              {/* Modern cleaner heading */}
              <motion.h1
                ref={titleRef}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-aviation-blue mb-8 tracking-tight"
                style={{
                  y: titleY,
                  opacity: titleOpacity
                }}
              >
                <motion.span
                  className="block mb-2"
                  key={`title-part1-${forceRestart.current}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  Your Journey to
                </motion.span>
                <motion.div
                  className="relative inline-block"
                  key={`title-part2-${forceRestart.current}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <span className="relative z-10">the Skies</span>
                  <motion.div 
                    className="absolute -bottom-3 left-0 h-3 bg-aviation-accent/30 w-full rounded-sm"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.4 }}
                    />
                </motion.div>
                <motion.span
                  className="block mt-2"
                  key={`title-part3-${forceRestart.current}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  Begins Here
                </motion.span>
              </motion.h1>

              {/* Clean, modern description */}
              <motion.p
                className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg font-light leading-relaxed"
                key={`description-${forceRestart.current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Experience excellence in flight education with comprehensive training programs designed for aspiring aviation professionals.
              </motion.p>

              {/* Modern button layout */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-16"
                key={`buttons-${forceRestart.current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <CockpitButton primary>
                  Explore Courses
                </CockpitButton>
                <CockpitButton primary={false}>
                  <span className="flex items-center gap-2">
                    <span>Book a Tour</span>
                    <motion.span 
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >→</motion.span>
                  </span>
                </CockpitButton>
            </motion.div>

              {/* Stats with clean modern design */}
            <motion.div
                className="grid grid-cols-3 gap-4 mt-6 max-w-lg"
              key={`stats-${forceRestart.current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <StatCard number="20+" label="Years Experience" delay={0} />
              <StatCard number="1000+" label="Graduates" delay={0.2} />
              <StatCard number="98%" label="Success Rate" delay={0.4} />
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Visual elements */}
          <div className="hidden lg:block relative">
            {/* Main airplane image */}
            <motion.div
              className="relative z-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.img
                src={airplaneSilhouetteSvg}
                alt="Airplane Silhouette"
                className="w-full max-w-lg mx-auto"
                animate={{
                  y: [0, -15, 0],
                  rotate: [-2, 2, -2]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Floating elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Cockpit UI element */}
              <motion.img
                src={cockpitSvg}
                alt="Cockpit UI"
                className="absolute top-0 right-0 w-64 opacity-60"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Flight path */}
              <motion.img
                src={flightPathSvg}
                alt="Flight Path"
                className="absolute bottom-0 left-0 w-80 opacity-70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 1, delay: 0.7 }}
              />

              {/* Compass */}
              <motion.img
                src={compassSvg}
                alt="Navigation Compass"
                className="absolute top-1/4 left-1/4 w-32 opacity-80"
                initial={{ opacity: 0, rotate: -30 }}
                animate={{
                  opacity: 0.8,
                  rotate: 0,
                  transition: { duration: 1, delay: 0.9 }
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 15,
                  transition: { duration: 0.3 }
                }}
              />

              {/* Clouds */}
              <motion.img
                src={cloudsSvg}
                alt="Clouds"
                className="absolute bottom-10 right-10 w-64 opacity-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
              />
            </div>

            {/* Info cards */}
            <div className="absolute inset-0 flex flex-col justify-center items-end gap-4 pr-4">
              <motion.div
                className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md border border-aviation-blue/20 w-64"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-aviation-blue/10 p-2 rounded-full">
                    <FaGraduationCap className="text-aviation-blue text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-aviation-blue">Certified Training</h3>
                    <p className="text-sm text-gray-600">FAA & EASA approved courses</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md border border-aviation-blue/20 w-64"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-aviation-accent/10 p-2 rounded-full">
                    <FaUserTie className="text-aviation-accent text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-aviation-blue">Expert Instructors</h3>
                    <p className="text-sm text-gray-600">Learn from industry veterans</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md border border-aviation-blue/20 w-64"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-aviation-blue/10 p-2 rounded-full">
                    <FiCompass className="text-aviation-blue text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-aviation-blue">Career Guidance</h3>
                    <p className="text-sm text-gray-600">Placement assistance included</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
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
      className="p-3 rounded-lg border-b-2 border-aviation-accent/20 bg-white/10 hover:bg-white/30 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <motion.div
        className="text-2xl font-bold text-aviation-blue mb-1 flex items-baseline"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        <span>{count}</span>
        <span className="text-aviation-accent font-semibold">{suffix}</span>
      </motion.div>
      <div className="text-xs uppercase tracking-wide text-gray-500 font-medium">{label}</div>
    </motion.div>
  );
};

export default Hero;
