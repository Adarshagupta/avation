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
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Enhanced parallax and rotation effects
  const planeX = useTransform(scrollYProgress, [0, 1], ["-120%", "120%"]);
  const planeY = useTransform(scrollYProgress, [0, 1], ["50%", "-20%"]);
  const planeRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 15]);
  const planeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.8]);

  // Scroll-based opacity for sections
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const featuresOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const statsOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const missionOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  const features = [
    {
      icon: <FaChalkboardTeacher className="text-4xl" />,
      title: "Expert Instruction",
      description: "Learn from certified flight instructors with thousands of hours of real-world experience.",
      color: "from-blue-500 to-aviation-blue",
      bgImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60')"
    },
    {
      icon: <FaPlane className="text-4xl" />,
      title: "Modern Fleet",
      description: "Train on our well-maintained fleet of aircraft equipped with the latest avionics technology.",
      color: "from-aviation-accent to-orange-600",
      bgImage: "url('https://images.unsplash.com/photo-1581922780953-0fa792844070?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60')"
    },
    {
      icon: <FaGraduationCap className="text-4xl" />,
      title: "Comprehensive Programs",
      description: "From private pilot to commercial certifications, we offer complete aviation education paths.",
      color: "from-aviation-blue to-blue-700",
      bgImage: "url('https://images.unsplash.com/photo-1571942633544-9367aca94c18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60')"
    },
    {
      icon: <FaHandshake className="text-4xl" />,
      title: "Industry Connections",
      description: "Benefit from our relationships with major airlines and aviation companies for career placement.",
      color: "from-blue-400 to-aviation-blue",
      bgImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60')"
    }
  ];

  // Animated statistics
  const stats = [
    { value: 15, suffix: '+', label: 'Years of Excellence', icon: <FaMedal className="text-2xl" /> },
    { value: 5000, suffix: '+', label: 'Successful Graduates', icon: <FaGraduationCap className="text-2xl" /> },
    { value: 98, suffix: '%', label: 'Employment Rate', icon: <FaHandshake className="text-2xl" /> },
    { value: 30, suffix: '+', label: 'Aircraft Fleet', icon: <FaPlane className="text-2xl" /> }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-36 relative overflow-hidden bg-gradient-to-b from-white via-aviation-light/20 to-white"
    >
      {/* Modern animated flight paths */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-50" preserveAspectRatio="none">
        <motion.path
          d="M0,200 C300,100 700,300 1000,100"
          fill="none"
          stroke="rgba(0, 71, 171, 0.1)"
          strokeWidth="5"
          strokeDasharray="12,12"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,400 C200,300 500,500 1000,300"
          fill="none"
          stroke="rgba(255, 107, 0, 0.1)"
          strokeWidth="4"
          strokeDasharray="8,14"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,600 C400,500 600,700 1000,500"
          fill="none"
          stroke="rgba(0, 71, 171, 0.07)"
          strokeWidth="6"
          strokeDasharray="10,20"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.5, delay: 0.8, ease: "easeInOut" }}
        />
      </svg>

      {/* Enhanced animated planes with glow effect */}
      <motion.div
        className="absolute z-0 text-6xl text-aviation-blue/20 filter blur-[1px]"
        style={{
          x: planeX,
          y: planeY,
          rotate: planeRotate,
          scale: planeScale
        }}
      >
        <div className="relative">
          <FaPlaneDeparture className="text-8xl md:text-[14rem]" />
          <motion.div 
            className="absolute inset-0 bg-aviation-blue opacity-20 blur-xl rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute z-0 bottom-20 right-0 text-aviation-accent/15"
        initial={{ x: "100%", opacity: 0 }}
        animate={{
          x: ["-10%", "-30%", "-20%"],
          y: ["0%", "5%", "2%", "0%"],
          rotate: [170, 175, 172],
          opacity: 0.2
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="relative">
          <FaPlaneArrival className="text-7xl md:text-9xl" />
          <motion.div 
            className="absolute inset-0 bg-aviation-accent opacity-30 blur-xl rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.25, 0.1]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Modern Header Design */}
        <motion.div
          className="text-center relative mb-24 max-w-4xl mx-auto"
          style={{ opacity: headerOpacity }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative compass element */}
          <motion.div
            className="absolute -top-12 -left-12 text-aviation-blue/10 hidden md:block"
            initial={{ rotate: 0, opacity: 0 }}
            whileInView={{ rotate: 360, opacity: 0.15 }}
            viewport={{ once: true }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <FaCompass className="text-[120px]" />
          </motion.div>

          <motion.div
            className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-aviation-blue/20 to-aviation-accent/20 rounded-full text-aviation-blue font-medium backdrop-blur-sm"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Our Story
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-aviation-blue to-blue-700"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            About Aviation Academy
          </motion.h2>

          <motion.div
            className="w-32 h-2 bg-gradient-to-r from-aviation-blue to-aviation-accent mx-auto mb-8 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 128, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          <motion.p
            className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Since 2005, Aviation Academy has been <span className="text-aviation-blue font-semibold">shaping the future of aviation</span> with cutting-edge training programs, state-of-the-art facilities, and a commitment to excellence in flight education.
          </motion.p>
        </motion.div>

        {/* Modern interactive features cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32"
          style={{ opacity: featuresOpacity }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative h-[280px] rounded-2xl overflow-hidden shadow-xl group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              {/* Background image with overlay */}
              <motion.div 
                className="absolute inset-0 w-full h-full"
                animate={{ 
                  scale: hoveredFeature === index ? 1.1 : 1
                }}
                transition={{ duration: 0.5 }}
                style={{
                  backgroundImage: feature.bgImage,
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center'
                }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 group-hover:from-aviation-blue/90 group-hover:to-aviation-blue/60 transition-all duration-500" />
              
              <div className="relative h-full flex flex-col justify-between p-6 text-white z-10">
                <motion.div
                  className="mb-4 text-aviation-accent group-hover:scale-110"
                  whileHover={{ rotate: [0, -5, 5, -3, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>

                <div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-300 mb-5 transition-all duration-300 group-hover:text-white/90">
                    {feature.description}
                  </p>

                  <motion.button
                    className="flex items-center text-sm font-medium text-aviation-accent group-hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    Discover more <FiChevronRight className="ml-1" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modern Stats Section */}
        <motion.div
          ref={statsRef}
          className="relative mb-32 p-2 rounded-3xl overflow-hidden bg-gradient-to-br from-white to-gray-100"
          style={{ opacity: statsOpacity }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative elements */}
          <div className="absolute -right-16 -bottom-16 text-aviation-blue/5 rotate-45">
            <FaPlaneDeparture className="text-[200px]" />
          </div>

          <div className="px-8 py-16 backdrop-blur-sm">
            <motion.h3
              className="text-3xl font-bold text-center text-aviation-blue mb-16"
              initial={{ opacity: 0, y: -10 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Our Impact in Numbers
            </motion.h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isStatsInView ? {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5, delay: index * 0.15 }
                  } : {}}
                >
                  <motion.div 
                    className="mx-auto mb-5 w-20 h-20 rounded-full bg-gradient-to-br from-aviation-blue to-blue-600 flex items-center justify-center text-white shadow-lg"
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: "0 0 30px rgba(0, 71, 171, 0.5)" 
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  
                  <motion.div 
                    className="text-5xl font-bold text-gray-800 mb-1"
                    animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }}
                  >
                    <CounterStat
                      value={stat.value}
                      suffix={stat.suffix}
                      isInView={isStatsInView}
                      delay={index * 0.1}
                    />
                  </motion.div>
                  
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Modern Mission and Vision Tabs */}
        <motion.div
          ref={missionRef}
          className="relative rounded-3xl overflow-hidden bg-white shadow-xl"
          style={{ opacity: missionOpacity }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Cockpit-inspired tab navigation */}
          <div className="flex border-b bg-gray-50 backdrop-blur-sm sticky top-0 z-20">
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
          <div className="p-8 md:p-12 min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: isMissionInView ? 1 : 0,
                  x: isMissionInView ? 0 : 20
                }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
              <div>
                {activeTab === 'mission' && (
                  <motion.div
                    key="mission"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-aviation-blue to-blue-600">Our Mission</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      To provide world-class aviation education that prepares students for successful careers in the aviation industry,
                      with a focus on safety, excellence, and innovation. We aim to develop not just skilled pilots, but aviation leaders
                      with a comprehensive understanding of the industry.
                    </p>
                    <motion.div
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-aviation-blue text-white rounded-full cursor-pointer font-medium"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 71, 171, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Read more about our approach <FiChevronRight className="ml-1" />
                    </motion.div>
                  </motion.div>
                )}

                {activeTab === 'vision' && (
                  <motion.div
                    key="vision"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-aviation-blue to-blue-600">Our Vision</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      To be the leading aviation academy globally, recognized for producing highly skilled aviation professionals
                      who excel in their careers and contribute to advancing the aviation industry. We envision a future where our graduates
                      are at the forefront of aviation innovation and safety worldwide.
                    </p>
                    <motion.div
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-aviation-blue text-white rounded-full cursor-pointer font-medium"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 71, 171, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Discover our future plans <FiChevronRight className="ml-1" />
                    </motion.div>
                  </motion.div>
                )}

                {activeTab === 'values' && (
                  <motion.div
                    key="values"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-aviation-blue to-blue-600">Our Values</h3>
                    <ul className="space-y-4 text-gray-700">
                      {[
                        { value: "Excellence", desc: "Committed to the highest standards in education and training" },
                        { value: "Safety", desc: "Unwavering focus on safety in all aspects of our operations" },
                        { value: "Innovation", desc: "Embracing new technologies and teaching methods" },
                        { value: "Integrity", desc: "Maintaining the highest ethical standards" }
                      ].map((item, idx) => (
                        <motion.li 
                          key={idx}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.3 }}
                        >
                          <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-aviation-accent/20 flex items-center justify-center text-aviation-accent">
                            <FiCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-lg font-semibold text-aviation-blue">{item.value}</span>
                            <span className="text-gray-600">{item.desc}</span>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              <motion.div
                className="bg-aviation-blue rounded-2xl overflow-hidden relative h-[350px]"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(0, 71, 171, 0.5)",
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Dynamic content based on active tab */}
                {activeTab === 'mission' && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-aviation-blue via-blue-700 to-aviation-blue overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZpYXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                      <ul className="space-y-3">
                        {[
                          "State-of-the-art flight simulators",
                          "Modern fleet of training aircraft",
                          "Industry partnerships for job placement",
                          "Flexible training schedules",
                          "Financial aid options"
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.1 + index * 0.1
                            }}
                          >
                            <motion.div
                              className="flex-shrink-0 w-5 h-5 rounded-full bg-aviation-accent/30 flex items-center justify-center"
                              whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 107, 0, 0.5)" }}
                            >
                              <FiCheck className="w-3 h-3" />
                            </motion.div>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'vision' && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-600 via-aviation-blue to-blue-800 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1559628233-100c798642d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2aWF0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <h3 className="text-2xl font-bold mb-4">Our Global Reach</h3>
                      <p className="mb-6 text-white/90">
                        With graduates working in over 50 countries and partnerships with leading airlines worldwide,
                        our vision extends across borders.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div 
                          className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center"
                          whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                        >
                          <div className="text-4xl font-bold mb-1">50+</div>
                          <div>Countries</div>
                        </motion.div>
                        <motion.div 
                          className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center"
                          whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                        >
                          <div className="text-4xl font-bold mb-1">25+</div>
                          <div>Airline Partners</div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'values' && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-700 via-aviation-blue to-blue-600 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1531642765602-5cae5fa159d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF2aWF0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <h3 className="text-2xl font-bold mb-4">Our Achievements</h3>
                      <div className="space-y-4">
                        <motion.div
                          className="bg-white/15 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4"
                          whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                        >
                          <div className="w-12 h-12 rounded-full bg-aviation-accent/30 flex items-center justify-center flex-shrink-0">
                            <FiAward className="text-2xl" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">Aviation Excellence Award</h4>
                            <p className="text-sm opacity-90">2023 International Aviation Council</p>
                          </div>
                        </motion.div>
                        <motion.div
                          className="bg-white/15 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4"
                          whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                        >
                          <div className="w-12 h-12 rounded-full bg-aviation-accent/30 flex items-center justify-center flex-shrink-0">
                            <FiAward className="text-2xl" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">Safety Certification</h4>
                            <p className="text-sm opacity-90">5-Star Rating for 10 Consecutive Years</p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

// Modern Tab Button Component
const TabButton = ({ isActive, onClick, label, icon }) => (
  <motion.button
    className={`relative flex items-center py-4 px-6 font-medium transition-all ${
      isActive
        ? 'text-aviation-blue border-b-2 border-aviation-accent'
        : 'text-gray-600 hover:text-aviation-blue'
    }`}
    onClick={onClick}
    whileHover={{ y: isActive ? 0 : -2 }}
    whileTap={{ scale: 0.98 }}
  >
    {/* Enhanced glow effect */}
    {isActive && (
      <motion.div
        className="absolute inset-0 bg-aviation-blue/5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 1.02, 1] 
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    )}
    {icon}
    {label}
  </motion.button>
);

// Improved animated counter component
const CounterStat = ({ value, suffix = '', isInView, delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timeoutId;
    if (isInView) {
      timeoutId = setTimeout(() => {
        const duration = 1500; // Faster animation
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
      }, delay * 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [isInView, value, delay]);

  return (
    <div className="relative inline-block">
      <span className="font-bold relative z-10">
        {count}{suffix}
      </span>
      <motion.div
        className="absolute inset-0 bg-aviation-accent/10 rounded-full -z-0 blur-sm"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

export default About;
