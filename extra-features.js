// Extra features for Konnect App

// Achievement system
const AchievementSystem = {
  achievements: [
    {
      id: 'first_login',
      title: 'First Steps',
      description: 'Log in to Konnect for the first time',
      icon: '🏆',
      unlocked: false
    },
    {
      id: 'complete_profile',
      title: 'Identity Established',
      description: 'Complete your profile information',
      icon: '👤',
      unlocked: false
    },
    {
      id: 'book_service',
      title: 'Service Seeker',
      description: 'Book your first service',
      icon: '🛎️',
      unlocked: false
    },
    {
      id: 'join_community',
      title: 'Community Member',
      description: 'Join a community group',
      icon: '👥',
      unlocked: false
    },
    {
      id: 'attend_event',
      title: 'Social Butterfly',
      description: 'Attend your first community event',
      icon: '🎉',
      unlocked: false
    },
    {
      id: 'language_exchange',
      title: 'Language Enthusiast',
      description: 'Participate in a language exchange session',
      icon: '💬',
      unlocked: false
    },
    {
      id: 'visa_renewal',
      title: 'Staying Longer',
      description: 'Successfully renew your visa',
      icon: '🛂',
      unlocked: false
    },
    {
      id: 'refer_friend',
      title: 'Ambassador',
      description: 'Refer a friend to Konnect',
      icon: '🤝',
      unlocked: false
    },
    {
      id: 'visit_locations',
      title: 'Explorer',
      description: 'Visit 5 different locations in Korea',
      icon: '🧭',
      unlocked: false,
      progress: 0,
      goal: 5
    },
    {
      id: 'premium_upgrade',
      title: 'Premium Member',
      description: 'Upgrade to Konnect Premium',
      icon: '⭐',
      unlocked: false
    }
  ],
  
  // Initialize achievements
  init: function() {
    // Load achievements from localStorage
    const savedAchievements = localStorage.getItem('achievements');
    if (savedAchievements) {
      const parsedAchievements = JSON.parse(savedAchievements);
      this.achievements = this.achievements.map(achievement => {
        const savedAchievement = parsedAchievements.find(a => a.id === achievement.id);
        if (savedAchievement) {
          return {
            ...achievement,
            unlocked: savedAchievement.unlocked,
            progress: savedAchievement.progress || 0
          };
        }
        return achievement;
      });
    }
    
    // Unlock first login achievement if not already unlocked
    if (!this.isUnlocked('first_login')) {
      this.unlockAchievement('first_login');
    }
  },
  
  // Check if achievement is unlocked
  isUnlocked: function(achievementId) {
    const achievement = this.achievements.find(a => a.id === achievementId);
    return achievement ? achievement.unlocked : false;
  },
  
  // Unlock achievement
  unlockAchievement: function(achievementId) {
    const achievement = this.achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      
      // Save achievements to localStorage
      localStorage.setItem('achievements', JSON.stringify(this.achievements));
      
      // Show notification
      this.showAchievementNotification(achievement);
      
      return true;
    }
    return false;
  },
  
  // Update achievement progress
  updateProgress: function(achievementId, progress) {
    const achievement = this.achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked && achievement.goal) {
      achievement.progress = progress;
      
      // Check if goal reached
      if (achievement.progress >= achievement.goal) {
        this.unlockAchievement(achievementId);
      } else {
        // Save achievements to localStorage
        localStorage.setItem('achievements', JSON.stringify(this.achievements));
      }
      
      return true;
    }
    return false;
  },
  
  // Show achievement notification
  showAchievementNotification: function(achievement) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    
    const icon = document.createElement('div');
    icon.className = 'notification-icon';
    icon.textContent = achievement.icon;
    
    const content = document.createElement('div');
    content.className = 'notification-content';
    
    const title = document.createElement('div');
    title.className = 'notification-title';
    title.textContent = 'Achievement Unlocked!';
    
    const description = document.createElement('div');
    description.className = 'notification-description';
    description.textContent = achievement.title;
    
    content.appendChild(title);
    content.appendChild(description);
    
    notification.appendChild(icon);
    notification.appendChild(content);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  },
  
  // Get all achievements
  getAllAchievements: function() {
    return this.achievements;
  },
  
  // Get unlocked achievements
  getUnlockedAchievements: function() {
    return this.achievements.filter(a => a.unlocked);
  },
  
  // Get locked achievements
  getLockedAchievements: function() {
    return this.achievements.filter(a => !a.unlocked);
  }
};

// Referral system
const ReferralSystem = {
  // User's referral code
  referralCode: '',
  
  // Referral rewards
  rewards: [
    {
      count: 1,
      title: 'First Referral',
      reward: '1 Month Free Premium',
      icon: '⭐',
      claimed: false
    },
    {
      count: 3,
      title: 'Growing Network',
      reward: '500 Konnect Points',
      icon: '💰',
      claimed: false
    },
    {
      count: 5,
      title: 'Community Builder',
      reward: 'Free Language Class',
      icon: '🗣️',
      claimed: false
    },
    {
      count: 10,
      title: 'Konnect Ambassador',
      reward: 'Exclusive Ambassador Badge',
      icon: '🏅',
      claimed: false
    }
  ],
  
  // Initialize referral system
  init: function() {
    // Generate referral code if not exists
    if (!localStorage.getItem('referral_code')) {
      this.generateReferralCode();
    } else {
      this.referralCode = localStorage.getItem('referral_code');
    }
    
    // Load referral data
    const referralData = localStorage.getItem('referral_data');
    if (referralData) {
      const parsedData = JSON.parse(referralData);
      this.rewards = this.rewards.map(reward => {
        const savedReward = parsedData.rewards.find(r => r.count === reward.count);
        if (savedReward) {
          return {
            ...reward,
            claimed: savedReward.claimed
          };
        }
        return reward;
      });
    }
  },
  
  // Generate referral code
  generateReferralCode: function() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.referralCode = code;
    localStorage.setItem('referral_code', code);
  },
  
  // Get referral code
  getReferralCode: function() {
    return this.referralCode;
  },
  
  // Get referral count
  getReferralCount: function() {
    return parseInt(localStorage.getItem('referral_count') || '0');
  },
  
  // Add referral
  addReferral: function() {
    const count = this.getReferralCount() + 1;
    localStorage.setItem('referral_count', count.toString());
    
    // Check for rewards
    this.checkRewards(count);
    
    // Unlock achievement if first referral
    if (count === 1 && AchievementSystem) {
      AchievementSystem.unlockAchievement('refer_friend');
    }
    
    return count;
  },
  
  // Check for rewards
  checkRewards: function(count) {
    let rewardClaimed = false;
    
    this.rewards.forEach(reward => {
      if (count >= reward.count && !reward.claimed) {
        reward.claimed = true;
        rewardClaimed = true;
        
        // Show notification
        this.showRewardNotification(reward);
      }
    });
    
    if (rewardClaimed) {
      // Save referral data
      localStorage.setItem('referral_data', JSON.stringify({
        rewards: this.rewards
      }));
    }
  },
  
  // Show reward notification
  showRewardNotification: function(reward) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    
    const icon = document.createElement('div');
    icon.className = 'notification-icon';
    icon.textContent = reward.icon;
    
    const content = document.createElement('div');
    content.className = 'notification-content';
    
    const title = document.createElement('div');
    title.className = 'notification-title';
    title.textContent = 'Referral Reward!';
    
    const description = document.createElement('div');
    description.className = 'notification-description';
    description.textContent = `${reward.title}: ${reward.reward}`;
    
    content.appendChild(title);
    content.appendChild(description);
    
    notification.appendChild(icon);
    notification.appendChild(content);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  },
  
  // Get all rewards
  getAllRewards: function() {
    return this.rewards;
  },
  
  // Get claimed rewards
  getClaimedRewards: function() {
    return this.rewards.filter(r => r.claimed);
  },
  
  // Share referral code
  shareReferralCode: function() {
    if (navigator.share) {
      navigator.share({
        title: 'Join me on Konnect!',
        text: `Use my referral code ${this.referralCode} to join Konnect - Your Home Away From Home in Korea!`,
        url: 'https://konnect.app'
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      alert(`Your referral code is: ${this.referralCode}`);
    }
  }
};

// Language translation service
const TranslationService = {
  // Supported languages
  languages: [
    { code: 'en', name: 'English' },
    { code: 'ko', name: '한국어' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'es', name: 'Español' },
    { code: 'vi', name: 'Tiếng Việt' }
  ],
  
  // Current language
  currentLanguage: 'en',
  
  // Initialize translation service
  init: function() {
    // Load language preference
    const savedLanguage = localStorage.getItem('selected_language');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
    }
  },
  
  // Get current language
  getCurrentLanguage: function() {
    return this.currentLanguage;
  },
  
  // Set current language
  setCurrentLanguage: function(languageCode) {
    if (this.languages.find(l => l.code === languageCode)) {
      this.currentLanguage = languageCode;
      localStorage.setItem('selected_language', languageCode);
      return true;
    }
    return false;
  },
  
  // Get supported languages
  getSupportedLanguages: function() {
    return this.languages;
  },
  
  // Translate text (simulated)
  translateText: function(text, targetLanguage) {
    // In a real app, this would call a translation API
    // For this prototype, we'll simulate translation
    
    if (targetLanguage === 'en' || this.currentLanguage === 'en') {
      // Simple simulation of translation
      if (targetLanguage === 'ko') {
        return `${text} (한국어 번역)`;
      } else if (targetLanguage === 'zh') {
        return `${text} (中文翻译)`;
      } else if (targetLanguage === 'ja') {
        return `${text} (日本語翻訳)`;
      } else if (targetLanguage === 'es') {
        return `${text} (traducción al español)`;
      } else if (targetLanguage === 'vi') {
        return `${text} (bản dịch tiếng Việt)`;
      } else {
        return text;
      }
    } else {
      // If translating between non-English languages, simulate going through English
      return `${text} (translated)`;
    }
  }
};

// Emergency SOS service
const EmergencySOS = {
  // Emergency contacts
  emergencyContacts: [
    {
      name: 'Police',
      number: '112',
      icon: '👮'
    },
    {
      name: 'Ambulance',
      number: '119',
      icon: '🚑'
    },
    {
      name: 'Fire',
      number: '119',
      icon: '🚒'
    },
    {
      name: 'Foreign Emergency',
      number: '1330',
      icon: '🌐'
    }
  ],
  
  // User's emergency contacts
  userContacts: [],
  
  // Initialize emergency service
  init: function() {
    // Load user contacts
    const savedContacts = localStorage.getItem('emergency_contacts');
    if (savedContacts) {
      this.userContacts = JSON.parse(savedContacts);
    }
    
    // Create SOS button if it doesn't exist
    if (!document.querySelector('.sos-button')) {
      this.createSOSButton();
    }
  },
  
  // Create SOS button
  createSOSButton: function() {
    const sosButton = document.createElement('div');
    sosButton.className = 'sos-button';
    
    const sosIcon = document.createElement('div');
    sosIcon.className = 'sos-icon';
    sosIcon.textContent = 'SOS';
    
    sosButton.appendChild(sosIcon);
    
    // Add click event
    sosButton.addEventListener('click', () => {
      this.showSOSModal();
    });
    
    // Add to document
    document.getElementById('main-app').appendChild(sosButton);
  },
  
  // Show SOS modal
  showSOSModal: function() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Emergency SOS';
    
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
    
    // Add emergency services
    const servicesTitle = document.createElement('h3');
    servicesTitle.textContent = 'Emergency Services';
    servicesTitle.className = 'mb-3';
    
    const servicesGrid = document.createElement('div');
    servicesGrid.className = 'options-container';
    
    this.emergencyContacts.forEach(contact => {
      const contactButton = document.createElement('div');
      contactButton.className = 'option-button';
      
      const contactIcon = document.createElement('div');
      contactIcon.className = 'option-icon';
      contactIcon.textContent = contact.icon;
      
      const contactName = document.createElement('div');
      contactName.className = 'option-label';
      contactName.textContent = contact.name;
      
      const contactNumber = document.createElement('div');
      contactNumber.className = 'option-sublabel';
      contactNumber.textContent = contact.number;
      
      contactButton.appendChild(contactIcon);
      contactButton.appendChild(contactName);
      contactButton.appendChild(contactNumber);
      
      // Add click event
      contactButton.addEventListener('click', () => {
        this.callEmergencyService(contact);
      });
      
      servicesGrid.appendChild(contactButton);
    });
    
    // Add user location
    const locationTitle = document.createElement('h3');
    locationTitle.textContent = 'Your Location';
    locationTitle.className = 'mb-3 mt-4';
    
    const locationContainer = document.createElement('div');
    locationContainer.className = 'location-container card';
    
    const locationText = document.createElement('div');
    locationText.className = 'location-text';
    locationText.textContent = 'Getting your location...';
    
    locationContainer.appendChild(locationText);
    
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          locationText.innerHTML = `
            <strong>Latitude:</strong> ${latitude.toFixed(6)}<br>
            <strong>Longitude:</strong> ${longitude.toFixed(6)}<br>
            <button class="btn btn-primary mt-2" id="copy-location">Copy Location</button>
          `;
          
          // Add copy button event
          setTimeout(() => {
            document.getElementById('copy-location').addEventListener('click', () => {
              const locationString = `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`;
              navigator.clipboard.writeText(locationString).then(() => {
                alert('Location copied to clipboard');
              });
            });
          }, 100);
        },
        (error) => {
          locationText.textContent = 'Could not get your location. Please enable location services.';
        }
      );
    } else {
      locationText.textContent = 'Geolocation is not supported by your browser.';
    }
    
    // Add send alert button
    const alertButton = document.createElement('button');
    alertButton.className = 'btn btn-primary mt-4 w-100';
    alertButton.textContent = 'Send Emergency Alert';
    
    alertButton.addEventListener('click', () => {
      this.sendEmergencyAlert();
      document.body.removeChild(modal);
    });
    
    // Add elements to modal
    modalBody.appendChild(servicesTitle);
    modalBody.appendChild(servicesGrid);
    modalBody.appendChild(locationTitle);
    modalBody.appendChild(locationContainer);
    modalBody.appendChild(alertButton);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
  },
  
  // Call emergency service
  callEmergencyService: function(contact) {
    // In a real app, this would initiate a phone call
    // For this prototype, we'll show an alert
    alert(`Calling ${contact.name} (${contact.number})...`);
    
    // Simulate call
    setTimeout(() => {
      alert('This is a simulated emergency call. In a real app, this would connect to emergency services.');
    }, 1000);
  },
  
  // Send emergency alert
  sendEmergencyAlert: function() {
    // In a real app, this would send alerts to emergency contacts
    // For this prototype, we'll show a notification
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    
    const icon = document.createElement('div');
    icon.className = 'notification-icon';
    icon.textContent = '🚨';
    
    const content = document.createElement('div');
    content.className = 'notification-content';
    
    const title = document.createElement('div');
    title.className = 'notification-title';
    title.textContent = 'Emergency Alert Sent';
    
    const description = document.createElement('div');
    description.className = 'notification-description';
    description.textContent = 'Help is on the way. Stay calm.';
    
    content.appendChild(title);
    content.appendChild(description);
    
    notification.appendChild(icon);
    notification.appendChild(content);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  },
  
  // Add user emergency contact
  addUserContact: function(contact) {
    this.userContacts.push(contact);
    localStorage.setItem('emergency_contacts', JSON.stringify(this.userContacts));
  },
  
  // Remove user emergency contact
  removeUserContact: function(index) {
    this.userContacts.splice(index, 1);
    localStorage.setItem('emergency_contacts', JSON.stringify(this.userContacts));
  },
  
  // Get user emergency contacts
  getUserContacts: function() {
    return this.userContacts;
  }
};

// AR Experience (simulated)
const ARExperience = {
  // AR points of interest
  pointsOfInterest: [
    {
      id: 'gyeongbokgung',
      name: 'Gyeongbokgung Palace',
      description: 'The main royal palace of the Joseon dynasty, built in 1395.',
      icon: '🏯',
      image: 'assets/gyeongbokgung.jpg',
      location: { lat: 37.5796, lng: 126.9770 }
    },
    {
      id: 'namsan',
      name: 'Namsan Tower',
      description: 'A communication and observation tower on Namsan Mountain in central Seoul.',
      icon: '🗼',
      image: 'assets/namsan.jpg',
      location: { lat: 37.5511, lng: 126.9882 }
    },
    {
      id: 'dongdaemun',
      name: 'Dongdaemun Design Plaza',
      description: 'A major urban development landmark designed by Zaha Hadid.',
      icon: '🏢',
      image: 'assets/dongdaemun.jpg',
      location: { lat: 37.5668, lng: 127.0093 }
    },
    {
      id: 'bukchon',
      name: 'Bukchon Hanok Village',
      description: 'A Korean traditional village with hundreds of hanoks (traditional houses).',
      icon: '🏘️',
      image: 'assets/bukchon.jpg',
      location: { lat: 37.5824, lng: 126.9856 }
    }
  ],
  
  // Initialize AR experience
  init: function() {
    console.log('AR Experience initialized');
  },
  
  // Start AR experience
  startARExperience: function() {
    // In a real app, this would initialize AR using WebXR or similar
    // For this prototype, we'll show a simulated AR view
    
    // Create AR container
    const arContainer = document.createElement('div');
    arContainer.className = 'modal';
    
    const arContent = document.createElement('div');
    arContent.className = 'modal-content ar-content';
    
    const arHeader = document.createElement('div');
    arHeader.className = 'modal-header';
    
    const arTitle = document.createElement('h2');
    arTitle.textContent = 'AR Experience';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(arContainer);
    });
    
    arHeader.appendChild(arTitle);
    arHeader.appendChild(closeButton);
    
    const arBody = document.createElement('div');
    arBody.className = 'modal-body';
    
    // Add AR simulation
    const arSimulation = document.createElement('div');
    arSimulation.className = 'ar-simulation';
    arSimulation.innerHTML = `
      <div class="ar-camera-view">
        <div class="ar-overlay">
          <div class="ar-message">Point your camera at landmarks to discover more</div>
          <div class="ar-markers"></div>
        </div>
      </div>
    `;
    
    // Add POI markers
    const arMarkers = arSimulation.querySelector('.ar-markers');
    
    this.pointsOfInterest.forEach(poi => {
      const marker = document.createElement('div');
      marker.className = 'ar-marker';
      marker.innerHTML = `
        <div class="ar-marker-icon">${poi.icon}</div>
        <div class="ar-marker-distance">125m</div>
      `;
      
      // Add click event
      marker.addEventListener('click', () => {
        this.showPOIDetails(poi, arBody);
      });
      
      // Random position for simulation
      marker.style.left = `${Math.random() * 80 + 10}%`;
      marker.style.top = `${Math.random() * 80 + 10}%`;
      
      arMarkers.appendChild(marker);
    });
    
    arBody.appendChild(arSimulation);
    
    arContent.appendChild(arHeader);
    arContent.appendChild(arBody);
    
    arContainer.appendChild(arContent);
    
    // Add to document
    document.body.appendChild(arContainer);
    
    // Add AR styles if not already added
    if (!document.getElementById('ar-styles')) {
      const arStyles = document.createElement('style');
      arStyles.id = 'ar-styles';
      arStyles.textContent = `
        .ar-content {
          height: 90%;
        }
        .ar-camera-view {
          width: 100%;
          height: 400px;
          background-color: #000;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
        }
        .ar-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 16px;
        }
        .ar-message {
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          align-self: center;
        }
        .ar-markers {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .ar-marker {
          position: absolute;
          background-color: rgba(255, 107, 0, 0.9);
          color: white;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          animation: pulse 2s infinite;
        }
        .ar-marker-icon {
          font-size: 20px;
        }
        .ar-marker-distance {
          font-size: 10px;
          margin-top: 2px;
        }
        .ar-poi-details {
          margin-top: 16px;
          padding: 16px;
          background-color: var(--background-light);
          border-radius: 12px;
        }
        .ar-poi-image {
          width: 100%;
          height: 200px;
          background-color: #ddd;
          border-radius: 8px;
          margin-bottom: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 48px;
        }
        .ar-poi-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .ar-poi-description {
          margin-bottom: 16px;
        }
      `;
      document.head.appendChild(arStyles);
    }
  },
  
  // Show POI details
  showPOIDetails: function(poi, container) {
    // Remove existing details
    const existingDetails = container.querySelector('.ar-poi-details');
    if (existingDetails) {
      container.removeChild(existingDetails);
    }
    
    // Create details element
    const details = document.createElement('div');
    details.className = 'ar-poi-details';
    
    const image = document.createElement('div');
    image.className = 'ar-poi-image';
    image.textContent = poi.icon;
    
    const title = document.createElement('div');
    title.className = 'ar-poi-title';
    title.textContent = poi.name;
    
    const description = document.createElement('div');
    description.className = 'ar-poi-description';
    description.textContent = poi.description;
    
    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.textContent = 'Add to Visited Places';
    
    // Add click event
    button.addEventListener('click', () => {
      // Update achievement progress
      if (AchievementSystem) {
        const visitedLocations = JSON.parse(localStorage.getItem('visited_locations') || '[]');
        if (!visitedLocations.includes(poi.id)) {
          visitedLocations.push(poi.id);
          localStorage.setItem('visited_locations', JSON.stringify(visitedLocations));
          
          AchievementSystem.updateProgress('visit_locations', visitedLocations.length);
          
          button.textContent = 'Added to Visited Places';
          button.disabled = true;
        }
      }
    });
    
    details.appendChild(image);
    details.appendChild(title);
    details.appendChild(description);
    details.appendChild(button);
    
    container.appendChild(details);
    
    // Check if already visited
    const visitedLocations = JSON.parse(localStorage.getItem('visited_locations') || '[]');
    if (visitedLocations.includes(poi.id)) {
      button.textContent = 'Already Visited';
      button.disabled = true;
    }
  }
};

// Initialize all extra features
document.addEventListener('DOMContentLoaded', () => {
  // Initialize achievement system
  if (AchievementSystem) {
    AchievementSystem.init();
  }
  
  // Initialize referral system
  if (ReferralSystem) {
    ReferralSystem.init();
  }
  
  // Initialize translation service
  if (TranslationService) {
    TranslationService.init();
  }
  
  // Initialize emergency SOS service
  if (EmergencySOS) {
    EmergencySOS.init();
  }
  
  // Initialize AR experience
  if (ARExperience) {
    ARExperience.init();
  }
});

// Export features to window object
window.KonnectFeatures = {
  AchievementSystem,
  ReferralSystem,
  TranslationService,
  EmergencySOS,
  ARExperience
};
