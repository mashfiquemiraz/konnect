// Enhanced Profile Screen for Konnect App

// Profile Screen Module
const ProfileScreen = {
  // Initialize profile screen
  init: function() {
    console.log('Initializing Profile Screen');
    
    // Get profile screen element
    const profileScreen = document.getElementById('profile-screen');
    if (!profileScreen) return;
    
    // Clear existing content
    profileScreen.innerHTML = '';
    
    // Create profile screen content
    this.createProfileScreenContent(profileScreen);
    
    // Initialize animations
    this.initAnimations();
  },
  
  // Create profile screen content
  createProfileScreenContent: function(container) {
    // Create profile header
    const profileHeader = document.createElement('div');
    profileHeader.className = 'profile-header-section';
    
    // Get user data from local storage or use default
    const userData = JSON.parse(localStorage.getItem('user_data')) || {
      name: 'Guest User',
      email: 'guest@example.com',
      phone: '',
      nationality: '',
      visaType: 'Tourist (B-2)',
      visaExpiry: '2025-12-31',
      profileImage: null
    };
    
    const profileAvatar = document.createElement('div');
    profileAvatar.className = 'profile-avatar';
    
    // Check if user has profile image
    if (userData.profileImage) {
      profileAvatar.style.backgroundImage = `url(${userData.profileImage})`;
    } else {
      // Use first letter of name as avatar
      const firstLetter = userData.name.charAt(0).toUpperCase();
      profileAvatar.textContent = firstLetter;
    }
    
    const profileInfo = document.createElement('div');
    profileInfo.className = 'profile-info';
    
    const profileName = document.createElement('h1');
    profileName.className = 'profile-name';
    profileName.textContent = userData.name;
    
    const profileDetails = document.createElement('div');
    profileDetails.className = 'profile-details';
    
    // Show visa type if available
    if (userData.visaType) {
      const visaType = document.createElement('div');
      visaType.className = 'profile-detail';
      visaType.innerHTML = `<span class="detail-icon">🛂</span> ${userData.visaType}`;
      profileDetails.appendChild(visaType);
    }
    
    // Show visa expiry if available
    if (userData.visaExpiry) {
      const visaExpiry = document.createElement('div');
      visaExpiry.className = 'profile-detail';
      
      // Calculate days until expiry
      const expiryDate = new Date(userData.visaExpiry);
      const today = new Date();
      const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
      
      let expiryText = `Expires in ${daysUntilExpiry} days`;
      let expiryClass = '';
      
      if (daysUntilExpiry <= 30) {
        expiryClass = 'expiry-warning';
      }
      
      if (daysUntilExpiry <= 0) {
        expiryText = 'Expired';
        expiryClass = 'expiry-expired';
      }
      
      visaExpiry.innerHTML = `<span class="detail-icon">📅</span> <span class="${expiryClass}">${expiryText}</span>`;
      profileDetails.appendChild(visaExpiry);
    }
    
    profileInfo.appendChild(profileName);
    profileInfo.appendChild(profileDetails);
    
    const editProfileButton = document.createElement('button');
    editProfileButton.className = 'btn-outline edit-profile-button';
    editProfileButton.innerHTML = '<span class="button-icon">✏️</span> Edit';
    editProfileButton.addEventListener('click', () => {
      this.showEditProfileModal(userData);
    });
    
    profileHeader.appendChild(profileAvatar);
    profileHeader.appendChild(profileInfo);
    profileHeader.appendChild(editProfileButton);
    
    // Create Korea Passport section
    const passportSection = document.createElement('div');
    passportSection.className = 'card passport-card';
    
    const passportHeader = document.createElement('div');
    passportHeader.className = 'card-header';
    
    const passportTitle = document.createElement('h2');
    passportTitle.className = 'header-medium';
    passportTitle.textContent = 'Korea Passport';
    
    const passportIcon = document.createElement('div');
    passportIcon.className = 'card-header-icon';
    passportIcon.textContent = '🗺️';
    
    passportHeader.appendChild(passportTitle);
    passportHeader.appendChild(passportIcon);
    
    const passportContent = document.createElement('div');
    passportContent.className = 'passport-content';
    
    const passportDescription = document.createElement('p');
    passportDescription.textContent = 'Complete tasks to earn stamps and unlock rewards';
    
    // Get passport data from achievement system or use default
    let stampsCollected = 0;
    let totalStamps = 10;
    
    if (window.KonnectFeatures && window.KonnectFeatures.AchievementSystem) {
      const unlockedAchievements = window.KonnectFeatures.AchievementSystem.getUnlockedAchievements();
      stampsCollected = unlockedAchievements.length;
      totalStamps = window.KonnectFeatures.AchievementSystem.getAllAchievements().length;
    }
    
    const passportProgress = document.createElement('div');
    passportProgress.className = 'passport-progress';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'passport-progress-bar';
    progressBar.style.width = `${(stampsCollected / totalStamps) * 100}%`;
    
    const progressText = document.createElement('div');
    progressText.className = 'passport-progress-text';
    progressText.textContent = `${stampsCollected}/${totalStamps} stamps collected`;
    
    passportProgress.appendChild(progressBar);
    
    const viewPassportButton = document.createElement('button');
    viewPassportButton.className = 'btn btn-primary';
    viewPassportButton.textContent = 'View Passport';
    viewPassportButton.addEventListener('click', () => {
      this.showPassportModal();
    });
    
    passportContent.appendChild(passportDescription);
    passportContent.appendChild(passportProgress);
    passportContent.appendChild(progressText);
    passportContent.appendChild(viewPassportButton);
    
    passportSection.appendChild(passportHeader);
    passportSection.appendChild(passportContent);
    
    // Create My Documents section
    const documentsSection = document.createElement('div');
    documentsSection.className = 'card documents-card';
    
    const documentsHeader = document.createElement('div');
    documentsHeader.className = 'card-header';
    
    const documentsTitle = document.createElement('h2');
    documentsTitle.className = 'header-medium';
    documentsTitle.textContent = 'My Documents';
    
    const documentsIcon = document.createElement('div');
    documentsIcon.className = 'card-header-icon';
    documentsIcon.textContent = '📄';
    
    documentsHeader.appendChild(documentsTitle);
    documentsHeader.appendChild(documentsIcon);
    
    const documentsContent = document.createElement('div');
    documentsContent.className = 'documents-content';
    
    // Define documents
    const documents = [
      {
        title: 'Visa',
        icon: '🛂',
        status: 'Valid',
        statusClass: 'status-valid'
      },
      {
        title: 'Alien Registration Card',
        icon: '💳',
        status: 'Valid',
        statusClass: 'status-valid'
      },
      {
        title: 'Insurance',
        icon: '🏥',
        status: 'Expired',
        statusClass: 'status-expired'
      }
    ];
    
    const documentsList = document.createElement('div');
    documentsList.className = 'documents-list';
    
    documents.forEach(doc => {
      const documentItem = document.createElement('div');
      documentItem.className = 'document-item';
      
      const documentIcon = document.createElement('div');
      documentIcon.className = 'document-icon';
      documentIcon.textContent = doc.icon;
      
      const documentTitle = document.createElement('div');
      documentTitle.className = 'document-title';
      documentTitle.textContent = doc.title;
      
      const documentStatus = document.createElement('div');
      documentStatus.className = `document-status ${doc.statusClass}`;
      documentStatus.textContent = doc.status;
      
      documentItem.appendChild(documentIcon);
      documentItem.appendChild(documentTitle);
      documentItem.appendChild(documentStatus);
      
      documentsList.appendChild(documentItem);
    });
    
    const uploadDocumentButton = document.createElement('button');
    uploadDocumentButton.className = 'btn btn-outline';
    uploadDocumentButton.innerHTML = '<span class="button-icon">📤</span> Upload Document';
    uploadDocumentButton.addEventListener('click', () => {
      alert('Document upload feature would be implemented here');
    });
    
    documentsContent.appendChild(documentsList);
    documentsContent.appendChild(uploadDocumentButton);
    
    documentsSection.appendChild(documentsHeader);
    documentsSection.appendChild(documentsContent);
    
    // Create Referrals section if referral system is available
    if (window.KonnectFeatures && window.KonnectFeatures.ReferralSystem) {
      const referralsSection = document.createElement('div');
      referralsSection.className = 'card referrals-card';
      
      const referralsHeader = document.createElement('div');
      referralsHeader.className = 'card-header';
      
      const referralsTitle = document.createElement('h2');
      referralsTitle.className = 'header-medium';
      referralsTitle.textContent = 'My Referrals';
      
      const referralsIcon = document.createElement('div');
      referralsIcon.className = 'card-header-icon';
      referralsIcon.textContent = '🎁';
      
      referralsHeader.appendChild(referralsTitle);
      referralsHeader.appendChild(referralsIcon);
      
      const referralsContent = document.createElement('div');
      referralsContent.className = 'referrals-content';
      
      const referralCode = document.createElement('div');
      referralCode.className = 'referral-code-container';
      
      const referralCodeLabel = document.createElement('div');
      referralCodeLabel.className = 'referral-code-label';
      referralCodeLabel.textContent = 'Your Referral Code';
      
      const referralCodeValue = document.createElement('div');
      referralCodeValue.className = 'referral-code-value';
      referralCodeValue.textContent = window.KonnectFeatures.ReferralSystem.getReferralCode();
      
      const copyButton = document.createElement('button');
      copyButton.className = 'btn-icon copy-button';
      copyButton.innerHTML = '📋';
      copyButton.title = 'Copy to clipboard';
      copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(window.KonnectFeatures.ReferralSystem.getReferralCode()).then(() => {
          alert('Referral code copied to clipboard');
        });
      });
      
      referralCode.appendChild(referralCodeLabel);
      referralCode.appendChild(referralCodeValue);
      referralCode.appendChild(copyButton);
      
      const referralStats = document.createElement('div');
      referralStats.className = 'referral-stats';
      
      const referralCount = document.createElement('div');
      referralCount.className = 'referral-stat';
      
      const referralCountValue = document.createElement('div');
      referralCountValue.className = 'stat-value';
      referralCountValue.textContent = window.KonnectFeatures.ReferralSystem.getReferralCount();
      
      const referralCountLabel = document.createElement('div');
      referralCountLabel.className = 'stat-label';
      referralCountLabel.textContent = 'Friends Referred';
      
      referralCount.appendChild(referralCountValue);
      referralCount.appendChild(referralCountLabel);
      
      const rewardsCount = document.createElement('div');
      rewardsCount.className = 'referral-stat';
      
      const rewardsCountValue = document.createElement('div');
      rewardsCountValue.className = 'stat-value';
      rewardsCountValue.textContent = window.KonnectFeatures.ReferralSystem.getClaimedRewards().length;
      
      const rewardsCountLabel = document.createElement('div');
      rewardsCountLabel.className = 'stat-label';
      rewardsCountLabel.textContent = 'Rewards Earned';
      
      rewardsCount.appendChild(rewardsCountValue);
      rewardsCount.appendChild(rewardsCountLabel);
      
      referralStats.appendChild(referralCount);
      referralStats.appendChild(rewardsCount);
      
      const shareButton = document.createElement('button');
      shareButton.className = 'btn btn-primary';
      shareButton.innerHTML = '<span class="button-icon">🔗</span> Share Invite';
      shareButton.addEventListener('click', () => {
        window.KonnectFeatures.ReferralSystem.shareReferralCode();
      });
      
      referralsContent.appendChild(referralCode);
      referralsContent.appendChild(referralStats);
      referralsContent.appendChild(shareButton);
      
      referralsSection.appendChild(referralsHeader);
      referralsSection.appendChild(referralsContent);
      
      // Add to container
      container.appendChild(profileHeader);
      container.appendChild(passportSection);
      container.appendChild(referralsSection);
      container.appendChild(documentsSection);
    } else {
      // Add to container without referrals section
      container.appendChild(profileHeader);
      container.appendChild(passportSection);
      container.appendChild(documentsSection);
    }
    
    // Create Settings section
    const settingsSection = document.createElement('div');
    settingsSection.className = 'card settings-card';
    
    const settingsHeader = document.createElement('div');
    settingsHeader.className = 'card-header';
    
    const settingsTitle = document.createElement('h2');
    settingsTitle.className = 'header-medium';
    settingsTitle.textContent = 'Settings';
    
    const settingsIcon = document.createElement('div');
    settingsIcon.className = 'card-header-icon';
    settingsIcon.textContent = '⚙️';
    
    settingsHeader.appendChild(settingsTitle);
    settingsHeader.appendChild(settingsIcon);
    
    const settingsList = document.createElement('div');
    settingsList.className = 'settings-list';
    
    // Define settings
    const settings = [
      {
        title: 'Language',
        icon: '🌐',
        value: 'English',
        onClick: () => this.showLanguageModal()
      },
      {
        title: 'Notifications',
        icon: '🔔',
        value: 'On',
        onClick: () => this.showNotificationSettings()
      },
      {
        title: 'Privacy',
        icon: '🔒',
        value: '',
        onClick: () => this.showPrivacySettings()
      },
      {
        title: 'Help & Support',
        icon: '❓',
        value: '',
        onClick: () => this.showHelpSupport()
      },
      {
        title: 'About Konnect',
        icon: 'ℹ️',
        value: '',
        onClick: () => this.showAboutKonnect()
      }
    ];
    
    settings.forEach(setting => {
      const settingItem = document.createElement('div');
      settingItem.className = 'setting-item';
      
      const settingIcon = document.createElement('div');
      settingIcon.className = 'setting-icon';
      settingIcon.textContent = setting.icon;
      
      const settingTitle = document.createElement('div');
      settingTitle.className = 'setting-title';
      settingTitle.textContent = setting.title;
      
      const settingValue = document.createElement('div');
      settingValue.className = 'setting-value';
      settingValue.textContent = setting.value;
      
      const settingArrow = document.createElement('div');
      settingArrow.className = 'setting-arrow';
      settingArrow.textContent = '›';
      
      settingItem.appendChild(settingIcon);
      settingItem.appendChild(settingTitle);
      settingItem.appendChild(settingValue);
      settingItem.appendChild(settingArrow);
      
      settingItem.addEventListener('click', setting.onClick);
      
      settingsList.appendChild(settingItem);
    });
    
    settingsSection.appendChild(settingsHeader);
    settingsSection.appendChild(settingsList);
    
    container.appendChild(settingsSection);
    
    // Add logout button
    const logoutButton = document.createElement('button');
    logoutButton.className = 'btn btn-outline logout-button';
    logoutButton.textContent = 'Log Out';
    logoutButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to log out?')) {
        // In a real app, this would clear session data
        alert('You have been logged out');
        
        // Redirect to welcome screen
        window.location.reload();
      }
    });
    
    container.appendChild(logoutButton);
    
    // Add version info
    const versionInfo = document.createElement('div');
    versionInfo.className = 'version-info';
    versionInfo.textContent = 'Konnect v1.0.0';
    
    container.appendChild(versionInfo);
    
    // Add profile screen styles if not already added
    if (!document.getElementById('profile-screen-styles')) {
      const profileScreenStyles = document.createElement('style');
      profileScreenStyles.id = 'profile-screen-styles';
      profileScreenStyles.textContent = `
        .profile-header-section {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
          padding: 16px;
          background-color: var(--background-light);
          border-radius: var(--border-radius-2xl);
          box-shadow: var(--shadow-md);
        }
        
        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: var(--primary);
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 32px;
          font-weight: bold;
          margin-right: 16px;
          flex-shrink: 0;
          background-size: cover;
          background-position: center;
        }
        
        .profile-info {
          flex-grow: 1;
          margin-right: 16px;
        }
        
        .profile-name {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 4px;
        }
        
        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .profile-detail {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: var(--text-secondary);
        }
        
        .detail-icon {
          margin-right: 8px;
        }
        
        .expiry-warning {
          color: var(--warning);
        }
        
        .expiry-expired {
          color: var(--error);
        }
        
        .edit-profile-button {
          padding: 8px 16px;
          font-size: 14px;
          flex-shrink: 0;
        }
        
        .button-icon {
          margin-right: 8px;
        }
        
        .passport-card {
          margin-bottom: 16px;
        }
        
        .passport-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .passport-progress {
          width: 100%;
          height: 8px;
          background-color: var(--background-dark);
          border-radius: 4px;
          overflow: hidden;
        }
        
        .passport-progress-bar {
          height: 100%;
          background-color: var(--accent);
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        
        .passport-progress-text {
          font-size: 14px;
          color: var(--text-secondary);
          text-align: center;
        }
        
        .documents-card {
          margin-bottom: 16px;
        }
        
        .documents-list {
          margin-bottom: 16px;
        }
        
        .document-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--border-color);
        }
        
        .document-item:last-child {
          border-bottom: none;
        }
        
        .document-icon {
          font-size: 24px;
          margin-right: 16px;
        }
        
        .document-title {
          flex-grow: 1;
          font-weight: 500;
        }
        
        .document-status {
          font-size: 14px;
          font-weight: 500;
          padding: 4px 8px;
          border-radius: var(--border-radius-md);
        }
        
        .status-valid {
          background-color: var(--success-light);
          color: var(--success);
        }
        
        .status-expired {
          background-color: var(--error-light);
          color: var(--error);
        }
        
        .referrals-card {
          margin-bottom: 16px;
          background-color: var(--primary-light);
        }
        
        .referrals-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .referral-code-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: white;
          padding: 16px;
          border-radius: var(--border-radius-lg);
          position: relative;
        }
        
        .referral-code-label {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }
        
        .referral-code-value {
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 2px;
        }
        
        .copy-button {
          position: absolute;
          top: 8px;
          right: 8px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
        
        .referral-stats {
          display: flex;
          justify-content: space-around;
        }
        
        .referral-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .stat-value {
          font-size: 24px;
          font-weight: 600;
        }
        
        .stat-label {
          font-size: 14px;
          color: var(--text-secondary);
        }
        
        .settings-card {
          margin-bottom: 16px;
        }
        
        .settings-list {
          display: flex;
          flex-direction: column;
        }
        
        .setting-item {
          display: flex;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid var(--border-color);
          cursor: pointer;
        }
        
        .setting-item:last-child {
          border-bottom: none;
        }
        
        .setting-icon {
          font-size: 20px;
          margin-right: 16px;
        }
        
        .setting-title {
          flex-grow: 1;
        }
        
        .setting-value {
          color: var(--text-secondary);
          margin-right: 8px;
        }
        
        .setting-arrow {
          font-size: 20px;
          color: var(--text-secondary);
        }
        
        .logout-button {
          width: 100%;
          margin-bottom: 16px;
        }
        
        .version-info {
          text-align: center;
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }
        
        .btn-icon {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          padding: 4px;
        }
      `;
      document.head.appendChild(profileScreenStyles);
    }
  },
  
  // Show edit profile modal
  showEditProfileModal: function(userData) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Edit Profile';
    
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
    
    // Create form
    const form = document.createElement('form');
    form.className = 'edit-profile-form';
    
    // Create form fields
    const fields = [
      {
        id: 'name',
        label: 'Full Name',
        type: 'text',
        value: userData.name,
        required: true
      },
      {
        id: 'email',
        label: 'Email',
        type: 'email',
        value: userData.email,
        required: true
      },
      {
        id: 'phone',
        label: 'Phone',
        type: 'tel',
        value: userData.phone || '',
        required: false
      },
      {
        id: 'nationality',
        label: 'Nationality',
        type: 'text',
        value: userData.nationality || '',
        required: false
      },
      {
        id: 'visaType',
        label: 'Visa Type',
        type: 'text',
        value: userData.visaType || '',
        required: false
      },
      {
        id: 'visaExpiry',
        label: 'Visa Expiry Date',
        type: 'date',
        value: userData.visaExpiry || '',
        required: false
      }
    ];
    
    fields.forEach(field => {
      const formGroup = document.createElement('div');
      formGroup.className = 'form-group';
      
      const label = document.createElement('label');
      label.htmlFor = field.id;
      label.textContent = field.label;
      
      const input = document.createElement('input');
      input.type = field.type;
      input.id = field.id;
      input.name = field.id;
      input.value = field.value;
      input.required = field.required;
      
      formGroup.appendChild(label);
      formGroup.appendChild(input);
      
      form.appendChild(formGroup);
    });
    
    // Add profile image upload
    const imageUploadGroup = document.createElement('div');
    imageUploadGroup.className = 'form-group';
    
    const imageUploadLabel = document.createElement('label');
    imageUploadLabel.textContent = 'Profile Image';
    
    const imageUploadButton = document.createElement('button');
    imageUploadButton.type = 'button';
    imageUploadButton.className = 'btn btn-outline';
    imageUploadButton.innerHTML = '<span class="button-icon">📷</span> Upload Image';
    imageUploadButton.addEventListener('click', () => {
      alert('Image upload would be implemented here');
    });
    
    imageUploadGroup.appendChild(imageUploadLabel);
    imageUploadGroup.appendChild(imageUploadButton);
    
    form.appendChild(imageUploadGroup);
    
    // Add save button
    const saveButton = document.createElement('button');
    saveButton.type = 'submit';
    saveButton.className = 'btn btn-primary';
    saveButton.textContent = 'Save Changes';
    
    form.appendChild(saveButton);
    
    // Add form submit event
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const updatedUserData = {};
      
      for (const [key, value] of formData.entries()) {
        updatedUserData[key] = value;
      }
      
      // Update user data in local storage
      localStorage.setItem('user_data', JSON.stringify(updatedUserData));
      
      // Update user name in local storage
      localStorage.setItem('user_name', updatedUserData.name);
      
      // Close modal
      document.body.removeChild(modal);
      
      // Refresh profile screen
      this.init();
      
      // Unlock achievement if profile is complete
      if (window.KonnectFeatures && window.KonnectFeatures.AchievementSystem) {
        if (updatedUserData.name && updatedUserData.email && updatedUserData.phone && 
            updatedUserData.nationality && updatedUserData.visaType) {
          window.KonnectFeatures.AchievementSystem.unlockAchievement('complete_profile');
        }
      }
    });
    
    modalBody.appendChild(form);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add form styles if not already added
    if (!document.getElementById('form-styles')) {
      const formStyles = document.createElement('style');
      formStyles.id = 'form-styles';
      formStyles.textContent = `
        .form-group {
          margin-bottom: 16px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }
        
        .form-group input {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          font-size: 16px;
        }
        
        .form-group input:focus {
          border-color: var(--primary);
          outline: none;
        }
      `;
      document.head.appendChild(formStyles);
    }
  },
  
  // Show passport modal
  showPassportModal: function() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Korea Passport';
    
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
    
    // Get achievements from achievement system or use default
    let achievements = [];
    
    if (window.KonnectFeatures && window.KonnectFeatures.AchievementSystem) {
      achievements = window.KonnectFeatures.AchievementSystem.getAllAchievements();
    }
    
    // Create passport content
    const passportContent = document.createElement('div');
    passportContent.className = 'passport-modal-content';
    
    // Create passport cover
    const passportCover = document.createElement('div');
    passportCover.className = 'passport-cover';
    
    const passportTitle = document.createElement('div');
    passportTitle.className = 'passport-title';
    passportTitle.textContent = 'KOREA PASSPORT';
    
    const passportLogo = document.createElement('div');
    passportLogo.className = 'passport-logo';
    passportLogo.textContent = '🇰🇷';
    
    const passportSubtitle = document.createElement('div');
    passportSubtitle.className = 'passport-subtitle';
    passportSubtitle.textContent = 'KONNECT';
    
    passportCover.appendChild(passportTitle);
    passportCover.appendChild(passportLogo);
    passportCover.appendChild(passportSubtitle);
    
    // Create achievements list
    const achievementsList = document.createElement('div');
    achievementsList.className = 'achievements-list';
    
    achievements.forEach(achievement => {
      const achievementItem = document.createElement('div');
      achievementItem.className = `achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`;
      
      const achievementIcon = document.createElement('div');
      achievementIcon.className = 'achievement-icon';
      achievementIcon.textContent = achievement.unlocked ? achievement.icon : '🔒';
      
      const achievementContent = document.createElement('div');
      achievementContent.className = 'achievement-content';
      
      const achievementTitle = document.createElement('div');
      achievementTitle.className = 'achievement-title';
      achievementTitle.textContent = achievement.title;
      
      const achievementDescription = document.createElement('div');
      achievementDescription.className = 'achievement-description';
      achievementDescription.textContent = achievement.description;
      
      // Add progress bar for achievements with progress
      if (achievement.goal && !achievement.unlocked) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'achievement-progress-container';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'achievement-progress-bar';
        progressBar.style.width = `${(achievement.progress / achievement.goal) * 100}%`;
        
        const progressText = document.createElement('div');
        progressText.className = 'achievement-progress-text';
        progressText.textContent = `${achievement.progress || 0}/${achievement.goal}`;
        
        progressContainer.appendChild(progressBar);
        progressContainer.appendChild(progressText);
        
        achievementContent.appendChild(achievementTitle);
        achievementContent.appendChild(achievementDescription);
        achievementContent.appendChild(progressContainer);
      } else {
        achievementContent.appendChild(achievementTitle);
        achievementContent.appendChild(achievementDescription);
      }
      
      achievementItem.appendChild(achievementIcon);
      achievementItem.appendChild(achievementContent);
      
      achievementsList.appendChild(achievementItem);
    });
    
    passportContent.appendChild(passportCover);
    passportContent.appendChild(achievementsList);
    
    modalBody.appendChild(passportContent);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add passport styles if not already added
    if (!document.getElementById('passport-styles')) {
      const passportStyles = document.createElement('style');
      passportStyles.id = 'passport-styles';
      passportStyles.textContent = `
        .passport-modal-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .passport-cover {
          background-color: var(--primary);
          color: white;
          padding: 24px;
          border-radius: var(--border-radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .passport-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 16px;
        }
        
        .passport-logo {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .passport-subtitle {
          font-size: 18px;
          font-weight: 500;
        }
        
        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .achievement-item {
          display: flex;
          align-items: flex-start;
          padding: 16px;
          border-radius: var(--border-radius-lg);
          background-color: var(--background-light);
        }
        
        .achievement-item.unlocked {
          background-color: var(--success-light);
        }
        
        .achievement-icon {
          font-size: 32px;
          margin-right: 16px;
          flex-shrink: 0;
        }
        
        .achievement-content {
          flex-grow: 1;
        }
        
        .achievement-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .achievement-description {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }
        
        .achievement-progress-container {
          height: 8px;
          background-color: var(--background-dark);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          margin-top: 8px;
        }
        
        .achievement-progress-bar {
          height: 100%;
          background-color: var(--primary);
          border-radius: 4px;
        }
        
        .achievement-progress-text {
          position: absolute;
          top: -18px;
          right: 0;
          font-size: 12px;
          color: var(--text-secondary);
        }
      `;
      document.head.appendChild(passportStyles);
    }
  },
  
  // Show language modal
  showLanguageModal: function() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Select Language';
    
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
    
    // Get supported languages from translation service or use default
    let languages = [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'ko', name: '한국어', flag: '🇰🇷' },
      { code: 'zh', name: '中文', flag: '🇨🇳' },
      { code: 'ja', name: '日本語', flag: '🇯🇵' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
    ];
    
    if (window.KonnectFeatures && window.KonnectFeatures.TranslationService) {
      languages = window.KonnectFeatures.TranslationService.getSupportedLanguages();
    }
    
    // Get current language
    let currentLanguage = 'en';
    
    if (window.KonnectFeatures && window.KonnectFeatures.TranslationService) {
      currentLanguage = window.KonnectFeatures.TranslationService.getCurrentLanguage();
    }
    
    // Create language list
    const languageList = document.createElement('div');
    languageList.className = 'language-list';
    
    languages.forEach(language => {
      const languageItem = document.createElement('div');
      languageItem.className = `language-item ${language.code === currentLanguage ? 'selected' : ''}`;
      
      const languageFlag = document.createElement('div');
      languageFlag.className = 'language-flag';
      languageFlag.textContent = language.flag;
      
      const languageName = document.createElement('div');
      languageName.className = 'language-name';
      languageName.textContent = language.name;
      
      const languageCheck = document.createElement('div');
      languageCheck.className = 'language-check';
      languageCheck.textContent = '✓';
      
      languageItem.appendChild(languageFlag);
      languageItem.appendChild(languageName);
      languageItem.appendChild(languageCheck);
      
      languageItem.addEventListener('click', () => {
        // Update selected language
        document.querySelectorAll('.language-item').forEach(item => {
          item.classList.remove('selected');
        });
        
        languageItem.classList.add('selected');
        
        // Set language in translation service
        if (window.KonnectFeatures && window.KonnectFeatures.TranslationService) {
          window.KonnectFeatures.TranslationService.setCurrentLanguage(language.code);
        }
        
        // Close modal
        document.body.removeChild(modal);
      });
      
      languageList.appendChild(languageItem);
    });
    
    modalBody.appendChild(languageList);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add language styles if not already added
    if (!document.getElementById('language-styles')) {
      const languageStyles = document.createElement('style');
      languageStyles.id = 'language-styles';
      languageStyles.textContent = `
        .language-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .language-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border-radius: var(--border-radius-lg);
          background-color: var(--background-light);
          cursor: pointer;
        }
        
        .language-item.selected {
          background-color: var(--primary-light);
        }
        
        .language-flag {
          font-size: 24px;
          margin-right: 16px;
        }
        
        .language-name {
          flex-grow: 1;
          font-weight: 500;
        }
        
        .language-check {
          font-size: 20px;
          color: var(--primary);
          opacity: 0;
        }
        
        .language-item.selected .language-check {
          opacity: 1;
        }
      `;
      document.head.appendChild(languageStyles);
    }
  },
  
  // Show notification settings
  showNotificationSettings: function() {
    alert('Notification settings would be implemented here');
  },
  
  // Show privacy settings
  showPrivacySettings: function() {
    alert('Privacy settings would be implemented here');
  },
  
  // Show help and support
  showHelpSupport: function() {
    alert('Help and support would be implemented here');
  },
  
  // Show about Konnect
  showAboutKonnect: function() {
    alert('About Konnect would be implemented here');
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
  }
};

// Export to window object
window.ProfileScreen = ProfileScreen;
