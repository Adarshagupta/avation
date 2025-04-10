import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaPlaneDeparture, FaPlaneArrival, FaPlane } from 'react-icons/fa';

const AnimatedPlanes = () => {
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

  // Create planes with different paths and speeds
  const planes = [
    {
      icon: <FaPlaneDeparture />,
      size: "text-4xl md:text-5xl",
      color: "text-aviation-blue",
      xRange: ["-10vw", "110vw"],
      yRange: ["20vh", "30vh"],
      rotateRange: [0, 15],
      duration: 25,
      delay: 0,
      scrollStart: 0.1,
      scrollEnd: 0.3,
    },
    {
      icon: <FaPlane />,
      size: "text-3xl md:text-4xl",
      color: "text-aviation-accent",
      xRange: ["110vw", "-10vw"],
      yRange: ["40vh", "50vh"],
      rotateRange: [180, 165],
      duration: 20,
      delay: 5,
      scrollStart: 0.3,
      scrollEnd: 0.5,
    },
    {
      icon: <FaPlaneArrival />,
      size: "text-5xl md:text-6xl",
      color: "text-aviation-blue",
      xRange: ["-10vw", "110vw"],
      yRange: ["60vh", "70vh"],
      rotateRange: [0, -10],
      duration: 30,
      delay: 10,
      scrollStart: 0.5,
      scrollEnd: 0.7,
    },
    {
      icon: <FaPlane />,
      size: "text-4xl md:text-5xl",
      color: "text-aviation-accent/80",
      xRange: ["110vw", "-10vw"],
      yRange: ["80vh", "85vh"],
      rotateRange: [180, 190],
      duration: 22,
      delay: 15,
      scrollStart: 0.7,
      scrollEnd: 0.9,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {planes.map((plane, index) => {
        // Set default opacity to 1 for the first plane, and use transform for additional planes
        const opacity = index === 0 ? 1 : useTransform(
          scrollY,
          [
            0,
            windowHeight * plane.scrollStart,
            windowHeight * ((plane.scrollStart + plane.scrollEnd) / 2),
            windowHeight * plane.scrollEnd
          ],
          [0.3, 0.3, 1, 0.3]
        );

        return (
          <motion.div
            key={index}
            className={`absolute ${plane.size} ${plane.color}`}
            style={{ opacity }}
            initial={{
              x: plane.xRange[0],
              y: plane.yRange[0],
              rotate: plane.rotateRange[0],
              opacity: index === 0 ? 1 : 0.3 // Start with visible first plane
            }}
            animate={{
              x: plane.xRange[1],
              y: plane.yRange[1],
              rotate: plane.rotateRange[1]
            }}
            transition={{
              duration: plane.duration,
              delay: plane.delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          >
            {plane.icon}
          </motion.div>
        );
      })}

      {/* Cloud-like elements - always visible with varying opacity */}
      <motion.div
        className="absolute w-40 h-20 rounded-full bg-white/20 blur-xl"
        style={{
          opacity: useTransform(
            scrollY,
            [0, windowHeight * 0.3, windowHeight * 0.6],
            [0.3, 0.5, 0.3]
          )
        }}
        initial={{ x: "10vw", y: "25vh", opacity: 0.3 }}
        animate={{
          x: ["10vw", "20vw", "10vw"],
          y: ["25vh", "28vh", "25vh"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <motion.div
        className="absolute w-60 h-30 rounded-full bg-white/15 blur-xl"
        style={{
          opacity: useTransform(
            scrollY,
            [0, windowHeight * 0.3, windowHeight * 0.6, windowHeight * 0.9],
            [0.2, 0.2, 0.4, 0.2]
          )
        }}
        initial={{ x: "70vw", y: "55vh", opacity: 0.2 }}
        animate={{
          x: ["70vw", "60vw", "70vw"],
          y: ["55vh", "58vh", "55vh"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <motion.div
        className="absolute w-32 h-16 rounded-full bg-white/25 blur-xl"
        style={{
          opacity: useTransform(
            scrollY,
            [0, windowHeight * 0.6, windowHeight * 0.8, windowHeight * 1.2],
            [0.25, 0.25, 0.6, 0.25]
          )
        }}
        initial={{ x: "30vw", y: "75vh", opacity: 0.25 }}
        animate={{
          x: ["30vw", "40vw", "30vw"],
          y: ["75vh", "72vh", "75vh"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </div>
  );
};

export default AnimatedPlanes;
