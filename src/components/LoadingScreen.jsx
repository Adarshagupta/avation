import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlaneDeparture } from 'react-icons/fa';

const LoadingScreen = ({ finishLoading }) => {
  const [progress, setProgress] = useState(0);
  const [showLoading, setShowLoading] = useState(true);

  // Simulate loading progress with minimum display time
  useEffect(() => {
    const startTime = Date.now();
    const minDisplayTime = 2000; // Minimum 2 seconds display time

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const timeProgress = Math.min(elapsedTime / minDisplayTime * 100, 100);

      setProgress(prev => {
        // Calculate natural loading progress
        const naturalProgress = prev + Math.random() * 15;
        const cappedNaturalProgress = naturalProgress >= 100 ? 100 : naturalProgress;

        // Use the slower of the two progress values
        return Math.min(cappedNaturalProgress, timeProgress);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // When progress reaches 100%, trigger the exit animation
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setShowLoading(false);
        setTimeout(() => {
          finishLoading();
        }, 1000); // Wait for exit animation to complete
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [progress, finishLoading]);

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div
          className="fixed inset-0 z-70 flex items-center justify-center"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', // Much lighter sky blue gradient
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Cloud elements */}
            <motion.div
              className="absolute top-[15%] left-[10%] w-[40%] h-[20%] rounded-full bg-white/60 blur-3xl"
              animate={{
                x: [0, 10, 0],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div
              className="absolute bottom-[20%] right-[15%] w-[30%] h-[15%] rounded-full bg-white/50 blur-3xl"
              animate={{
                x: [0, -15, 0],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* Subtle gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-sky-100/40 to-transparent"></div>
            
            {/* Light rays */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="absolute top-0 bg-white/30 blur-[2px]" 
                style={{
                  left: `${10 + i * 20}%`,
                  width: '3px',
                  height: `${50 + (i % 3) * 20}%`,
                  opacity: 0.4 + (i % 5) * 0.1,
                  transform: `rotate(${-5 + i * 2}deg)`,
                  transformOrigin: 'top',
                  boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.3)'
                }}
              />
            ))}
          </div>

          <div className="relative w-full max-w-md px-8 z-10">
            {/* Cockpit-inspired loading interface */}
            <div className="relative mb-12">
              {/* Animated plane */}
              <motion.div
                className="absolute -top-16 z-10"
                initial={{ x: "-100%" }}
                animate={{ x: `${progress - 10}%` }}
                transition={{ type: "spring", damping: 15 }}
              >
                <FaPlaneDeparture className="text-aviation-blue text-4xl" />

                {/* Plane trail */}
                <motion.div
                  className="absolute top-1/2 right-full w-20 h-1 origin-right"
                  style={{
                    background: "linear-gradient(to left, rgba(0, 71, 171, 0.6), rgba(0, 71, 171, 0))"
                  }}
                  animate={{
                    scaleX: [1, 1.5, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>

              {/* Progress track */}
              <div className="h-1 w-full bg-sky-200 rounded-full overflow-hidden relative backdrop-blur-sm">
                {/* Runway markings */}
                <div className="absolute inset-0 flex items-center justify-between px-2">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-0.5 bg-aviation-blue/20"
                    />
                  ))}
                </div>

                {/* Progress bar */}
                <motion.div
                  className="h-full bg-aviation-blue rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", damping: 15 }}
                />
              </div>

              {/* Instrument panel screws */}
              <div className="absolute -top-1 -left-1 w-1.5 h-1.5 rounded-full bg-aviation-blue/30" />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-aviation-blue/30" />
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-aviation-blue/30" />
              <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 rounded-full bg-aviation-blue/30" />
            </div>

            {/* Loading text */}
            <div className="text-center">
              <motion.div
                className="text-aviation-blue text-xl font-medium mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Preparing for Takeoff
              </motion.div>

              {/* Digital display */}
              <div className="inline-block bg-white/50 px-4 py-2 rounded-md border border-aviation-blue/10 backdrop-blur-sm shadow-lg">
                <div className="font-mono text-lg text-aviation-blue flex items-center justify-center">
                  <span>Loading:</span>
                  <motion.span
                    className="ml-2 font-bold"
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {Math.round(progress)}%
                  </motion.span>
                </div>

                {/* Status messages */}
                <div className="mt-2 font-mono text-xs text-aviation-blue/80 text-left">
                  {progress < 30 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      &gt; Initializing systems...
                    </motion.div>
                  )}

                  {progress >= 30 && progress < 60 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      &gt; Loading flight data...
                    </motion.div>
                  )}

                  {progress >= 60 && progress < 90 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      &gt; Preparing navigation...
                    </motion.div>
                  )}

                  {progress >= 90 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      &gt; Ready for takeoff!
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
