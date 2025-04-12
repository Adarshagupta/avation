import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { FiCalendar, FiUser, FiTag, FiArrowRight, FiSearch } from 'react-icons/fi';
import { CockpitButton } from '../components/CockpitUI';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedPlanes from '../components/AnimatedPlanes';
import ParallaxClouds from '../components/ParallaxClouds';

// Sample blog data - in a real application, this would come from an API or CMS
const blogPosts = [
  {
    id: 1,
    title: "The Future of Aviation: Electric Aircraft",
    excerpt: "Exploring the latest developments in electric aircraft technology and what it means for the future of sustainable aviation.",
    date: "May 15, 2023",
    author: "Captain Sarah Johnson",
    image: "https://images.unsplash.com/photo-1559083991-9bdef0d101a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Technology",
    tags: ["Electric Aircraft", "Sustainability", "Innovation"]
  },
  {
    id: 2,
    title: "From Student Pilot to First Officer: My Journey",
    excerpt: "A personal account of the challenges and triumphs of progressing from flight school to a commercial airline position.",
    date: "April 28, 2023",
    author: "Michael Chen",
    image: "https://images.unsplash.com/photo-1540339832862-474599807836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Career",
    tags: ["Career Development", "Flight Training", "Personal Story"]
  },
  {
    id: 3,
    title: "Weather Patterns: What Every Pilot Should Know",
    excerpt: "Understanding weather systems and how they affect flight planning and in-flight decision making.",
    date: "April 10, 2023",
    author: "Dr. Emily Rodriguez",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Weather",
    tags: ["Meteorology", "Flight Planning", "Safety"]
  },
  {
    id: 4,
    title: "Aviation Regulations: 2023 Updates You Need to Know",
    excerpt: "A comprehensive guide to the latest regulatory changes affecting pilots, airlines, and flight schools.",
    date: "March 22, 2023",
    author: "James Wilson",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Regulations",
    tags: ["Compliance", "Regulations", "Aviation Law"]
  },
  {
    id: 5,
    title: "Inside the Cockpit: Advanced Avionics Systems",
    excerpt: "A detailed look at modern cockpit technology and how it's revolutionizing the pilot experience.",
    date: "March 5, 2023",
    author: "Captain Robert Lee",
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Technology",
    tags: ["Avionics", "Cockpit Design", "Technology"]
  },
  {
    id: 6,
    title: "Mental Health in Aviation: Breaking the Stigma",
    excerpt: "Addressing the importance of mental wellbeing for pilots and aviation professionals.",
    date: "February 18, 2023",
    author: "Dr. Sophia Patel",
    image: "https://images.unsplash.com/photo-1525200845123-a29c505e26d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Health",
    tags: ["Mental Health", "Pilot Wellness", "Aviation Medicine"]
  }
];

// Available categories for filtering
const categories = ["All", "Technology", "Career", "Weather", "Regulations", "Health"];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const searchRef = useRef(null);

  // Filter blog posts based on search term and active category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Background animations */}
      <AnimatedPlanes />
      <ParallaxClouds />
      
      {/* Navbar */}
      <Navbar />

      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
        {/* Header */}
        <div className="container mx-auto max-w-7xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="px-4 py-1.5 bg-aviation-blue/5 rounded-full text-aviation-blue font-medium border border-aviation-blue/10 inline-block mb-4">
              Aviation Insights
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-aviation-blue mb-6">Our Aviation Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the latest industry trends, training tips, and aviation stories from our expert instructors and guest writers.
            </p>
          </motion.div>

          {/* Search and Categories */}
          <div className="max-w-5xl mx-auto mb-12">
            {/* Search */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative max-w-md mx-auto">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 pl-12 rounded-full border border-gray-200 focus:border-aviation-blue focus:ring-1 focus:ring-aviation-blue outline-none transition-colors duration-200"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3"
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
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <BlogPostCard key={post.id} post={post} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-3">No posts found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or category filters</p>
                <CockpitButton 
                  primary={false} 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('All');
                  }}
                >
                  Clear Filters
                </CockpitButton>
              </div>
            )}
          </div>

          {/* Newsletter Subscription */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 bg-gradient-to-r from-aviation-blue to-aviation-blue/80 rounded-2xl p-8 md:p-12 text-white shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Up To Date</h3>
                <p className="text-white/90 mb-4">
                  Subscribe to our newsletter to receive the latest aviation insights, exclusive content, and updates on new courses.
                </p>
                <div className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-aviation-accent animate-pulse mt-2 mr-2"></div>
                  <p className="text-sm text-white/80">
                    We respect your privacy and will never share your information with third parties.
                  </p>
                </div>
              </div>
              <div>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-5 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-white/60 focus:border-white focus:ring-1 focus:ring-white outline-none"
                    />
                  </div>
                  <CockpitButton primary className="w-full">
                    Subscribe Now
                  </CockpitButton>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

// Individual blog post card component
const BlogPostCard = ({ post, index }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-aviation-blue/10 text-aviation-blue text-xs font-medium rounded-full">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-aviation-blue transition-colors duration-200">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta information */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center mr-4">
            <FiCalendar className="mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <FiUser className="mr-1" />
            <span>{post.author}</span>
          </div>
        </div>

        {/* Read more link */}
        <div className="pt-2 border-t border-gray-100">
          <a href="#" className="inline-flex items-center text-aviation-blue font-medium hover:text-aviation-accent transition-colors duration-200">
            Read Article
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              <FiArrowRight />
            </motion.span>
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPage; 