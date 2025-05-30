// GitHub Pages compatibility fixes for Konnect App

// This script ensures the app works correctly when deployed to GitHub Pages
// It handles path issues, routing, and other GitHub Pages specific requirements

// Fix base URL for GitHub Pages
const fixGitHubPagesBaseUrl = () => {
  // Get the repository name from the URL
  const pathSegments = window.location.pathname.split('/');
  let repoName = '';
  
  // If deployed to GitHub Pages, the path will include the repo name
  if (pathSegments.length > 1 && pathSegments[1] !== '') {
    repoName = pathSegments[1];
  }
  
  // Set base URL for assets
  window.KONNECT_BASE_URL = repoName ? `/${repoName}` : '';
  
  console.log(`Base URL set to: ${window.KONNECT_BASE_URL}`);
  
  // Update asset paths in the document
  updateAssetPaths();
};

// Update asset paths to include base URL
const updateAssetPaths = () => {
  // Update image sources
  document.querySelectorAll('img').forEach(img => {
    if (img.src.startsWith(window.location.origin) && !img.src.includes('http')) {
      const relativePath = img.src.replace(window.location.origin, '');
      img.src = `${window.KONNECT_BASE_URL}${relativePath}`;
    }
  });
  
  // Update CSS links
  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    if (link.href.startsWith(window.location.origin) && !link.href.includes('http')) {
      const relativePath = link.href.replace(window.location.origin, '');
      link.href = `${window.KONNECT_BASE_URL}${relativePath}`;
    }
  });
  
  // Update script sources
  document.querySelectorAll('script').forEach(script => {
    if (script.src && script.src.startsWith(window.location.origin) && !script.src.includes('http')) {
      const relativePath = script.src.replace(window.location.origin, '');
      script.src = `${window.KONNECT_BASE_URL}${relativePath}`;
    }
  });
};

// Handle GitHub Pages SPA routing
const handleGitHubPagesSPARouting = () => {
  // GitHub Pages doesn't support SPA routing out of the box
  // This function ensures the app works with the hash-based routing
  
  // If using hash-based routing, extract the route from the hash
  if (window.location.hash) {
    const route = window.location.hash.substring(1);
    console.log(`Routing to: ${route}`);
    
    // Handle routing based on hash
    if (route && window.KonnectNavigation) {
      // Extract tab name from route
      const tabName = route.split('/')[0];
      
      // Switch to the appropriate tab
      if (['home', 'services', 'discover', 'community', 'profile'].includes(tabName)) {
        window.KonnectNavigation.switchToTab(tabName);
      }
    }
  }
  
  // Add event listener for hash changes
  window.addEventListener('hashchange', () => {
    if (window.location.hash) {
      const route = window.location.hash.substring(1);
      console.log(`Hash changed, routing to: ${route}`);
      
      // Handle routing based on hash
      if (route && window.KonnectNavigation) {
        // Extract tab name from route
        const tabName = route.split('/')[0];
        
        // Switch to the appropriate tab
        if (['home', 'services', 'discover', 'community', 'profile'].includes(tabName)) {
          window.KonnectNavigation.switchToTab(tabName);
        }
      }
    }
  });
};

// Fix asset loading for GitHub Pages
const fixAssetLoading = () => {
  // Create a function to load assets with the correct base URL
  window.loadKonnectAsset = (path) => {
    // If path already includes http/https, return as is
    if (path.startsWith('http')) {
      return path;
    }
    
    // If path already starts with the base URL, return as is
    if (window.KONNECT_BASE_URL && path.startsWith(window.KONNECT_BASE_URL)) {
      return path;
    }
    
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    
    // Return path with base URL
    return `${window.KONNECT_BASE_URL}/${cleanPath}`;
  };
  
  // Override fetch to handle GitHub Pages paths
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    // If URL is a string and is a relative path, add base URL
    if (typeof url === 'string' && !url.startsWith('http') && !url.startsWith('//')) {
      url = window.loadKonnectAsset(url);
    }
    
    // Call original fetch with modified URL
    return originalFetch.call(this, url, options);
  };
};

// Initialize GitHub Pages compatibility
const initGitHubPagesCompatibility = () => {
  console.log('Initializing GitHub Pages compatibility...');
  
  // Fix base URL
  fixGitHubPagesBaseUrl();
  
  // Handle SPA routing
  handleGitHubPagesSPARouting();
  
  // Fix asset loading
  fixAssetLoading();
  
  console.log('GitHub Pages compatibility initialized');
};

// Export to window object
window.KonnectGitHubPages = {
  init: initGitHubPagesCompatibility,
  loadAsset: (path) => window.loadKonnectAsset ? window.loadKonnectAsset(path) : path
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize GitHub Pages compatibility
  initGitHubPagesCompatibility();
});
