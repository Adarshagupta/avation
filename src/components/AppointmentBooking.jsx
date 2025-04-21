import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CockpitButton } from './CockpitUI';
import { FiCalendar, FiClock, FiUser, FiCheck, FiX, FiAlertTriangle } from 'react-icons/fi';

// Cal.com appointment booking component
const AppointmentBooking = ({ className, title = "Book Your Appointment" }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [error, setError] = useState(null);
  
  const CAL_URL = "https://cal.com/adarsh-guptaa-xmv8qn/avation";
  const EMBED_URL = `${CAL_URL}?embed=true&embedType=inline`;

  const openCalendar = () => {
    setError(null);
    setShowCalendar(true);
    setIframeLoaded(false);
  };

  const closeCalendar = () => {
    setShowCalendar(false);
    setError(null);
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleIframeError = () => {
    setError('Failed to load calendar. Please try using the direct link below.');
  };

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-aviation-blue">{title}</h2>
          <div className="h-10 w-10 flex items-center justify-center bg-aviation-blue/10 rounded-full">
            <FiCalendar className="text-aviation-blue" />
          </div>
        </div>
        
        {!showCalendar ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-6"
          >
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Ready to take the next step?</h3>
              <p className="text-gray-600">
                Schedule a consultation with our flight training experts. We'll help you chart your course to becoming a pilot.
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="mr-3 text-aviation-blue">
                  <FiClock />
                </div>
                <span className="text-gray-600 text-sm">30-minute consultation</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="mr-3 text-aviation-blue">
                  <FiUser />
                </div>
                <span className="text-gray-600 text-sm">One-on-one with a certified instructor</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="mr-3 text-aviation-accent">
                  <FiCheck />
                </div>
                <span className="text-gray-600 text-sm">Personalized training recommendations</span>
              </div>
            </div>
            
            <CockpitButton primary onClick={openCalendar}>
              Schedule Your Consultation
            </CockpitButton>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <button 
              onClick={closeCalendar}
              className="absolute top-0 right-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Close calendar"
            >
              <FiX className="text-aviation-blue" />
            </button>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
                <FiAlertTriangle className="mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="min-h-[500px] w-full rounded-lg overflow-hidden relative">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-aviation-blue mb-4"></div>
                  <p className="text-gray-600">Loading calendar...</p>
                </div>
              )}
              
              <iframe
                src={EMBED_URL}
                frameBorder="0"
                className="w-full h-[600px]"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title="Schedule an appointment"
              ></iframe>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Having trouble? <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="text-aviation-blue hover:underline">Open calendar in a new tab</a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking; 