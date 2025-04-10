import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxClouds = () => {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);

  // Update window height on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create clouds with different sizes, positions, and parallax speeds
  const clouds = [
    {
      size: "w-64 h-32",
      initialPosition: { x: "10vw", y: "20vh" },
      parallaxFactor: 0.2,
      opacity: 0.15,
      blur: "blur-xl",
    },
    {
      size: "w-80 h-40",
      initialPosition: { x: "70vw", y: "30vh" },
      parallaxFactor: 0.3,
      opacity: 0.2,
      blur: "blur-xl",
    },
    {
      size: "w-48 h-24",
      initialPosition: { x: "30vw", y: "50vh" },
      parallaxFactor: 0.15,
      opacity: 0.1,
      blur: "blur-lg",
    },
    {
      size: "w-72 h-36",
      initialPosition: { x: "80vw", y: "70vh" },
      parallaxFactor: 0.25,
      opacity: 0.18,
      blur: "blur-xl",
    },
    {
      size: "w-56 h-28",
      initialPosition: { x: "20vw", y: "80vh" },
      parallaxFactor: 0.35,
      opacity: 0.12,
      blur: "blur-2xl",
    },
    {
      size: "w-96 h-48",
      initialPosition: { x: "50vw", y: "90vh" },
      parallaxFactor: 0.4,
      opacity: 0.08,
      blur: "blur-3xl",
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {clouds.map((cloud, index) => {
        // Calculate y position based on scroll with parallax effect
        const y = useTransform(
          scrollY,
          [0, windowHeight * 3], // Assuming 3 screen heights of scrollable content
          [cloud.initialPosition.y, `calc(${cloud.initialPosition.y} - ${scrollY.get() * cloud.parallaxFactor}px)`]
        );

        return (
          <motion.div
            key={index}
            className={`absolute ${cloud.size} rounded-full bg-white ${cloud.blur}`}
            style={{
              x: cloud.initialPosition.x,
              y,
              opacity: cloud.opacity,
            }}
            initial={{ opacity: cloud.opacity }} // Start with the target opacity
            animate={{ opacity: cloud.opacity }}
            transition={{ duration: 1 }}
          />
        );
      })}
    </div>
  );
};

export default ParallaxClouds;
