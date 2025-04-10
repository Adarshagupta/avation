import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CacheMonitor = ({ apiKey }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMonitor, setShowMonitor] = useState(false);

  const fetchStats = async () => {
    if (!apiKey) return;
    
    try {
      setLoading(true);
      const response = await fetch('/api/cache/stats', {
        headers: {
          'X-API-Key': apiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch cache stats: ${response.status}`);
      }
      
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearCache = async (type) => {
    if (!apiKey) return;
    
    try {
      setLoading(true);
      const url = type ? `/api/cache?type=${type}` : '/api/cache';
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'X-API-Key': apiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to clear cache: ${response.status}`);
      }
      
      // Refetch stats after clearing
      await fetchStats();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showMonitor && apiKey) {
      fetchStats();
      const interval = setInterval(fetchStats, 10000); // Refresh every 10 seconds
      return () => clearInterval(interval);
    }
  }, [showMonitor, apiKey]);

  if (!apiKey) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowMonitor(!showMonitor)}
        className="bg-aviation-blue text-white p-2 rounded-full shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>
      
      {showMonitor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-12 right-0 bg-white p-4 rounded-lg shadow-xl border border-gray-200 w-80"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-aviation-blue">Cache Monitor</h3>
            <button
              onClick={() => setShowMonitor(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {loading && <p className="text-gray-500">Loading cache stats...</p>}
          
          {error && (
            <div className="bg-red-50 text-red-600 p-2 rounded mb-4">
              {error}
            </div>
          )}
          
          {stats && (
            <div>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${stats.status === 'connected' ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.status === 'connected' ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                
                {stats.status === 'connected' && (
                  <>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Total Keys:</span>
                      <span className="font-medium">{stats.totalKeys}</span>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Cache Types:</h4>
                      <div className="space-y-2">
                        {Object.entries(stats.cacheStats).map(([type, count]) => (
                          <div key={type} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${
                                type === 'page' ? 'bg-blue-500' : 
                                type === 'api' ? 'bg-green-500' : 'bg-purple-500'
                              }`}></div>
                              <span className="text-gray-700 capitalize">{type}</span>
                            </div>
                            <span className="text-gray-600">{count} keys</span>
                            <button
                              onClick={() => clearCache(type)}
                              className="text-xs text-red-500 hover:text-red-700"
                              title={`Clear ${type} cache`}
                            >
                              Clear
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => clearCache()}
                      className="mt-4 w-full bg-aviation-blue text-white py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Clear All Cache
                    </button>
                  </>
                )}
              </div>
              
              <div className="text-xs text-gray-500 mt-4">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CacheMonitor;
