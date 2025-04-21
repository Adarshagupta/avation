import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AppointmentBooking from '../components/AppointmentBooking';
import { FiClock, FiUser, FiMapPin, FiPhone, FiMail, FiCalendar } from 'react-icons/fi';
import { CockpitButton } from '../components/CockpitUI';

const BookingPage = () => {
  const [selectedLocation, setSelectedLocation] = useState('new-york');

  const locations = [
    {
      id: 'new-york',
      name: 'New York',
      address: '1234 Aviation Blvd, New York, NY 10001',
      phone: '+1 (212) 555-1234',
      email: 'newyork@aviationacademy.com',
      instructors: 12
    },
    {
      id: 'london',
      name: 'London',
      address: '45 Heathrow Way, London, UK SW1A 1AA',
      phone: '+44 20 1234 5678',
      email: 'london@aviationacademy.com',
      instructors: 8
    },
    {
      id: 'mumbai',
      name: 'Mumbai',
      address: '78 Airport Road, Mumbai, India 400099',
      phone: '+91 22 3456 7890',
      email: 'mumbai@aviationacademy.com',
      instructors: 10
    }
  ];

  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-28 px-4 sm:px-6 lg:px-8 bg-aviation-blue text-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto pb-14"
          >
            <span className="px-4 py-1.5 bg-white/10 rounded-full text-white font-medium border border-white/20 inline-block mb-4">
              Flight Training Consultation
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Book Your Appointment</h1>
            <p className="text-lg text-white/80">
              Take the first step towards your aviation career with a personalized consultation
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AppointmentBooking className="h-full" />
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-aviation-blue">Location</h2>
                      <p className="text-gray-600">Select a training center</p>
                    </div>
                    <div className="h-10 w-10 flex items-center justify-center bg-aviation-blue/10 rounded-full">
                      <FiMapPin className="text-aviation-blue" />
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {locations.map(location => (
                      <button
                        key={location.id}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          selectedLocation === location.id 
                            ? 'border-aviation-accent bg-aviation-accent/5' 
                            : 'border-gray-200 hover:border-aviation-blue/30'
                        }`}
                        onClick={() => setSelectedLocation(location.id)}
                      >
                        <div className="font-medium text-aviation-blue">{location.name}</div>
                        <div className="text-sm text-gray-500 mt-1">{location.address}</div>
                      </button>
                    ))}
                  </div>
                  
                  {selectedLocationData && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-aviation-blue mb-3">Training Center Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="mr-3 mt-0.5 text-aviation-blue">
                            <FiMapPin />
                          </div>
                          <span className="text-gray-600 text-sm">{selectedLocationData.address}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-3 text-aviation-blue">
                            <FiPhone />
                          </div>
                          <span className="text-gray-600 text-sm">{selectedLocationData.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-3 text-aviation-blue">
                            <FiMail />
                          </div>
                          <span className="text-gray-600 text-sm">{selectedLocationData.email}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-3 text-aviation-blue">
                            <FiUser />
                          </div>
                          <span className="text-gray-600 text-sm">{selectedLocationData.instructors} Certified Instructors</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h3 className="font-medium text-aviation-blue mb-3">Appointment Types</h3>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="mr-3 text-aviation-blue">
                          <FiClock />
                        </div>
                        <div>
                          <span className="text-gray-700 font-medium">Flight Training Consultation</span>
                          <p className="text-xs text-gray-500">30 minutes</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="mr-3 text-aviation-blue">
                          <FiCalendar />
                        </div>
                        <div>
                          <span className="text-gray-700 font-medium">Program Orientation</span>
                          <p className="text-xs text-gray-500">45 minutes</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <CockpitButton 
                        primary={false}
                        className="w-full"
                        onClick={() => window.location.href = `mailto:${selectedLocationData.email}`}
                      >
                        Contact by Email
                      </CockpitButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-aviation-blue mb-4">What to Expect</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our consultation process is designed to give you a clear understanding of our training programs and help you find the right path for your aviation career.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 flex items-center justify-center bg-aviation-blue/10 rounded-full mb-4">
                <span className="text-xl font-bold text-aviation-blue">1</span>
              </div>
              <h3 className="text-xl font-bold text-aviation-blue mb-2">Initial Consultation</h3>
              <p className="text-gray-600">
                Meet with an instructor to discuss your goals, experience level, and training options.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 flex items-center justify-center bg-aviation-blue/10 rounded-full mb-4">
                <span className="text-xl font-bold text-aviation-blue">2</span>
              </div>
              <h3 className="text-xl font-bold text-aviation-blue mb-2">Personalized Plan</h3>
              <p className="text-gray-600">
                Receive a customized training program tailored to your specific needs and timeline.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 flex items-center justify-center bg-aviation-blue/10 rounded-full mb-4">
                <span className="text-xl font-bold text-aviation-blue">3</span>
              </div>
              <h3 className="text-xl font-bold text-aviation-blue mb-2">Facility Tour</h3>
              <p className="text-gray-600">
                See our training facilities, meet the team, and get a feel for our aviation community.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BookingPage; 