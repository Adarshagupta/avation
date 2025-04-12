import { motion, useTransform, useScroll, useSpring, useAnimation, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiChevronDown } from 'react-icons/fi';

const ProjectShowcase = () => {
  const containerRef = useRef(null);
  const showcaseRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  const [width, setWidth] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Scroll functionality
  const { scrollX } = useScroll({
    container: showcaseRef
  });
  
  // Spring configuration for smooth scrolling
  const springConfig = { stiffness: 70, damping: 30, restDelta: 0.001 };
  
  // Calculate the total width of all projects for parallax effect
  useEffect(() => {
    if (showcaseRef.current) {
      const scrollWidth = showcaseRef.current.scrollWidth;
      const clientWidth = showcaseRef.current.clientWidth;
      setWidth(scrollWidth - clientWidth);
    }
  }, []);
  
  // Start animation when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  // Update active project based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!showcaseRef.current) return;
      
      const scrollPosition = showcaseRef.current.scrollLeft;
      const itemWidth = showcaseRef.current.clientWidth;
      const newActiveProject = Math.round(scrollPosition / itemWidth);
      
      if (newActiveProject !== activeProject) {
        setActiveProject(newActiveProject);
      }
    };

    const showcaseElement = showcaseRef.current;
    if (showcaseElement) {
      showcaseElement.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (showcaseElement) {
        showcaseElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeProject]);
  
  // Handle manual scrolling with smooth behavior
  const scrollTo = (direction) => {
    if (showcaseRef.current) {
      const { scrollLeft, clientWidth } = showcaseRef.current;
      
      let newPosition;
      if (direction === 'right') {
        newPosition = scrollLeft + clientWidth;
        setActiveProject(prev => Math.min(prev + 1, projects.length - 1));
      } else {
        newPosition = scrollLeft - clientWidth;
        setActiveProject(prev => Math.max(prev - 1, 0));
      }
      
      showcaseRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };
  
  // Mouse drag handlers for custom scrolling
  const handleMouseDown = (e) => {
    setDragging(true);
    setStartX(e.pageX - showcaseRef.current.offsetLeft);
    setScrollLeft(showcaseRef.current.scrollLeft);
  };
  
  const handleMouseUp = () => {
    setDragging(false);
  };
  
  const handleMouseMove = (e) => {
    if (!dragging) return;
    e.preventDefault();
    
    const x = e.pageX - showcaseRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    showcaseRef.current.scrollLeft = scrollLeft - walk;
  };
  
  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setDragging(true);
    setStartX(e.touches[0].pageX - showcaseRef.current.offsetLeft);
    setScrollLeft(showcaseRef.current.scrollLeft);
  };
  
  const handleTouchMove = (e) => {
    if (!dragging) return;
    
    const x = e.touches[0].pageX - showcaseRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    showcaseRef.current.scrollLeft = scrollLeft - walk;
  };
  
  // Parallax effect transforms
  const parallaxX = useSpring(
    useTransform(scrollX, [0, width], [0, -width * 0.5]),
    springConfig
  );
  
  const projects = [
    {
      id: 'A121',
      name: 'Labs',
      image: 'https://images.unsplash.com/photo-1600494603989-9650cf6dad51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Modern restaurant with vibrant pink and purple neon lighting, creating a futuristic atmosphere.',
      location: 'Singapore',
      category: 'Restaurant',
      year: '2023',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'SOK',
      name: 'Millenia Tower',
      image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Contemporary dining space with distinctive ceiling installations and ambient lighting.',
      location: 'Hong Kong',
      category: 'Restaurant',
      year: '2022',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'PXD',
      name: 'Pixel District',
      image: 'https://images.unsplash.com/photo-1537169853755-a2a510b0165d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Futuristic lounge with colorful LED lighting and modern furnishings.',
      location: 'Tokyo',
      category: 'Lounge',
      year: '2023',
      color: 'from-blue-400 to-purple-600'
    }
  ];

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="section-padding overflow-hidden bg-gray-100"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header with two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              Curious about our work?
              <br />
              Here's a glimpse.
            </motion.h2>
          </div>
          
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-700 mb-6"
            >
              Fueled by passion and intention, we put everything we have
              into every one of our projects. We invite you to take a look.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <button className="inline-flex items-center px-6 py-3 bg-white rounded-full border border-gray-300 hover:border-gray-900 text-gray-900 font-medium transition-colors">
                See all cases <FiChevronDown className="ml-2" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Project showcase with horizontal scrolling */}
        <div className="relative mt-12">
          {/* Vertical project indicators on right */}
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
            <div className="flex flex-col space-y-20">
              {projects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  className="group cursor-pointer flex items-center"
                  onClick={() => {
                    setActiveProject(index);
                    showcaseRef.current.scrollTo({
                      left: index * showcaseRef.current.clientWidth,
                      behavior: 'smooth'
                    });
                  }}
                >
                  <div className="text-vertical mr-2">
                    <span className={`font-medium text-sm transition-colors duration-300 ${
                      activeProject === index ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-900'
                    }`}>
                      {project.id}
                    </span>
                    <br />
                    <span className={`text-xs transition-colors duration-300 ${
                      activeProject === index ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-700'
                    }`}>
                      {project.name}
                    </span>
                  </div>
                  <div className={`w-px h-24 bg-gradient-to-b ${
                    activeProject === index ? project.color : 'from-gray-300 to-gray-200 group-hover:from-gray-400 group-hover:to-gray-300'
                  } transition-colors duration-300`} />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Navigation controls at top right */}
          <div className="absolute right-0 -top-20 z-10 flex space-x-4">
            <button 
              onClick={() => scrollTo('left')}
              disabled={activeProject === 0}
              className="p-3 rounded-full bg-white shadow-md text-gray-900 hover:bg-gray-900 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous project"
            >
              <FiChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scrollTo('right')}
              disabled={activeProject === projects.length - 1}
              className="p-3 rounded-full bg-white shadow-md text-gray-900 hover:bg-gray-900 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next project"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
          
          {/* Main showcase container */}
          <div 
            ref={showcaseRef}
            className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory smooth-scroll"
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
            {/* Project cards */}
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="min-w-full snap-center flex-shrink-0"
                initial={{ opacity: 0 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      delay: index * 0.1
                    }
                  }
                }}
              >
                <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
                  {/* Main project image - full width image as in the reference */}
                  <div className="relative w-full h-[70vh]">
                    <motion.img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    
                    {/* Colored overlay to match the reference image's vibrant look */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}></div>
                    
                    {/* Light ceiling tubes like in reference */}
                    <div className="absolute inset-0">
                      {/* Horizontal light tubes */}
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={i} 
                          className="absolute h-[3px] bg-white/80 rounded-full" 
                          style={{
                            top: `${8 + i * 7}%`,
                            left: `${5 + (i % 3) * 2}%`,
                            width: `${85 - (i % 5) * 10}%`,
                            opacity: 0.7 + (i % 5) * 0.06,
                            boxShadow: `0 0 15px 2px rgba(255, 255, 255, 0.6), 
                                        0 0 30px 5px rgba(${i % 2 ? '221, 214, 254' : '245, 208, 254'}, 0.7)`
                          }}
                        ></div>
                      ))}
                      
                      {/* Some vertical tubes for added effect */}
                      {[...Array(6)].map((_, i) => (
                        <div 
                          key={`v-${i}`} 
                          className="absolute w-[3px] bg-white/80 rounded-full" 
                          style={{
                            top: '5%',
                            height: '75%',
                            left: `${15 + i * 14}%`,
                            opacity: 0.6 + (i % 3) * 0.1,
                            boxShadow: `0 0 15px 2px rgba(255, 255, 255, 0.6), 
                                        0 0 30px 5px rgba(${i % 2 ? '221, 214, 254' : '236, 72, 153'}, 0.7)`
                          }}
                        ></div>
                      ))}
                      
                      {/* Ceiling colored areas */}
                      <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-indigo-900/30 to-transparent"></div>
                      <div className="absolute top-[5%] left-[5%] w-[30%] h-[20%] rounded-2xl bg-pink-600/20 blur-xl"></div>
                      <div className="absolute top-[10%] right-[10%] w-[25%] h-[15%] rounded-2xl bg-indigo-600/20 blur-xl"></div>
                    </div>
                    
                    {/* Add some restaurant tables to match the reference image */}
                    <div className="absolute bottom-[5%] left-[5%] right-[5%] opacity-90">
                      {/* Restaurant tables */}
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={`table-${i}`}
                          className="absolute bottom-0 bg-white/90 rounded-full w-14 h-14"
                          style={{
                            left: `${5 + i * 8}%`,
                            bottom: `${3 + (i % 3) * 6}%`,
                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                          }}
                        >
                          <div className="absolute inset-1 rounded-full bg-gray-100"></div>
                        </div>
                      ))}
                      
                      {/* Chairs around tables */}
                      {[...Array(24)].map((_, i) => {
                        const tableIndex = Math.floor(i / 2);
                        const angle = (i % 2) * 180; // Position chairs on opposite sides
                        const distance = 18; // Distance from table center
                        const tableLeft = 5 + tableIndex * 8;
                        const tableBottom = 3 + (tableIndex % 3) * 6;
                        
                        // Calculate position around the table
                        const radians = angle * (Math.PI / 180);
                        const chairLeft = tableLeft + Math.cos(radians) * distance / 10;
                        const chairBottom = tableBottom + Math.sin(radians) * distance / 10;
                        
                        return (
                          <div 
                            key={`chair-${i}`}
                            className="absolute w-6 h-6 rounded-full bg-white/50"
                            style={{
                              left: `${chairLeft}%`,
                              bottom: `${chairBottom}%`,
                              boxShadow: '0 0 5px rgba(255, 255, 255, 0.3)'
                            }}
                          ></div>
                        );
                      })}
                    </div>
                    
                    {/* Project name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-pink-300 font-medium text-sm">{project.id}</span>
                          <h3 className="text-white text-3xl font-bold mt-1">{project.name}</h3>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm">
                          {project.category} • {project.year}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Progress indicators for mobile */}
          <div className="flex justify-center mt-8 space-x-2 lg:hidden">
            {projects.map((project, index) => (
              <div 
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeProject === index 
                    ? `w-12 bg-gradient-to-r ${project.color}` 
                    : 'w-6 bg-gray-300'
                }`}
                onClick={() => {
                  setActiveProject(index);
                  showcaseRef.current.scrollTo({
                    left: index * showcaseRef.current.clientWidth,
                    behavior: 'smooth'
                  });
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Custom styles */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .text-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
};

export default ProjectShowcase; 