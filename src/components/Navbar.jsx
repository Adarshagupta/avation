import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Transform values for floating effect
  const navY = useTransform(scrollY, [0, 100], [8, 5]);
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const navOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const navBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(8px)']);
  const navShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 0 0 rgba(0, 0, 0, 0)', '0 8px 30px rgba(0, 71, 171, 0.15)']
  );

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine which section is currently in view
      const sections = ['home', 'about', 'courses', 'testimonials', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Links for both desktop and mobile menus
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#courses', label: 'Courses' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <div className="fixed w-full z-60 flex justify-center items-start px-4 pt-2">
      <motion.nav
        className={`w-full max-w-6xl rounded-xl ${
          scrolled
            ? 'py-3 backdrop-blur-lg bg-white/70 border border-white/50'
            : 'py-4 bg-white/10 backdrop-blur-sm border border-white/10'
        }`}
        style={{
          y: navY,
          scale: navScale,
          boxShadow: navShadow,
          backdropFilter: navBlur
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: navY, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120, damping: 20 }}
      >
        <div className="container mx-auto px-6 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className={`text-2xl font-bold ${scrolled ? 'text-aviation-blue' : 'text-aviation-blue'}`}
              whileHover={{
                textShadow: "0 0 8px rgba(0, 71, 171, 0.3)"
              }}
            >
              Aviation Academy
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`relative px-2 text-base ${
                  activeSection === link.href.substring(1)
                    ? scrolled ? 'text-aviation-blue font-medium' : 'text-aviation-blue font-medium'
                    : scrolled ? 'text-gray-700 hover:text-aviation-blue' : 'text-gray-800 hover:text-aviation-blue'
                } transition-colors`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -2 }}
              >
                {link.label}
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-aviation-accent`}
                    layoutId="activeSection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
            ))}

            <motion.button
              className={`btn py-2 px-5 text-sm ${scrolled ? 'btn-primary' : 'btn-primary'}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 71, 171, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Enroll Now
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none relative z-50 ${scrolled ? 'text-gray-700' : 'text-aviation-blue'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX size={24} className="text-aviation-blue" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden bg-white/95 backdrop-blur-md absolute top-full left-0 right-0 shadow-lg rounded-b-2xl border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col space-y-3 px-6 py-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`text-base ${
                      activeSection === link.href.substring(1)
                        ? 'text-aviation-blue font-medium'
                        : 'text-gray-700'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsOpen(false)}
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.button
                  className="btn btn-primary py-2 text-sm mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Enroll Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
