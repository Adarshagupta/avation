import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';
import { useState } from 'react';
import { CockpitButton, CockpitInput, CockpitPanel } from './CockpitUI';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <FiMapPin className="text-2xl text-aviation-blue" />,
      title: "Location",
      details: "123 Aviation Way, Skyline City, SC 12345"
    },
    {
      icon: <FiPhone className="text-2xl text-aviation-blue" />,
      title: "Phone",
      details: "+1 (555) 123-4567"
    },
    {
      icon: <FiMail className="text-2xl text-aviation-blue" />,
      title: "Email",
      details: "info@aviationacademy.com"
    },
    {
      icon: <FiClock className="text-2xl text-aviation-blue" />,
      title: "Hours",
      details: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM"
    }
  ];

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container mx-auto container-padding">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-aviation-blue mb-4">Contact Us</h2>
          <div className="w-20 h-1 bg-aviation-accent mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Have questions about our programs or want to schedule a visit?
            Get in touch with our admissions team today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CockpitPanel title="Flight Communication System" variant="primary">
              <h3 className="text-2xl font-semibold text-aviation-blue mb-6">Send Us a Message</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CockpitInput
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                  <CockpitInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <CockpitInput
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Course Inquiry"
                />
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700">Message</label>
                  <div className="relative">
                    {/* Textarea background with cockpit styling */}
                    <div className="absolute inset-0 bg-gray-100 rounded-md border-2 border-gray-300/50 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-gray-200/50" />
                      <div className="absolute inset-0 border border-gray-400/10" />
                    </div>

                    {/* Instrument panel glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-md pointer-events-none"
                      animate={{
                        boxShadow: formData.message
                          ? `inset 0 0 0 2px rgba(0, 71, 171, 0.4), 0 0 10px 1px rgba(0, 71, 171, 0.2)`
                          : `inset 0 0 0 1px rgba(0, 71, 171, 0), 0 0 0px 0px rgba(0, 71, 171, 0)`
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className="relative w-full px-4 py-3 bg-transparent rounded-md focus:outline-none z-10"
                      placeholder="Your message here..."
                      required
                    ></textarea>

                    {/* Status indicator light */}
                    <div className={`absolute right-3 top-3 w-2 h-2 rounded-full transition-colors duration-300 z-10 ${formData.message ? 'bg-green-500' : 'bg-gray-300'}`} />

                    {/* Instrument panel screws */}
                    <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-gray-400/40" />
                    <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-gray-400/40" />
                    <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-gray-400/40" />
                    <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-gray-400/40" />
                  </div>
                </div>
                <CockpitButton primary icon={<FiSend />}>Send Message</CockpitButton>
              </form>
            </CockpitPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CockpitPanel title="Navigation & Communication" variant="accent">
              <h3 className="text-2xl font-semibold text-aviation-blue mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-gray-700">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="font-medium text-gray-900 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-aviation-blue text-white flex items-center justify-center hover:bg-blue-700 transition-colors relative overflow-hidden group">
                    {/* Cockpit-like button styling */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20 pointer-events-none" />
                    <motion.div
                      className="absolute inset-0 rounded-full pointer-events-none border border-aviation-blue/50"
                      animate={{
                        boxShadow: ["0 0 0px rgba(0, 71, 171, 0.3)", "0 0 10px rgba(0, 71, 171, 0.5)", "0 0 0px rgba(0, 71, 171, 0.3)"]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-aviation-blue text-white flex items-center justify-center hover:bg-blue-700 transition-colors relative overflow-hidden group">
                    {/* Cockpit-like button styling */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20 pointer-events-none" />
                    <motion.div
                      className="absolute inset-0 rounded-full pointer-events-none border border-aviation-blue/50"
                      animate={{
                        boxShadow: ["0 0 0px rgba(0, 71, 171, 0.3)", "0 0 10px rgba(0, 71, 171, 0.5)", "0 0 0px rgba(0, 71, 171, 0.3)"]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm5.23 7.53l-5.55 5.55c-.15.15-.34.22-.53.22s-.38-.07-.53-.22l-2.83-2.83c-.29-.29-.29-.77 0-1.06.29-.29.77-.29 1.06 0l2.3 2.3 5.02-5.02c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-aviation-blue text-white flex items-center justify-center hover:bg-blue-700 transition-colors relative overflow-hidden group">
                    {/* Cockpit-like button styling */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20 pointer-events-none" />
                    <motion.div
                      className="absolute inset-0 rounded-full pointer-events-none border border-aviation-blue/50"
                      animate={{
                        boxShadow: ["0 0 0px rgba(0, 71, 171, 0.3)", "0 0 10px rgba(0, 71, 171, 0.5)", "0 0 0px rgba(0, 71, 171, 0.3)"]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </CockpitPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
