import { createClient } from 'redis';
import config from './redis-config.js';

class RedisService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.config = config;
  }

  async connect() {
    if (this.isConnected) return;

    try {
      this.client = createClient(this.config.connection);
      
      // Set up event handlers
      this.client.on('error', (err) => {
        console.error('Redis Client Error:', err);
        this.isConnected = false;
      });
      
      this.client.on('connect', () => {
        console.log('Redis client connected');
        this.isConnected = true;
      });
      
      this.client.on('reconnecting', () => {
        console.log('Redis client reconnecting');
      });
      
      // Connect to Redis
      await this.client.connect();
      
      return this.client;
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      throw error;
    }
  }

  async disconnect() {
    if (!this.isConnected) return;
    
    try {
      await this.client.quit();
      this.isConnected = false;
      console.log('Redis client disconnected');
    } catch (error) {
      console.error('Error disconnecting from Redis:', error);
      throw error;
    }
  }

  // Cache a value with the specified key and TTL
  async set(key, value, ttlSeconds = this.config.cache.defaultTTL) {
    if (!this.isConnected) await this.connect();
    
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      await this.client.set(key, stringValue, { EX: ttlSeconds });
      return true;
    } catch (error) {
      console.error(`Error setting cache for key ${key}:`, error);
      return false;
    }
  }

  // Get a value by key
  async get(key) {
    if (!this.isConnected) await this.connect();
    
    try {
      const value = await this.client.get(key);
      if (!value) return null;
      
      // Try to parse as JSON, return as string if not valid JSON
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    } catch (error) {
      console.error(`Error getting cache for key ${key}:`, error);
      return null;
    }
  }

  // Delete a key
  async del(key) {
    if (!this.isConnected) await this.connect();
    
    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      console.error(`Error deleting cache for key ${key}:`, error);
      return false;
    }
  }

  // Clear all keys with a specific prefix
  async clearByPrefix(prefix) {
    if (!this.isConnected) await this.connect();
    
    try {
      const keys = await this.client.keys(`${prefix}*`);
      if (keys.length === 0) return 0;
      
      const pipeline = this.client.multi();
      keys.forEach(key => pipeline.del(key));
      await pipeline.exec();
      
      return keys.length;
    } catch (error) {
      console.error(`Error clearing cache with prefix ${prefix}:`, error);
      return 0;
    }
  }

  // Increment a counter
  async increment(key, amount = 1) {
    if (!this.isConnected) await this.connect();
    
    try {
      return await this.client.incrBy(key, amount);
    } catch (error) {
      console.error(`Error incrementing counter ${key}:`, error);
      return null;
    }
  }

  // Check if a key exists
  async exists(key) {
    if (!this.isConnected) await this.connect();
    
    try {
      return await this.client.exists(key) === 1;
    } catch (error) {
      console.error(`Error checking if key ${key} exists:`, error);
      return false;
    }
  }

  // Set expiration on a key
  async expire(key, ttlSeconds) {
    if (!this.isConnected) await this.connect();
    
    try {
      return await this.client.expire(key, ttlSeconds);
    } catch (error) {
      console.error(`Error setting expiration for key ${key}:`, error);
      return false;
    }
  }
}

// Create and export a singleton instance
const redisService = new RedisService();
export default redisService;
