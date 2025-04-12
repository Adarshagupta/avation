import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSend, FiDownload, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import {
  CockpitButton,
  CockpitInput,
  CockpitToggle,
  CockpitGauge,
  CockpitPanel
} from './CockpitUI';

const CockpitUIDemo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [toggles, setToggles] = useState({
    notifications: true,
    newsletter: false,
    darkMode: false
  });

  const [gaugeValues, setGaugeValues] = useState({
    fuel: 75,
    speed: 60,
    altitude: 30
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (name) => {
    setToggles(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <section id="cockpit-ui" className="section-padding bg-gray-50 navbar-spacing">
      <div className="container mx-auto container-padding">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-aviation-blue mb-4">Cockpit-Inspired UI</h2>
          <div className="w-20 h-1 bg-aviation-accent mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Experience our aviation-themed interface elements inspired by modern aircraft cockpit design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Buttons Panel */}
          <CockpitPanel title="Control Panel: Buttons" className="h-full">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">Primary Actions</h4>
                <div className="flex flex-wrap gap-4">
                  <CockpitButton primary>
                    Explore Courses
                  </CockpitButton>
                  <CockpitButton primary icon={<FiArrowRight />}>
                    Start Training
                  </CockpitButton>
                  <CockpitButton primary disabled>
                    Disabled
                  </CockpitButton>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">Secondary Actions</h4>
                <div className="flex flex-wrap gap-4">
                  <CockpitButton primary={false}>
                    Book a Tour
                  </CockpitButton>
                  <CockpitButton primary={false} icon={<FiSend />}>
                    Contact Us
                  </CockpitButton>
                  <CockpitButton primary={false} icon={<FiDownload />}>
                    Download Brochure
                  </CockpitButton>
                </div>
              </div>
            </div>
          </CockpitPanel>

          {/* Form Panel */}
          <CockpitPanel title="Flight Information System" variant="primary" className="h-full">
            <div className="space-y-4">
              <CockpitInput
                label="Full Name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
                icon={<FiUser />}
              />

              <CockpitInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                icon={<FiMail />}
              />

              <CockpitInput
                label="Phone Number"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                icon={<FiPhone />}
              />

              <div className="mt-6">
                <CockpitButton primary className="w-full">
                  Submit Information
                </CockpitButton>
              </div>
            </div>
          </CockpitPanel>

          {/* Toggles Panel */}
          <CockpitPanel title="System Preferences" variant="accent">
            <div className="space-y-4">
              <CockpitToggle
                label="Enable Notifications"
                isOn={toggles.notifications}
                onToggle={() => handleToggle('notifications')}
              />

              <CockpitToggle
                label="Subscribe to Newsletter"
                isOn={toggles.newsletter}
                onToggle={() => handleToggle('newsletter')}
              />

              <CockpitToggle
                label="Dark Mode"
                isOn={toggles.darkMode}
                onToggle={() => handleToggle('darkMode')}
              />
            </div>
          </CockpitPanel>

          {/* Gauges Panel */}
          <CockpitPanel title="Flight Instruments">
            <div className="flex flex-wrap justify-center gap-8 py-4">
              <CockpitGauge
                value={gaugeValues.fuel}
                label="Fuel Level"
                color="blue"
              />

              <CockpitGauge
                value={gaugeValues.speed}
                label="Speed"
                color="orange"
              />

              <CockpitGauge
                value={gaugeValues.altitude}
                label="Altitude"
                color="green"
              />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {Object.keys(gaugeValues).map((key) => (
                <div key={key} className="space-y-2">
                  <label className="block text-xs font-medium text-gray-500">
                    Adjust {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={gaugeValues[key]}
                    onChange={(e) => setGaugeValues(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </CockpitPanel>
        </div>
      </div>
    </section>
  );
};

export default CockpitUIDemo;
