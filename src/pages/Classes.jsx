import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { FiClock, FiCalendar, FiUsers, FiArrowRight, FiAward, FiDollarSign } from 'react-icons/fi';
import { FaPlane, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { CockpitButton } from '../components/CockpitUI';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedPlanes from '../components/AnimatedPlanes';
import ParallaxClouds from '../components/ParallaxClouds';

// Sample class data - in a real application, this would come from an API
const classesData = [
  {
    id: 1,
    title: "Private Pilot Ground School",
    description: "This comprehensive ground school prepares students for the FAA Private Pilot written exam, covering all theoretical aspects of flight.",
    image: "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    instructor: "Captain Michael Reynolds",
    schedule: "Tuesdays & Thursdays, 6:00 PM - 8:30 PM",
    duration: "8 weeks",
    maxStudents: 12,
    currentEnrollment: 8,
    certificationAwarded: "FAA Private Pilot Written Exam Preparation",
    price: "$1,200",
    category: "Ground School",
    featured: true,
    startDate: "June 15, 2023",
    prerequisites: "None - suitable for complete beginners"
  },
  {
    id: 2,
    title: "Instrument Rating Simulator Training",
    description: "Master instrument flying procedures using our advanced flight simulators, preparing you for actual instrument flight conditions.",
    image: "https://images.unsplash.com/photo-1531125125109-4898ff13e3e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    instructor: "Sarah Johnson, CFII",
    schedule: "Weekends, 9:00 AM - 12:00 PM",
    duration: "6 weeks",
    maxStudents: 6,
    currentEnrollment: 5,
    certificationAwarded: "Simulator Proficiency Certificate",
    price: "$1,800",
    category: "Simulator Training",
    featured: true,
    startDate: "July 8, 2023",
    prerequisites: "Private Pilot License"
  },
  {
    id: 3,
    title: "Commercial Pilot Theory",
    description: "In-depth coverage of advanced aerodynamics, aircraft systems, regulations and commercial operations for aspiring professional pilots.",
    image: "https://images.unsplash.com/photo-1497269146422-b43a4bf6eedb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    instructor: "Dr. Robert Chen",
    schedule: "Mondays, Wednesdays & Fridays, 5:30 PM - 7:30 PM",
    duration: "12 weeks",
    maxStudents: 15,
    currentEnrollment: 11,
    certificationAwarded: "Commercial Pilot Theory Certificate",
    price: "$2,200",
    category: "Ground School",
    featured: false,
    startDate: "August 1, 2023",
    prerequisites: "Private Pilot License or equivalent knowledge"
  },
  {
    id: 4,
    title: "Aviation English for International Pilots",
    description: "Specialized English language course focusing on aviation terminology, radio communications, and ICAO language proficiency requirements.",
    image: "https://images.unsplash.com/photo-1483450388369-9ed95738483c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    instructor: "Emily Wilson, MA TESOL",
    schedule: "Online, self-paced with weekly live sessions",
    duration: "10 weeks",
    maxStudents: 20,
    currentEnrollment: 14,
    certificationAwarded: "Aviation English Level 4+ Certificate",
    price: "$950",
    category: "Language Training",
    featured: false,
    startDate: "Flexible enrollment",
    prerequisites: "Intermediate English proficiency"
  },
  {
    id: 5,
    title: "Multi-Engine Rating Preparation",
    description: "Comprehensive ground school preparing pilots for multi-engine training, covering systems, emergencies, and operational considerations.",
    image: "https://images.unsplash.com/photo-1533326008133-9c8f12947125?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    instructor: "Captain James Rodriguez",
    schedule: "Tuesdays & Thursdays, 6:00 PM - 8:00 PM",
    duration: "4 weeks",
    maxStudents: 10,
    currentEnrollment: 7,
    certificationAwarded: "Multi-Engine Ground School Completion",
    price: "$1,400",
    category: "Ground School",
    featured: true,
    startDate: "July 11, 2023",
    prerequisites: "Private Pilot License"
  },
  {
    id: 6,
    title: "Aviation Weather Mastery",
    description: "Specialized course on aviation meteorology, weather systems, forecasting, and making critical weather-related flight decisions.",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    instructor: "Dr. Lisa Kim, Meteorologist",
    schedule: "Wednesdays, 6:00 PM - 9:00 PM",
    duration: "6 weeks",
    maxStudents: 15,
    currentEnrollment: 9,
    certificationAwarded: "Aviation Weather Specialist Certificate",
    price: "$880",
    category: "Specialty Course",
    featured: false,
    startDate: "June 21, 2023",
    prerequisites: "None - open to pilots and aviation enthusiasts"
  }
];

// Available categories for filtering
const categories = ["All Classes", "Ground School", "Simulator Training", "Language Training", "Specialty Course"];

const ClassesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All Classes');
  const [selectedClass, setSelectedClass] = useState(null);
  const modalRef = useRef(null);

  // Filter classes based on active category
  const filteredClasses = activeCategory === 'All Classes' 
    ? classesData 
    : classesData.filter(course => course.category === activeCategory);

  // Modal open/close functions
  const openClassDetails = (classData) => {
    setSelectedClass(classData);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeClassDetails = () => {
    setSelectedClass(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  // Close modal when clicking outside content
  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeClassDetails();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Background animations */}
      <AnimatedPlanes />
      <ParallaxClouds />
      
      {/* Navbar */}
      <Navbar />

      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="px-4 py-1.5 bg-aviation-blue/5 rounded-full text-aviation-blue font-medium border border-aviation-blue/10 inline-block mb-4">
              <span className="flex items-center gap-2">
                <FaChalkboardTeacher />
                Specialized Instruction
              </span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-aviation-blue mb-6">Aviation Classes</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our specialized aviation classes taught by experienced instructors in state-of-the-art facilities, designed to elevate your skills and knowledge.
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-aviation-blue text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Featured Classes - Top row */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
              <FiAward className="mr-2 text-aviation-accent" />
              Featured Classes
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredClasses
                .filter(item => item.featured)
                .map((classItem, index) => (
                  <FeaturedClassCard 
                    key={classItem.id} 
                    classData={classItem} 
                    index={index} 
                    onClick={() => openClassDetails(classItem)}
                  />
                ))}
            </div>
          </div>

          {/* All Other Classes - Grid */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Additional Classes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses
                .filter(item => !item.featured)
                .map((classItem, index) => (
                  <ClassCard 
                    key={classItem.id} 
                    classData={classItem} 
                    index={index}
                    onClick={() => openClassDetails(classItem)}
                  />
                ))}
            </div>
          </div>
          
          {/* No classes message */}
          {filteredClasses.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-700 mb-3">No classes available in this category</h3>
              <p className="text-gray-500 mb-6">Please check back later or browse our other categories</p>
              <CockpitButton 
                primary={false} 
                onClick={() => setActiveCategory('All Classes')}
              >
                View All Classes
              </CockpitButton>
            </div>
          )}

          {/* Custom inquiry section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 bg-gradient-to-r from-aviation-blue/10 to-aviation-blue/5 rounded-2xl p-8 md:p-12 border border-aviation-blue/10"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-aviation-blue mb-4">Looking for Something Specific?</h3>
                <p className="text-gray-700 mb-6">
                  Don't see what you're looking for? Contact us about custom training programs tailored to your specific needs and schedule.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <FaUserGraduate className="text-aviation-accent mt-1 mr-3" />
                    <span>One-on-one instruction available</span>
                  </li>
                  <li className="flex items-start">
                    <FiClock className="text-aviation-accent mt-1 mr-3" />
                    <span>Flexible scheduling options</span>
                  </li>
                  <li className="flex items-start">
                    <FiDollarSign className="text-aviation-accent mt-1 mr-3" />
                    <span>Group discounts for 3+ students</span>
                  </li>
                </ul>
                <CockpitButton primary>
                  Request Custom Training
                </CockpitButton>
              </div>
              <div className="hidden md:block">
                <motion.img 
                  src="https://images.unsplash.com/photo-1431722484873-eed056242644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Custom aviation training" 
                  className="rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Class Details Modal */}
        {selectedClass && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleModalClick}
          >
            <motion.div 
              ref={modalRef}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative">
                {/* Cover image */}
                <div className="h-56 overflow-hidden">
                  <img 
                    src={selectedClass.image} 
                    alt={selectedClass.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Close button */}
                <button 
                  className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/60 transition-colors"
                  onClick={closeClassDetails}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-aviation-blue text-sm font-medium rounded-full">
                    {selectedClass.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-aviation-blue mb-3">
                    {selectedClass.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {selectedClass.description}
                  </p>
                </div>

                {/* Class Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FaChalkboardTeacher className="text-aviation-blue mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">Instructor</h4>
                        <p>{selectedClass.instructor}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FiCalendar className="text-aviation-blue mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">Schedule</h4>
                        <p>{selectedClass.schedule}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FiClock className="text-aviation-blue mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">Duration</h4>
                        <p>{selectedClass.duration}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FiUsers className="text-aviation-blue mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">Class Size</h4>
                        <p>{selectedClass.currentEnrollment} enrolled (max {selectedClass.maxStudents})</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-aviation-accent h-2 rounded-full" 
                            style={{ width: `${(selectedClass.currentEnrollment / selectedClass.maxStudents) * 100}%` }} 
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FiAward className="text-aviation-blue mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">Certification</h4>
                        <p>{selectedClass.certificationAwarded}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FiDollarSign className="text-aviation-blue mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">Price</h4>
                        <p className="text-aviation-blue font-medium">{selectedClass.price}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-2">Prerequisites</h4>
                  <p>{selectedClass.prerequisites}</p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <CockpitButton primary className="flex-1">
                    Enroll Now
                  </CockpitButton>
                  <CockpitButton primary={false} className="flex-1">
                    Request Information
                  </CockpitButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

// Featured class card component
const FeaturedClassCard = ({ classData, index, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="h-56 overflow-hidden relative">
        <img 
          src={classData.image} 
          alt={classData.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Class info overlay */}
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <span className="inline-block px-2 py-1 bg-aviation-accent text-white text-xs font-medium rounded-md mb-2">
            Featured
          </span>
          <h3 className="text-xl font-bold mb-1 group-hover:text-aviation-accent transition-colors duration-200">
            {classData.title}
          </h3>
          <div className="flex items-center text-sm">
            <FiCalendar className="mr-1" />
            <span>Starts: {classData.startDate}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Class info */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-gray-500 text-sm">
            <FiClock className="mr-1" />
            <span>{classData.duration}</span>
          </div>
          <div className="text-aviation-blue font-semibold">
            {classData.price}
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {classData.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <FaChalkboardTeacher className="text-aviation-blue mr-2" />
            <span className="text-sm font-medium">{classData.instructor}</span>
          </div>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-aviation-accent"
          >
            <FiArrowRight />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

// Normal class card component
const ClassCard = ({ classData, index, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-aviation-blue/20 hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        {/* Header with image */}
        <div className="h-32 sm:h-40 overflow-hidden relative">
          <img 
            src={classData.image} 
            alt={classData.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-0 right-0 m-3">
            <span className="inline-block px-2 py-1 bg-white/90 backdrop-blur-sm text-aviation-blue text-xs font-medium rounded-full">
              {classData.category}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-aviation-blue transition-colors duration-200">
            {classData.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
            {classData.description}
          </p>
          
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <div className="flex items-center text-gray-500">
                <FiClock className="mr-1" />
                <span>{classData.duration}</span>
              </div>
              <div className="text-aviation-blue font-medium">
                {classData.price}
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <div className="flex items-center">
                <FiCalendar className="mr-1 text-gray-400" />
                <span className="text-gray-500">{classData.startDate}</span>
              </div>
              <div className="text-aviation-accent">
                <FiArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClassesPage; 