import { useEffect, useState } from 'react';
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
import ModernCourses from './components/ModernCourses';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminApiKey, setAdminApiKey] = useState('');

  // Smooth scrolling for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100, // Increased offset for fixed navbar
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

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
    <div className="min-h-screen">
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
        <ModernCourses />
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
