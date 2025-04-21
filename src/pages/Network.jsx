import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CockpitButton } from '../components/CockpitUI';
import { FiMapPin, FiInfo, FiClock, FiCalendar, FiUser, FiFlag, FiPhone, FiMail, FiChevronRight, FiZoomIn, FiZoomOut, FiPlus, FiMinus } from 'react-icons/fi';
import { FaPlane, FaGlobeAmericas, FaPlaneDeparture } from 'react-icons/fa';

// Network page with interactive world map
const NetworkPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeConnections, setActiveConnections] = useState([]);
  const [mapReady, setMapReady] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [animatingRoute, setAnimatingRoute] = useState(null);
  const [indiaConnections, setIndiaConnections] = useState([]);
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // Highlight color for point and route animations
  const HIGHLIGHT_COLOR = '#FF6B00';
  const MAP_BG_COLOR = '#F7F9FC';
  const LAND_COLOR = '#E2EBF4';
  const BORDER_COLOR = '#CAD5E2';
  const MARKER_COLOR = '#0047AB';
  
  // Global network data with locations and connections
  const locations = [
    {
      id: 'usa',
      name: 'United States',
      city: 'New York',
      lat: 40.7128,
      lng: -74.006,
      description: 'Our headquarters with comprehensive training facilities and administrative offices.',
      details: {
        address: '1234 Aviation Blvd, New York, NY 10001',
        phone: '+1 (212) 555-1234',
        email: 'usa@aviationacademy.com',
        courses: 12,
        instructors: 45,
        established: 1995
      },
      connections: ['uk', 'india', 'australia', 'uae']
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      city: 'London',
      lat: 51.5074,
      lng: -0.1278,
      description: 'European hub offering specialized flight training and certification programs.',
      details: {
        address: '45 Heathrow Way, London, UK SW1A 1AA',
        phone: '+44 20 1234 5678',
        email: 'uk@aviationacademy.com',
        courses: 8,
        instructors: 22,
        established: 2003
      },
      connections: ['usa', 'uae', 'southafrica']
    },
    {
      id: 'india',
      name: 'India',
      city: 'Mumbai',
      lat: 19.0760,
      lng: 72.8777,
      description: 'South Asian center with focus on commercial pilot training and aviation management.',
      details: {
        address: '78 Airport Road, Mumbai, India 400099',
        phone: '+91 22 3456 7890',
        email: 'india@aviationacademy.com',
        courses: 10,
        instructors: 30,
        established: 2008
      },
      connections: ['usa', 'australia', 'uae']
    },
    {
      id: 'australia',
      name: 'Australia',
      city: 'Sydney',
      lat: -33.8688,
      lng: 151.2093,
      description: 'Oceania campus offering perfect flying conditions year-round for pilot training.',
      details: {
        address: '56 Harbour View, Sydney, Australia NSW 2000',
        phone: '+61 2 9876 5432',
        email: 'australia@aviationacademy.com',
        courses: 9,
        instructors: 28,
        established: 2005
      },
      connections: ['usa', 'india']
    },
    {
      id: 'uae',
      name: 'United Arab Emirates',
      city: 'Dubai',
      lat: 25.2048,
      lng: 55.2708,
      description: 'Middle East facility with cutting-edge simulators and aviation technology.',
      details: {
        address: '90 Sheikh Zayed Road, Dubai, UAE',
        phone: '+971 4 123 4567',
        email: 'uae@aviationacademy.com',
        courses: 6,
        instructors: 18,
        established: 2010
      },
      connections: ['usa', 'uk', 'india', 'southafrica']
    },
    {
      id: 'southafrica',
      name: 'South Africa',
      city: 'Cape Town',
      lat: -33.9249,
      lng: 18.4241,
      description: 'African training center specializing in bush pilot training and aviation safety.',
      details: {
        address: '123 Table Mountain Way, Cape Town, South Africa 8001',
        phone: '+27 21 987 6543',
        email: 'safrica@aviationacademy.com',
        courses: 5,
        instructors: 15,
        established: 2012
      },
      connections: ['uk', 'uae']
    },
    {
      id: 'argentina',
      name: 'Argentina',
      city: 'Buenos Aires',
      lat: -34.6037,
      lng: -58.3816,
      description: 'South American center offering Spanish-language aviation programs.',
      details: {
        address: '789 Avenida Libertador, Buenos Aires, Argentina C1001',
        phone: '+54 11 4321 5678',
        email: 'argentina@aviationacademy.com',
        courses: 4,
        instructors: 12,
        established: 2015
      },
      connections: ['usa']
    }
  ];

  // Convert locations to GeoJSON for the map
  const locationGeoJson = useMemo(() => {
    return {
      type: 'FeatureCollection',
      features: locations.map(location => ({
        type: 'Feature',
        properties: {
          id: location.id,
          name: location.city,
          country: location.name,
          description: location.description,
          isSelected: selectedLocation?.id === location.id
        },
        geometry: {
          type: 'Point',
          coordinates: [location.lng, location.lat]
        }
      }))
    };
  }, [locations, selectedLocation]);

  // Function to handle location selection
  const handleLocationClick = useCallback((locationId) => {
    const location = locations.find(loc => loc.id === locationId);
    
    if (location) {
      // Update selected location
      setSelectedLocation(location);
      
      // Center map on the selected location
      centerMapOnLocation(location);
      
      // Set active connections
      if (location.connections) {
        const newConnections = [];
        
        location.connections.forEach(connId => {
          const targetLoc = locations.find(l => l.id === connId);
          if (targetLoc) {
            newConnections.push({
              from: location,
              to: targetLoc
            });
          }
        });
        
        setActiveConnections(newConnections);
      }
    }
  }, [locations]);

  // Center map on a specific location
  const centerMapOnLocation = useCallback((location) => {
    const newZoom = 2;
    setZoom(newZoom);
    
    // Calculate the center position based on the location coordinates
    // We need to convert from longitude/latitude to our map coordinate system
    const mapWidth = width;
    const mapHeight = height;
    
    // Map coordinates - longitude range from -180 to 180, latitude from 90 to -90
    const x = (location.lng + 180) * (mapWidth / 360);
    const y = (90 - location.lat) * (mapHeight / 180);
    
    // Calculate offset needed to center the location
    const offsetX = -(x - mapWidth / 2) / newZoom;
    const offsetY = -(y - mapHeight / 2) / newZoom;
    
    setOffset({ x: offsetX, y: offsetY });
  }, [width, height]);

  // Function to animate a route between two locations
  const animateRoute = useCallback((fromId, toId) => {
    const fromLocation = locations.find(loc => loc.id === fromId);
    const toLocation = locations.find(loc => loc.id === toId);
    
    if (fromLocation && toLocation) {
      // Create a new animation for route
      setAnimatingRoute({
        from: fromLocation,
        to: toLocation,
        progress: 0
      });
      
      // Calculate midpoint to center the map
      const midLng = (fromLocation.lng + toLocation.lng) / 2;
      const midLat = (fromLocation.lat + toLocation.lat) / 2;
      
      // Calculate distance to determine zoom level
      const distance = getDistance(
        fromLocation.lat, fromLocation.lng,
        toLocation.lat, toLocation.lng
      );
      
      // Set an appropriate zoom level based on distance
      const newZoom = Math.max(0.8, Math.min(2, 3 - Math.log(distance / 1000) / Math.log(5)));
      setZoom(newZoom);
      
      // Center on midpoint
      const mapWidth = width;
      const mapHeight = height;
      
      // Convert to map coordinates
      const x = (midLng + 180) * (mapWidth / 360);
      const y = (90 - midLat) * (mapHeight / 180);
      
      // Calculate offset needed to center
      const offsetX = -(x - mapWidth / 2) / newZoom;
      const offsetY = -(y - mapHeight / 2) / newZoom;
      
      setOffset({ x: offsetX, y: offsetY });
      
      // Animate the route
      let startTime = null;
      const duration = 2000; // 2 seconds for animation
      
      const animateRouteFrame = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        setAnimatingRoute(prev => ({
          ...prev,
          progress: progress
        }));
        
        if (progress < 1) {
          requestAnimationFrame(animateRouteFrame);
        } else {
          // Animation completed, set the destination as selected location
          setTimeout(() => {
            setSelectedLocation(toLocation);
            handleLocationClick(toLocation.id);
            setAnimatingRoute(null);
          }, 300);
        }
      };
      
      requestAnimationFrame(animateRouteFrame);
    }
  }, [locations, width, height, handleLocationClick]);

  // Function to calculate distance between two points
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // distance in meters
  };

  // Convert map coordinates to screen coordinates
  const mapToScreenCoordinates = useCallback((lng, lat) => {
    const mapWidth = width;
    const mapHeight = height;
    
    // Convert longitude and latitude to x, y coordinates
    // Longitude: -180 to 180, Latitude: 90 to -90
    const x = (lng + 180) * (mapWidth / 360);
    const y = (90 - lat) * (mapHeight / 180);
    
    // Apply zoom and offset
    const screenX = (x * zoom) + (offset.x * zoom);
    const screenY = (y * zoom) + (offset.y * zoom);
    
    return { x: screenX, y: screenY };
  }, [width, height, zoom, offset]);

  // Calculate location positions on the screen
  const locationPositions = useMemo(() => {
    return locations.map(location => ({
      ...location,
      screen: mapToScreenCoordinates(location.lng, location.lat)
    }));
  }, [locations, mapToScreenCoordinates]);

  // Calculate bezier curve points for a connection
  const calculateBezierPath = useCallback((connection) => {
    const fromPos = mapToScreenCoordinates(connection.from.lng, connection.from.lat);
    const toPos = mapToScreenCoordinates(connection.to.lng, connection.to.lat);
    
    // Control point for the curve (elevated from the midpoint)
    const controlPos = mapToScreenCoordinates(
      connection.controlPoint.x,
      connection.controlPoint.y
    );
    
    // Calculate current point on the curve based on progress
    const currentX = 
      Math.pow(1 - connection.progress, 2) * fromPos.x + 
      2 * (1 - connection.progress) * connection.progress * controlPos.x + 
      Math.pow(connection.progress, 2) * toPos.x;
      
    const currentY = 
      Math.pow(1 - connection.progress, 2) * fromPos.y + 
      2 * (1 - connection.progress) * connection.progress * controlPos.y + 
      Math.pow(connection.progress, 2) * toPos.y;
    
    return {
      from: fromPos,
      to: toPos,
      control: controlPos,
      current: { x: currentX, y: currentY },
      pathD: `M${fromPos.x},${fromPos.y} Q${controlPos.x},${controlPos.y} ${currentX},${currentY}`
    };
  }, [mapToScreenCoordinates]);

  // Handle map mouse events for dragging
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isDragging && mapRef.current) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      // Update the offset based on the drag distance and zoom level
      setOffset(prev => ({
        x: prev.x + dx / zoom,
        y: prev.y + dy / zoom
      }));
      
      // Update the drag start position
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, dragStart, zoom]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev * 1.5, 5));
  }, []);
  
  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev / 1.5, 0.5));
  }, []);

  // Initialize map dimensions and set up India connections
  useEffect(() => {
    if (mapContainerRef.current) {
      const updateSize = () => {
        if (mapContainerRef.current) {
          const { width, height } = mapContainerRef.current.getBoundingClientRect();
          setWidth(width);
          setHeight(height);
        }
      };
      
      updateSize();
      window.addEventListener('resize', updateSize);
      
      // Set map as ready after initial sizing
      setTimeout(() => {
        setMapReady(true);
        
        // Find India and its connections
        const india = locations.find(loc => loc.id === 'india');
        if (india) {
          const connections = india.connections.map(connId => {
            const targetLoc = locations.find(l => l.id === connId);
            if (targetLoc) {
              return {
                from: india,
                to: targetLoc,
                progress: 0,
                id: `india-${connId}`,
                animationOffset: Math.random() * 10, // Random offset for staggered animations
                controlPoint: {
                  x: (india.lng + targetLoc.lng) / 2 + (Math.random() * 20 - 10),
                  y: (india.lat + targetLoc.lat) / 2 + (Math.random() * 20 - 10)
                }
              };
            }
            return null;
          }).filter(Boolean);
          
          setIndiaConnections(connections);
        }
      }, 500);
      
      return () => window.removeEventListener('resize', updateSize);
    }
  }, []);

  // Animate India connections
  useEffect(() => {
    if (indiaConnections.length > 0 && mapReady) {
      let animationFrame;
      let startTime = performance.now();
      
      const animate = (timestamp) => {
        const elapsed = timestamp - startTime;
        
        setIndiaConnections(prev => 
          prev.map(conn => {
            // Use offset to create staggered animations
            const adjustedElapsed = elapsed - (conn.animationOffset * 1000);
            if (adjustedElapsed <= 0) return conn;
            
            // Create a pulsing animation that repeats
            const cycleTime = 5000; // 5 seconds per cycle
            const normalizedTime = (adjustedElapsed % cycleTime) / cycleTime;
            const easeInOutProgress = normalizedTime < 0.5 
              ? 2 * normalizedTime * normalizedTime 
              : 1 - Math.pow(-2 * normalizedTime + 2, 2) / 2;
              
            return {
              ...conn,
              progress: easeInOutProgress
            };
          })
        );
        
        animationFrame = requestAnimationFrame(animate);
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [indiaConnections.length, mapReady]);

  // World map component with curvy line animations
  const WorldMap = useCallback(() => {
    return (
      <div
        ref={mapRef}
        className="w-full h-full relative bg-blue-50 overflow-hidden cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* World map background */}
        <div
          className="absolute bg-contain bg-center bg-no-repeat transition-transform"
          style={{
            backgroundImage: 'url(/images/world-map.svg)',
            width: '100%',
            height: '100%',
            transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
            transformOrigin: 'center',
            transition: isDragging ? 'none' : 'transform 0.3s ease'
          }}
        />
        
        {/* Connection lines */}
        <svg className="absolute inset-0 pointer-events-none z-10">
          {/* Regular connections */}
          {activeConnections.map((connection, index) => {
            const fromPos = mapToScreenCoordinates(connection.from.lng, connection.from.lat);
            const toPos = mapToScreenCoordinates(connection.to.lng, connection.to.lat);
            
            return (
              <line
                key={`connection-${index}`}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke={HIGHLIGHT_COLOR}
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.7"
              />
            );
          })}
          
          {/* India's animated curvy connections */}
          {indiaConnections.map(connection => {
            const bezierPath = calculateBezierPath(connection);
            
            return (
              <g key={connection.id}>
                <path
                  d={bezierPath.pathD}
                  fill="none"
                  stroke={HIGHLIGHT_COLOR}
                  strokeWidth="2"
                  opacity="0.7"
                  strokeDasharray="6,3"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="18"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
                <circle
                  cx={bezierPath.current.x}
                  cy={bezierPath.current.y}
                  r="4"
                  fill={HIGHLIGHT_COLOR}
                  opacity="0.8"
                >
                  <animate
                    attributeName="r"
                    values="3;5;3"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
          
          {/* Animated route */}
          {animatingRoute && (() => {
            const fromPos = mapToScreenCoordinates(animatingRoute.from.lng, animatingRoute.from.lat);
            const toPos = mapToScreenCoordinates(animatingRoute.to.lng, animatingRoute.to.lat);
            
            // Calculate the current position based on progress
            const currentX = fromPos.x + (toPos.x - fromPos.x) * animatingRoute.progress;
            const currentY = fromPos.y + (toPos.y - fromPos.y) * animatingRoute.progress;
            
            return (
              <>
                <line
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={currentX}
                  y2={currentY}
                  stroke={HIGHLIGHT_COLOR}
                  strokeWidth="3"
                  opacity="1"
                />
                <circle
                  cx={currentX}
                  cy={currentY}
                  r="5"
                  fill={HIGHLIGHT_COLOR}
                >
                  <animate
                    attributeName="r"
                    values="3;6;3"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </circle>
              </>
            );
          })()}
        </svg>
        
        {/* Location markers */}
        {locationPositions.map(location => (
          <div
            key={location.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              left: location.screen.x,
              top: location.screen.y
            }}
          >
            <button
              className={`group flex flex-col items-center transition-all duration-300 ${
                selectedLocation?.id === location.id ? 'scale-125' : 'hover:scale-110'
              } ${location.id === 'india' ? 'scale-125' : ''}`}
              onClick={() => handleLocationClick(location.id)}
            >
              <div className={`
                p-2 rounded-full shadow-md 
                ${selectedLocation?.id === location.id ? 'bg-aviation-accent' : 
                  location.id === 'india' ? 'bg-aviation-accent' : 'bg-aviation-blue'}
              `}>
                <FiMapPin className="text-white" />
              </div>
              {(selectedLocation?.id === location.id || location.id === 'india') && (
                <div className="absolute -bottom-6 whitespace-nowrap bg-white px-2 py-1 rounded shadow-md text-xs font-medium text-aviation-blue">
                  {location.city}
                </div>
              )}
            </button>
            {(selectedLocation?.id === location.id || location.id === 'india') && (
              <div className="absolute -z-10 animate-ping w-8 h-8 bg-aviation-accent/30 rounded-full" />
            )}
          </div>
        ))}
        
        {/* Zoom controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button 
            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors focus:outline-none"
            onClick={handleZoomIn}
          >
            <FiPlus className="text-aviation-blue" />
          </button>
          <button 
            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors focus:outline-none"
            onClick={handleZoomOut}
          >
            <FiMinus className="text-aviation-blue" />
          </button>
        </div>
      </div>
    );
  }, [
    handleMouseDown, 
    handleMouseMove, 
    handleMouseUp, 
    zoom, 
    offset, 
    isDragging, 
    activeConnections,
    indiaConnections,
    calculateBezierPath,
    animatingRoute, 
    locationPositions, 
    selectedLocation, 
    mapToScreenCoordinates, 
    handleLocationClick,
    handleZoomIn,
    handleZoomOut
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-28 px-4 sm:px-6 lg:px-8 bg-aviation-blue text-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto pb-14"
          >
            <span className="px-4 py-1.5 bg-white/10 rounded-full text-white font-medium border border-white/20 inline-block mb-4">
              Worldwide Presence
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Global Network of Services</h1>
            <p className="text-lg text-white/80">
              Discover our international network of aviation training centers spanning six continents
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Interactive Map Container */}
              <motion.div 
                ref={mapContainerRef}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 relative h-[500px] lg:h-[600px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Loading indicator */}
                {!mapReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                    <div className="flex flex-col items-center">
                      <FaGlobeAmericas className="text-4xl text-aviation-blue animate-pulse mb-4" />
                      <p className="text-gray-600">Loading global network...</p>
                    </div>
                  </div>
                )}
                
                {/* Interactive World Map */}
                <WorldMap />
              </motion.div>
              
              {/* Map key/legend */}
              <div className="mt-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-aviation-blue mr-2"></div>
                    <span className="text-gray-700">Training Center</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-aviation-accent mr-2"></div>
                    <span className="text-gray-700">Selected Location</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-1 bg-aviation-accent mr-2"></div>
                    <span className="text-gray-700">Flight Route</span>
                  </div>
                  <div className="ml-auto text-xs text-gray-500">
                    Click on any location to see details and connections
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location details sidebar */}
            <div>
              <AnimatePresence mode="wait">
                {selectedLocation ? (
                  <motion.div
                    key={selectedLocation.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-aviation-blue">{selectedLocation.city}</h2>
                          <p className="text-gray-600">{selectedLocation.name}</p>
                        </div>
                        <div className="flex h-10 w-10 bg-aviation-blue/10 items-center justify-center rounded-full">
                          <FiInfo className="text-aviation-blue" />
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-6">{selectedLocation.description}</p>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-start">
                          <div className="mr-3 mt-0.5 text-aviation-blue">
                            <FiMapPin />
                          </div>
                          <span className="text-gray-600 text-sm">{selectedLocation.details.address}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-3 text-aviation-blue">
                            <FiPhone />
                          </div>
                          <span className="text-gray-600 text-sm">{selectedLocation.details.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-3 text-aviation-blue">
                            <FiMail />
                          </div>
                          <span className="text-gray-600 text-sm">{selectedLocation.details.email}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-xl font-bold text-aviation-blue">{selectedLocation.details.courses}</div>
                          <div className="text-xs text-gray-500">Courses</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-xl font-bold text-aviation-blue">{selectedLocation.details.instructors}</div>
                          <div className="text-xs text-gray-500">Instructors</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-xl font-bold text-aviation-blue">{selectedLocation.details.established}</div>
                          <div className="text-xs text-gray-500">Established</div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-aviation-blue mb-3">Direct Connections</h3>
                      <div className="space-y-2 mb-6">
                        {activeConnections.map(connection => {
                          const targetLocation = locations.find(l => l.id === connection.to.id);
                          if (!targetLocation) return null;
                          
                          return (
                            <div 
                              key={connection.to.id}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                animateRoute(connection.from.id, connection.to.id);
                              }}
                            >
                              <div className="flex items-center">
                                <div className="bg-aviation-accent/10 p-1.5 rounded-full mr-3">
                                  <FaPlaneDeparture className="text-aviation-accent text-xs" />
                                </div>
                                <span className="text-gray-700 font-medium">{targetLocation.city}, {targetLocation.name}</span>
                              </div>
                              <FiChevronRight className="text-aviation-blue" />
                            </div>
                          );
                        })}
                      </div>
                      
                      <CockpitButton primary>
                        Contact This Location
                      </CockpitButton>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full p-6"
                  >
                    <div className="flex items-center justify-center h-20 w-20 bg-aviation-blue/10 rounded-full mx-auto mb-6">
                      <FaGlobeAmericas className="text-3xl text-aviation-blue" />
                    </div>
                    <h2 className="text-2xl font-bold text-aviation-blue text-center mb-4">Our Global Presence</h2>
                    <p className="text-gray-600 text-center mb-6">
                      Click on any location pin on the globe to view detailed information about our training centers and their global connections.
                    </p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FiFlag className="text-aviation-blue mr-3" />
                          <span className="text-gray-700">7 Countries</span>
                        </div>
                        <span className="text-sm text-gray-500">Global Network</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FiUser className="text-aviation-blue mr-3" />
                          <span className="text-gray-700">170+ Instructors</span>
                        </div>
                        <span className="text-sm text-gray-500">Worldwide</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FiCalendar className="text-aviation-blue mr-3" />
                          <span className="text-gray-700">25+ Years</span>
                        </div>
                        <span className="text-sm text-gray-500">Experience</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
      
      {/* Global partnerships section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="px-4 py-1.5 bg-aviation-blue/10 rounded-full text-aviation-blue font-medium inline-block mb-4">
              Global Partnerships
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-aviation-blue mb-6">Our Aviation Industry Partners</h2>
            <p className="text-gray-600">
              We collaborate with leading airlines and aviation organizations worldwide to provide our students with the best training and career opportunities.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['delta', 'emirates', 'lufthansa', 'british-airways', 'qatar', 'singapore'].map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-center hover:shadow-md transition-shadow duration-300"
              >
                <img 
                  src={`/images/partners/${partner}.svg`} 
                  alt={`${partner} logo`}
                  className="max-h-12 grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-aviation-blue text-white">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Global Community?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Begin your aviation journey with us and gain access to our worldwide network of training facilities and industry connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CockpitButton primary>
                Apply Now
              </CockpitButton>
              <CockpitButton secondary>
                Contact an Advisor
              </CockpitButton>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NetworkPage; 