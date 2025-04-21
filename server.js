import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import cors from 'cors';
import redisService from './redis-service.js';
import config from './redis-config.js';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to Redis
try {
  await redisService.connect();
  console.log('Connected to Redis successfully');
} catch (error) {
  console.error('Failed to connect to Redis:', error);
  console.log('Continuing without Redis caching...');
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression()); // Compress responses
app.use(cors());
app.use(express.json());

// Cache middleware
const cacheMiddleware = async (req, res, next) => {
  // Skip caching for certain requests
  if (req.method !== 'GET' || !redisService.isConnected) {
    return next();
  }

  try {
    // Determine cache type based on the request path
    let cacheType = 'page';
    if (req.path.startsWith('/api/')) {
      cacheType = 'api';
    } else if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico)$/)) {
      cacheType = 'static';
    }

    // Create a cache key based on the URL and cache type
    const cacheKey = `${config.cache.keyPrefix[cacheType]}${req.originalUrl || req.url}`;

    // Try to get cached response
    const cachedResponse = await redisService.get(cacheKey);

    if (cachedResponse) {
      console.log(`Cache hit for ${cacheKey}`);
      // Parse the cached response
      const { body, headers } = cachedResponse;

      // Set the cached headers
      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          res.setHeader(key, value);
        });
      }

      res.setHeader('X-Cache', 'HIT');
      return res.send(body);
    }

    // If not cached, store the original send method
    const originalSend = res.send;

    // Override the send method to cache the response
    res.send = function(body) {
      // Only cache successful responses
      if (res.statusCode === 200) {
        // Get relevant headers to cache
        const headersToCache = {};
        ['Content-Type', 'Content-Language', 'Cache-Control'].forEach(header => {
          const value = res.get(header);
          if (value) headersToCache[header] = value;
        });

        const cacheData = {
          body,
          headers: headersToCache,
          timestamp: Date.now()
        };

        // Get TTL based on content type
        const ttl = config.cache.ttlByType[cacheType] || config.cache.defaultTTL;

        // Cache the response
        redisService.set(cacheKey, cacheData, ttl)
          .catch(err => console.error('Redis caching error:', err));
      }

      // Set cache header
      res.setHeader('X-Cache', 'MISS');

      // Call the original send method
      return originalSend.call(this, body);
    };

    next();
  } catch (error) {
    console.error('Cache middleware error:', error);
    next();
  }
};

// Apply cache middleware to all routes
app.use(cacheMiddleware);

// Serve static files from the Vite build
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.get('/api/health', async (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Cache management API (protected by simple API key for demo purposes)
app.delete('/api/cache', async (req, res) => {
  const apiKey = req.headers['x-api-key'];

  // In production, use a proper authentication mechanism
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { type } = req.query;
    let count = 0;

    if (type && config.cache.keyPrefix[type]) {
      // Clear specific cache type
      count = await redisService.clearByPrefix(config.cache.keyPrefix[type]);
    } else {
      // Clear all cache types
      const types = Object.keys(config.cache.keyPrefix);
      for (const cacheType of types) {
        const typeCount = await redisService.clearByPrefix(config.cache.keyPrefix[cacheType]);
        count += typeCount;
      }
    }

    res.json({ success: true, clearedKeys: count });
  } catch (error) {
    console.error('Error clearing cache:', error);
    res.status(500).json({ error: 'Failed to clear cache' });
  }
});

// Cache statistics
app.get('/api/cache/stats', async (req, res) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (!redisService.isConnected) {
      return res.json({ status: 'disconnected' });
    }

    // Get cache stats for each type
    const stats = {};
    const types = Object.keys(config.cache.keyPrefix);

    for (const type of types) {
      const keys = await redisService.client.keys(`${config.cache.keyPrefix[type]}*`);
      stats[type] = keys.length;
    }

    res.json({
      status: 'connected',
      cacheStats: stats,
      totalKeys: Object.values(stats).reduce((sum, count) => sum + count, 0)
    });
  } catch (error) {
    console.error('Error getting cache stats:', error);
    res.status(500).json({ error: 'Failed to get cache stats' });
  }
});

// Fallback route for SPA
app.get('*', (req, res) => {
  // Explicitly log routes that are being handled by the fallback
  console.log(`Fallback route handling: ${req.originalUrl}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
