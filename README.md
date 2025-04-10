# Aviation Academy Website

A modern, responsive website for an aviation academy built with React, Vite, and enhanced with Redis caching for optimal performance.

## Features

- Modern, minimal design with smooth animations
- Cockpit-inspired UI elements
- Responsive layout for all devices
- Redis-powered caching for improved performance
- Express server with compression

## Technology Stack

- **Frontend**: React, Framer Motion, TailwindCSS
- **Build Tool**: Vite
- **Server**: Express.js
- **Caching**: Redis
- **Performance**: Compression middleware, optimized assets

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Redis server (local or remote)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/aviation-academy.git
   cd aviation-academy
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your Redis URL and other settings
   ```

4. Start Redis (if using local Redis)
   ```bash
   # On macOS with Homebrew
   brew services start redis
   # On Ubuntu/Debian
   sudo service redis-server start
   ```

### Development

```bash
# Start the Vite development server
npm run dev
```

### Production

```bash
# Build the project
npm run build

# Start the production server with Redis caching
npm start
```

## Redis Caching

This project uses Redis for several performance optimizations:

1. **Page Caching**: Full HTML pages are cached to reduce server load
2. **API Response Caching**: API responses are cached to improve response times
3. **Static Asset Caching**: Static assets are cached with longer TTLs

### Cache Configuration

Cache settings can be adjusted in `redis-config.js`:

- **TTL (Time-To-Live)**: Configure how long different types of content remain cached
- **Key Prefixes**: Organize cache keys by content type
- **Connection Settings**: Configure Redis connection parameters

### Admin Tools

The website includes an admin cache monitoring tool:

1. Press `Ctrl+Shift+A` to access admin mode
2. Enter the admin API key (from .env file)
3. Use the cache monitor to view and clear cache

## Performance Benefits

With Redis caching implemented:

- **Faster Page Loads**: Cached pages load in milliseconds
- **Reduced Server Load**: Less CPU and memory usage under high traffic
- **Improved Scalability**: Better handling of traffic spikes
- **Lower Bandwidth Usage**: Fewer full page generations

## License

MIT
