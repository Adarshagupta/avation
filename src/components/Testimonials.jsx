import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Commercial Pilot, Delta Airlines",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      quote: "The training I received at Aviation Academy was exceptional. The instructors were knowledgeable and supportive, and the facilities were top-notch. I'm now living my dream as a commercial pilot."
    },
    {
      name: "Michael Chen",
      role: "Flight Instructor",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      quote: "After completing my training at Aviation Academy, I decided to stay on as an instructor. The comprehensive curriculum and hands-on approach prepared me well for my career in aviation education."
    },
    {
      name: "Emily Rodriguez",
      role: "First Officer, United Airlines",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      quote: "Aviation Academy provided me with the skills and confidence I needed to succeed in the competitive aviation industry. The simulator training was particularly valuable for my transition to commercial aircraft."
    },
    {
      name: "David Thompson",
      role: "Private Pilot",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      quote: "As someone who pursued flying as a hobby, I found the PPL program at Aviation Academy to be perfect for my needs. The flexible schedule allowed me to balance my training with my full-time job."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section-padding bg-white navbar-spacing">
      <div className="container mx-auto container-padding">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-aviation-blue mb-4">What Our Students Say</h2>
          <div className="w-20 h-1 bg-aviation-accent mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Hear from our graduates who have successfully launched their aviation careers after training with us.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-aviation-light p-8 md:p-12 rounded-lg"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div>
                <svg className="w-10 h-10 text-aviation-blue/20 mb-4" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 8v12H6v-4c0-2.21 1.79-4 4-4h2V8H10zm12 0v4h2c2.21 0 4 1.79 4 4v4h-4V8h-2z"/>
                </svg>
                <p className="text-lg md:text-xl text-gray-700 italic mb-6">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div>
                  <h4 className="text-xl font-semibold text-aviation-blue">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-aviation-blue text-white hover:bg-blue-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-aviation-blue' : 'bg-gray-300'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-aviation-blue text-white hover:bg-blue-700 transition-colors"
              aria-label="Next testimonial"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
