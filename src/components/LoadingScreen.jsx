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
          className="fixed inset-0 z-50 flex items-center justify-center bg-aviation-blue"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative w-full max-w-md px-8">
            {/* Cockpit-inspired loading interface */}
            <div className="relative mb-12">
              {/* Animated plane */}
              <motion.div
                className="absolute -top-16 z-10"
                initial={{ x: "-100%" }}
                animate={{ x: `${progress - 10}%` }}
                transition={{ type: "spring", damping: 15 }}
              >
                <FaPlaneDeparture className="text-white text-4xl" />

                {/* Plane trail */}
                <motion.div
                  className="absolute top-1/2 right-full w-20 h-1 origin-right"
                  style={{
                    background: "linear-gradient(to left, rgba(255,255,255,0.8), rgba(255,255,255,0))"
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
              <div className="h-1 w-full bg-blue-800 rounded-full overflow-hidden relative">
                {/* Runway markings */}
                <div className="absolute inset-0 flex items-center justify-between px-2">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-0.5 bg-white/30"
                    />
                  ))}
                </div>

                {/* Progress bar */}
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", damping: 15 }}
                />
              </div>

              {/* Instrument panel screws */}
              <div className="absolute -top-1 -left-1 w-1.5 h-1.5 rounded-full bg-gray-400/40" />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-gray-400/40" />
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-gray-400/40" />
              <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 rounded-full bg-gray-400/40" />
            </div>

            {/* Loading text */}
            <div className="text-center">
              <motion.div
                className="text-white text-xl font-medium mb-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Preparing for Takeoff
              </motion.div>

              {/* Digital display */}
              <div className="inline-block bg-black/30 px-4 py-2 rounded-md border border-white/20 backdrop-blur-sm">
                <div className="font-mono text-lg text-white flex items-center justify-center">
                  <span>Loading:</span>
                  <motion.span
                    className="ml-2 text-aviation-accent"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {Math.round(progress)}%
                  </motion.span>
                </div>

                {/* Status messages */}
                <div className="mt-2 font-mono text-xs text-white/70 text-left">
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

            {/* Decorative elements */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full">
              <motion.div
                className="w-32 h-16 rounded-full bg-white/5 blur-xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>

            <div className="absolute top-1/3 right-0 transform -translate-y-1/2 translate-x-full">
              <motion.div
                className="w-24 h-24 rounded-full bg-white/5 blur-xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
