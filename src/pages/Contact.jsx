import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CockpitButton } from '../components/CockpitUI';
import AnimatedPlanes from '../components/AnimatedPlanes';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    marketingConsent: false
  });
  
  const [formStatus, setFormStatus] = useState({
    status: null, // 'success', 'error', or null
    message: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        status: 'error',
        message: 'Please fill in all required fields.'
      });
      return;
    }
    
    // In a real app, you would submit the form data to your server here
    console.log('Form submitted:', formData);
    
    // Simulate a successful form submission
    setFormStatus({
      status: 'success',
      message: 'Thank you for your message! We will get back to you soon.'
    });
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      marketingConsent: false
    });
  };

  // Contact info data
  const contactInfo = [
    {
      icon: <FiMapPin />,
      title: 'Visit Us',
      content: '123 Aviation Way, Skyline Heights, CA 90210',
      action: 'Get Directions'
    },
    {
      icon: <FiPhone />,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      action: 'Call Now'
    },
    {
      icon: <FiMail />,
      title: 'Email Us',
      content: 'info@aviationacademy.com',
      action: 'Send Email'
    },
    {
      icon: <FiClock />,
      title: 'Office Hours',
      content: 'Monday-Friday: 8am-6pm\nSaturday: 9am-2pm\nSunday: Closed',
      action: null
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'What are the admission requirements?',
      answer: 'Our admission requirements vary by program. Generally, we require a high school diploma or equivalent, passing an aptitude test, and meeting medical requirements. For specific program requirements, please contact our admissions office.'
    },
    {
      question: 'How long does it take to complete flight training?',
      answer: 'The duration depends on the program and your schedule. A Private Pilot License typically takes 3-6 months, while a complete Commercial Pilot program can take 18-24 months if attending full-time.'
    },
    {
      question: 'Do you offer financial aid or scholarships?',
      answer: 'Yes, we offer various financial aid options and scholarships for qualified students. Our financial aid office can help you explore federal aid, loans, and our merit-based scholarship programs.'
    },
    {
      question: 'Do you provide job placement assistance?',
      answer: 'Absolutely! We have a dedicated career services department that assists with resume building, interview preparation, and job placement. We also maintain strong relationships with airlines and aviation companies that regularly recruit from our programs.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background elements */}
      <AnimatedPlanes />
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        <div className="absolute inset-0 overflow-hidden z-0">
          <svg className="absolute right-0 top-0 h-full w-full transform translate-x-1/2 text-gray-50" viewBox="0 0 400 400" fill="none">
            <defs>
              <pattern id="4557c33f-9902-4b4a-a177-2a4d855df7e7" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#4557c33f-9902-4b4a-a177-2a4d855df7e7)" />
          </svg>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="px-4 py-1.5 bg-aviation-blue/5 rounded-full text-aviation-blue font-medium border border-aviation-blue/10 inline-block mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-aviation-blue mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600">
              Have questions about our programs or want to schedule a visit? We're here to help you take the first step toward your aviation career.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-aviation-blue mb-6">Send Us a Message</h2>
              
              {formStatus.status && (
                <div className={`p-4 mb-6 rounded-lg ${formStatus.status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {formStatus.status === 'success' ? (
                        <FiCheck className="h-5 w-5" />
                      ) : (
                        <FiAlertCircle className="h-5 w-5" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{formStatus.message}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aviation-blue/50 focus:border-aviation-blue"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aviation-blue/50 focus:border-aviation-blue"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aviation-blue/50 focus:border-aviation-blue"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aviation-blue/50 focus:border-aviation-blue"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Admission Information">Admission Information</option>
                      <option value="Schedule a Visit">Schedule a Visit</option>
                      <option value="Financial Aid">Financial Aid</option>
                      <option value="Career Services">Career Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aviation-blue/50 focus:border-aviation-blue"
                    required
                  ></textarea>
                </div>

                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="marketingConsent"
                      name="marketingConsent"
                      checked={formData.marketingConsent}
                      onChange={handleChange}
                      className="h-4 w-4 text-aviation-blue focus:ring-aviation-blue border-gray-300 rounded"
                    />
                    <label htmlFor="marketingConsent" className="ml-2 block text-sm text-gray-600">
                      I agree to receive updates and marketing communications from Aviation Academy.
                    </label>
                  </div>
                </div>

                <div>
                  <CockpitButton primary type="submit">
                    Send Message
                  </CockpitButton>
                </div>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col"
                  >
                    <div className="w-12 h-12 rounded-full bg-aviation-blue/10 flex items-center justify-center text-aviation-blue mb-4">
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-aviation-blue mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4 whitespace-pre-line flex-grow">{item.content}</p>
                    {item.action && (
                      <button className="text-aviation-blue font-medium hover:text-aviation-accent transition-colors text-sm">
                        {item.action} →
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-md h-80 mb-8 border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203483824!2d-118.36542842357392!3d34.06718787304913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b934b20011f1%3A0xc0adf61d59f4c22c!2sThe%20Grove!5e0!3m2!1sen!2sus!4v1656392402311!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Aviation Academy Location"
                ></iframe>
              </div>

              {/* Social Media */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-aviation-blue mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-aviation-blue/10 flex items-center justify-center text-aviation-blue hover:bg-aviation-blue hover:text-white transition-colors">
                    <FaFacebook />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-aviation-blue/10 flex items-center justify-center text-aviation-blue hover:bg-aviation-blue hover:text-white transition-colors">
                    <FaTwitter />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-aviation-blue/10 flex items-center justify-center text-aviation-blue hover:bg-aviation-blue hover:text-white transition-colors">
                    <FaInstagram />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-aviation-blue/10 flex items-center justify-center text-aviation-blue hover:bg-aviation-blue hover:text-white transition-colors">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-aviation-blue/10 flex items-center justify-center text-aviation-blue hover:bg-aviation-blue hover:text-white transition-colors">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-aviation-blue/5">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-aviation-blue mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Find answers to common questions about our programs, admissions, and more.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-bold text-aviation-blue mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Feel free to reach out to us directly.
            </p>
            <CockpitButton primary>
              Contact Student Services
            </CockpitButton>
          </motion.div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-red-50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl border border-red-100">
            <div>
              <h3 className="text-xl font-bold text-red-700 mb-2">Emergency Contact</h3>
              <p className="text-red-600">
                For urgent matters outside of regular business hours, please call our 24/7 emergency line:
              </p>
            </div>
            <div className="flex items-center">
              <div className="bg-white p-3 rounded-full mr-4 border border-red-100">
                <FiPhone className="text-2xl text-red-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-red-700">+1 (555) 987-6543</div>
                <div className="text-sm text-red-600">Available 24/7</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage; 