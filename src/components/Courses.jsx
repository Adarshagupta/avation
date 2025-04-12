import { motion, useTransform, useScroll, useSpring, useAnimation, useInView } from 'framer-motion';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiClock, FiUsers, FiAward } from 'react-icons/fi';
import { FaPlane, FaChalkboardTeacher } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

const Courses = () => {
  const containerRef = useRef(null);
  const coursesRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  const [width, setWidth] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Scroll functionality
  const { scrollX } = useScroll({
    container: coursesRef
  });

  // Spring configuration for smooth scrolling
  const springConfig = { stiffness: 80, damping: 25, restDelta: 0.001 };

  // Calculate the total width of all courses for parallax effect
  useEffect(() => {
    if (coursesRef.current) {
      const scrollWidth = coursesRef.current.scrollWidth;
      const clientWidth = coursesRef.current.clientWidth;
      setWidth(scrollWidth - clientWidth);
    }
  }, []);

  // Start animation when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Handle manual scrolling with smooth behavior
  const scrollTo = (direction) => {
    if (coursesRef.current) {
      const { scrollLeft, clientWidth } = coursesRef.current;
      const scrollAmount = clientWidth * 0.8; // 80% of viewport width

      setIsScrolling(true);

      coursesRef.current.scrollTo({
        left: direction === 'right'
          ? scrollLeft + scrollAmount
          : scrollLeft - scrollAmount,
        behavior: 'smooth'
      });

      // Reset scrolling state after animation completes
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  // Mouse drag handlers for custom scrolling
  const handleMouseDown = (e) => {
    setDragging(true);
    setStartX(e.pageX - coursesRef.current.offsetLeft);
    setScrollLeft(coursesRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    e.preventDefault();

    const x = e.pageX - coursesRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    coursesRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setDragging(true);
    setStartX(e.touches[0].pageX - coursesRef.current.offsetLeft);
    setScrollLeft(coursesRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!dragging) return;

    const x = e.touches[0].pageX - coursesRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    coursesRef.current.scrollLeft = scrollLeft - walk;
  };

  // Parallax effect transforms for background elements

  // Create individual parallax effects for each background element with varying speeds
  const bg1X = useSpring(
    useTransform(scrollX, [0, width], [0, -width * 0.3]),
    { ...springConfig, damping: 20 }
  );

  const bg2X = useSpring(
    useTransform(scrollX, [0, width], [0, -width * 0.6]),
    { ...springConfig, damping: 30 }
  );

  const bg3X = useSpring(
    useTransform(scrollX, [0, width], [0, -width * 0.4]),
    { ...springConfig, stiffness: 60 }
  );

  const courses = [
    {
      title: "Private Pilot License (PPL)",
      description: "Start your journey with our comprehensive PPL program, designed for beginners with no prior flying experience.",
      duration: "6-9 months",
      students: "250+ enrolled",
      certification: "FAA Certified",
      icon: <FaPlane />,
      image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "from-blue-500 to-indigo-600",
      popular: true
    },
    {
      title: "Commercial Pilot License (CPL)",
      description: "Advance your career with our CPL program, preparing you for professional flying opportunities worldwide.",
      duration: "12-18 months",
      students: "180+ enrolled",
      certification: "FAA Certified",
      icon: <FaPlane />,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "from-orange-500 to-amber-600",
      popular: false
    },
    {
      title: "Airline Transport Pilot License (ATPL)",
      description: "The highest level of aircraft pilot certification, preparing you for a career as an airline captain.",
      duration: "18-24 months",
      students: "120+ enrolled",
      certification: "FAA Certified",
      icon: <FaPlane />,
      image: "https://images.unsplash.com/photo-1559329255-2e7cb3839e36?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "from-blue-500 to-indigo-600",
      popular: false
    },
    {
      title: "Flight Instructor Course",
      description: "Share your knowledge and passion for flying by becoming a certified flight instructor.",
      duration: "3-6 months",
      students: "90+ enrolled",
      certification: "FAA Certified",
      icon: <FaChalkboardTeacher />,
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "from-orange-500 to-amber-600",
      popular: true
    },
    {
      title: "Instrument Rating",
      description: "Master flying in all weather conditions with our comprehensive instrument rating course.",
      duration: "4-6 months",
      students: "200+ enrolled",
      certification: "FAA Certified",
      icon: <FaPlane />,
      image: "https://images.unsplash.com/photo-1544620281-77a23661a499?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "from-blue-500 to-indigo-600",
      popular: false
    },
    {
      title: "Multi-Engine Rating",
      description: "Expand your skills to fly multi-engine aircraft with our specialized training program.",
      duration: "2-3 months",
      students: "150+ enrolled",
      certification: "FAA Certified",
      icon: <FaPlane />,
      image: "https://images.unsplash.com/photo-1534481016308-0faa2bed2f34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "from-orange-500 to-amber-600",
      popular: false
    }
  ];

  return (
    <section
      id="courses"
      ref={containerRef}
      className="section-padding bg-gradient-to-b from-gray-50 to-white navbar-spacing overflow-hidden"
    >
      <div className="container mx-auto container-padding">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-1.5 bg-aviation-blue/10 rounded-full text-aviation-blue font-medium text-sm"
          >
            FLIGHT TRAINING PROGRAMS
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-aviation-blue mb-6 leading-tight">
            Elevate Your Aviation Career
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover our range of aviation courses designed to take you from beginner to professional pilot.
            All courses are taught by experienced instructors using modern aircraft and simulators.
          </p>
        </motion.div>

        {/* Navigation controls */}
        <div className="flex justify-between items-center mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <div className="flex items-center space-x-2 text-aviation-blue">
              <div className="w-10 h-1 bg-aviation-blue rounded-full"></div>
              <span className="font-medium">Swipe to explore</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex gap-3"
          >
            <button
              onClick={() => scrollTo('left')}
              disabled={isScrolling}
              className="p-4 rounded-full bg-white shadow-md text-aviation-blue hover:bg-aviation-blue hover:text-white transition-all disabled:opacity-50 border border-gray-100"
              aria-label="Scroll left"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollTo('right')}
              disabled={isScrolling}
              className="p-4 rounded-full bg-white shadow-md text-aviation-blue hover:bg-aviation-blue hover:text-white transition-all disabled:opacity-50 border border-gray-100"
              aria-label="Scroll right"
            >
              <FiChevronRight size={20} />
            </button>
          </motion.div>
        </div>

        {/* Horizontal scrollable container with parallax effect */}
        <div className="relative overflow-hidden">
          {/* Background parallax elements with varying speeds */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <motion.div
              className="absolute top-20 left-10 w-96 h-96 rounded-full bg-aviation-blue/5 blur-3xl parallax-element"
              style={{ x: bg1X }}
            />
            <motion.div
              className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-aviation-accent/5 blur-3xl parallax-element"
              style={{ x: bg2X }}
            />
            <motion.div
              className="absolute top-40 right-40 w-64 h-64 rounded-full bg-aviation-blue/10 blur-2xl parallax-element"
              style={{ x: bg3X }}
            />

            {/* Additional subtle background elements */}
            <motion.div
              className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-aviation-accent/3 blur-3xl parallax-element"
              style={{
                x: useSpring(
                  useTransform(scrollX, [0, width], [0, -width * 0.2]),
                  { ...springConfig, damping: 15 }
                )
              }}
            />
            <motion.div
              className="absolute -top-10 right-1/4 w-64 h-64 rounded-full bg-aviation-blue/3 blur-3xl parallax-element"
              style={{
                x: useSpring(
                  useTransform(scrollX, [0, width], [0, -width * 0.7]),
                  { ...springConfig, damping: 35 }
                )
              }}
            />
          </div>

          <div
            ref={coursesRef}
            className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory smooth-scroll course-card-container pb-12"
            style={{
              cursor: dragging ? 'grabbing' : 'grab',
              WebkitOverflowScrolling: 'touch'
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
          >
            {/* Course cards */}
            {courses.map((course, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] md:min-w-[400px] lg:min-w-[450px] snap-center p-4 flex-shrink-0 mr-6 course-card"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      delay: index * 0.1
                    }
                  }
                }}
              >
                <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all-smooth flex flex-col transform hover:-translate-y-2 border border-gray-100">
                  {/* Course image with gradient overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover parallax-element"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-70`}></div>

                    {/* Popular badge */}
                    {course.popular && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-aviation-blue shadow-md">
                        Popular Course
                      </div>
                    )}

                    {/* Course icon */}
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white">
                      {course.icon}
                    </div>

                    {/* Course title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2 drop-shadow-md">{course.title}</h3>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center text-xs bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full">
                          <FiClock className="mr-1" /> {course.duration}
                        </span>
                        <span className="flex items-center text-xs bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full">
                          <FiUsers className="mr-1" /> {course.students}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Course details */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center mb-4">
                      <span className="text-xs font-medium bg-aviation-blue/10 text-aviation-blue px-3 py-1 rounded-full flex items-center">
                        <FiAward className="mr-1" /> {course.certification}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-6 flex-grow">{course.description}</p>

                    <motion.button
                      className="mt-auto flex items-center justify-center w-full py-3 px-4 bg-aviation-blue text-white rounded-lg hover:bg-aviation-blue/90 transition-colors group font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      Explore Course
                      <FiArrowRight className="ml-2 group-hover:ml-3 transition-all" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(courses.length / 3) }).map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  scrollX.get() / width > index / Math.ceil(courses.length / 3)
                    ? 'w-10 bg-aviation-blue'
                    : 'w-6 bg-aviation-blue/20'
                }`}
              ></div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a href="/classes" className="inline-flex items-center justify-center px-8 py-4 bg-aviation-blue text-white rounded-lg hover:bg-aviation-blue/90 transition-colors font-medium shadow-md hover:shadow-lg">
            View All Courses <FiArrowRight className="ml-2" />
          </a>
        </motion.div>
      </div>

      {/* Add custom style for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Courses;
