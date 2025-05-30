// Main JavaScript file for Konnect App

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Konnect App...');
  
  // Initialize GitHub Pages compatibility if available
  if (window.KonnectGitHubPages) {
    window.KonnectGitHubPages.init();
  }
  
  // Show loading screen
  const loadingScreen = document.getElementById('loading-screen');
  
  // Initialize simulated APIs
  if (window.SimulatedAPIs) {
    window.SimulatedAPIs.init();
  }
  
  // Initialize extra features
  if (window.KonnectFeatures) {
    window.KonnectFeatures.init();
  }
  
  // Start opening animation after a short delay
  setTimeout(function() {
    if (window.OpeningAnimation) {
      // Check if user has completed onboarding
      const hasCompletedOnboarding = localStorage.getItem('konnect_onboarding_completed') === 'true';
      
      if (!hasCompletedOnboarding) {
        // Show opening animation
        window.OpeningAnimation.init();
        
        // When animation completes, show onboarding
        window.OpeningAnimation.onComplete(function() {
          if (window.Onboarding) {
            window.Onboarding.init();
            
            // When onboarding completes, initialize main app
            window.Onboarding.onComplete(function(userData) {
              initializeMainApp(userData);
            });
          } else {
            // Fallback if onboarding module is not available
            initializeMainApp();
          }
        });
      } else {
        // Skip animation and onboarding if already completed
        hideLoadingScreen();
        initializeMainApp();
      }
    } else {
      // Fallback if opening animation module is not available
      hideLoadingScreen();
      initializeMainApp();
    }
  }, 1000);
  
  // Function to hide loading screen
  function hideLoadingScreen() {
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(function() {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }
  
  // Function to initialize main app
  function initializeMainApp(userData) {
    console.log('Initializing main app...');
    
    // Hide loading screen
    hideLoadingScreen();
    
    // Initialize navigation
    if (window.KonnectNavigation) {
      window.KonnectNavigation.init();
    }
    
    // Initialize screens
    initializeScreens();
    
    // Initialize SOS button
    initializeSOSButton();
    
    // Set user data if available
    if (userData) {
      localStorage.setItem('konnect_user_data', JSON.stringify(userData));
    }
    
    // Check for hash-based routing
    handleInitialRouting();
    
    console.log('Konnect App initialized successfully');
  }
  
  // Function to initialize all screens
  function initializeScreens() {
    // Initialize home screen
    if (window.HomeScreen) {
      window.HomeScreen.init();
    }
    
    // Initialize services screen
    if (window.ServicesScreen) {
      window.ServicesScreen.init();
    }
    
    // Initialize discover screen
    if (window.DiscoverScreen) {
      window.DiscoverScreen.init();
    }
    
    // Initialize community screen
    if (window.CommunityScreen) {
      window.CommunityScreen.init();
    }
    
    // Initialize profile screen
    if (window.ProfileScreen) {
      window.ProfileScreen.init();
    }
  }
  
  // Function to initialize SOS button
  function initializeSOSButton() {
    const sosButton = document.getElementById('sos-button');
    
    if (sosButton) {
      sosButton.addEventListener('click', function() {
        showSOSModal();
      });
    }
  }
  
  // Function to show SOS modal
  function showSOSModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Emergency SOS';
    modalTitle.style.color = '#FF3B30';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', function() {
      document.body.removeChild(modal);
    });
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    
    // Create SOS content
    const sosContent = document.createElement('div');
    sosContent.className = 'sos-content';
    
    const sosMessage = document.createElement('p');
    sosMessage.textContent = 'Are you in an emergency situation? Select the type of help you need:';
    
    const sosOptions = document.createElement('div');
    sosOptions.className = 'sos-options';
    
    // Create SOS options
    const emergencyOptions = [
      { icon: '🚓', label: 'Police', number: '112' },
      { icon: '🚑', label: 'Ambulance', number: '119' },
      { icon: '🚒', label: 'Fire', number: '119' },
      { icon: '🏥', label: 'Medical', number: '1339' },
      { icon: '🗣️', label: 'Translation', number: '1330' },
      { icon: '🇰🇷', label: 'Korea Travel Hotline', number: '1330' }
    ];
    
    emergencyOptions.forEach(function(option) {
      const optionButton = document.createElement('div');
      optionButton.className = 'sos-option';
      
      const optionIcon = document.createElement('div');
      optionIcon.className = 'sos-option-icon';
      optionIcon.textContent = option.icon;
      
      const optionLabel = document.createElement('div');
      optionLabel.className = 'sos-option-label';
      optionLabel.textContent = option.label;
      
      const optionNumber = document.createElement('div');
      optionNumber.className = 'sos-option-number';
      optionNumber.textContent = option.number;
      
      optionButton.appendChild(optionIcon);
      optionButton.appendChild(optionLabel);
      optionButton.appendChild(optionNumber);
      
      optionButton.addEventListener('click', function() {
        showEmergencyCallConfirmation(option);
      });
      
      sosOptions.appendChild(optionButton);
    });
    
    const sosNote = document.createElement('p');
    sosNote.className = 'sos-note';
    sosNote.textContent = 'Note: In case of emergency, please find a safe location and call the appropriate number. Emergency services in Korea may have English-speaking operators.';
    
    const sosLocationButton = document.createElement('button');
    sosLocationButton.className = 'btn btn-outline sos-location-button';
    sosLocationButton.innerHTML = '<span class="button-icon">📍</span> Share My Location';
    sosLocationButton.addEventListener('click', function() {
      shareLocation();
    });
    
    sosContent.appendChild(sosMessage);
    sosContent.appendChild(sosOptions);
    sosContent.appendChild(sosNote);
    sosContent.appendChild(sosLocationButton);
    
    modalBody.appendChild(sosContent);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add SOS styles if not already added
    if (!document.getElementById('sos-styles')) {
      const sosStyles = document.createElement('style');
      sosStyles.id = 'sos-styles';
      sosStyles.textContent = `
        .sos-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .sos-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        
        .sos-option {
          background-color: #F8F8F8;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .sos-option:hover {
          background-color: #F0F0F0;
        }
        
        .sos-option-icon {
          font-size: 32px;
          margin-bottom: 8px;
        }
        
        .sos-option-label {
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .sos-option-number {
          color: #FF3B30;
          font-weight: 600;
        }
        
        .sos-note {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
          background-color: #FFF9F9;
          border-left: 3px solid #FF3B30;
          padding: 12px;
          border-radius: 4px;
        }
        
        .sos-location-button {
          margin-top: 8px;
        }
        
        .sos-confirmation {
          text-align: center;
        }
        
        .sos-confirmation-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .sos-confirmation-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .sos-confirmation-number {
          font-size: 32px;
          font-weight: 700;
          color: #FF3B30;
          margin-bottom: 24px;
        }
        
        .sos-confirmation-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        
        .sos-location-info {
          background-color: #F0F8FF;
          border-radius: 8px;
          padding: 12px;
          margin-top: 16px;
          font-size: 14px;
          line-height: 1.5;
        }
        
        .sos-location-coordinates {
          font-family: monospace;
          margin-top: 8px;
          background-color: #E0F0FF;
          padding: 8px;
          border-radius: 4px;
          word-break: break-all;
        }
      `;
      document.head.appendChild(sosStyles);
    }
  }
  
  // Function to show emergency call confirmation
  function showEmergencyCallConfirmation(option) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Emergency Call';
    modalTitle.style.color = '#FF3B30';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', function() {
      document.body.removeChild(modal);
    });
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    
    // Create confirmation content
    const confirmationContent = document.createElement('div');
    confirmationContent.className = 'sos-confirmation';
    
    const confirmationIcon = document.createElement('div');
    confirmationIcon.className = 'sos-confirmation-icon';
    confirmationIcon.textContent = option.icon;
    
    const confirmationTitle = document.createElement('div');
    confirmationTitle.className = 'sos-confirmation-title';
    confirmationTitle.textContent = `Call ${option.label} Emergency Service`;
    
    const confirmationNumber = document.createElement('div');
    confirmationNumber.className = 'sos-confirmation-number';
    confirmationNumber.textContent = option.number;
    
    const confirmationMessage = document.createElement('p');
    confirmationMessage.textContent = 'Are you sure you want to make this emergency call?';
    
    const confirmationButtons = document.createElement('div');
    confirmationButtons.className = 'sos-confirmation-buttons';
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'btn btn-outline';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', function() {
      document.body.removeChild(modal);
    });
    
    const callButton = document.createElement('button');
    callButton.className = 'btn btn-primary';
    callButton.style.backgroundColor = '#FF3B30';
    callButton.textContent = 'Call Now';
    callButton.addEventListener('click', function() {
      // In a real app, this would initiate a phone call
      // For this prototype, we'll just show a simulation
      simulateEmergencyCall(option);
      document.body.removeChild(modal);
    });
    
    confirmationButtons.appendChild(cancelButton);
    confirmationButtons.appendChild(callButton);
    
    confirmationContent.appendChild(confirmationIcon);
    confirmationContent.appendChild(confirmationTitle);
    confirmationContent.appendChild(confirmationNumber);
    confirmationContent.appendChild(confirmationMessage);
    confirmationContent.appendChild(confirmationButtons);
    
    modalBody.appendChild(confirmationContent);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
  }
  
  // Function to simulate emergency call
  function simulateEmergencyCall(option) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Calling...';
    modalTitle.style.color = '#FF3B30';
    
    modalHeader.appendChild(modalTitle);
    
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    
    // Create calling content
    const callingContent = document.createElement('div');
    callingContent.className = 'sos-confirmation';
    
    const callingIcon = document.createElement('div');
    callingIcon.className = 'sos-confirmation-icon';
    callingIcon.textContent = option.icon;
    
    const callingTitle = document.createElement('div');
    callingTitle.className = 'sos-confirmation-title';
    callingTitle.textContent = `Calling ${option.label} Emergency Service`;
    
    const callingNumber = document.createElement('div');
    callingNumber.className = 'sos-confirmation-number';
    callingNumber.textContent = option.number;
    
    const callingStatus = document.createElement('p');
    callingStatus.id = 'calling-status';
    callingStatus.textContent = 'Connecting...';
    
    const endCallButton = document.createElement('button');
    endCallButton.className = 'btn btn-primary';
    endCallButton.style.backgroundColor = '#FF3B30';
    endCallButton.textContent = 'End Call';
    endCallButton.addEventListener('click', function() {
      document.body.removeChild(modal);
    });
    
    callingContent.appendChild(callingIcon);
    callingContent.appendChild(callingTitle);
    callingContent.appendChild(callingNumber);
    callingContent.appendChild(callingStatus);
    callingContent.appendChild(endCallButton);
    
    modalBody.appendChild(callingContent);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Simulate call progress
    setTimeout(function() {
      const callingStatus = document.getElementById('calling-status');
      if (callingStatus) {
        callingStatus.textContent = 'Connected. Operator will be with you shortly...';
      }
    }, 2000);
    
    // Unlock achievement if using SOS
    if (window.KonnectFeatures && window.KonnectFeatures.AchievementSystem) {
      window.KonnectFeatures.AchievementSystem.unlockAchievement('use_sos');
    }
  }
  
  // Function to share location
  function shareLocation() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Share Location';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', function() {
      document.body.removeChild(modal);
    });
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    
    // Create location content
    const locationContent = document.createElement('div');
    locationContent.className = 'sos-content';
    
    const locationMessage = document.createElement('p');
    locationMessage.textContent = 'Your current location:';
    
    const locationInfo = document.createElement('div');
    locationInfo.className = 'sos-location-info';
    locationInfo.innerHTML = 'Retrieving your location...';
    
    const shareButtons = document.createElement('div');
    shareButtons.className = 'sos-confirmation-buttons';
    shareButtons.style.marginTop = '16px';
    
    const copyButton = document.createElement('button');
    copyButton.className = 'btn btn-outline';
    copyButton.innerHTML = '<span class="button-icon">📋</span> Copy';
    copyButton.addEventListener('click', function() {
      const locationCoordinates = document.querySelector('.sos-location-coordinates');
      if (locationCoordinates) {
        navigator.clipboard.writeText(locationCoordinates.textContent)
          .then(function() {
            copyButton.textContent = 'Copied!';
            setTimeout(function() {
              copyButton.innerHTML = '<span class="button-icon">📋</span> Copy';
            }, 2000);
          })
          .catch(function(err) {
            console.error('Could not copy text: ', err);
          });
      }
    });
    
    const shareButton = document.createElement('button');
    shareButton.className = 'btn btn-primary';
    shareButton.innerHTML = '<span class="button-icon">📤</span> Share';
    shareButton.addEventListener('click', function() {
      const locationCoordinates = document.querySelector('.sos-location-coordinates');
      if (locationCoordinates && navigator.share) {
        navigator.share({
          title: 'My Emergency Location',
          text: `My current location: ${locationCoordinates.textContent}`,
          url: `https://maps.google.com/?q=${locationCoordinates.textContent}`
        })
        .then(function() {
          console.log('Location shared successfully');
        })
        .catch(function(err) {
          console.error('Share failed:', err);
        });
      } else {
        alert('Sharing not supported on this browser');
      }
    });
    
    shareButtons.appendChild(copyButton);
    shareButtons.appendChild(shareButton);
    
    locationContent.appendChild(locationMessage);
    locationContent.appendChild(locationInfo);
    locationContent.appendChild(shareButtons);
    
    modalBody.appendChild(locationContent);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        // Update location info
        locationInfo.innerHTML = `
          <p>We've identified your current location. You can share these coordinates with emergency services:</p>
          <div class="sos-location-coordinates">${latitude}, ${longitude}</div>
          <p>This location is approximate and based on your device's GPS.</p>
        `;
      }, function(error) {
        // Handle errors
        let errorMessage = 'Unable to retrieve your location.';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access was denied. Please enable location services for this app.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable. Please try again later.';
            break;
          case error.TIMEOUT:
            errorMessage = 'The request to get your location timed out. Please try again.';
            break;
          case error.UNKNOWN_ERROR:
            errorMessage = 'An unknown error occurred while retrieving your location.';
            break;
        }
        
        locationInfo.innerHTML = `
          <p>${errorMessage}</p>
          <p>In an emergency, please verbally communicate your location to emergency services.</p>
        `;
      });
    } else {
      locationInfo.innerHTML = `
        <p>Geolocation is not supported by this browser.</p>
        <p>In an emergency, please verbally communicate your location to emergency services.</p>
      `;
    }
  }
  
  // Function to handle initial routing
  function handleInitialRouting() {
    // Check for hash in URL
    if (window.location.hash) {
      const route = window.location.hash.substring(1);
      console.log(`Initial route: ${route}`);
      
      // Handle routing based on hash
      if (route && window.KonnectNavigation) {
        // Extract tab name from route
        const tabName = route.split('/')[0];
        
        // Switch to the appropriate tab
        if (['home', 'services', 'discover', 'community', 'profile'].includes(tabName)) {
          window.KonnectNavigation.switchToTab(tabName);
        }
      }
    } else {
      // Default to home screen
      if (window.KonnectNavigation) {
        window.KonnectNavigation.switchToTab('home');
      }
    }
  }
});
