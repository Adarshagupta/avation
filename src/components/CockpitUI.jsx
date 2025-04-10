import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

// Cockpit-inspired button with instrument styling
export const CockpitButton = ({ 
  children, 
  primary = true, 
  onClick, 
  className = "",
  icon = null,
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseClasses = "relative overflow-hidden flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-300";
  const primaryClasses = primary 
    ? "bg-aviation-blue text-white border-2 border-aviation-blue/20" 
    : "bg-aviation-accent text-white border-2 border-aviation-accent/20";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <motion.button
      className={`${baseClasses} ${primaryClasses} ${disabledClasses} ${className}`}
      onClick={disabled ? null : onClick}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      disabled={disabled}
    >
      {/* Instrument panel background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20 pointer-events-none" />
      
      {/* Cockpit-like border glow */}
      <motion.div 
        className={`absolute inset-0 border-2 rounded-md pointer-events-none ${primary ? 'border-aviation-blue' : 'border-aviation-accent'}`}
        animate={{ 
          opacity: isHovered ? [0.4, 0.8, 0.4] : 0.4,
          boxShadow: isHovered 
            ? `0 0 10px 1px ${primary ? 'rgba(0, 71, 171, 0.5)' : 'rgba(255, 107, 0, 0.5)'}` 
            : `0 0 5px 0px ${primary ? 'rgba(0, 71, 171, 0.3)' : 'rgba(255, 107, 0, 0.3)'}`
        }}
        transition={{ duration: isHovered ? 1.5 : 0.3, repeat: isHovered ? Infinity : 0 }}
      />
      
      {/* Button content */}
      <div className="relative flex items-center gap-2">
        {children}
        {icon && <span className="ml-1">{icon}</span>}
      </div>
      
      {/* Instrument panel screws */}
      <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-gray-400/40" />
      <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-gray-400/40" />
      <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-gray-400/40" />
      <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-gray-400/40" />
    </motion.button>
  );
};

// Cockpit-inspired input field
export const CockpitInput = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  label,
  name,
  required = false,
  className = ""
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  
  useEffect(() => {
    setHasValue(value && value.length > 0);
  }, [value]);
  
  return (
    <div className={`relative mb-4 ${className}`}>
      {label && (
        <label 
          className={`block text-sm font-medium mb-1 transition-colors duration-300 ${isFocused ? 'text-aviation-blue' : 'text-gray-700'}`}
          htmlFor={name}
        >
          {label} {required && <span className="text-aviation-accent">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Input background with cockpit styling */}
        <div className="absolute inset-0 bg-gray-100 rounded-md border-2 border-gray-300/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-gray-200/50" />
          <div className="absolute inset-0 border border-gray-400/10" />
        </div>
        
        {/* Instrument panel glow effect */}
        <motion.div 
          className="absolute inset-0 rounded-md pointer-events-none"
          animate={{ 
            boxShadow: isFocused 
              ? `inset 0 0 0 2px rgba(0, 71, 171, 0.4), 0 0 10px 1px rgba(0, 71, 171, 0.2)` 
              : `inset 0 0 0 1px rgba(0, 71, 171, 0), 0 0 0px 0px rgba(0, 71, 171, 0)`
          }}
          transition={{ duration: 0.3 }}
        />
        
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="relative w-full px-4 py-3 bg-transparent rounded-md focus:outline-none z-10"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {/* Status indicator light */}
        <div className={`absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-colors duration-300 z-10 ${
          isFocused ? 'bg-aviation-blue' : (hasValue ? 'bg-green-500' : 'bg-gray-300')
        }`} />
        
        {/* Instrument panel screws */}
        <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-gray-400/40" />
        <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-gray-400/40" />
        <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-gray-400/40" />
        <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-gray-400/40" />
      </div>
    </div>
  );
};

// Cockpit-inspired toggle switch
export const CockpitToggle = ({ 
  isOn, 
  onToggle, 
  label,
  className = "" 
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {label && <span className="mr-3 text-sm font-medium text-gray-700">{label}</span>}
      
      <button 
        onClick={onToggle}
        className="relative inline-flex h-8 w-16 items-center rounded-full focus:outline-none"
        type="button"
        role="switch"
        aria-checked={isOn}
      >
        {/* Switch background */}
        <span 
          className={`absolute inset-0 rounded-full transition-colors duration-300 ${
            isOn ? 'bg-aviation-blue' : 'bg-gray-300'
          }`}
        />
        
        {/* Instrument panel styling */}
        <div className="absolute inset-0.5 rounded-full bg-gradient-to-b from-black/5 to-black/20 pointer-events-none" />
        
        {/* Cockpit-like border glow */}
        <motion.div 
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{ 
            boxShadow: isOn 
              ? `0 0 10px 1px rgba(0, 71, 171, 0.5)` 
              : `0 0 0px 0px rgba(0, 71, 171, 0)`
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Toggle handle */}
        <motion.span 
          className="relative z-10 inline-block h-6 w-6 rounded-full bg-white shadow-md"
          animate={{ 
            x: isOn ? 32 : 4,
            backgroundColor: isOn ? '#ffffff' : '#f3f4f6'
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {/* Status indicator */}
          <span 
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isOn ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <FiCheck className="h-3 w-3 text-aviation-blue" />
          </span>
        </motion.span>
        
        {/* Instrument panel screws */}
        <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-gray-400/40" />
        <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-gray-400/40" />
        <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-gray-400/40" />
        <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-gray-400/40" />
      </button>
    </div>
  );
};

// Cockpit-inspired gauge/meter component
export const CockpitGauge = ({ 
  value = 0, // 0 to 100
  label = "",
  size = "md", // sm, md, lg
  color = "blue", // blue, orange, green, red
  className = ""
}) => {
  // Normalize value between 0 and 100
  const normalizedValue = Math.min(100, Math.max(0, value));
  
  // Calculate rotation angle (from -120 to 120 degrees)
  const angle = -120 + (normalizedValue / 100) * 240;
  
  // Size classes
  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-40 h-40"
  };
  
  // Color classes
  const colorClasses = {
    blue: "text-aviation-blue",
    orange: "text-aviation-accent",
    green: "text-green-500",
    red: "text-red-500"
  };
  
  // Get value color based on range
  const getValueColor = () => {
    if (normalizedValue < 30) return "text-red-500";
    if (normalizedValue < 70) return "text-yellow-500";
    return "text-green-500";
  };
  
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Gauge background */}
      <div className="absolute inset-0 rounded-full bg-gray-100 border-2 border-gray-300/50 overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-gray-200/50" />
      </div>
      
      {/* Gauge markings */}
      <div className="absolute inset-2 rounded-full">
        {[...Array(11)].map((_, i) => {
          const markAngle = -120 + (i * 24);
          const isLarge = i % 5 === 0;
          return (
            <div 
              key={i}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: `rotate(${markAngle}deg)` }}
            >
              <div 
                className={`h-${isLarge ? '2' : '1'} w-0.5 bg-gray-400 origin-bottom`} 
                style={{ 
                  height: isLarge ? '12%' : '8%',
                  marginBottom: '88%'
                }}
              />
            </div>
          );
        })}
      </div>
      
      {/* Gauge needle */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: angle }}
        transition={{ type: "spring", stiffness: 60, damping: 10 }}
      >
        <div className={`h-1/2 w-1 ${colorClasses[color]} origin-bottom`} style={{ marginBottom: '50%' }}>
          <div className="w-full h-full bg-current" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-current" />
        </div>
      </motion.div>
      
      {/* Center cap */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-gray-200 border border-gray-300 shadow-sm" />
      </div>
      
      {/* Value display */}
      <div className="absolute bottom-1/4 inset-x-0 flex justify-center">
        <div className={`text-sm font-mono font-bold ${getValueColor()}`}>
          {normalizedValue}%
        </div>
      </div>
      
      {/* Label */}
      {label && (
        <div className="absolute -bottom-6 inset-x-0 text-center text-xs font-medium text-gray-700">
          {label}
        </div>
      )}
      
      {/* Instrument panel screws */}
      <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-gray-400/40" />
      <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-gray-400/40" />
      <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-gray-400/40" />
      <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-gray-400/40" />
    </div>
  );
};

// Cockpit-inspired card component
export const CockpitPanel = ({
  children,
  title,
  className = "",
  variant = "default" // default, primary, accent
}) => {
  // Variant classes
  const variantClasses = {
    default: "bg-white border-gray-200",
    primary: "bg-aviation-light border-aviation-blue/30",
    accent: "bg-orange-50 border-aviation-accent/30"
  };
  
  return (
    <div className={`relative rounded-lg overflow-hidden ${variantClasses[variant]} ${className}`}>
      {/* Panel background with cockpit styling */}
      <div className="absolute inset-0 border-2 border-gray-200/80">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-gray-100/50" />
      </div>
      
      {/* Panel header */}
      {title && (
        <div className="relative border-b border-gray-200 bg-gray-50/80 px-4 py-3">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-gray-200/30" />
          <h3 className="relative z-10 text-sm font-medium text-gray-700">{title}</h3>
          
          {/* Header indicator lights */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500/70" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
            <div className="w-2 h-2 rounded-full bg-red-500/70" />
          </div>
        </div>
      )}
      
      {/* Panel content */}
      <div className="relative p-4 z-10">
        {children}
      </div>
      
      {/* Instrument panel screws */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-gray-400/40" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gray-400/40" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-gray-400/40" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-gray-400/40" />
    </div>
  );
};

export default {
  CockpitButton,
  CockpitInput,
  CockpitToggle,
  CockpitGauge,
  CockpitPanel
};
