import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiAward, FiUsers, FiClock, FiTarget, FiBook, FiHeart, FiCheck, FiBookOpen, FiTrendingUp } from 'react-icons/fi';
import { FaPlane, FaChalkboardTeacher, FaUniversity, FaGraduationCap } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedPlanes from '../components/AnimatedPlanes';
import ParallaxClouds from '../components/ParallaxClouds';
import { CockpitButton } from '../components/CockpitUI';

const AboutPage = () => {
  // Animate tabs for history section
  const [activeTab, setActiveTab] = useState('mission');

  // Team member data
  const teamMembers = [
    {
      id: 1,
      name: "Capt. Michael Donovan",
      role: "Founder & Chief Instructor",
      bio: "With over 25,000 flight hours and 30 years of experience, Michael founded Aviation Academy to pass on his knowledge to the next generation of pilots.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Dr. Sarah Chen",
      role: "Director of Education",
      bio: "Former aerospace engineer with a PhD in Aeronautical Science, Sarah oversees our curriculum to ensure it meets the highest industry standards.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "James Rodriguez",
      role: "Chief Flight Instructor",
      bio: "FAA Certified Flight Instructor with specialization in multi-engine and instrument rating. James has trained over 200 pilots in his 15-year career.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Emma Wilson",
      role: "Simulator Training Lead",
      bio: "Former airline pilot with extensive experience in Boeing and Airbus fleets. Emma pioneered our advanced simulator training program.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  // Statistics data
  const stats = [
    { value: "2,500+", label: "Graduates", icon: <FaGraduationCap className="text-xl" /> },
    { value: "98%", label: "Employment Rate", icon: <FiUsers className="text-xl" /> },
    { value: "35+", label: "Years Experience", icon: <FiClock className="text-xl" /> },
    { value: "24", label: "Aircraft Fleet", icon: <FaPlane className="text-xl" /> }
  ];

  // Core values data
  const coreValues = [
    {
      icon: <FiAward />,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from our curriculum to our safety protocols.',
    },
    {
      icon: <FiUsers />,
      title: 'Community',
      description: 'We foster a supportive community where students learn from experienced instructors and each other.',
    },
    {
      icon: <FiBookOpen />,
      title: 'Education',
      description: 'We are committed to providing comprehensive, up-to-date education in aviation sciences.',
    },
    {
      icon: <FiHeart />,
      title: 'Passion',
      description: 'We share our passion for flight with our students, inspiring the next generation of aviators.',
    },
    {
      icon: <FiTrendingUp />,
      title: 'Innovation',
      description: 'We continually innovate our teaching methods and embrace new technologies in aviation.',
    },
    {
      icon: <FiCheck />,
      title: 'Safety',
      description: 'Safety is our top priority, ingrained in every aspect of our training programs.',
    },
  ];

  // Milestone data
  const milestones = [
    {
      year: '1995',
      title: 'Founding',
      description: 'Aviation Academy was founded with just two aircraft and a small team of passionate instructors.',
    },
    {
      year: '2002',
      title: 'Expansion',
      description: 'Expanded facilities to include a dedicated campus with classrooms, simulator rooms, and maintenance hangar.',
    },
    {
      year: '2008',
      title: 'Accreditation',
      description: 'Received national accreditation for all pilot training programs, setting the standard for aviation education.',
    },
    {
      year: '2013',
      title: 'International Recognition',
      description: 'Established partnerships with major airlines and expanded to welcome international students.',
    },
    {
      year: '2018',
      title: 'Modern Fleet',
      description: 'Modernized our fleet with next-generation aircraft equipped with glass cockpits and advanced avionics.',
    },
    {
      year: '2023',
      title: 'Virtual Learning',
      description: 'Launched virtual learning options and expanded our simulator training with cutting-edge technology.',
    },
  ];

  // Facilities data
  const facilities = [
    {
      title: 'Modern Fleet',
      image: '/images/facilities/fleet.jpg',
      description: 'Our diverse fleet of training aircraft includes single and multi-engine planes equipped with the latest avionics and safety features.',
    },
    {
      title: 'Advanced Simulators',
      image: '/images/facilities/simulators.jpg',
      description: 'State-of-the-art flight simulators provide realistic training experiences for various aircraft types and scenarios.',
    },
    {
      title: 'Campus & Classrooms',
      image: '/images/facilities/campus.jpg',
      description: 'Spacious classrooms with modern learning technology and comfortable study areas for theoretical instruction.',
    },
    {
      title: 'Maintenance Hangar',
      image: '/images/facilities/hangar.jpg',
      description: 'On-site maintenance facility where students can observe and learn about aircraft maintenance procedures.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background animations */}
      <AnimatedPlanes />
      <ParallaxClouds />
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="px-4 py-1.5 bg-aviation-blue/5 rounded-full text-aviation-blue font-medium border border-aviation-blue/10 inline-block mb-4">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-aviation-blue mb-6">About Aviation Academy</h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 1988, Aviation Academy has grown from a small flight school to one of the nation's premier aviation training centers. Our mission is to prepare the next generation of aviation professionals through excellence in education, training, and safety.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With state-of-the-art facilities, a diverse fleet of training aircraft, and experienced instructors, we provide a comprehensive learning environment for aspiring pilots at every level.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CockpitButton primary>
                  Meet Our Team
                </CockpitButton>
                <CockpitButton primary={false}>
                  Our Facilities
                </CockpitButton>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Aviation Academy Building" 
                  className="w-full h-auto rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <p className="text-sm font-medium">Aviation Academy Headquarters</p>
                  <p className="text-xs opacity-80">Est. 1988</p>
                </div>
              </div>
              
              {/* Floating accent elements */}
              <motion.div 
                className="absolute -top-6 -right-6 bg-aviation-accent/10 backdrop-blur-sm w-32 h-32 rounded-xl border border-aviation-accent/20 z-10"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-aviation-blue/10 backdrop-blur-sm w-24 h-24 rounded-xl border border-aviation-blue/20 z-10"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="px-4 py-1.5 bg-aviation-blue/5 rounded-full text-aviation-blue font-medium border border-aviation-blue/10 inline-block mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-aviation-blue mb-6">Our Mission & Vision</h2>
              <p className="text-lg text-gray-600">
                Learn about our purpose, values, and what drives us to excellence in aviation education.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Tab navigation */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-row lg:flex-col gap-2 mb-8 lg:mb-0 overflow-x-auto lg:overflow-visible py-2"
              >
                <button 
                  onClick={() => setActiveTab('mission')}
                  className={`px-4 py-3 rounded-lg text-left transition-all duration-200 whitespace-nowrap lg:whitespace-normal
                    ${activeTab === 'mission' 
                      ? 'bg-aviation-blue text-white shadow-md' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  Our Mission
                </button>
                <button 
                  onClick={() => setActiveTab('vision')}
                  className={`px-4 py-3 rounded-lg text-left transition-all duration-200 whitespace-nowrap lg:whitespace-normal
                    ${activeTab === 'vision' 
                      ? 'bg-aviation-blue text-white shadow-md' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  Our Vision
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`px-4 py-3 rounded-lg text-left transition-all duration-200 whitespace-nowrap lg:whitespace-normal
                    ${activeTab === 'history' 
                      ? 'bg-aviation-blue text-white shadow-md' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  Our History
                </button>
                <button 
                  onClick={() => setActiveTab('values')}
                  className={`px-4 py-3 rounded-lg text-left transition-all duration-200 whitespace-nowrap lg:whitespace-normal
                    ${activeTab === 'values' 
                      ? 'bg-aviation-blue text-white shadow-md' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  Our Values
                </button>
              </motion.div>
            </div>

            {/* Tab content */}
            <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {activeTab === 'mission' && (
                <motion.div 
                  key="mission"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 md:p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-aviation-blue/10 p-3 rounded-full">
                      <FiTarget className="text-aviation-blue text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-aviation-blue">Our Mission</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    At Aviation Academy, our mission is to provide exceptional aviation education that prepares students for successful careers in the aviation industry. We are committed to maintaining the highest standards of safety, excellence, and innovation in our training programs.
                  </p>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    We strive to cultivate a supportive learning environment where students can develop not only technical skills but also the critical thinking, decision-making, and leadership qualities essential for aviation professionals.
                  </p>
                  
                  <div className="bg-aviation-blue/5 border border-aviation-blue/10 rounded-lg p-4 mb-6">
                    <p className="text-aviation-blue font-medium italic">
                      "Our mission is to transform passionate individuals into skilled aviation professionals who uphold the highest standards of safety and excellence."
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FaPlane className="text-aviation-accent" />
                        <h4 className="font-medium">Excellence in Training</h4>
                      </div>
                      <p className="text-sm text-gray-600">Providing world-class instruction using advanced methods</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FaChalkboardTeacher className="text-aviation-accent" />
                        <h4 className="font-medium">Expert Instruction</h4>
                      </div>
                      <p className="text-sm text-gray-600">Learning from experienced aviation professionals</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FaUniversity className="text-aviation-accent" />
                        <h4 className="font-medium">Comprehensive Programs</h4>
                      </div>
                      <p className="text-sm text-gray-600">From private pilot to airline transport pilot</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'vision' && (
                <motion.div 
                  key="vision"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 md:p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-aviation-blue/10 p-3 rounded-full">
                      <FiBook className="text-aviation-blue text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-aviation-blue">Our Vision</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    We envision Aviation Academy as the premier institution for aviation education, recognized globally for producing skilled, responsible, and forward-thinking aviation professionals who shape the future of flight.
                  </p>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Our vision extends beyond traditional training to embrace emerging technologies, sustainable practices, and the evolving needs of the aviation industry. We aim to be at the forefront of innovation while maintaining our commitment to safety and excellence.
                  </p>
                  
                  <div className="bg-aviation-blue/5 border border-aviation-blue/10 rounded-lg p-4 mb-6">
                    <p className="text-aviation-blue font-medium italic">
                      "We aspire to be the global benchmark for aviation education, where tradition meets innovation to prepare the aviators of tomorrow."
                    </p>
                  </div>
                  
                  <img 
                    src="https://images.unsplash.com/photo-1559628233-100c798642d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Aviation training" 
                    className="w-full h-56 object-cover rounded-lg mt-6"
                  />
                </motion.div>
              )}

              {activeTab === 'history' && (
                <motion.div 
                  key="history"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 md:p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-aviation-blue/10 p-3 rounded-full">
                      <FiClock className="text-aviation-blue text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-aviation-blue">Our History</h3>
                  </div>
                  
                  <div className="relative border-l-2 border-aviation-blue/30 pl-6 pb-6">
                    <div className="mb-8">
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-aviation-blue"></div>
                      <h4 className="text-xl font-bold text-aviation-blue mb-2">1988: The Beginning</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Founded by Captain Michael Donovan with just two aircraft and a small hangar, Aviation Academy began offering private pilot training to a class of 12 students.
                      </p>
                    </div>
                    
                    <div className="mb-8">
                      <div className="absolute -left-2 top-[7.5rem] w-4 h-4 rounded-full bg-aviation-blue"></div>
                      <h4 className="text-xl font-bold text-aviation-blue mb-2">1995: Expansion</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Grew to include commercial and instrument rating programs, expanding our fleet to 10 aircraft and opening a dedicated training facility.
                      </p>
                    </div>
                    
                    <div className="mb-8">
                      <div className="absolute -left-2 top-[15rem] w-4 h-4 rounded-full bg-aviation-blue"></div>
                      <h4 className="text-xl font-bold text-aviation-blue mb-2">2005: Innovation</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Introduced state-of-the-art flight simulators and became one of the first schools to integrate digital learning platforms into our curriculum.
                      </p>
                    </div>
                    
                    <div>
                      <div className="absolute -left-2 top-[22.5rem] w-4 h-4 rounded-full bg-aviation-blue"></div>
                      <h4 className="text-xl font-bold text-aviation-blue mb-2">Today</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Now recognized as one of the premier aviation training centers in North America, with a diverse fleet of 24 aircraft, advanced simulation technology, and comprehensive programs from private pilot to airline transport pilot certification.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'values' && (
                <motion.div 
                  key="values"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 md:p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-aviation-blue/10 p-3 rounded-full">
                      <FiHeart className="text-aviation-blue text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-aviation-blue">Our Core Values</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    These fundamental principles guide every aspect of our operations, from curriculum development to student interactions and industry partnerships.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {coreValues.map((value, index) => (
                      <motion.div 
                        key={value.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-50 rounded-lg p-5 border border-gray-100"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-white p-3 rounded-full shadow-sm">
                            {value.icon}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-aviation-blue mb-2">{value.title}</h4>
                            <p className="text-gray-600">{value.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-aviation-blue">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="px-4 py-1.5 bg-aviation-blue/5 rounded-full text-aviation-blue font-medium border border-aviation-blue/10 inline-block mb-4">
              Our Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-aviation-blue mb-6">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              Our experienced instructors and staff bring decades of aviation expertise to provide you with the best education possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl overflow-hidden group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-white/90 text-sm">{member.role}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                  <div className="mt-4 flex justify-end">
                    <button className="text-aviation-blue font-medium text-sm hover:text-aviation-accent transition-colors">
                      View Profile →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-16"
          >
            <CockpitButton primary={false}>
              View All Instructors
            </CockpitButton>
          </motion.div>
        </div>
      </section>

      {/* Facilities section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-aviation-blue font-semibold text-sm uppercase tracking-wider mb-2 block">Where We Learn</span>
            <h2 className="text-3xl md:text-4xl font-bold text-aviation-blue mb-6">Our Facilities</h2>
            <p className="text-gray-600">
              Our state-of-the-art facilities provide students with the ideal environment for learning and practical training.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative h-80 rounded-xl overflow-hidden shadow-md"
              >
                <img 
                  src={facility.image} 
                  alt={facility.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{facility.title}</h3>
                  <p className="text-white/90 text-sm">{facility.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2"
            >
              <span className="text-aviation-blue font-semibold text-sm uppercase tracking-wider mb-2 block">Recognized Excellence</span>
              <h2 className="text-3xl md:text-4xl font-bold text-aviation-blue mb-6">Our Accreditations</h2>
              <p className="text-gray-600 mb-6">
                Aviation Academy maintains the highest standards of education and training, recognized by leading aviation authorities and accreditation bodies worldwide.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FiCheck className="text-aviation-blue mt-1 mr-2" />
                  <span className="text-gray-600">Federal Aviation Administration (FAA) Part 141 Certification</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-aviation-blue mt-1 mr-2" />
                  <span className="text-gray-600">Aviation Accreditation Board International (AABI)</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-aviation-blue mt-1 mr-2" />
                  <span className="text-gray-600">National Association of Flight Instructors (NAFI) Recognition</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-aviation-blue mt-1 mr-2" />
                  <span className="text-gray-600">International Air Transport Association (IATA) Training Partner</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-aviation-blue mt-1 mr-2" />
                  <span className="text-gray-600">Council on Aviation Accreditation (CAA) Approval</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2 grid grid-cols-3 gap-6"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                <img src="/images/accreditations/faa.png" alt="FAA Logo" className="h-16" />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                <img src="/images/accreditations/aabi.png" alt="AABI Logo" className="h-16" />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                <img src="/images/accreditations/nafi.png" alt="NAFI Logo" className="h-16" />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                <img src="/images/accreditations/iata.png" alt="IATA Logo" className="h-16" />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                <img src="/images/accreditations/caa.png" alt="CAA Logo" className="h-16" />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                <img src="/images/accreditations/easa.png" alt="EASA Logo" className="h-16" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-aviation-blue text-white">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Aviation Journey?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join a community of passionate aviators and begin your path to a rewarding career in the skies. Schedule a campus visit or apply to our programs today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CockpitButton primary>
                Apply Now
              </CockpitButton>
              <CockpitButton secondary>
                Schedule a Campus Tour
              </CockpitButton>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage; 