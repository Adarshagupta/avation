import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const Courses = () => {
  const courses = [
    {
      title: "Private Pilot License (PPL)",
      description: "Start your journey with our comprehensive PPL program, designed for beginners with no prior flying experience.",
      duration: "6-9 months",
      image: "bg-[url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80')]"
    },
    {
      title: "Commercial Pilot License (CPL)",
      description: "Advance your career with our CPL program, preparing you for professional flying opportunities worldwide.",
      duration: "12-18 months",
      image: "bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80')]"
    },
    {
      title: "Airline Transport Pilot License (ATPL)",
      description: "The highest level of aircraft pilot certification, preparing you for a career as an airline captain.",
      duration: "18-24 months",
      image: "bg-[url('https://images.unsplash.com/photo-1559329255-2e7cb3839e36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80')]"
    },
    {
      title: "Flight Instructor Course",
      description: "Share your knowledge and passion for flying by becoming a certified flight instructor.",
      duration: "3-6 months",
      image: "bg-[url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80')]"
    }
  ];

  return (
    <section id="courses" className="section-padding bg-gray-50 navbar-spacing">
      <div className="container mx-auto container-padding">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-aviation-blue mb-4">Our Courses</h2>
          <div className="w-20 h-1 bg-aviation-accent mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover our range of aviation courses designed to take you from beginner to professional pilot.
            All courses are taught by experienced instructors using modern aircraft and simulators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className={`h-48 ${course.image} bg-cover bg-center`}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-aviation-blue">{course.title}</h3>
                <p className="text-gray-700 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium bg-aviation-light text-aviation-blue px-3 py-1 rounded-full">
                    Duration: {course.duration}
                  </span>
                  <button className="flex items-center text-aviation-blue hover:text-aviation-accent transition-colors">
                    Learn more <FiArrowRight className="ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="btn btn-primary">View All Courses</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;
