import { motion, useTransform, useScroll, useSpring, useAnimation, useInView } from 'framer-motion';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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
  
  // Parallax effect transforms
  const x = useSpring(
    useTransform(scrollX, [0, width], [0, -width * 0.5]),
    springConfig
  );
  
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
      image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bgColor: "bg-aviation-blue/5"
    },
    {
      title: "Commercial Pilot License (CPL)",
      description: "Advance your career with our CPL program, preparing you for professional flying opportunities worldwide.",
      duration: "12-18 months",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bgColor: "bg-aviation-accent/5"
    },
    {
      title: "Airline Transport Pilot License (ATPL)",
      description: "The highest level of aircraft pilot certification, preparing you for a career as an airline captain.",
      duration: "18-24 months",
      image: "https://images.unsplash.com/photo-1559329255-2e7cb3839e36?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bgColor: "bg-aviation-blue/5"
    },
    {
      title: "Flight Instructor Course",
      description: "Share your knowledge and passion for flying by becoming a certified flight instructor.",
      duration: "3-6 months",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bgColor: "bg-aviation-accent/5"
    },
    {
      title: "Instrument Rating",
      description: "Master flying in all weather conditions with our comprehensive instrument rating course.",
      duration: "4-6 months",
      image: "https://images.unsplash.com/photo-1544620281-77a23661a499?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bgColor: "bg-aviation-blue/5"
    },
    {
      title: "Multi-Engine Rating",
      description: "Expand your skills to fly multi-engine aircraft with our specialized training program.",
      duration: "2-3 months",
      image: "https://images.unsplash.com/photo-1534481016308-0faa2bed2f34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bgColor: "bg-aviation-accent/5"
    }
  ];

  return (
    <section 
      id="courses" 
      ref={containerRef}
      className="section-padding bg-gray-50 navbar-spacing overflow-hidden"
    >
      <div className="container mx-auto container-padding">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-aviation-blue mb-4">Our Courses</h2>
          <div className="w-20 h-1 bg-aviation-accent mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover our range of aviation courses designed to take you from beginner to professional pilot.
            All courses are taught by experienced instructors using modern aircraft and simulators.
          </p>
        </motion.div>

        {/* Scroll control buttons */}
        <div className="flex justify-end mb-6 gap-2">
          <button 
            onClick={() => scrollTo('left')}
            disabled={isScrolling}
            className="p-3 rounded-full bg-white shadow-md text-aviation-blue hover:bg-aviation-blue hover:text-white transition-colors disabled:opacity-50"
            aria-label="Scroll left"
          >
            <FiChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scrollTo('right')}
            disabled={isScrolling}
            className="p-3 rounded-full bg-white shadow-md text-aviation-blue hover:bg-aviation-blue hover:text-white transition-colors disabled:opacity-50"
            aria-label="Scroll right"
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* Horizontal scrollable container with parallax effect */}
        <div className="relative overflow-hidden">
          <div 
            ref={coursesRef}
            className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory smooth-scroll course-card-container pb-8"
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
            {/* Background parallax elements with varying speeds */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <motion.div 
                className="absolute top-20 left-10 w-64 h-64 rounded-full bg-aviation-blue/5 blur-3xl parallax-element"
                style={{ x: bg1X }}
              />
              <motion.div 
                className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-aviation-accent/5 blur-3xl parallax-element"
                style={{ x: bg2X }}
              />
              <motion.div 
                className="absolute top-40 right-40 w-40 h-40 rounded-full bg-aviation-blue/10 blur-2xl parallax-element"
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
                className="absolute -top-10 right-1/4 w-48 h-48 rounded-full bg-aviation-blue/3 blur-3xl parallax-element"
                style={{ 
                  x: useSpring(
                    useTransform(scrollX, [0, width], [0, -width * 0.7]),
                    { ...springConfig, damping: 35 }
                  )
                }}
              />
            </div>

            {/* Course cards */}
            {courses.map((course, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] md:min-w-[400px] snap-center p-4 flex-shrink-0 mr-6 course-card"
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
                <div className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all-smooth h-full flex flex-col transform hover:-translate-y-2 ${course.bgColor}`}>
                  <div className="relative h-56 overflow-hidden">
                    <motion.img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover parallax-element"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <span className="text-xs font-bold bg-aviation-accent text-white px-3 py-1 rounded-full">
                        Duration: {course.duration}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-semibold mb-3 text-aviation-blue">{course.title}</h3>
                    <p className="text-gray-700 mb-4 flex-grow">{course.description}</p>
                    
                    <motion.button 
                      className="mt-auto flex items-center text-aviation-blue hover:text-aviation-accent transition-colors group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      Learn more 
                      <FiArrowRight className="ml-1 group-hover:ml-2 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Scroll indicators */}
          <div className="flex justify-center mt-6 gap-1">
            {Array.from({ length: Math.ceil(courses.length / 3) }).map((_, index) => (
              <div 
                key={index}
                className="w-2 h-2 rounded-full bg-aviation-blue/20 transition-all duration-300"
                style={{
                  backgroundColor: scrollX.get() / width > index / Math.ceil(courses.length / 3) ? 'rgba(0, 71, 171, 0.8)' : 'rgba(0, 71, 171, 0.2)'
                }}
              ></div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="btn btn-primary">View All Courses</button>
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
