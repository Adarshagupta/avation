export default {
  // Redis connection settings
  connection: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    retryStrategy: (times) => Math.min(times * 50, 2000) // Retry connection with backoff
  },
  
  // Cache settings
  cache: {
    // Default TTL for cached items (in seconds)
    defaultTTL: 300, // 5 minutes
    
    // TTL for different content types (in seconds)
    ttlByType: {
      page: 300,      // 5 minutes for full pages
      api: 60,        // 1 minute for API responses
      static: 86400,  // 24 hours for static assets
    },
    
    // Prefixes for cache keys
    keyPrefix: {
      page: 'page:',
      api: 'api:',
      static: 'static:'
    }
  },
  
  // Rate limiting settings
  rateLimit: {
    enabled: true,
    windowMs: 60000, // 1 minute
    max: 100,        // 100 requests per minute
    message: 'Too many requests, please try again later.'
  }
};
