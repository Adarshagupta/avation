import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

const ModernCourses = () => {
  const [activeCategory, setActiveCategory] = useState('timing-canvas');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [expandedWidth, setExpandedWidth] = useState({});

  // Course categories with vertical labels
  const categories = [
    { id: 'the-craft', label: 'THE CRAFT' },
    { id: 'css-animation', label: 'CSS ANIMATION' },
    { id: 'svg-filters', label: 'SVG FILTERS' },
    { id: 'scroll-animation', label: 'SCROLL ANIMATION' },
    { id: 'timing-canvas', label: 'TIMING CANVAS' },
    { id: 'layout-tricks', label: 'LAYOUT TRICKS' },
    { id: 'mastering-time', label: 'MASTERING TIME' },
  ];

  // Calculate expanded widths on mount and window resize
  useEffect(() => {
    const calculateWidths = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) return;

      const totalCategories = categories.length;
      const containerWidth = document.querySelector('.courses-container')?.clientWidth || 1200;

      // When one is expanded, others share remaining space
      const expandedCategoryWidth = containerWidth * 0.4; // 40% of container for expanded
      const otherCategoriesWidth = containerWidth - expandedCategoryWidth;
      const collapsedCategoryWidth = otherCategoriesWidth / (totalCategories - 1);

      setExpandedWidth({
        expanded: `${expandedCategoryWidth}px`,
        collapsed: `${collapsedCategoryWidth}px`,
        normal: `${containerWidth / totalCategories}px`,
      });
    };

    // Small delay to ensure the container is rendered
    const timer = setTimeout(() => {
      calculateWidths();
      window.addEventListener('resize', calculateWidths);
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateWidths);
    };
  }, [categories.length]);



  // Featured content for the active category
  const featuredContent = {
    'the-craft': {
      title: 'The Craft of UI',
      description: 'Unlock the art and science of interface development. This isn\'t just about pushing pixels or following documentation — it\'s about mastering the tools, understanding the nuances, and shaping experiences with intention.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      cta: 'Learn more'
    },
    'css-animation': {
      title: 'CSS Animation Mastery',
      description: 'Learn the principles of creating smooth, performant animations using pure CSS. Master keyframes, transitions, and transform properties to bring your interfaces to life.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      cta: 'Explore techniques'
    },
    'svg-filters': {
      title: 'SVG Filters & Effects',
      description: 'Dive into the world of SVG filters to create unique visual effects that cannot be achieved with standard CSS. Learn how to manipulate graphics at the pixel level.',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      cta: 'Discover filters'
    },
    'scroll-animation': {
      title: 'Scroll-Based Animations',
      description: 'Create engaging user experiences by triggering animations based on scroll position. Learn techniques for parallax effects, reveal animations, and scroll-driven interactions.',
      image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      cta: 'Start scrolling'
    },
    'timing-canvas': {
      title: 'Timing Canvas Animations',
      description: 'Grasp how to tame the pixel playground and when to do so. Whilst building with "Performance Driven Development".',
      image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      cta: 'Watch now',
      hasVideo: true
    },
    'layout-tricks': {
      title: 'Advanced Layout Techniques',
      description: 'Master the art of complex layouts using CSS Grid, Flexbox, and positioning. Learn how to create responsive, adaptive designs that work across all devices.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      cta: 'Explore layouts'
    },
    'mastering-time': {
      title: 'Mastering Animation Timing',
      description: 'Understand the principles of timing and easing to create animations that feel natural and purposeful. Learn how to choreograph complex sequences for maximum impact.',
      image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      cta: 'Perfect your timing'
    }
  };

  const content = featuredContent[activeCategory];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden" id="courses">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Our Courses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our specialized courses designed to help you master the craft of UI development.</p>
        </div>

        {/* Desktop view with expanding cards */}
        <div className="hidden md:flex h-[400px] gap-2 mb-8 courses-container">
          {categories.map((category) => {
            const isHovered = hoveredCategory === category.id;
            const content = featuredContent[category.id];

            return (
              <motion.div
                key={category.id}
                className={`category-card-expandable relative rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${
                  activeCategory === category.id ? 'border-2 border-blue-500' : 'border border-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                layout
                style={{
                  flexGrow: isHovered ? 3 : 1,
                  flexBasis: isHovered ? expandedWidth.expanded : (hoveredCategory ? expandedWidth.collapsed : expandedWidth.normal),
                  opacity: hoveredCategory && !isHovered ? 0.7 : 1
                }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Background image with overlay - only visible when hovered */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-black/40 z-10"></div>
                      <img
                        src={content.image}
                        alt={content.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Vertical text label - always visible */}
                <div className={`vertical-text font-medium text-sm tracking-wider ${isHovered ? 'text-white z-20 relative' : 'text-gray-700'} absolute inset-0 flex items-center justify-center`}>
                  {category.label}
                </div>

                {/* Expanded content - only visible when hovered */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <h3 className="text-xl font-bold mb-2">{content.title}</h3>
                      <p className="text-white/80 text-sm mb-4 line-clamp-3">
                        {content.description}
                      </p>
                      <motion.button
                        className="inline-flex items-center space-x-2 bg-white/90 text-gray-900 rounded-full px-4 py-1.5 text-xs font-medium w-fit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {content.hasVideo ? (
                          <>
                            <FiPlay className="mr-1" />
                            {content.cta}
                          </>
                        ) : (
                          <>
                            {content.cta}
                            <FiArrowRight className="ml-1" />
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Category icon */}
                <div className={`absolute bottom-3 left-0 right-0 flex justify-center ${isHovered ? 'z-20' : ''}`}>
                  <div className="w-6 h-6 flex items-center justify-center">
                    {category.id === 'the-craft' && <span className="text-xs">💎</span>}
                    {category.id === 'css-animation' && <span className="text-xs">⚡</span>}
                    {category.id === 'svg-filters' && <span className="text-xs">🔍</span>}
                    {category.id === 'scroll-animation' && <span className="text-xs">📜</span>}
                    {category.id === 'timing-canvas' && <span className="text-xs">🎬</span>}
                    {category.id === 'layout-tricks' && <span className="text-xs">📐</span>}
                    {category.id === 'mastering-time' && <span className="text-xs">⏱️</span>}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile view with grid layout */}
        <div className="courses-grid grid grid-cols-1 md:hidden gap-6 items-stretch">
          {/* Category navigation for mobile */}
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className={`category-card border border-gray-200 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center ${
                activeCategory === category.id
                  ? 'bg-white shadow-md'
                  : 'bg-gray-50 hover:bg-white hover:shadow-sm'
              }`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium text-xs tracking-wider text-gray-700">
                {category.label}
              </div>

              {/* Category icon */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <div className="w-6 h-6 flex items-center justify-center">
                  {category.id === 'the-craft' && <span className="text-xs">💎</span>}
                  {category.id === 'css-animation' && <span className="text-xs">⚡</span>}
                  {category.id === 'svg-filters' && <span className="text-xs">🔍</span>}
                  {category.id === 'scroll-animation' && <span className="text-xs">📜</span>}
                  {category.id === 'timing-canvas' && <span className="text-xs">🎬</span>}
                  {category.id === 'layout-tricks' && <span className="text-xs">📐</span>}
                  {category.id === 'mastering-time' && <span className="text-xs">⏱️</span>}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Featured content area for mobile - only shows the active category */}
          <motion.div
            className="featured-content rounded-lg overflow-hidden relative"
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img
              src={content.image}
              alt={content.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-center text-white">
              <h3 className="text-3xl font-bold mb-4">{content.title}</h3>
              <p className="text-white/90 mb-6 max-w-lg">
                {content.description}
              </p>

              <motion.button
                className={`inline-flex items-center space-x-2 ${
                  content.hasVideo
                    ? 'bg-white text-gray-900'
                    : 'bg-transparent border border-white'
                } rounded-full px-6 py-2 text-sm font-medium w-fit`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {content.hasVideo ? (
                  <>
                    <FiPlay className="mr-2" />
                    {content.cta}
                  </>
                ) : (
                  <>
                    {content.cta}
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default ModernCourses;
