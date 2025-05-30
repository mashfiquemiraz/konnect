// Enhanced Home Screen for Konnect App

// Home Screen Module
const HomeScreen = {
  // Initialize home screen
  init: function() {
    console.log('Initializing Home Screen');
    
    // Get home screen element
    const homeScreen = document.getElementById('home-screen');
    if (!homeScreen) return;
    
    // Clear existing content
    homeScreen.innerHTML = '';
    
    // Create home screen content
    this.createHomeScreenContent(homeScreen);
    
    // Initialize animations
    this.initAnimations();
    
    // Check for notifications
    this.checkNotifications();
  },
  
  // Create home screen content
  createHomeScreenContent: function(container) {
    // Create welcome section
    const welcomeSection = document.createElement('div');
    welcomeSection.className = 'welcome-section';
    
    // Get user name from local storage or use default
    const userName = localStorage.getItem('user_name') || 'Friend';
    
    const welcomeHeader = document.createElement('div');
    welcomeHeader.className = 'screen-header';
    
    const welcomeTitle = document.createElement('h1');
    welcomeTitle.className = 'header-large';
    welcomeTitle.textContent = `Welcome, ${userName}!`;
    
    const dateTime = document.createElement('div');
    dateTime.className = 'date-time';
    
    // Update date and time
    const updateDateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', month: 'short', day: 'numeric' };
      dateTime.textContent = now.toLocaleDateString('en-US', options);
    };
    
    updateDateTime();
    setInterval(updateDateTime, 60000);
    
    welcomeHeader.appendChild(welcomeTitle);
    welcomeHeader.appendChild(dateTime);
    
    welcomeSection.appendChild(welcomeHeader);
    
    // Create hero carousel
    const heroCarousel = document.createElement('div');
    heroCarousel.className = 'hero-carousel card';
    
    // Create carousel items
    const carouselItems = [
      {
        title: 'Complete Your Profile',
        description: 'Add your details to personalize your experience',
        icon: '👤',
        action: 'Go to Profile',
        onClick: () => window.KonnectNavigation.switchToTab('profile')
      },
      {
        title: 'Explore Korea',
        description: 'Discover amazing places and experiences',
        icon: '🗺️',
        action: 'Discover Now',
        onClick: () => window.KonnectNavigation.switchToTab('discover')
      },
      {
        title: 'Join the Community',
        description: 'Connect with others and attend events',
        icon: '👥',
        action: 'Join Now',
        onClick: () => window.KonnectNavigation.switchToTab('community')
      }
    ];
    
    // Current carousel item
    let currentCarouselItem = 0;
    
    // Create carousel container
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';
    
    // Create carousel track
    const carouselTrack = document.createElement('div');
    carouselTrack.className = 'carousel-track';
    
    // Create carousel items
    carouselItems.forEach((item, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.className = 'carousel-item';
      if (index === 0) carouselItem.classList.add('active');
      
      const itemIcon = document.createElement('div');
      itemIcon.className = 'carousel-item-icon';
      itemIcon.textContent = item.icon;
      
      const itemContent = document.createElement('div');
      itemContent.className = 'carousel-item-content';
      
      const itemTitle = document.createElement('h3');
      itemTitle.className = 'carousel-item-title';
      itemTitle.textContent = item.title;
      
      const itemDescription = document.createElement('p');
      itemDescription.className = 'carousel-item-description';
      itemDescription.textContent = item.description;
      
      const itemButton = document.createElement('button');
      itemButton.className = 'btn btn-primary';
      itemButton.textContent = item.action;
      itemButton.addEventListener('click', item.onClick);
      
      itemContent.appendChild(itemTitle);
      itemContent.appendChild(itemDescription);
      itemContent.appendChild(itemButton);
      
      carouselItem.appendChild(itemIcon);
      carouselItem.appendChild(itemContent);
      
      carouselTrack.appendChild(carouselItem);
    });
    
    // Create carousel indicators
    const carouselIndicators = document.createElement('div');
    carouselIndicators.className = 'carousel-indicators';
    
    for (let i = 0; i < carouselItems.length; i++) {
      const indicator = document.createElement('div');
      indicator.className = 'carousel-indicator';
      if (i === 0) indicator.classList.add('active');
      
      indicator.addEventListener('click', () => {
        this.goToCarouselItem(i, carouselTrack, carouselIndicators);
      });
      
      carouselIndicators.appendChild(indicator);
    }
    
    // Auto-advance carousel
    setInterval(() => {
      currentCarouselItem = (currentCarouselItem + 1) % carouselItems.length;
      this.goToCarouselItem(currentCarouselItem, carouselTrack, carouselIndicators);
    }, 5000);
    
    carouselContainer.appendChild(carouselTrack);
    heroCarousel.appendChild(carouselContainer);
    heroCarousel.appendChild(carouselIndicators);
    
    welcomeSection.appendChild(heroCarousel);
    
    // Create urgent tasks section
    const urgentTasksSection = document.createElement('div');
    urgentTasksSection.className = 'urgent-tasks card';
    
    const urgentTasksHeader = document.createElement('div');
    urgentTasksHeader.className = 'card-header';
    
    const urgentTasksTitle = document.createElement('h2');
    urgentTasksTitle.className = 'header-medium';
    urgentTasksTitle.textContent = 'Urgent Tasks';
    
    const urgentTasksIcon = document.createElement('div');
    urgentTasksIcon.className = 'card-header-icon';
    urgentTasksIcon.textContent = '⚠️';
    
    urgentTasksHeader.appendChild(urgentTasksTitle);
    urgentTasksHeader.appendChild(urgentTasksIcon);
    
    const urgentTasksList = document.createElement('div');
    urgentTasksList.className = 'tasks-list';
    
    // Get tasks from local storage or use default
    const tasks = JSON.parse(localStorage.getItem('urgent_tasks')) || [
      {
        id: 'visa_renewal',
        title: 'Visa Renewal',
        description: 'Your visa expires in 30 days',
        icon: '🛂',
        action: 'Renew Now',
        onClick: () => window.KonnectNavigation.switchToTab('services')
      },
      {
        id: 'language_class',
        title: 'Language Class',
        description: 'Your next class is tomorrow at 3 PM',
        icon: '🗣️',
        action: 'View Details',
        onClick: () => window.KonnectNavigation.switchToTab('services')
      }
    ];
    
    // Create task items
    tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      
      const taskIcon = document.createElement('div');
      taskIcon.className = 'task-icon';
      taskIcon.textContent = task.icon;
      
      const taskContent = document.createElement('div');
      taskContent.className = 'task-content';
      
      const taskTitle = document.createElement('div');
      taskTitle.className = 'task-title';
      taskTitle.textContent = task.title;
      
      const taskDescription = document.createElement('div');
      taskDescription.className = 'task-description';
      taskDescription.textContent = task.description;
      
      taskContent.appendChild(taskTitle);
      taskContent.appendChild(taskDescription);
      
      const taskAction = document.createElement('button');
      taskAction.className = 'btn btn-outline';
      taskAction.textContent = task.action;
      taskAction.addEventListener('click', task.onClick);
      
      taskItem.appendChild(taskIcon);
      taskItem.appendChild(taskContent);
      taskItem.appendChild(taskAction);
      
      urgentTasksList.appendChild(taskItem);
    });
    
    urgentTasksSection.appendChild(urgentTasksHeader);
    urgentTasksSection.appendChild(urgentTasksList);
    
    // Create quick actions section
    const quickActionsSection = document.createElement('div');
    quickActionsSection.className = 'quick-actions-section';
    
    const quickActionsHeader = document.createElement('h2');
    quickActionsHeader.className = 'header-medium';
    quickActionsHeader.textContent = 'Quick Actions';
    
    const quickActionsGrid = document.createElement('div');
    quickActionsGrid.className = 'quick-actions-grid';
    
    // Define quick actions
    const quickActions = [
      {
        title: 'Book Visa Appointment',
        icon: '🛂',
        onClick: () => window.KonnectNavigation.switchToTab('services')
      },
      {
        title: 'Find Housing',
        icon: '🏠',
        onClick: () => window.KonnectNavigation.switchToTab('services')
      },
      {
        title: 'Language Exchange',
        icon: '💬',
        onClick: () => window.KonnectNavigation.switchToTab('community')
      },
      {
        title: 'Explore Korea',
        icon: '🗺️',
        onClick: () => window.KonnectNavigation.switchToTab('discover')
      }
    ];
    
    // Create quick action buttons
    quickActions.forEach(action => {
      const actionButton = document.createElement('div');
      actionButton.className = 'quick-action-button';
      
      const actionIcon = document.createElement('div');
      actionIcon.className = 'quick-action-icon';
      actionIcon.textContent = action.icon;
      
      const actionTitle = document.createElement('div');
      actionTitle.className = 'quick-action-title';
      actionTitle.textContent = action.title;
      
      actionButton.appendChild(actionIcon);
      actionButton.appendChild(actionTitle);
      
      actionButton.addEventListener('click', action.onClick);
      
      quickActionsGrid.appendChild(actionButton);
    });
    
    quickActionsSection.appendChild(quickActionsHeader);
    quickActionsSection.appendChild(quickActionsGrid);
    
    // Create recent activity section
    const recentActivitySection = document.createElement('div');
    recentActivitySection.className = 'recent-activity card';
    
    const recentActivityHeader = document.createElement('div');
    recentActivityHeader.className = 'card-header';
    
    const recentActivityTitle = document.createElement('h2');
    recentActivityTitle.className = 'header-medium';
    recentActivityTitle.textContent = 'Recent Activity';
    
    const viewAllButton = document.createElement('button');
    viewAllButton.className = 'btn-text';
    viewAllButton.textContent = 'View All';
    viewAllButton.addEventListener('click', () => {
      window.KonnectNavigation.switchToTab('profile');
    });
    
    recentActivityHeader.appendChild(recentActivityTitle);
    recentActivityHeader.appendChild(viewAllButton);
    
    const recentActivityList = document.createElement('div');
    recentActivityList.className = 'activity-list';
    
    // Get activities from local storage or use default
    const activities = JSON.parse(localStorage.getItem('recent_activities')) || [
      {
        title: 'Visa Application Submitted',
        time: '2 days ago',
        icon: '🛂'
      },
      {
        title: 'Joined Korean Language Group',
        time: '1 week ago',
        icon: '👥'
      },
      {
        title: 'Booked Housing Tour',
        time: '2 weeks ago',
        icon: '🏠'
      }
    ];
    
    // Create activity items
    activities.forEach(activity => {
      const activityItem = document.createElement('div');
      activityItem.className = 'activity-item';
      
      const activityIcon = document.createElement('div');
      activityIcon.className = 'activity-icon';
      activityIcon.textContent = activity.icon;
      
      const activityContent = document.createElement('div');
      activityContent.className = 'activity-content';
      
      const activityTitle = document.createElement('div');
      activityTitle.className = 'activity-title';
      activityTitle.textContent = activity.title;
      
      const activityTime = document.createElement('div');
      activityTime.className = 'activity-time';
      activityTime.textContent = activity.time;
      
      activityContent.appendChild(activityTitle);
      activityContent.appendChild(activityTime);
      
      activityItem.appendChild(activityIcon);
      activityItem.appendChild(activityContent);
      
      recentActivityList.appendChild(activityItem);
    });
    
    recentActivitySection.appendChild(recentActivityHeader);
    recentActivitySection.appendChild(recentActivityList);
    
    // Add referral card if referral system is available
    if (window.KonnectFeatures && window.KonnectFeatures.ReferralSystem) {
      const referralCard = document.createElement('div');
      referralCard.className = 'referral-card card';
      
      const referralHeader = document.createElement('div');
      referralHeader.className = 'card-header';
      
      const referralTitle = document.createElement('h2');
      referralTitle.className = 'header-medium';
      referralTitle.textContent = 'Invite Friends';
      
      const referralIcon = document.createElement('div');
      referralIcon.className = 'card-header-icon';
      referralIcon.textContent = '🎁';
      
      referralHeader.appendChild(referralTitle);
      referralHeader.appendChild(referralIcon);
      
      const referralContent = document.createElement('div');
      referralContent.className = 'referral-content';
      
      const referralDescription = document.createElement('p');
      referralDescription.textContent = 'Invite friends to Konnect and earn rewards!';
      
      const referralCode = document.createElement('div');
      referralCode.className = 'referral-code';
      referralCode.textContent = window.KonnectFeatures.ReferralSystem.getReferralCode();
      
      const referralButton = document.createElement('button');
      referralButton.className = 'btn btn-primary';
      referralButton.textContent = 'Share Invite';
      referralButton.addEventListener('click', () => {
        window.KonnectFeatures.ReferralSystem.shareReferralCode();
      });
      
      referralContent.appendChild(referralDescription);
      referralContent.appendChild(referralCode);
      referralContent.appendChild(referralButton);
      
      referralCard.appendChild(referralHeader);
      referralCard.appendChild(referralContent);
      
      // Add referral card to container
      container.appendChild(welcomeSection);
      container.appendChild(urgentTasksSection);
      container.appendChild(quickActionsSection);
      container.appendChild(referralCard);
      container.appendChild(recentActivitySection);
    } else {
      // Add sections to container without referral card
      container.appendChild(welcomeSection);
      container.appendChild(urgentTasksSection);
      container.appendChild(quickActionsSection);
      container.appendChild(recentActivitySection);
    }
    
    // Add home screen styles if not already added
    if (!document.getElementById('home-screen-styles')) {
      const homeScreenStyles = document.createElement('style');
      homeScreenStyles.id = 'home-screen-styles';
      homeScreenStyles.textContent = `
        .welcome-section {
          margin-bottom: 16px;
        }
        
        .date-time {
          font-size: 14px;
          color: var(--text-secondary);
        }
        
        .hero-carousel {
          overflow: hidden;
          padding: 0;
          margin-bottom: 16px;
        }
        
        .carousel-container {
          position: relative;
          overflow: hidden;
        }
        
        .carousel-track {
          display: flex;
          transition: transform 0.3s ease;
        }
        
        .carousel-item {
          flex: 0 0 100%;
          padding: 16px;
          display: flex;
          align-items: center;
        }
        
        .carousel-item-icon {
          font-size: 48px;
          margin-right: 16px;
          flex-shrink: 0;
        }
        
        .carousel-item-content {
          flex-grow: 1;
        }
        
        .carousel-item-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .carousel-item-description {
          font-size: 14px;
          margin-bottom: 16px;
          color: var(--text-secondary);
        }
        
        .carousel-indicators {
          display: flex;
          justify-content: center;
          padding: 8px 0;
        }
        
        .carousel-indicator {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background-color: var(--background-dark);
          margin: 0 4px;
          cursor: pointer;
          transition: width 0.3s ease, background-color 0.3s ease;
        }
        
        .carousel-indicator.active {
          width: 24px;
          background-color: var(--primary);
        }
        
        .urgent-tasks {
          margin-bottom: 16px;
          border-left: 4px solid var(--primary);
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .card-header-icon {
          font-size: 24px;
        }
        
        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .task-item {
          display: flex;
          align-items: center;
        }
        
        .task-icon {
          font-size: 24px;
          margin-right: 12px;
          flex-shrink: 0;
        }
        
        .task-content {
          flex-grow: 1;
          margin-right: 12px;
        }
        
        .task-title {
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .task-description {
          font-size: 14px;
          color: var(--text-secondary);
        }
        
        .quick-actions-section {
          margin-bottom: 16px;
        }
        
        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 12px;
        }
        
        .quick-action-button {
          background-color: var(--background-light);
          border-radius: var(--border-radius-lg);
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: var(--shadow-md);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .quick-action-button:active {
          transform: scale(0.98);
          box-shadow: var(--shadow-sm);
        }
        
        .quick-action-icon {
          font-size: 32px;
          margin-bottom: 8px;
        }
        
        .quick-action-title {
          font-size: 14px;
          font-weight: 500;
          text-align: center;
        }
        
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .activity-item {
          display: flex;
          align-items: center;
        }
        
        .activity-icon {
          font-size: 24px;
          margin-right: 12px;
          flex-shrink: 0;
        }
        
        .activity-content {
          flex-grow: 1;
        }
        
        .activity-title {
          font-weight: 500;
          margin-bottom: 4px;
        }
        
        .activity-time {
          font-size: 12px;
          color: var(--text-secondary);
        }
        
        .referral-card {
          margin-bottom: 16px;
          background-color: var(--primary-light);
        }
        
        .referral-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .referral-code {
          font-size: 24px;
          font-weight: 600;
          margin: 12px 0;
          padding: 8px 16px;
          background-color: white;
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-sm);
        }
        
        .btn-text {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 500;
          cursor: pointer;
          padding: 4px 8px;
        }
      `;
      document.head.appendChild(homeScreenStyles);
    }
  },
  
  // Go to carousel item
  goToCarouselItem: function(index, track, indicators) {
    // Update track position
    track.style.transform = `translateX(-${index * 100}%)`;
    
    // Update indicators
    const activeIndicator = indicators.querySelector('.carousel-indicator.active');
    if (activeIndicator) {
      activeIndicator.classList.remove('active');
    }
    
    const newActiveIndicator = indicators.children[index];
    if (newActiveIndicator) {
      newActiveIndicator.classList.add('active');
    }
  },
  
  // Initialize animations
  initAnimations: function() {
    // Add animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 + index * 100);
    });
  },
  
  // Check for notifications
  checkNotifications: function() {
    // Check for achievements if achievement system is available
    if (window.KonnectFeatures && window.KonnectFeatures.AchievementSystem) {
      // Check for new achievements
      const lastVisit = localStorage.getItem('last_visit');
      if (!lastVisit) {
        // First visit, unlock first login achievement
        window.KonnectFeatures.AchievementSystem.unlockAchievement('first_login');
      }
      
      // Update last visit
      localStorage.setItem('last_visit', new Date().toISOString());
    }
  }
};

// Export to window object
window.HomeScreen = HomeScreen;
