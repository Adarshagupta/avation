import { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Reusable animated component that triggers on scroll
export const AnimateOnScroll = ({ 
  children, 
  className = "", 
  animation = "fadeIn", 
  delay = 0,
  duration = 0.5,
  threshold = 0.2,
  once = true
}) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, threshold });
  
  // Animation variants
  const animations = {
    fadeIn: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    rotateIn: {
      hidden: { opacity: 0, rotate: -5 },
      visible: { opacity: 1, rotate: 0 }
    },
    planeIn: {
      hidden: { opacity: 0, x: -100, y: 50 },
      visible: { opacity: 1, x: 0, y: 0 }
    },
    planeOut: {
      hidden: { opacity: 0, x: 0, y: 0 },
      visible: { opacity: 1, x: 100, y: -50 }
    }
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={animations[animation]}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation
export const StaggerChildren = ({ 
  children, 
  className = "", 
  staggerDelay = 0.1,
  containerAnimation = "fadeIn",
  childAnimation = "fadeIn",
  containerDelay = 0,
  containerDuration = 0.5,
  childDuration = 0.5,
  threshold = 0.2,
  once = true
}) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, threshold });
  
  // Animation variants
  const containerVariants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: staggerDelay
        }
      }
    },
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          when: "beforeChildren",
          staggerChildren: staggerDelay
        }
      }
    }
  };
  
  const childVariants = {
    fadeIn: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    rotateIn: {
      hidden: { opacity: 0, rotate: -5 },
      visible: { opacity: 1, rotate: 0 }
    },
    planeIn: {
      hidden: { opacity: 0, x: -100, y: 50 },
      visible: { opacity: 1, x: 0, y: 0 }
    }
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={containerVariants[containerAnimation]}
      transition={{ duration: containerDuration, delay: containerDelay }}
    >
      {React.Children.map(children, child => (
        <motion.div
          variants={childVariants[childAnimation]}
          transition={{ duration: childDuration }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Import React at the top
import React from 'react';

export default { AnimateOnScroll, StaggerChildren };
