import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { FaPlane, FaGraduationCap, FaHandshake, FaMedal } from 'react-icons/fa';

const ModernAbout = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });
  const [activeFeature, setActiveFeature] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  // Features with more modern descriptions
  const features = [
    {
      icon: <FaPlane />,
      title: "Modern Fleet",
      description: "Train on our cutting-edge fleet equipped with the latest avionics and technology for an immersive learning experience.",
      color: "blue",
      image: "https://images.unsplash.com/photo-1559628233-100c798642d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      icon: <FaGraduationCap />,
      title: "Comprehensive Programs",
      description: "From private pilot to commercial certifications, our structured programs create clear pathways to aviation success.",
      color: "orange",
      image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      icon: <FaHandshake />,
      title: "Industry Connections",
      description: "Leverage our extensive network of airline partnerships for career opportunities and professional advancement.",
      color: "blue",
      image: "https://images.unsplash.com/photo-1531642765602-5cae5fa159d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  // Animated statistics
  const stats = [
    { value: 15, suffix: '+', label: 'Years of Excellence', icon: <FaMedal /> },
    { value: 5000, suffix: '+', label: 'Successful Graduates', icon: <FaGraduationCap /> },
    { value: 98, suffix: '%', label: 'Employment Rate', icon: <FaHandshake /> },
    { value: 30, suffix: '+', label: 'Aircraft Fleet', icon: <FaPlane /> }
  ];

  // Values for the mission section
  const values = [
    { value: "Excellence", desc: "Setting the highest standards in aviation education" },
    { value: "Safety", desc: "Unwavering commitment to safety in all operations" },
    { value: "Innovation", desc: "Pioneering new approaches to flight training" },
    { value: "Integrity", desc: "Maintaining ethical standards in everything we do" }
  ];

  // Auto-rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-100 mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-orange-100 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-purple-100 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-3 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full font-medium text-sm tracking-wide"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            ABOUT AVATION
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Excellence in Aviation
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Cutting-edge training with state-of-the-art facilities for tomorrow's aviation leaders.
          </motion.p>
        </motion.div>

        {/* Interactive Feature Showcase */}
        <div className="mb-20 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left side - Feature image */}
            <motion.div
              className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeFeature === index ? 1 : 0,
                    transition: { duration: 0.8 }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-20 text-white">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                      feature.color === 'blue' ? 'bg-blue-500/20 text-blue-100' : 'bg-orange-500/20 text-orange-100'
                    }`}>
                      Featured
                    </div>
                    <h3 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{feature.title}</h3>
                    <p className="text-white/80 mb-2 md:mb-4 max-w-lg text-sm md:text-base line-clamp-2 md:line-clamp-none">{feature.description}</p>
                  </div>
                </motion.div>
              ))}

              {/* Navigation dots */}
              <div className="absolute bottom-6 right-8 flex space-x-2 z-30">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeFeature === index
                        ? 'bg-white scale-125'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`View feature ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right side - Mission & Values */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Our Mission</h3>
                <p className="text-gray-600 text-base md:text-lg mb-6">
                  To provide world-class aviation education with a focus on safety, excellence, and innovation.
                  We develop skilled pilots and aviation leaders ready for the industry's challenges.
                </p>
                <motion.button
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Learn more <FiArrowRight className="ml-2" />
                </motion.button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-semibold mb-4 text-gray-900">Our Core Values</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {values.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-0.5">
                        <FiCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="ml-3">
                        <span className="block font-medium text-gray-800">{item.value}</span>
                        <span className="text-gray-500 text-sm">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Statistics Section */}
        <motion.div
          ref={statsRef}
          className="mb-16 md:mb-20 py-10 md:py-16 px-6 md:px-8 lg:px-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background details */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white opacity-10 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white opacity-10 blur-3xl"></div>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
            </div>
          </div>

          {/* Content */}
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Our Impact</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isStatsInView ? {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.1 }
                  } : {}}
                >
                  <div className="mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm rounded-full mx-auto flex items-center justify-center shadow-lg">
                    <div className="text-xl md:text-2xl">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl md:text-4xl font-bold mb-1">
                    <CounterStat
                      value={stat.value}
                      suffix={stat.suffix}
                      isInView={isStatsInView}
                      delay={index * 0.1}
                    />
                  </div>
                  <p className="text-white/90 font-medium text-xs md:text-base">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Start Your Aviation Journey</h3>
          <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg">
            Join thousands of successful graduates who have launched their careers with us.
            Our expert instructors are ready to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:bg-blue-700 transition-colors"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Programs
            </motion.button>
            <motion.button
              className="px-8 py-3 bg-white text-blue-600 border border-blue-200 rounded-full font-medium shadow-sm hover:bg-blue-50 transition-colors"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Tour
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Simplified counter component
const CounterStat = ({ value, suffix = '', isInView, delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timeoutId;
    if (isInView) {
      timeoutId = setTimeout(() => {
        const duration = 1000;
        const startTime = Date.now();

        const updateCounter = () => {
          const now = Date.now();
          const progress = Math.min((now - startTime) / duration, 1);
          const currentCount = Math.floor(progress * value);

          setCount(currentCount);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        };

        requestAnimationFrame(updateCounter);
      }, delay * 400);
    }

    return () => clearTimeout(timeoutId);
  }, [isInView, value, delay]);

  return count + suffix;
};

export default ModernAbout;
