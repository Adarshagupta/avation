import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { FiAward, FiBookOpen, FiChevronRight, FiTarget, FiShield, FiCheck } from 'react-icons/fi';
import { FaPlaneDeparture, FaPlaneArrival, FaPlane, FaChalkboardTeacher, FaGraduationCap, FaHandshake, FaCompass, FaMedal } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import { CockpitPanel, CockpitButton, CockpitGauge } from './CockpitUI';

const About = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const missionRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });
  const isMissionInView = useInView(missionRef, { once: false, amount: 0.3 });
  const [activeTab, setActiveTab] = useState('mission');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Simplified animations for better performance
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0.7, 1]);

  const features = [
    {
      icon: <FaChalkboardTeacher />,
      title: "Expert Instruction",
      description: "Learn from certified flight instructors with thousands of hours of real-world experience.",
      color: "blue"
    },
    {
      icon: <FaPlane />,
      title: "Modern Fleet",
      description: "Train on our well-maintained fleet of aircraft equipped with the latest avionics technology.",
      color: "orange"
    },
    {
      icon: <FaGraduationCap />,
      title: "Comprehensive Programs",
      description: "From private pilot to commercial certifications, we offer complete aviation education paths.",
      color: "blue"
    },
    {
      icon: <FaHandshake />,
      title: "Industry Connections",
      description: "Benefit from our relationships with major airlines and aviation companies for career placement.",
      color: "orange"
    }
  ];

  // Animated statistics
  const stats = [
    { value: 15, suffix: '+', label: 'Years of Excellence', icon: <FaMedal /> },
    { value: 5000, suffix: '+', label: 'Successful Graduates', icon: <FaGraduationCap /> },
    { value: 98, suffix: '%', label: 'Employment Rate', icon: <FaHandshake /> },
    { value: 30, suffix: '+', label: 'Aircraft Fleet', icon: <FaPlane /> }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white navbar-spacing"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Flight path lines */}
        <svg className="absolute h-full w-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M0,40 C20,20 35,30 50,30 C65,30 80,20 100,40"
            stroke="rgba(0, 71, 171, 0.15)"
            fill="none"
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <motion.path
            d="M0,60 C15,80 35,70 50,70 C65,70 85,80 100,60"
            stroke="rgba(255, 107, 0, 0.1)"
            fill="none"
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          />
        </svg>

        {/* Subtle plane silhouettes */}
        <div className="absolute top-1/3 -right-20 text-gray-100 rotate-12">
          <FaPlaneDeparture className="w-64 h-64" />
        </div>
        <div className="absolute bottom-1/4 -left-20 text-gray-100 -rotate-12">
          <FaPlaneArrival className="w-48 h-48" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-20"
          style={{ opacity: headerOpacity }}
        >
          <motion.div
            className="inline-block mb-3 px-4 py-1.5 bg-aviation-blue/10 rounded-full text-aviation-blue font-medium text-sm"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            ABOUT US
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-clip-text text-aviation-blue"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Shaping the Future of Aviation Since 2005
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-aviation-accent mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <motion.p
            className="text-lg text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Aviation Academy provides cutting-edge training programs and state-of-the-art facilities
            with an unwavering commitment to excellence in flight education.
          </motion.p>
        </motion.div>

        {/* Core Features */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Top accent line */}
                <div className={`h-1 w-full ${feature.color === 'blue' ? 'bg-aviation-blue' : 'bg-aviation-accent'}`}></div>

                {/* Icon and content */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4 ${
                    feature.color === 'blue'
                      ? 'text-aviation-blue bg-aviation-blue/10'
                      : 'text-aviation-accent bg-aviation-accent/10'
                  }`}>
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 mb-6 flex-grow">
                    {feature.description}
                  </p>

                  <button
                    className={`flex items-center text-sm font-medium mt-auto ${
                      feature.color === 'blue' ? 'text-aviation-blue' : 'text-aviation-accent'
                    }`}
                  >
                    Learn more <FiChevronRight className="ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <motion.div
          ref={statsRef}
          className="mb-24 py-16 px-6 lg:px-16 bg-gradient-to-r from-aviation-blue to-blue-700 rounded-2xl shadow-lg text-white relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background details */}
          <div className="absolute inset-0">
            <svg className="absolute right-0 top-0 h-full w-1/2 text-white opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M0,0 L100,0 L100,100 L0,100 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="4,4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
              />
            </svg>
            <div className="absolute -bottom-16 -right-16 text-white opacity-5">
              <FaPlaneDeparture className="w-64 h-64" />
            </div>
          </div>

          {/* Content */}
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">Our Impact in Numbers</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
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
                  <div className="mb-3 w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-full mx-auto flex items-center justify-center">
                    <div className="text-xl md:text-2xl">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-1">
                    <CounterStat
                      value={stat.value}
                      suffix={stat.suffix}
                      isInView={isStatsInView}
                      delay={index * 0.1}
                    />
                  </div>
                  <p className="text-white/90 text-sm md:text-base font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mission & Vision Tabs */}
        <motion.div
          ref={missionRef}
          className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Tab navigation */}
          <div className="flex border-b bg-gray-50">
            <TabButton
              isActive={activeTab === 'mission'}
              onClick={() => setActiveTab('mission')}
              label="Our Mission"
              icon={<FiTarget className="mr-2" />}
            />
            <TabButton
              isActive={activeTab === 'vision'}
              onClick={() => setActiveTab('vision')}
              label="Our Vision"
              icon={<FiBookOpen className="mr-2" />}
            />
            <TabButton
              isActive={activeTab === 'values'}
              onClick={() => setActiveTab('values')}
              label="Our Values"
              icon={<FiShield className="mr-2" />}
            />
          </div>

          {/* Tab content */}
          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
              >
                <div>
                  {activeTab === 'mission' && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-aviation-blue">Our Mission</h3>
                      <p className="text-gray-600">
                        To provide world-class aviation education that prepares students for successful careers in the aviation industry,
                        with a focus on safety, excellence, and innovation. We aim to develop not just skilled pilots, but aviation leaders
                        with a comprehensive understanding of the industry.
                      </p>
                      <button className="px-6 py-2.5 mt-2 bg-aviation-blue text-white rounded-lg inline-flex items-center font-medium">
                        Read more <FiChevronRight className="ml-1" />
                      </button>
                    </div>
                  )}

                  {activeTab === 'vision' && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-aviation-blue">Our Vision</h3>
                      <p className="text-gray-600">
                        To be the leading aviation academy globally, recognized for producing highly skilled aviation professionals
                        who excel in their careers and contribute to advancing the aviation industry. We envision a future where our graduates
                        are at the forefront of aviation innovation and safety worldwide.
                      </p>
                      <button className="px-6 py-2.5 mt-2 bg-aviation-blue text-white rounded-lg inline-flex items-center font-medium">
                        Discover more <FiChevronRight className="ml-1" />
                      </button>
                    </div>
                  )}

                  {activeTab === 'values' && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-aviation-blue">Our Values</h3>
                      <ul className="space-y-3 text-gray-600">
                        {[
                          { value: "Excellence", desc: "Committed to the highest standards in education and training" },
                          { value: "Safety", desc: "Unwavering focus on safety in all aspects of our operations" },
                          { value: "Innovation", desc: "Embracing new technologies and teaching methods" },
                          { value: "Integrity", desc: "Maintaining the highest ethical standards" }
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start"
                          >
                            <div className="flex-shrink-0 w-5 h-5 mt-1 rounded-full bg-aviation-accent/20 flex items-center justify-center text-aviation-accent">
                              <FiCheck className="w-3 h-3" />
                            </div>
                            <div className="ml-3">
                              <span className="block font-medium text-gray-800">{item.value}</span>
                              <span>{item.desc}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="bg-aviation-blue rounded-lg overflow-hidden h-[300px] relative">
                  {/* Dynamic content based on active tab */}
                  {activeTab === 'mission' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-aviation-blue to-blue-800 overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-20 bg-cover bg-center"
                        style={{
                          backgroundImage: "url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60')"
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                        <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
                        <ul className="space-y-2">
                          {[
                            "State-of-the-art flight simulators",
                            "Modern fleet of training aircraft",
                            "Industry partnerships for job placement",
                            "Flexible training schedules",
                            "Financial aid options"
                          ].map((item, index) => (
                            <li
                              key={index}
                              className="flex items-center"
                            >
                              <div className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center mr-2">
                                <FiCheck className="w-2.5 h-2.5" />
                              </div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'vision' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-aviation-blue to-blue-800 overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-20 bg-cover bg-center"
                        style={{
                          backgroundImage: "url('https://images.unsplash.com/photo-1559628233-100c798642d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60')"
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                        <h3 className="text-xl font-bold mb-4">Our Global Reach</h3>
                        <p className="mb-4 text-white/90">
                          With graduates working in over 50 countries and partnerships with leading airlines worldwide.
                        </p>
                        <div className="flex space-x-4">
                          <div className="bg-white/10 rounded-lg p-3 text-center flex-1">
                            <div className="text-2xl font-bold">50+</div>
                            <div className="text-sm">Countries</div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3 text-center flex-1">
                            <div className="text-2xl font-bold">25+</div>
                            <div className="text-sm">Airline Partners</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'values' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-aviation-blue to-blue-800 overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-20 bg-cover bg-center"
                        style={{
                          backgroundImage: "url('https://images.unsplash.com/photo-1531642765602-5cae5fa159d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60')"
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                        <h3 className="text-xl font-bold mb-4">Our Achievements</h3>
                        <div className="space-y-3">
                          <div className="bg-white/10 rounded-lg p-3 flex items-center">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                              <FiAward className="text-xl" />
                            </div>
                            <div>
                              <div className="font-medium">Aviation Excellence Award</div>
                              <div className="text-sm text-white/80">2023 International Aviation Council</div>
                            </div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3 flex items-center">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                              <FiAward className="text-xl" />
                            </div>
                            <div>
                              <div className="font-medium">Safety Certification</div>
                              <div className="text-sm text-white/80">5-Star Rating for 10 Consecutive Years</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Simplified Tab Button Component
const TabButton = ({ isActive, onClick, label, icon }) => (
  <button
    className={`relative flex items-center py-3 px-4 font-medium text-sm transition-colors ${
      isActive
        ? 'text-aviation-blue border-b-2 border-aviation-accent'
        : 'text-gray-500 hover:text-gray-800'
    }`}
    onClick={onClick}
  >
    {icon}
    {label}
  </button>
);

// Simplified counter component
const CounterStat = ({ value, suffix = '', isInView, delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timeoutId;
    if (isInView) {
      timeoutId = setTimeout(() => {
        const duration = 800;
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

export default About;
