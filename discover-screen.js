// Enhanced Discover Screen for Konnect App

// Discover Screen Module
const DiscoverScreen = {
  // Initialize discover screen
  init: function() {
    console.log('Initializing Discover Screen');
    
    // Get discover screen element
    const discoverScreen = document.getElementById('discover-screen');
    if (!discoverScreen) return;
    
    // Clear existing content
    discoverScreen.innerHTML = '';
    
    // Create discover screen content
    this.createDiscoverScreenContent(discoverScreen);
    
    // Initialize animations
    this.initAnimations();
  },
  
  // Create discover screen content
  createDiscoverScreenContent: function(container) {
    // Create header
    const header = document.createElement('div');
    header.className = 'screen-header';
    
    const title = document.createElement('h1');
    title.className = 'header-large';
    title.textContent = 'Discover Korea';
    
    const searchButton = document.createElement('button');
    searchButton.className = 'btn-icon';
    searchButton.innerHTML = '🔍';
    searchButton.addEventListener('click', () => {
      this.showSearchModal();
    });
    
    header.appendChild(title);
    header.appendChild(searchButton);
    
    // Create featured experience
    const featuredExperience = document.createElement('div');
    featuredExperience.className = 'featured-experience card';
    
    const featuredImage = document.createElement('div');
    featuredImage.className = 'featured-image';
    featuredImage.style.backgroundImage = 'url("https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")';
    
    const featuredOverlay = document.createElement('div');
    featuredOverlay.className = 'featured-overlay';
    
    const featuredContent = document.createElement('div');
    featuredContent.className = 'featured-content';
    
    const featuredTitle = document.createElement('h2');
    featuredTitle.className = 'featured-title';
    featuredTitle.textContent = 'Gyeongbokgung Palace';
    
    const featuredDescription = document.createElement('p');
    featuredDescription.className = 'featured-description';
    featuredDescription.textContent = 'Experience the majestic beauty of Korea\'s most famous royal palace';
    
    const featuredButton = document.createElement('button');
    featuredButton.className = 'btn btn-primary';
    featuredButton.textContent = 'Explore in AR';
    featuredButton.addEventListener('click', () => {
      if (window.KonnectFeatures && window.KonnectFeatures.ARExperience) {
        window.KonnectFeatures.ARExperience.launch('gyeongbokgung');
      } else {
        this.showARSimulation('gyeongbokgung');
      }
    });
    
    featuredContent.appendChild(featuredTitle);
    featuredContent.appendChild(featuredDescription);
    featuredContent.appendChild(featuredButton);
    
    featuredOverlay.appendChild(featuredContent);
    
    featuredExperience.appendChild(featuredImage);
    featuredExperience.appendChild(featuredOverlay);
    
    // Create category tabs
    const categoryTabs = document.createElement('div');
    categoryTabs.className = 'category-tabs';
    
    const categories = [
      { id: 'all', name: 'All' },
      { id: 'attractions', name: 'Attractions' },
      { id: 'food', name: 'Food' },
      { id: 'culture', name: 'Culture' },
      { id: 'events', name: 'Events' }
    ];
    
    categories.forEach(category => {
      const tab = document.createElement('div');
      tab.className = 'category-tab';
      tab.dataset.category = category.id;
      tab.textContent = category.name;
      
      if (category.id === 'all') {
        tab.classList.add('active');
      }
      
      tab.addEventListener('click', () => {
        // Update active tab
        document.querySelectorAll('.category-tab').forEach(t => {
          t.classList.remove('active');
        });
        tab.classList.add('active');
        
        // Filter discoveries
        this.filterDiscoveries(category.id);
      });
      
      categoryTabs.appendChild(tab);
    });
    
    // Create discoveries section
    const discoveriesSection = document.createElement('div');
    discoveriesSection.className = 'discoveries-section';
    
    // Define discoveries
    const discoveries = [
      {
        id: 'namsan-tower',
        title: 'N Seoul Tower',
        description: 'Iconic tower with panoramic views of Seoul',
        image: 'https://images.unsplash.com/photo-1546874177-9e664107314e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'attractions',
        location: 'Seoul',
        rating: 4.7,
        hasAR: true
      },
      {
        id: 'myeongdong',
        title: 'Myeongdong Shopping',
        description: 'Famous shopping district with countless stores and street food',
        image: 'https://images.unsplash.com/photo-1585023523603-5ba4584c21f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'attractions',
        location: 'Seoul',
        rating: 4.5,
        hasAR: false
      },
      {
        id: 'bibimbap',
        title: 'Authentic Bibimbap',
        description: 'Traditional Korean mixed rice dish with vegetables',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'food',
        location: 'Nationwide',
        rating: 4.8,
        hasAR: false
      },
      {
        id: 'hanbok-experience',
        title: 'Hanbok Experience',
        description: 'Rent traditional Korean clothing and visit historic sites',
        image: 'https://images.unsplash.com/photo-1561642769-1bca263542e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'culture',
        location: 'Seoul, Jeonju',
        rating: 4.6,
        hasAR: true
      },
      {
        id: 'lantern-festival',
        title: 'Jinju Lantern Festival',
        description: 'Spectacular festival of floating lanterns and light displays',
        image: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'events',
        location: 'Jinju',
        rating: 4.9,
        hasAR: false
      },
      {
        id: 'busan-beach',
        title: 'Haeundae Beach',
        description: 'Beautiful beach in Busan with vibrant atmosphere',
        image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'attractions',
        location: 'Busan',
        rating: 4.5,
        hasAR: true
      },
      {
        id: 'korean-bbq',
        title: 'Korean BBQ Experience',
        description: 'Grill your own meat at authentic Korean BBQ restaurants',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'food',
        location: 'Nationwide',
        rating: 4.9,
        hasAR: false
      },
      {
        id: 'bukchon-hanok',
        title: 'Bukchon Hanok Village',
        description: 'Traditional Korean village in the heart of Seoul',
        image: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'culture',
        location: 'Seoul',
        rating: 4.6,
        hasAR: true
      }
    ];
    
    // Create discoveries grid
    const discoveriesGrid = document.createElement('div');
    discoveriesGrid.className = 'discoveries-grid';
    discoveriesGrid.id = 'discoveries-grid';
    
    // Create discovery cards
    discoveries.forEach(discovery => {
      const discoveryCard = this.createDiscoveryCard(discovery);
      discoveriesGrid.appendChild(discoveryCard);
    });
    
    discoveriesSection.appendChild(discoveriesGrid);
    
    // Create interactive map section
    const mapSection = document.createElement('div');
    mapSection.className = 'map-section card';
    
    const mapHeader = document.createElement('div');
    mapHeader.className = 'card-header';
    
    const mapTitle = document.createElement('h2');
    mapTitle.className = 'header-medium';
    mapTitle.textContent = 'Explore Korea';
    
    const mapIcon = document.createElement('div');
    mapIcon.className = 'card-header-icon';
    mapIcon.textContent = '🗺️';
    
    mapHeader.appendChild(mapTitle);
    mapHeader.appendChild(mapIcon);
    
    const mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';
    mapContainer.id = 'map-container';
    
    // Create placeholder map
    const placeholderMap = document.createElement('div');
    placeholderMap.className = 'placeholder-map';
    placeholderMap.innerHTML = `
      <div class="map-placeholder-content">
        <div class="map-placeholder-icon">🗺️</div>
        <div class="map-placeholder-text">Interactive Map</div>
      </div>
    `;
    
    const viewMapButton = document.createElement('button');
    viewMapButton.className = 'btn btn-primary view-map-button';
    viewMapButton.textContent = 'View Full Map';
    viewMapButton.addEventListener('click', () => {
      this.showFullMap();
    });
    
    mapContainer.appendChild(placeholderMap);
    
    mapSection.appendChild(mapHeader);
    mapSection.appendChild(mapContainer);
    mapSection.appendChild(viewMapButton);
    
    // Create cultural tips section
    const tipsSection = document.createElement('div');
    tipsSection.className = 'tips-section card';
    
    const tipsHeader = document.createElement('div');
    tipsHeader.className = 'card-header';
    
    const tipsTitle = document.createElement('h2');
    tipsTitle.className = 'header-medium';
    tipsTitle.textContent = 'Cultural Tips';
    
    const tipsIcon = document.createElement('div');
    tipsIcon.className = 'card-header-icon';
    tipsIcon.textContent = '💡';
    
    tipsHeader.appendChild(tipsTitle);
    tipsHeader.appendChild(tipsIcon);
    
    // Define tips
    const tips = [
      {
        title: 'Respect for Elders',
        description: 'Korean society places great emphasis on respecting elders. Use honorific language and bow slightly when greeting older people.'
      },
      {
        title: 'Shoes Off Indoors',
        description: 'Always remove your shoes when entering Korean homes, traditional restaurants, and some cultural sites.'
      },
      {
        title: 'Dining Etiquette',
        description: 'Wait for elders to start eating before you begin, and never leave chopsticks standing upright in rice.'
      }
    ];
    
    const tipsList = document.createElement('div');
    tipsList.className = 'tips-list';
    
    tips.forEach(tip => {
      const tipItem = document.createElement('div');
      tipItem.className = 'tip-item';
      
      const tipTitle = document.createElement('div');
      tipTitle.className = 'tip-title';
      tipTitle.textContent = tip.title;
      
      const tipDescription = document.createElement('div');
      tipDescription.className = 'tip-description';
      tipDescription.textContent = tip.description;
      
      tipItem.appendChild(tipTitle);
      tipItem.appendChild(tipDescription);
      
      tipsList.appendChild(tipItem);
    });
    
    const viewAllTipsButton = document.createElement('button');
    viewAllTipsButton.className = 'btn btn-outline';
    viewAllTipsButton.textContent = 'View All Tips';
    viewAllTipsButton.addEventListener('click', () => {
      this.showAllTips();
    });
    
    tipsSection.appendChild(tipsHeader);
    tipsSection.appendChild(tipsList);
    tipsSection.appendChild(viewAllTipsButton);
    
    // Add to container
    container.appendChild(header);
    container.appendChild(featuredExperience);
    container.appendChild(categoryTabs);
    container.appendChild(discoveriesSection);
    container.appendChild(mapSection);
    container.appendChild(tipsSection);
    
    // Add discover screen styles if not already added
    if (!document.getElementById('discover-screen-styles')) {
      const discoverScreenStyles = document.createElement('style');
      discoverScreenStyles.id = 'discover-screen-styles';
      discoverScreenStyles.textContent = `
        .featured-experience {
          position: relative;
          height: 200px;
          overflow: hidden;
          margin-bottom: 24px;
          padding: 0;
          border-radius: var(--border-radius-2xl);
        }
        
        .featured-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
        }
        
        .featured-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7));
          display: flex;
          align-items: flex-end;
          padding: 20px;
        }
        
        .featured-content {
          color: white;
        }
        
        .featured-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 8px;
          text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        
        .featured-description {
          font-size: 14px;
          margin-bottom: 16px;
          text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        
        .category-tabs {
          display: flex;
          overflow-x: auto;
          margin-bottom: 24px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
        }
        
        .category-tabs::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Edge */
        }
        
        .category-tab {
          flex: 0 0 auto;
          padding: 8px 16px;
          margin-right: 8px;
          background-color: var(--background-light);
          border-radius: var(--border-radius-full);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        
        .category-tab.active {
          background-color: var(--primary);
          color: white;
        }
        
        .discoveries-section {
          margin-bottom: 24px;
        }
        
        .discoveries-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        
        .discovery-card {
          position: relative;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          height: 180px;
          cursor: pointer;
        }
        
        .discovery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .discovery-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 12px;
          background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0));
          color: white;
        }
        
        .discovery-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        
        .discovery-details {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
        
        .discovery-location {
          display: flex;
          align-items: center;
        }
        
        .discovery-location-icon {
          margin-right: 4px;
        }
        
        .discovery-rating {
          display: flex;
          align-items: center;
        }
        
        .discovery-rating-icon {
          margin-right: 4px;
          color: #FFD700;
        }
        
        .discovery-ar-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background-color: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 4px 8px;
          border-radius: var(--border-radius-md);
          font-size: 12px;
          font-weight: 500;
          display: flex;
          align-items: center;
        }
        
        .discovery-ar-icon {
          margin-right: 4px;
        }
        
        .map-section {
          margin-bottom: 24px;
        }
        
        .map-container {
          height: 200px;
          background-color: var(--background-light);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          margin-bottom: 16px;
        }
        
        .placeholder-map {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #E8EEF4;
        }
        
        .map-placeholder-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .map-placeholder-icon {
          font-size: 48px;
          margin-bottom: 8px;
        }
        
        .map-placeholder-text {
          font-size: 16px;
          font-weight: 500;
          color: var(--text-secondary);
        }
        
        .view-map-button {
          width: 100%;
        }
        
        .tips-section {
          margin-bottom: 24px;
        }
        
        .tips-list {
          margin-bottom: 16px;
        }
        
        .tip-item {
          padding: 12px 0;
          border-bottom: 1px solid var(--border-color);
        }
        
        .tip-item:last-child {
          border-bottom: none;
        }
        
        .tip-title {
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .tip-description {
          font-size: 14px;
          color: var(--text-secondary);
        }
        
        /* AR Simulation styles */
        .ar-simulation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }
        
        .ar-simulation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          color: white;
        }
        
        .ar-simulation-title {
          font-size: 18px;
          font-weight: 600;
        }
        
        .ar-close-button {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
        }
        
        .ar-simulation-content {
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        
        .ar-simulation-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        
        .ar-simulation-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 16px;
          background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0));
          color: white;
        }
        
        .ar-simulation-description {
          font-size: 16px;
          margin-bottom: 8px;
        }
        
        .ar-simulation-info {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .ar-simulation-controls {
          display: flex;
          justify-content: center;
          padding: 16px;
        }
        
        .ar-control-button {
          background-color: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 8px 16px;
          margin: 0 8px;
          border-radius: var(--border-radius-full);
          font-size: 14px;
          cursor: pointer;
        }
        
        .ar-control-button:active {
          background-color: rgba(255, 255, 255, 0.3);
        }
      `;
      document.head.appendChild(discoverScreenStyles);
    }
    
    // Initialize map if Google Maps API is available
    if (window.google && window.google.maps) {
      this.initializeMap();
    }
  },
  
  // Create discovery card
  createDiscoveryCard: function(discovery) {
    const card = document.createElement('div');
    card.className = 'discovery-card';
    card.dataset.category = discovery.category;
    
    const image = document.createElement('img');
    image.className = 'discovery-image';
    image.src = discovery.image;
    image.alt = discovery.title;
    
    const overlay = document.createElement('div');
    overlay.className = 'discovery-overlay';
    
    const title = document.createElement('div');
    title.className = 'discovery-title';
    title.textContent = discovery.title;
    
    const details = document.createElement('div');
    details.className = 'discovery-details';
    
    const location = document.createElement('div');
    location.className = 'discovery-location';
    location.innerHTML = `<span class="discovery-location-icon">📍</span> ${discovery.location}`;
    
    const rating = document.createElement('div');
    rating.className = 'discovery-rating';
    rating.innerHTML = `<span class="discovery-rating-icon">★</span> ${discovery.rating}`;
    
    details.appendChild(location);
    details.appendChild(rating);
    
    overlay.appendChild(title);
    overlay.appendChild(details);
    
    card.appendChild(image);
    card.appendChild(overlay);
    
    // Add AR badge if available
    if (discovery.hasAR) {
      const arBadge = document.createElement('div');
      arBadge.className = 'discovery-ar-badge';
      arBadge.innerHTML = `<span class="discovery-ar-icon">📱</span> AR`;
      card.appendChild(arBadge);
    }
    
    // Add click event
    card.addEventListener('click', () => {
      this.showDiscoveryDetails(discovery);
    });
    
    return card;
  },
  
  // Filter discoveries by category
  filterDiscoveries: function(category) {
    const cards = document.querySelectorAll('.discovery-card');
    
    cards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  },
  
  // Show discovery details
  showDiscoveryDetails: function(discovery) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = discovery.title;
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    
    // Create discovery details content
    const discoveryContent = document.createElement('div');
    discoveryContent.className = 'discovery-details-content';
    
    const discoveryImage = document.createElement('img');
    discoveryImage.className = 'discovery-details-image';
    discoveryImage.src = discovery.image;
    discoveryImage.alt = discovery.title;
    
    const discoveryInfo = document.createElement('div');
    discoveryInfo.className = 'discovery-info';
    
    const discoveryRating = document.createElement('div');
    discoveryRating.className = 'discovery-info-rating';
    
    // Create stars based on rating
    const fullStars = Math.floor(discovery.rating);
    const hasHalfStar = discovery.rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('span');
      if (i < fullStars) {
        star.className = 'star full-star';
        star.textContent = '★';
      } else if (i === fullStars && hasHalfStar) {
        star.className = 'star half-star';
        star.textContent = '★';
      } else {
        star.className = 'star empty-star';
        star.textContent = '☆';
      }
      discoveryRating.appendChild(star);
    }
    
    const ratingValue = document.createElement('span');
    ratingValue.className = 'rating-value';
    ratingValue.textContent = discovery.rating;
    discoveryRating.appendChild(ratingValue);
    
    const discoveryLocation = document.createElement('div');
    discoveryLocation.className = 'discovery-info-location';
    discoveryLocation.innerHTML = `<span class="info-icon">📍</span> ${discovery.location}`;
    
    const discoveryCategory = document.createElement('div');
    discoveryCategory.className = 'discovery-info-category';
    
    // Get category icon
    let categoryIcon = '🏷️';
    switch (discovery.category) {
      case 'attractions':
        categoryIcon = '🏛️';
        break;
      case 'food':
        categoryIcon = '🍽️';
        break;
      case 'culture':
        categoryIcon = '🎭';
        break;
      case 'events':
        categoryIcon = '🎉';
        break;
    }
    
    // Capitalize first letter of category
    const categoryName = discovery.category.charAt(0).toUpperCase() + discovery.category.slice(1);
    
    discoveryCategory.innerHTML = `<span class="info-icon">${categoryIcon}</span> ${categoryName}`;
    
    discoveryInfo.appendChild(discoveryRating);
    discoveryInfo.appendChild(discoveryLocation);
    discoveryInfo.appendChild(discoveryCategory);
    
    const discoveryDescription = document.createElement('div');
    discoveryDescription.className = 'discovery-details-description';
    
    // Generate a longer description
    const longDescription = discovery.description + '. ' + this.generateAdditionalDescription(discovery);
    
    discoveryDescription.textContent = longDescription;
    
    const actionButtons = document.createElement('div');
    actionButtons.className = 'discovery-action-buttons';
    
    // Add AR button if available
    if (discovery.hasAR) {
      const arButton = document.createElement('button');
      arButton.className = 'btn btn-primary';
      arButton.innerHTML = '<span class="button-icon">📱</span> Explore in AR';
      arButton.addEventListener('click', () => {
        document.body.removeChild(modal);
        
        if (window.KonnectFeatures && window.KonnectFeatures.ARExperience) {
          window.KonnectFeatures.ARExperience.launch(discovery.id);
        } else {
          this.showARSimulation(discovery.id);
        }
      });
      
      actionButtons.appendChild(arButton);
    }
    
    // Add directions button
    const directionsButton = document.createElement('button');
    directionsButton.className = 'btn btn-outline';
    directionsButton.innerHTML = '<span class="button-icon">🗺️</span> Get Directions';
    directionsButton.addEventListener('click', () => {
      document.body.removeChild(modal);
      this.showDirections(discovery);
    });
    
    // Add save button
    const saveButton = document.createElement('button');
    saveButton.className = 'btn btn-outline';
    saveButton.innerHTML = '<span class="button-icon">🔖</span> Save';
    saveButton.addEventListener('click', () => {
      this.saveDiscovery(discovery);
      saveButton.innerHTML = '<span class="button-icon">✓</span> Saved';
      saveButton.disabled = true;
    });
    
    actionButtons.appendChild(directionsButton);
    actionButtons.appendChild(saveButton);
    
    discoveryContent.appendChild(discoveryImage);
    discoveryContent.appendChild(discoveryInfo);
    discoveryContent.appendChild(discoveryDescription);
    discoveryContent.appendChild(actionButtons);
    
    modalBody.appendChild(discoveryContent);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add discovery details styles if not already added
    if (!document.getElementById('discovery-details-styles')) {
      const discoveryDetailsStyles = document.createElement('style');
      discoveryDetailsStyles.id = 'discovery-details-styles';
      discoveryDetailsStyles.textContent = `
        .discovery-details-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .discovery-details-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: var(--border-radius-lg);
        }
        
        .discovery-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .discovery-info-rating, .discovery-info-location, .discovery-info-category {
          display: flex;
          align-items: center;
        }
        
        .info-icon {
          margin-right: 8px;
        }
        
        .star {
          font-size: 18px;
        }
        
        .full-star, .half-star {
          color: #FFD700;
        }
        
        .half-star {
          position: relative;
          display: inline-block;
          overflow: hidden;
          color: #FFD700;
        }
        
        .empty-star {
          color: #E0E0E0;
        }
        
        .rating-value {
          margin-left: 8px;
          font-weight: 600;
        }
        
        .discovery-details-description {
          line-height: 1.6;
        }
        
        .discovery-action-buttons {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .button-icon {
          margin-right: 8px;
        }
      `;
      document.head.appendChild(discoveryDetailsStyles);
    }
  },
  
  // Generate additional description for discovery
  generateAdditionalDescription: function(discovery) {
    // This would normally come from an API
    // For now, we'll generate some placeholder text based on the category
    
    let additionalText = '';
    
    switch (discovery.category) {
      case 'attractions':
        additionalText = 'This popular attraction draws visitors from around the world. The best times to visit are early morning or late afternoon to avoid crowds. Don\'t forget to bring your camera for stunning photo opportunities.';
        break;
      case 'food':
        additionalText = 'This culinary delight is a must-try when visiting Korea. Made with fresh, local ingredients and traditional cooking methods, it offers an authentic taste of Korean cuisine. Vegetarian options may be available upon request.';
        break;
      case 'culture':
        additionalText = 'This cultural experience provides insight into Korea\'s rich heritage and traditions. It\'s a wonderful opportunity to learn about the history and customs that have shaped Korean society. Guided tours are available in multiple languages.';
        break;
      case 'events':
        additionalText = 'This special event showcases the vibrant spirit of Korean culture. It\'s held annually and features performances, food stalls, and interactive activities for all ages. Advance ticket purchase is recommended as it often sells out.';
        break;
      default:
        additionalText = 'This is one of Korea\'s hidden gems that offers a unique experience for travelers. Local guides can provide additional context and stories that bring the experience to life.';
    }
    
    return additionalText;
  },
  
  // Show AR simulation
  showARSimulation: function(discoveryId) {
    // Get discovery data
    let discoveryData = {
      title: 'Gyeongbokgung Palace',
      description: 'The main royal palace of the Joseon dynasty, built in 1395.',
      image: 'https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    };
    
    // This would normally fetch from an API
    // For now, we'll use hardcoded data for a few examples
    if (discoveryId === 'namsan-tower') {
      discoveryData = {
        title: 'N Seoul Tower',
        description: 'Iconic communication tower on Namsan Mountain with panoramic views of Seoul.',
        image: 'https://images.unsplash.com/photo-1546874177-9e664107314e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      };
    } else if (discoveryId === 'hanbok-experience') {
      discoveryData = {
        title: 'Hanbok Experience',
        description: 'Traditional Korean clothing worn during festivals and celebrations.',
        image: 'https://images.unsplash.com/photo-1561642769-1bca263542e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      };
    } else if (discoveryId === 'bukchon-hanok') {
      discoveryData = {
        title: 'Bukchon Hanok Village',
        description: 'A traditional Korean village featuring hundreds of hanok (traditional houses).',
        image: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      };
    }
    
    // Create AR simulation
    const arSimulation = document.createElement('div');
    arSimulation.className = 'ar-simulation';
    
    const arHeader = document.createElement('div');
    arHeader.className = 'ar-simulation-header';
    
    const arTitle = document.createElement('div');
    arTitle.className = 'ar-simulation-title';
    arTitle.textContent = `AR Experience: ${discoveryData.title}`;
    
    const arCloseButton = document.createElement('button');
    arCloseButton.className = 'ar-close-button';
    arCloseButton.textContent = '×';
    arCloseButton.addEventListener('click', () => {
      document.body.removeChild(arSimulation);
    });
    
    arHeader.appendChild(arTitle);
    arHeader.appendChild(arCloseButton);
    
    const arContent = document.createElement('div');
    arContent.className = 'ar-simulation-content';
    
    const arImage = document.createElement('img');
    arImage.className = 'ar-simulation-image';
    arImage.src = discoveryData.image;
    arImage.alt = discoveryData.title;
    
    const arOverlay = document.createElement('div');
    arOverlay.className = 'ar-simulation-overlay';
    
    const arDescription = document.createElement('div');
    arDescription.className = 'ar-simulation-description';
    arDescription.textContent = discoveryData.description;
    
    const arInfo = document.createElement('div');
    arInfo.className = 'ar-simulation-info';
    arInfo.textContent = 'Move your device to explore in 360°';
    
    arOverlay.appendChild(arDescription);
    arOverlay.appendChild(arInfo);
    
    arContent.appendChild(arImage);
    arContent.appendChild(arOverlay);
    
    const arControls = document.createElement('div');
    arControls.className = 'ar-simulation-controls';
    
    const zoomInButton = document.createElement('button');
    zoomInButton.className = 'ar-control-button';
    zoomInButton.textContent = 'Zoom In';
    zoomInButton.addEventListener('click', () => {
      // Simulate zoom in
      arImage.style.transform = 'scale(1.2)';
      arImage.style.transition = 'transform 0.3s ease';
    });
    
    const zoomOutButton = document.createElement('button');
    zoomOutButton.className = 'ar-control-button';
    zoomOutButton.textContent = 'Zoom Out';
    zoomOutButton.addEventListener('click', () => {
      // Simulate zoom out
      arImage.style.transform = 'scale(1)';
      arImage.style.transition = 'transform 0.3s ease';
    });
    
    const rotateButton = document.createElement('button');
    rotateButton.className = 'ar-control-button';
    rotateButton.textContent = 'Rotate View';
    rotateButton.addEventListener('click', () => {
      // Simulate rotation
      arImage.style.transform = 'rotateY(180deg)';
      arImage.style.transition = 'transform 0.5s ease';
      
      // Reset after animation
      setTimeout(() => {
        arImage.style.transform = 'rotateY(0deg)';
        arImage.style.transition = 'transform 0s';
      }, 500);
    });
    
    arControls.appendChild(zoomInButton);
    arControls.appendChild(rotateButton);
    arControls.appendChild(zoomOutButton);
    
    arSimulation.appendChild(arHeader);
    arSimulation.appendChild(arContent);
    arSimulation.appendChild(arControls);
    
    // Add to document
    document.body.appendChild(arSimulation);
    
    // Unlock achievement if using AR
    if (window.KonnectFeatures && window.KonnectFeatures.AchievementSystem) {
      window.KonnectFeatures.AchievementSystem.unlockAchievement('use_ar');
    }
  },
  
  // Initialize map
  initializeMap: function() {
    // This would normally use Google Maps API
    // For now, we'll just show a placeholder
    console.log('Map would be initialized here');
  },
  
  // Show full map
  showFullMap: function() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content modal-content-large';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Explore Korea';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    
    // Create map content
    const mapContent = document.createElement('div');
    mapContent.className = 'full-map-content';
    
    const fullMapContainer = document.createElement('div');
    fullMapContainer.className = 'full-map-container';
    
    // Create placeholder map
    const placeholderMap = document.createElement('div');
    placeholderMap.className = 'placeholder-map';
    placeholderMap.innerHTML = `
      <div class="map-placeholder-content">
        <div class="map-placeholder-icon">🗺️</div>
        <div class="map-placeholder-text">Interactive Map of Korea</div>
        <div class="map-placeholder-subtext">Showing popular destinations and points of interest</div>
      </div>
    `;
    
    fullMapContainer.appendChild(placeholderMap);
    
    const mapControls = document.createElement('div');
    mapControls.className = 'map-controls';
    
    const filterButton = document.createElement('button');
    filterButton.className = 'btn btn-outline';
    filterButton.innerHTML = '<span class="button-icon">🔍</span> Filter';
    filterButton.addEventListener('click', () => {
      alert('Filter functionality would be implemented here');
    });
    
    const nearMeButton = document.createElement('button');
    nearMeButton.className = 'btn btn-outline';
    nearMeButton.innerHTML = '<span class="button-icon">📍</span> Near Me';
    nearMeButton.addEventListener('click', () => {
      alert('Near Me functionality would be implemented here');
    });
    
    mapControls.appendChild(filterButton);
    mapControls.appendChild(nearMeButton);
    
    mapContent.appendChild(fullMapContainer);
    mapContent.appendChild(mapControls);
    
    modalBody.appendChild(mapContent);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add full map styles if not already added
    if (!document.getElementById('full-map-styles')) {
      const fullMapStyles = document.createElement('style');
      fullMapStyles.id = 'full-map-styles';
      fullMapStyles.textContent = `
        .modal-content-large {
          width: 90%;
          max-width: 600px;
          height: 80%;
          max-height: 800px;
        }
        
        .full-map-content {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .full-map-container {
          flex-grow: 1;
          background-color: var(--background-light);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          margin-bottom: 16px;
        }
        
        .map-controls {
          display: flex;
          gap: 8px;
        }
        
        .map-placeholder-subtext {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 8px;
        }
      `;
      document.head.appendChild(fullMapStyles);
    }
  },
  
  // Show all tips
  showAllTips: function() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Cultural Tips';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    
    // Define all tips
    const allTips = [
      {
        title: 'Respect for Elders',
        description: 'Korean society places great emphasis on respecting elders. Use honorific language and bow slightly when greeting older people.'
      },
      {
        title: 'Shoes Off Indoors',
        description: 'Always remove your shoes when entering Korean homes, traditional restaurants, and some cultural sites.'
      },
      {
        title: 'Dining Etiquette',
        description: 'Wait for elders to start eating before you begin, and never leave chopsticks standing upright in rice.'
      },
      {
        title: 'Two-Handed Giving',
        description: 'When giving or receiving something, especially to/from elders or in formal situations, use both hands as a sign of respect.'
      },
      {
        title: 'Public Transportation',
        description: 'Always offer your seat to the elderly, pregnant women, or those with children on public transportation.'
      },
      {
        title: 'Business Cards',
        description: 'Exchange business cards with both hands, and take a moment to read the card before putting it away respectfully.'
      },
      {
        title: 'Drinking Culture',
        description: 'When drinking with Koreans, never pour your own drink. Pour for others and they will pour for you. Turn your head slightly away when drinking in the presence of elders.'
      },
      {
        title: 'Public Behavior',
        description: 'Avoid loud talking or phone conversations on public transportation. Public displays of affection are generally frowned upon.'
      },
      {
        title: 'Tipping',
        description: 'Tipping is not customary in Korea and may even cause confusion. Service charges are often included in bills at upscale establishments.'
      },
      {
        title: 'Gift Giving',
        description: 'Gifts are appreciated but may be politely refused at first. Insist gently, and avoid wrapping gifts in dark colors or writing names in red ink.'
      }
    ];
    
    // Create tips content
    const tipsContent = document.createElement('div');
    tipsContent.className = 'all-tips-content';
    
    // Create category tabs
    const tipCategories = document.createElement('div');
    tipCategories.className = 'tip-categories';
    
    const categories = [
      { id: 'all', name: 'All' },
      { id: 'social', name: 'Social' },
      { id: 'dining', name: 'Dining' },
      { id: 'business', name: 'Business' }
    ];
    
    categories.forEach(category => {
      const tab = document.createElement('div');
      tab.className = 'tip-category-tab';
      tab.dataset.category = category.id;
      tab.textContent = category.name;
      
      if (category.id === 'all') {
        tab.classList.add('active');
      }
      
      tab.addEventListener('click', () => {
        // Update active tab
        document.querySelectorAll('.tip-category-tab').forEach(t => {
          t.classList.remove('active');
        });
        tab.classList.add('active');
        
        // Filter tips (in a real app, this would filter by category)
        // For now, we'll just show all tips
      });
      
      tipCategories.appendChild(tab);
    });
    
    const tipsList = document.createElement('div');
    tipsList.className = 'all-tips-list';
    
    allTips.forEach(tip => {
      const tipItem = document.createElement('div');
      tipItem.className = 'all-tip-item';
      
      const tipTitle = document.createElement('div');
      tipTitle.className = 'all-tip-title';
      tipTitle.textContent = tip.title;
      
      const tipDescription = document.createElement('div');
      tipDescription.className = 'all-tip-description';
      tipDescription.textContent = tip.description;
      
      tipItem.appendChild(tipTitle);
      tipItem.appendChild(tipDescription);
      
      tipsList.appendChild(tipItem);
    });
    
    tipsContent.appendChild(tipCategories);
    tipsContent.appendChild(tipsList);
    
    modalBody.appendChild(tipsContent);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add all tips styles if not already added
    if (!document.getElementById('all-tips-styles')) {
      const allTipsStyles = document.createElement('style');
      allTipsStyles.id = 'all-tips-styles';
      allTipsStyles.textContent = `
        .all-tips-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .tip-categories {
          display: flex;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
        }
        
        .tip-categories::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Edge */
        }
        
        .tip-category-tab {
          flex: 0 0 auto;
          padding: 8px 16px;
          margin-right: 8px;
          background-color: var(--background-light);
          border-radius: var(--border-radius-full);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        
        .tip-category-tab.active {
          background-color: var(--primary);
          color: white;
        }
        
        .all-tips-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .all-tip-item {
          background-color: var(--background-light);
          border-radius: var(--border-radius-lg);
          padding: 16px;
          box-shadow: var(--shadow-md);
        }
        
        .all-tip-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .all-tip-description {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `;
      document.head.appendChild(allTipsStyles);
    }
  },
  
  // Show directions
  showDirections: function(discovery) {
    alert(`Directions to ${discovery.title} would be shown here`);
  },
  
  // Save discovery
  saveDiscovery: function(discovery) {
    // Get saved discoveries from local storage
    const savedDiscoveries = JSON.parse(localStorage.getItem('saved_discoveries')) || [];
    
    // Check if already saved
    const alreadySaved = savedDiscoveries.some(saved => saved.id === discovery.id);
    
    if (!alreadySaved) {
      // Add to saved discoveries
      savedDiscoveries.push(discovery);
      
      // Save to local storage
      localStorage.setItem('saved_discoveries', JSON.stringify(savedDiscoveries));
      
      // Update recent activities
      const activities = JSON.parse(localStorage.getItem('recent_activities')) || [];
      
      activities.unshift({
        title: `Saved ${discovery.title} to favorites`,
        time: 'Just now',
        icon: '🔖'
      });
      
      localStorage.setItem('recent_activities', JSON.stringify(activities));
      
      // Unlock achievement if first save
      if (window.KonnectFeatures && window.KonnectFeatures.AchievementSystem && savedDiscoveries.length === 1) {
        window.KonnectFeatures.AchievementSystem.unlockAchievement('first_save');
      }
    }
  },
  
  // Show search modal
  showSearchModal: function() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Search Discoveries';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    
    // Create search form
    const searchForm = document.createElement('form');
    searchForm.className = 'search-form';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Search for places, food, events...';
    searchInput.autofocus = true;
    
    const searchButton = document.createElement('button');
    searchButton.type = 'submit';
    searchButton.className = 'search-button';
    searchButton.innerHTML = '🔍';
    
    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchButton);
    
    // Create search results
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchResults.innerHTML = '<div class="search-placeholder">Enter a search term to find discoveries</div>';
    
    // Add form submit event
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const searchTerm = searchInput.value.trim().toLowerCase();
      
      if (searchTerm) {
        // Clear search results
        searchResults.innerHTML = '';
        
        // Show loading
        const loading = document.createElement('div');
        loading.className = 'search-loading';
        loading.textContent = 'Searching...';
        searchResults.appendChild(loading);
        
        // Simulate search delay
        setTimeout(() => {
          // Clear loading
          searchResults.innerHTML = '';
          
          // This would normally search an API
          // For now, we'll search our predefined discoveries
          const discoveries = [
            {
              id: 'namsan-tower',
              title: 'N Seoul Tower',
              description: 'Iconic tower with panoramic views of Seoul',
              image: 'https://images.unsplash.com/photo-1546874177-9e664107314e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              category: 'attractions',
              location: 'Seoul',
              rating: 4.7,
              hasAR: true
            },
            {
              id: 'myeongdong',
              title: 'Myeongdong Shopping',
              description: 'Famous shopping district with countless stores and street food',
              image: 'https://images.unsplash.com/photo-1585023523603-5ba4584c21f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              category: 'attractions',
              location: 'Seoul',
              rating: 4.5,
              hasAR: false
            },
            {
              id: 'bibimbap',
              title: 'Authentic Bibimbap',
              description: 'Traditional Korean mixed rice dish with vegetables',
              image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              category: 'food',
              location: 'Nationwide',
              rating: 4.8,
              hasAR: false
            }
          ];
          
          // Filter discoveries by search term
          const filteredDiscoveries = discoveries.filter(discovery => 
            discovery.title.toLowerCase().includes(searchTerm) || 
            discovery.description.toLowerCase().includes(searchTerm) ||
            discovery.location.toLowerCase().includes(searchTerm) ||
            discovery.category.toLowerCase().includes(searchTerm)
          );
          
          if (filteredDiscoveries.length > 0) {
            filteredDiscoveries.forEach(discovery => {
              const resultItem = document.createElement('div');
              resultItem.className = 'search-result-item';
              
              const resultImage = document.createElement('img');
              resultImage.className = 'search-result-image';
              resultImage.src = discovery.image;
              resultImage.alt = discovery.title;
              
              const resultContent = document.createElement('div');
              resultContent.className = 'search-result-content';
              
              const resultTitle = document.createElement('div');
              resultTitle.className = 'search-result-title';
              resultTitle.textContent = discovery.title;
              
              const resultDetails = document.createElement('div');
              resultDetails.className = 'search-result-details';
              
              const resultLocation = document.createElement('div');
              resultLocation.className = 'search-result-location';
              resultLocation.innerHTML = `<span class="result-icon">📍</span> ${discovery.location}`;
              
              const resultCategory = document.createElement('div');
              resultCategory.className = 'search-result-category';
              
              // Get category icon
              let categoryIcon = '🏷️';
              switch (discovery.category) {
                case 'attractions':
                  categoryIcon = '🏛️';
                  break;
                case 'food':
                  categoryIcon = '🍽️';
                  break;
                case 'culture':
                  categoryIcon = '🎭';
                  break;
                case 'events':
                  categoryIcon = '🎉';
                  break;
              }
              
              // Capitalize first letter of category
              const categoryName = discovery.category.charAt(0).toUpperCase() + discovery.category.slice(1);
              
              resultCategory.innerHTML = `<span class="result-icon">${categoryIcon}</span> ${categoryName}`;
              
              resultDetails.appendChild(resultLocation);
              resultDetails.appendChild(resultCategory);
              
              resultContent.appendChild(resultTitle);
              resultContent.appendChild(resultDetails);
              
              resultItem.appendChild(resultImage);
              resultItem.appendChild(resultContent);
              
              resultItem.addEventListener('click', () => {
                document.body.removeChild(modal);
                this.showDiscoveryDetails(discovery);
              });
              
              searchResults.appendChild(resultItem);
            });
          } else {
            const noResults = document.createElement('div');
            noResults.className = 'search-no-results';
            noResults.textContent = 'No discoveries found matching your search';
            searchResults.appendChild(noResults);
          }
        }, 500);
      }
    });
    
    modalBody.appendChild(searchForm);
    modalBody.appendChild(searchResults);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add search styles if not already added
    if (!document.getElementById('discover-search-styles')) {
      const discoverSearchStyles = document.createElement('style');
      discoverSearchStyles.id = 'discover-search-styles';
      discoverSearchStyles.textContent = `
        .search-form {
          display: flex;
          margin-bottom: 16px;
        }
        
        .search-input {
          flex-grow: 1;
          padding: 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md) 0 0 var(--border-radius-md);
          font-size: 16px;
        }
        
        .search-input:focus {
          border-color: var(--primary);
          outline: none;
        }
        
        .search-button {
          padding: 12px 16px;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 0 var(--border-radius-md) var(--border-radius-md) 0;
          cursor: pointer;
          font-size: 16px;
        }
        
        .search-results {
          max-height: 400px;
          overflow-y: auto;
        }
        
        .search-placeholder, .search-loading, .search-no-results {
          text-align: center;
          padding: 24px;
          color: var(--text-secondary);
        }
        
        .search-result-item {
          display: flex;
          padding: 12px;
          border-bottom: 1px solid var(--border-color);
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .search-result-item:last-child {
          border-bottom: none;
        }
        
        .search-result-item:hover {
          background-color: var(--background-light);
        }
        
        .search-result-image {
          width: 60px;
          height: 60px;
          border-radius: var(--border-radius-md);
          object-fit: cover;
          margin-right: 12px;
        }
        
        .search-result-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .search-result-title {
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .search-result-details {
          display: flex;
          font-size: 12px;
          color: var(--text-secondary);
        }
        
        .search-result-location {
          margin-right: 12px;
          display: flex;
          align-items: center;
        }
        
        .search-result-category {
          display: flex;
          align-items: center;
        }
        
        .result-icon {
          margin-right: 4px;
        }
      `;
      document.head.appendChild(discoverSearchStyles);
    }
    
    // Focus search input
    setTimeout(() => {
      searchInput.focus();
    }, 100);
  },
  
  // Initialize animations
  initAnimations: function() {
    // Add animation to featured experience
    const featuredExperience = document.querySelector('.featured-experience');
    if (featuredExperience) {
      featuredExperience.style.opacity = '0';
      featuredExperience.style.transform = 'translateY(20px)';
      featuredExperience.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      setTimeout(() => {
        featuredExperience.style.opacity = '1';
        featuredExperience.style.transform = 'translateY(0)';
      }, 100);
    }
    
    // Add animation to category tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach((tab, index) => {
      tab.style.opacity = '0';
      tab.style.transform = 'translateY(10px)';
      tab.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      setTimeout(() => {
        tab.style.opacity = '1';
        tab.style.transform = 'translateY(0)';
      }, 200 + index * 50);
    });
    
    // Add animation to discovery cards
    const discoveryCards = document.querySelectorAll('.discovery-card');
    discoveryCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 300 + index * 100);
    });
    
    // Add animation to cards
    const cards = document.querySelectorAll('.card:not(.featured-experience):not(.discovery-card)');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 500 + index * 100);
    });
  }
};

// Export to window object
window.DiscoverScreen = DiscoverScreen;
