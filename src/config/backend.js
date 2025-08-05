// Centralized backend configuration
const getBackendUrl = () => {
  const isDevelopment = import.meta.env.MODE === 'development';
  
  // Use localhost for development, hosted URL for production
  return isDevelopment 
    ? import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    : import.meta.env.VITE_API_BASE_URL_DEPLOY || 'https://auth-ebooklet-backend.onrender.com';
};

// Export the backend URL for use throughout the app
export const backendBaseUrl = getBackendUrl();

// Helper function to construct full API URLs
export const getApiUrl = (endpoint) => {
  return `${backendBaseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

// Export both URLs for flexibility
export const backendUrls = {
  development: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
  production: import.meta.env.VITE_API_BASE_URL_DEPLOY || 'https://auth-ebooklet-backend.onrender.com',
  current: backendBaseUrl
};
