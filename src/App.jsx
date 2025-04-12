import { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedPlanes from './components/AnimatedPlanes';
import ParallaxClouds from './components/ParallaxClouds';
import CockpitUIDemo from './components/CockpitUIDemo';
import LoadingScreen from './components/LoadingScreen';
import CacheMonitor from './components/CacheMonitor';
import ProjectShowcase from './components/ProjectShowcase';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminApiKey, setAdminApiKey] = useState('');
  const scrollingRef = useRef({
    isScrolling: false,
    targetScrollY: 0,
    lastScrollY: 0,
    scrollEndTimeout: null
  });
  
  // Smooth scrolling implementation with speed limits
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      
      const { isScrolling, targetScrollY, lastScrollY, scrollEndTimeout } = scrollingRef.current;
      
      // Clear existing timeout
      if (scrollEndTimeout) {
        clearTimeout(scrollEndTimeout);
      }
      
      // Calculate new target scroll position with speed limiting
      const maxScrollStep = 100; // Maximum amount to scroll at once
      const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), maxScrollStep);
      const newTargetScrollY = Math.max(0, targetScrollY + delta);
      
      scrollingRef.current = {
        ...scrollingRef.current,
        isScrolling: true,
        targetScrollY: newTargetScrollY,
        scrollEndTimeout: setTimeout(() => {
          scrollingRef.current.isScrolling = false;
        }, 150) // Scroll inertia duration
      };
      
      // If not already animating, start the animation
      if (!isScrolling) {
        animateScroll();
      }
    };
    
    const animateScroll = () => {
      const { isScrolling, targetScrollY, lastScrollY } = scrollingRef.current;
      
      if (!isScrolling) return;
      
      // Calculate step with easing
      const diff = targetScrollY - lastScrollY;
      const step = Math.round(diff * 0.1); // Smooth factor - lower is smoother
      
      if (Math.abs(step) < 1) {
        // We're close enough - snap to target
        window.scrollTo({
          top: targetScrollY,
          behavior: 'auto'
        });
        scrollingRef.current.lastScrollY = targetScrollY;
      } else {
        // Take a step toward the target
        const newScrollY = lastScrollY + step;
        window.scrollTo({
          top: newScrollY,
          behavior: 'auto'
        });
        scrollingRef.current.lastScrollY = newScrollY;
        
        // Continue animation
        requestAnimationFrame(animateScroll);
      }
    };
    
    // Attach wheel event with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Handle anchor links with smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const targetPosition = targetElement.offsetTop - 100; // Offset for fixed navbar
          
          // Update scroll target and start animation
          scrollingRef.current = {
            ...scrollingRef.current,
            isScrolling: true,
            targetScrollY: targetPosition,
            scrollEndTimeout: setTimeout(() => {
              scrollingRef.current.isScrolling = false;
            }, 800) // Longer duration for anchor links
          };
          
          animateScroll();
        }
      });
    });
    
    // Ensure we start with correct values
    scrollingRef.current.lastScrollY = window.scrollY;
    scrollingRef.current.targetScrollY = window.scrollY;
    
    // Cleanup event listeners
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [loading]); // Only re-run when loading state changes

  // Check for admin mode with keyboard shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        if (!isAdmin) {
          const key = prompt('Enter admin API key:');
          if (key) {
            setAdminApiKey(key);
            setIsAdmin(true);
            console.log('Admin mode activated');
          }
        } else {
          setIsAdmin(false);
          setAdminApiKey('');
          console.log('Admin mode deactivated');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  return (
    <div className="min-h-screen smooth-scroll-container">
      {/* Loading Screen */}
      <LoadingScreen finishLoading={() => setLoading(false)} />

      {/* Navbar and content - only visible after loading */}
      <div
        className={loading ? 'opacity-0 invisible' : 'opacity-100 visible transition-opacity duration-500'}
        aria-hidden={loading}
      >
        {/* Navbar */}
        <Navbar />

        {/* Background animations */}
        <AnimatedPlanes />
        <ParallaxClouds />

        {/* Main content */}
        <Hero key={loading ? 'loading' : 'loaded'} />
        <About />
        <ProjectShowcase />
        <CockpitUIDemo />
        <Testimonials />
        <Contact />
        <Footer />

        {/* Cache Monitor (only visible in admin mode) */}
        {isAdmin && <CacheMonitor apiKey={adminApiKey} />}
      </div>
    </div>
  );
}

export default App;
