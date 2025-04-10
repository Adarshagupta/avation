import { motion, useScroll, useTransform } from 'framer-motion';
import { FiAward, FiUsers, FiBookOpen } from 'react-icons/fi';
import { FaPlaneDeparture } from 'react-icons/fa';
import { useRef } from 'react';

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax and rotation effects
  const planeX = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]);
  const planeY = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
  const planeRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  
  const features = [
    {
      icon: <FiAward className="text-4xl text-aviation-blue" />,
      title: "Certified Training",
      description: "Our programs are certified by international aviation authorities, ensuring your credentials are recognized worldwide."
    },
    {
      icon: <FiUsers className="text-4xl text-aviation-blue" />,
      title: "Expert Instructors",
      description: "Learn from experienced pilots and aviation professionals with thousands of flight hours."
    },
    {
      icon: <FiBookOpen className="text-4xl text-aviation-blue" />,
      title: "Comprehensive Curriculum",
      description: "From theory to practical training, our curriculum covers all aspects of aviation education."
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
      {/* Animated plane that follows scroll */}
      <motion.div
        className="absolute z-0 text-6xl text-aviation-blue/10"
        style={{
          x: planeX,
          y: planeY,
          rotate: planeRotate,
        }}
      >
        <FaPlaneDeparture className="text-8xl md:text-9xl" />
      </motion.div>

      <div className="container mx-auto container-padding relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-aviation-blue mb-4">About Aviation Academy</h2>
          <div className="w-20 h-1 bg-aviation-accent mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Founded in 2005, Aviation Academy has been at the forefront of aviation education,
            training the next generation of pilots and aviation professionals with cutting-edge
            facilities and experienced instructors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-aviation-light p-8 rounded-lg text-center group hover:bg-aviation-blue hover:text-white transition-all duration-300"
              initial={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -10,
                boxShadow: "0 15px 30px -10px rgba(0, 71, 171, 0.3)"
              }}
            >
              <motion.div
                className="mb-4 flex justify-center text-aviation-blue group-hover:text-white transition-colors duration-300"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-aviation-blue group-hover:text-white transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-700 group-hover:text-white/90 transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 p-8 rounded-lg overflow-hidden relative">
          {/* Decorative plane silhouette */}
          <div className="absolute -right-20 -bottom-20 text-aviation-blue/5 rotate-45">
            <FaPlaneDeparture className="text-[200px]" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <motion.h3
                className="text-2xl font-bold text-aviation-blue mb-4"
                whileInView={{
                  textShadow: ["0 0 0px rgba(0,71,171,0)", "0 0 10px rgba(0,71,171,0.3)", "0 0 0px rgba(0,71,171,0)"],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                Our Mission
              </motion.h3>
              <p className="text-gray-700 mb-4">
                To provide world-class aviation education that prepares students for successful careers in the aviation industry,
                with a focus on safety, excellence, and innovation.
              </p>
              <motion.h3
                className="text-2xl font-bold text-aviation-blue mb-4"
                whileInView={{
                  textShadow: ["0 0 0px rgba(0,71,171,0)", "0 0 10px rgba(0,71,171,0.3)", "0 0 0px rgba(0,71,171,0)"],
                }}
                transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 3 }}
              >
                Our Vision
              </motion.h3>
              <p className="text-gray-700">
                To be the leading aviation academy globally, recognized for producing highly skilled aviation professionals
                who excel in their careers and contribute to advancing the aviation industry.
              </p>
            </div>
            
            <motion.div
              className="bg-aviation-blue text-white p-8 rounded-lg relative overflow-hidden"
              initial={{ opacity: 1, x: 0 }}
              whileHover={{ boxShadow: "0 20px 40px -15px rgba(0, 71, 171, 0.5)" }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-aviation-blue via-blue-700 to-aviation-blue"
                animate={{
                  background: [
                    "linear-gradient(135deg, #0047AB 0%, #0052C2 50%, #0047AB 100%)",
                    "linear-gradient(135deg, #0052C2 0%, #0047AB 50%, #0052C2 100%)",
                    "linear-gradient(135deg, #0047AB 0%, #0052C2 50%, #0047AB 100%)"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              
              <h3 className="text-2xl font-bold mb-4 relative z-10">Why Choose Us?</h3>
              <ul className="space-y-3 relative z-10">
                {[
                  "State-of-the-art flight simulators",
                  "Modern fleet of training aircraft",
                  "Industry partnerships for job placement",
                  "Flexible training schedules",
                  "Financial aid and scholarship options"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 1, y: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      className="mr-2"
                      whileHover={{ scale: 1.2 }}
                    >
                      ✓
                    </motion.span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
