import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight, FiUser, FiFileText } from 'react-icons/fi';
import { FaQuoteLeft, FaGraduationCap, FaPlane } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedPlanes from '../components/AnimatedPlanes';
import ParallaxClouds from '../components/ParallaxClouds';
import { CockpitButton } from '../components/CockpitUI';

const TestimonialsPage = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const carouselRef = useRef(null);
  
  // Testimonials data - in a real app this would come from a CMS or API
  const testimonials = [
    {
      id: 1,
      name: "John Mitchell",
      role: "Commercial Pilot, Delta Airlines",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "The training I received at Aviation Academy laid a solid foundation for my career. The instructors' attention to detail and commitment to safety prepared me for the realities of commercial flying.",
      rating: 5,
      course: "Commercial Pilot License",
      videoId: "jfKfPfyJRdk" // Example YouTube video ID
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      role: "Flight Instructor",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "After completing my training, I knew I wanted to give back by teaching others. The comprehensive curriculum and simulator time gave me confidence in all weather conditions and scenarios.",
      rating: 5,
      course: "CFI Certification",
      videoId: null
    },
    {
      id: 3,
      name: "David Chen",
      role: "Charter Pilot",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "The personalized attention from instructors made all the difference. They identified my strengths and areas for improvement, helping me become a more skilled and confident pilot.",
      rating: 4,
      course: "Multi-Engine Rating",
      videoId: "mMYT-GY3zaU" // Example YouTube video ID
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "Airline First Officer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "Graduating from Aviation Academy opened doors for me in the industry. The connections I made and the quality of training helped me land my dream job faster than I expected.",
      rating: 5,
      course: "Instrument Rating",
      videoId: null
    },
    {
      id: 5,
      name: "Mark Williams",
      role: "Corporate Pilot",
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "The advanced simulator training prepared me for real-world scenarios that I've encountered in my career. The emphasis on decision-making and crew resource management has been invaluable.",
      rating: 5,
      course: "Advanced Jet Training",
      videoId: null
    }
  ];

  // Success stories data
  const successStories = [
    {
      id: 1,
      name: "Jessica Torres",
      position: "Captain, United Airlines",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      story: "From student pilot to captain in 8 years, Jessica's dedication and the foundation built at Aviation Academy propelled her career to new heights. She now flies international routes on Boeing 777 aircraft.",
      achievements: ["First female captain in her fleet", "Over 5,000 flight hours", "Mentors new pilots"]
    },
    {
      id: 2,
      name: "Michael Patel",
      position: "Chief Flight Instructor",
      image: "https://images.unsplash.com/photo-1542190891-2093d38760f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      story: "After graduating, Michael discovered his passion for teaching. He returned to Aviation Academy where he now leads our flight instruction program, innovating new teaching methodologies.",
      achievements: ["Trained over 200 pilots", "Developed simulator curriculum", "FAA Master Instructor"]
    },
    {
      id: 3,
      name: "Robert Kim",
      position: "Aerobatic Team Member",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      story: "Robert pursued his passion for precision flying after graduation and now performs with an elite aerobatic team, showcasing the exceptional control and confidence he developed in our program.",
      achievements: ["National aerobatic champion", "Airshow performer", "Aviation safety advocate"]
    }
  ];

  // Stats data
  const stats = [
    { value: "96%", label: "Graduate Satisfaction", icon: <FiStar className="text-xl" /> },
    { value: "92%", label: "Placement Rate", icon: <FiUser className="text-xl" /> },
    { value: "4.8/5", label: "Average Rating", icon: <FiFileText className="text-xl" /> }
  ];

  // Scroll carousel functions
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8
        : scrollLeft + clientWidth * 0.8;
      
      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  // Open video modal
  const openVideo = (videoId) => {
    setActiveVideo(videoId);
    document.body.style.overflow = 'hidden';
  };

  // Close video modal
  const closeVideo = () => {
    setActiveVideo(null);
    document.body.style.overflow = 'auto';
  };

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="px-4 py-1.5 bg-aviation-blue/5 rounded-full text-aviation-blue font-medium border border-aviation-blue/10 inline-block mb-4">
              Student Voices
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-aviation-blue mb-6">Testimonials</h1>
            <p className="text-lg text-gray-600">
              Hear from our graduates about their experiences at Aviation Academy and how our training helped launch their careers in aviation.
            </p>
          </motion.div>

          {/* Featured Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-aviation-blue to-aviation-blue/80 rounded-2xl overflow-hidden shadow-xl mb-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center text-white">
                <FaQuoteLeft className="text-4xl text-white/30 mb-6" />
                <blockquote className="text-xl md:text-2xl font-light mb-8 leading-relaxed">
                  "Choosing Aviation Academy was the best decision I made for my career. The hands-on training, experienced instructors, and state-of-the-art facilities prepared me for success in the competitive aviation industry."
                </blockquote>
                <div className="flex items-center">
                  <div className="mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                      alt="Alex Thompson" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Alex Thompson</div>
                    <div className="opacity-80">Captain, Southwest Airlines</div>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="text-aviation-accent fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer" onClick={() => openVideo("jNQXAC9IVRw")}>
                  <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-b-8 border-t-transparent border-b-transparent border-l-16 border-l-white ml-1"></div>
                  </div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Pilot in cockpit" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Testimonial Cards */}
          <div className="mb-20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-aviation-blue">Student Testimonials</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => scrollCarousel('left')}
                  className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <FiChevronLeft className="text-aviation-blue" />
                </button>
                <button 
                  onClick={() => scrollCarousel('right')}
                  className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <FiChevronRight className="text-aviation-blue" />
                </button>
              </div>
            </div>

            <div 
              ref={carouselRef} 
              className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar"
              style={{ scrollbarWidth: 'none' }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm min-w-[300px] max-w-sm flex-shrink-0 border border-gray-100 overflow-hidden"
                >
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-48 object-cover"
                    />
                    {testimonial.videoId && (
                      <button 
                        onClick={() => openVideo(testimonial.videoId)}
                        className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-aviation-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-white">
                      <div className="text-lg font-bold">{testimonial.name}</div>
                      <div className="opacity-90 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-aviation-blue/5 px-3 py-1 rounded-full text-xs font-medium text-aviation-blue flex items-center">
                        <FaGraduationCap className="mr-1" />
                        {testimonial.course}
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className={`${i < testimonial.rating ? 'text-aviation-accent fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <blockquote className="text-gray-600 mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-aviation-blue/5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-aviation-blue/10"
              >
                <div className="bg-aviation-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-aviation-blue">{stat.icon}</span>
                </div>
                <div className="text-4xl font-bold text-aviation-blue mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
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
              Alumni Spotlight
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-aviation-blue mb-6">Success Stories</h2>
            <p className="text-lg text-gray-600">
              Our graduates have gone on to achieve remarkable success in various sectors of the aviation industry. Here are some of their inspiring journeys.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col"
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-aviation-blue mb-1">{story.name}</h3>
                  <p className="text-aviation-accent font-medium mb-4">{story.position}</p>
                  <p className="text-gray-600 mb-6">{story.story}</p>
                  <div className="space-y-2">
                    {story.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start">
                        <FaPlane className="text-aviation-blue mt-1 mr-2" />
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button className="text-aviation-blue font-medium hover:text-aviation-accent transition-colors">
                    Read Full Story →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <CockpitButton primary={false}>
              View More Success Stories
            </CockpitButton>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-aviation-blue to-aviation-blue/80 rounded-2xl p-8 md:p-12 text-white shadow-xl"
          >
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Aviation Family</h3>
              <p className="text-white/90 mb-8">
                Take the first step toward your aviation career and become our next success story. Apply today and experience the Aviation Academy difference.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <CockpitButton primary>
                  Apply Now
                </CockpitButton>
                <CockpitButton primary={false}>
                  Schedule Campus Tour
                </CockpitButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="w-full max-w-4xl bg-black aspect-video rounded-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </motion.div>
          <button 
            className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/60 transition-colors"
            onClick={closeVideo}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TestimonialsPage; 