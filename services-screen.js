// Enhanced Services Screen for Konnect App

// Services Screen Module
const ServicesScreen = {
  // Initialize services screen
  init: function() {
    console.log('Initializing Services Screen');
    
    // Get services screen element
    const servicesScreen = document.getElementById('services-screen');
    if (!servicesScreen) return;
    
    // Clear existing content
    servicesScreen.innerHTML = '';
    
    // Create services screen content
    this.createServicesScreenContent(servicesScreen);
    
    // Initialize animations
    this.initAnimations();
  },
  
  // Create services screen content
  createServicesScreenContent: function(container) {
    // Create header
    const header = document.createElement('div');
    header.className = 'screen-header';
    
    const title = document.createElement('h1');
    title.className = 'header-large';
    title.textContent = 'Services';
    
    const searchButton = document.createElement('button');
    searchButton.className = 'btn-icon';
    searchButton.innerHTML = '🔍';
    searchButton.addEventListener('click', () => {
      this.showSearchModal();
    });
    
    header.appendChild(title);
    header.appendChild(searchButton);
    
    // Create featured service
    const featuredService = document.createElement('div');
    featuredService.className = 'featured-service card';
    
    const featuredServiceImage = document.createElement('div');
    featuredServiceImage.className = 'featured-service-image';
    featuredServiceImage.innerHTML = '🛂';
    
    const featuredServiceContent = document.createElement('div');
    featuredServiceContent.className = 'featured-service-content';
    
    const featuredServiceTitle = document.createElement('h2');
    featuredServiceTitle.className = 'featured-service-title';
    featuredServiceTitle.textContent = 'Visa Renewal Service';
    
    const featuredServiceDescription = document.createElement('p');
    featuredServiceDescription.className = 'featured-service-description';
    featuredServiceDescription.textContent = 'Fast and easy visa renewal with expert guidance';
    
    const featuredServiceButton = document.createElement('button');
    featuredServiceButton.className = 'btn btn-primary';
    featuredServiceButton.textContent = 'Book Now';
    featuredServiceButton.addEventListener('click', () => {
      this.showServiceDetails('visa-renewal');
    });
    
    featuredServiceContent.appendChild(featuredServiceTitle);
    featuredServiceContent.appendChild(featuredServiceDescription);
    featuredServiceContent.appendChild(featuredServiceButton);
    
    featuredService.appendChild(featuredServiceImage);
    featuredService.appendChild(featuredServiceContent);
    
    // Create service categories
    const serviceCategories = document.createElement('div');
    serviceCategories.className = 'service-categories';
    
    const categoriesTitle = document.createElement('h2');
    categoriesTitle.className = 'header-medium';
    categoriesTitle.textContent = 'Categories';
    
    // Define categories
    const categories = [
      {
        id: 'visa',
        title: 'Visa & Immigration',
        icon: '🛂',
        description: 'Application, renewal, and status check',
        services: [
          {
            id: 'visa-application',
            title: 'Visa Application',
            description: 'Apply for a new visa with expert guidance',
            price: '₩150,000',
            duration: '2-4 weeks'
          },
          {
            id: 'visa-renewal',
            title: 'Visa Renewal',
            description: 'Renew your existing visa before it expires',
            price: '₩100,000',
            duration: '1-2 weeks'
          },
          {
            id: 'visa-extension',
            title: 'Visa Extension',
            description: 'Extend your stay in Korea',
            price: '₩80,000',
            duration: '1 week'
          }
        ]
      },
      {
        id: 'housing',
        title: 'Housing',
        icon: '🏠',
        description: 'Find apartments, dormitories, and homestays',
        services: [
          {
            id: 'apartment-search',
            title: 'Apartment Search',
            description: 'Find the perfect apartment with local agents',
            price: '₩200,000',
            duration: 'Varies'
          },
          {
            id: 'housing-contract',
            title: 'Housing Contract Review',
            description: 'Expert review of your housing contract',
            price: '₩50,000',
            duration: '2-3 days'
          },
          {
            id: 'temporary-housing',
            title: 'Temporary Housing',
            description: 'Short-term accommodation solutions',
            price: 'From ₩40,000/night',
            duration: 'Flexible'
          }
        ]
      },
      {
        id: 'jobs',
        title: 'Jobs & Internships',
        icon: '💼',
        description: 'Opportunities for foreigners in Korea',
        services: [
          {
            id: 'job-search',
            title: 'Job Search Assistance',
            description: 'Find employment opportunities matching your skills',
            price: '₩100,000',
            duration: 'Ongoing'
          },
          {
            id: 'resume-review',
            title: 'Resume & Cover Letter Review',
            description: 'Professional review and optimization',
            price: '₩50,000',
            duration: '3-5 days'
          },
          {
            id: 'interview-prep',
            title: 'Interview Preparation',
            description: 'Mock interviews and feedback',
            price: '₩70,000',
            duration: '1 week'
          }
        ]
      },
      {
        id: 'language',
        title: 'Language Learning',
        icon: '🗣️',
        description: 'Korean classes and language exchange',
        services: [
          {
            id: 'korean-classes',
            title: 'Korean Language Classes',
            description: 'Group classes for all levels',
            price: '₩300,000',
            duration: '10 weeks'
          },
          {
            id: 'private-tutor',
            title: 'Private Tutor',
            description: 'One-on-one Korean language instruction',
            price: '₩50,000/hour',
            duration: 'Flexible'
          },
          {
            id: 'language-exchange',
            title: 'Language Exchange Program',
            description: 'Connect with native Korean speakers',
            price: 'Free',
            duration: 'Ongoing'
          }
        ]
      },
      {
        id: 'banking',
        title: 'Banking & Finance',
        icon: '💰',
        description: 'Bank account setup and financial services',
        services: [
          {
            id: 'bank-account',
            title: 'Bank Account Setup',
            description: 'Assistance with opening a Korean bank account',
            price: '₩30,000',
            duration: '1 day'
          },
          {
            id: 'tax-filing',
            title: 'Tax Filing Assistance',
            description: 'Help with annual tax returns for foreigners',
            price: '₩100,000',
            duration: '1-2 weeks'
          },
          {
            id: 'financial-planning',
            title: 'Financial Planning',
            description: 'Personalized financial advice for expats',
            price: '₩150,000',
            duration: 'Ongoing'
          }
        ]
      },
      {
        id: 'healthcare',
        title: 'Healthcare',
        icon: '🏥',
        description: 'Medical services and insurance',
        services: [
          {
            id: 'health-insurance',
            title: 'Health Insurance Registration',
            description: 'Assistance with NHIS registration',
            price: '₩20,000',
            duration: '1-2 days'
          },
          {
            id: 'medical-translation',
            title: 'Medical Translation',
            description: 'Translation services for medical appointments',
            price: '₩40,000/hour',
            duration: 'As needed'
          },
          {
            id: 'hospital-appointment',
            title: 'Hospital Appointment Booking',
            description: 'Assistance with finding doctors and booking appointments',
            price: '₩15,000',
            duration: '1 day'
          }
        ]
      }
    ];
    
    // Create category items
    categories.forEach(category => {
      const categoryItem = document.createElement('div');
      categoryItem.className = 'service-category';
      categoryItem.dataset.category = category.id;
      
      const categoryIcon = document.createElement('div');
      categoryIcon.className = 'service-category-icon';
      categoryIcon.textContent = category.icon;
      
      const categoryContent = document.createElement('div');
      categoryContent.className = 'service-category-content';
      
      const categoryTitle = document.createElement('div');
      categoryTitle.className = 'service-category-title';
      categoryTitle.textContent = category.title;
      
      const categoryDescription = document.createElement('div');
      categoryDescription.className = 'service-category-description';
      categoryDescription.textContent = category.description;
      
      categoryContent.appendChild(categoryTitle);
      categoryContent.appendChild(categoryDescription);
      
      const categoryArrow = document.createElement('div');
      categoryArrow.className = 'service-category-arrow';
      categoryArrow.textContent = '›';
      
      categoryItem.appendChild(categoryIcon);
      categoryItem.appendChild(categoryContent);
      categoryItem.appendChild(categoryArrow);
      
      categoryItem.addEventListener('click', () => {
        this.showCategoryServices(category);
      });
      
      serviceCategories.appendChild(categoryItem);
    });
    
    // Create recent bookings section
    const recentBookings = document.createElement('div');
    recentBookings.className = 'recent-bookings card';
    
    const recentBookingsHeader = document.createElement('div');
    recentBookingsHeader.className = 'card-header';
    
    const recentBookingsTitle = document.createElement('h2');
    recentBookingsTitle.className = 'header-medium';
    recentBookingsTitle.textContent = 'Recent Bookings';
    
    const viewAllButton = document.createElement('button');
    viewAllButton.className = 'btn-text';
    viewAllButton.textContent = 'View All';
    viewAllButton.addEventListener('click', () => {
      this.showAllBookings();
    });
    
    recentBookingsHeader.appendChild(recentBookingsTitle);
    recentBookingsHeader.appendChild(viewAllButton);
    
    // Get bookings from local storage or use default
    const bookings = JSON.parse(localStorage.getItem('recent_bookings')) || [
      {
        id: 'booking-1',
        service: 'Korean Language Class',
        date: '2025-06-01',
        status: 'Upcoming',
        statusClass: 'status-upcoming'
      },
      {
        id: 'booking-2',
        service: 'Visa Consultation',
        date: '2025-05-15',
        status: 'Completed',
        statusClass: 'status-completed'
      }
    ];
    
    const bookingsList = document.createElement('div');
    bookingsList.className = 'bookings-list';
    
    // Show message if no bookings
    if (bookings.length === 0) {
      const noBookings = document.createElement('div');
      noBookings.className = 'no-bookings';
      noBookings.textContent = 'No recent bookings';
      bookingsList.appendChild(noBookings);
    } else {
      // Create booking items
      bookings.forEach(booking => {
        const bookingItem = document.createElement('div');
        bookingItem.className = 'booking-item';
        
        const bookingService = document.createElement('div');
        bookingService.className = 'booking-service';
        bookingService.textContent = booking.service;
        
        const bookingDetails = document.createElement('div');
        bookingDetails.className = 'booking-details';
        
        const bookingDate = document.createElement('div');
        bookingDate.className = 'booking-date';
        
        // Format date
        const date = new Date(booking.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
        
        bookingDate.textContent = formattedDate;
        
        const bookingStatus = document.createElement('div');
        bookingStatus.className = `booking-status ${booking.statusClass}`;
        bookingStatus.textContent = booking.status;
        
        bookingDetails.appendChild(bookingDate);
        bookingDetails.appendChild(bookingStatus);
        
        bookingItem.appendChild(bookingService);
        bookingItem.appendChild(bookingDetails);
        
        bookingItem.addEventListener('click', () => {
          this.showBookingDetails(booking);
        });
        
        bookingsList.appendChild(bookingItem);
      });
    }
    
    recentBookings.appendChild(recentBookingsHeader);
    recentBookings.appendChild(bookingsList);
    
    // Add to container
    container.appendChild(header);
    container.appendChild(featuredService);
    container.appendChild(categoriesTitle);
    container.appendChild(serviceCategories);
    container.appendChild(recentBookings);
    
    // Add services screen styles if not already added
    if (!document.getElementById('services-screen-styles')) {
      const servicesScreenStyles = document.createElement('style');
      servicesScreenStyles.id = 'services-screen-styles';
      servicesScreenStyles.textContent = `
        .featured-service {
          display: flex;
          margin-bottom: 24px;
          overflow: hidden;
          padding: 0;
        }
        
        .featured-service-image {
          width: 100px;
          height: 100%;
          background-color: var(--primary-light);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 48px;
          flex-shrink: 0;
        }
        
        .featured-service-content {
          padding: 16px;
          flex-grow: 1;
        }
        
        .featured-service-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .featured-service-description {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }
        
        .service-categories {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }
        
        .service-category {
          display: flex;
          align-items: center;
          padding: 16px;
          background-color: var(--background-light);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-md);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .service-category:active {
          transform: scale(0.98);
          box-shadow: var(--shadow-sm);
        }
        
        .service-category-icon {
          width: 48px;
          height: 48px;
          background-color: var(--primary-light);
          border-radius: var(--border-radius-md);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          margin-right: 16px;
          flex-shrink: 0;
        }
        
        .service-category-content {
          flex-grow: 1;
        }
        
        .service-category-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .service-category-description {
          font-size: 14px;
          color: var(--text-secondary);
        }
        
        .service-category-arrow {
          font-size: 24px;
          color: var(--text-secondary);
          margin-left: 8px;
        }
        
        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .booking-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--border-color);
          cursor: pointer;
        }
        
        .booking-item:last-child {
          border-bottom: none;
        }
        
        .booking-service {
          font-weight: 500;
        }
        
        .booking-details {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        
        .booking-date {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        
        .booking-status {
          font-size: 12px;
          font-weight: 500;
          padding: 2px 8px;
          border-radius: var(--border-radius-sm);
        }
        
        .status-upcoming {
          background-color: var(--primary-light);
          color: var(--primary);
        }
        
        .status-completed {
          background-color: var(--success-light);
          color: var(--success);
        }
        
        .status-cancelled {
          background-color: var(--error-light);
          color: var(--error);
        }
        
        .no-bookings {
          text-align: center;
          padding: 16px;
          color: var(--text-secondary);
        }
        
        /* Service details modal styles */
        .service-details-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .service-image {
          width: 100%;
          height: 150px;
          background-color: var(--primary-light);
          border-radius: var(--border-radius-lg);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 64px;
        }
        
        .service-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .service-price {
          font-size: 20px;
          font-weight: 600;
          color: var(--primary);
        }
        
        .service-duration {
          font-size: 14px;
          color: var(--text-secondary);
        }
        
        .service-description {
          margin-bottom: 16px;
        }
        
        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-group label {
          font-weight: 500;
        }
        
        .form-group input, .form-group select {
          padding: 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          font-size: 16px;
        }
        
        .form-group input:focus, .form-group select:focus {
          border-color: var(--primary);
          outline: none;
        }
      `;
      document.head.appendChild(servicesScreenStyles);
    }
  },
  
  // Show category services
  showCategoryServices: function(category) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = category.title;
    
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
    
    // Create services list
    const servicesList = document.createElement('div');
    servicesList.className = 'services-list';
    
    category.services.forEach(service => {
      const serviceItem = document.createElement('div');
      serviceItem.className = 'service-item';
      
      const serviceTitle = document.createElement('div');
      serviceTitle.className = 'service-item-title';
      serviceTitle.textContent = service.title;
      
      const serviceDescription = document.createElement('div');
      serviceDescription.className = 'service-item-description';
      serviceDescription.textContent = service.description;
      
      const serviceDetails = document.createElement('div');
      serviceDetails.className = 'service-item-details';
      
      const servicePrice = document.createElement('div');
      servicePrice.className = 'service-item-price';
      servicePrice.textContent = service.price;
      
      const serviceDuration = document.createElement('div');
      serviceDuration.className = 'service-item-duration';
      serviceDuration.textContent = service.duration;
      
      serviceDetails.appendChild(servicePrice);
      serviceDetails.appendChild(serviceDuration);
      
      const serviceButton = document.createElement('button');
      serviceButton.className = 'btn btn-primary service-item-button';
      serviceButton.textContent = 'Book Now';
      serviceButton.addEventListener('click', () => {
        document.body.removeChild(modal);
        this.showServiceDetails(service.id, service);
      });
      
      serviceItem.appendChild(serviceTitle);
      serviceItem.appendChild(serviceDescription);
      serviceItem.appendChild(serviceDetails);
      serviceItem.appendChild(serviceButton);
      
      servicesList.appendChild(serviceItem);
    });
    
    modalBody.appendChild(servicesList);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add services list styles if not already added
    if (!document.getElementById('services-list-styles')) {
      const servicesListStyles = document.createElement('style');
      servicesListStyles.id = 'services-list-styles';
      servicesListStyles.textContent = `
        .services-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .service-item {
          background-color: var(--background-light);
          border-radius: var(--border-radius-lg);
          padding: 16px;
          box-shadow: var(--shadow-md);
        }
        
        .service-item-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .service-item-description {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }
        
        .service-item-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        
        .service-item-price {
          font-weight: 600;
          color: var(--primary);
        }
        
        .service-item-duration {
          font-size: 14px;
          color: var(--text-secondary);
        }
        
        .service-item-button {
          width: 100%;
        }
      `;
      document.head.appendChild(servicesListStyles);
    }
  },
  
  // Show service details
  showServiceDetails: function(serviceId, serviceData) {
    // Find service data if not provided
    if (!serviceData) {
      // This would normally fetch from an API
      // For now, we'll use a default
      serviceData = {
        id: serviceId,
        title: 'Visa Renewal Service',
        description: 'Our visa renewal service provides expert guidance through the entire process. We'll help you prepare all necessary documents, fill out applications correctly, and ensure a smooth renewal process.',
        price: '₩100,000',
        duration: '1-2 weeks',
        icon: '🛂'
      };
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = serviceData.title;
    
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
    
    // Create service details content
    const serviceDetailsContent = document.createElement('div');
    serviceDetailsContent.className = 'service-details-content';
    
    const serviceImage = document.createElement('div');
    serviceImage.className = 'service-image';
    serviceImage.textContent = serviceData.icon || '🛂';
    
    const serviceInfo = document.createElement('div');
    serviceInfo.className = 'service-info';
    
    const servicePrice = document.createElement('div');
    servicePrice.className = 'service-price';
    servicePrice.textContent = serviceData.price;
    
    const serviceDuration = document.createElement('div');
    serviceDuration.className = 'service-duration';
    serviceDuration.textContent = `Duration: ${serviceData.duration}`;
    
    serviceInfo.appendChild(servicePrice);
    serviceInfo.appendChild(serviceDuration);
    
    const serviceDescription = document.createElement('div');
    serviceDescription.className = 'service-description';
    serviceDescription.textContent = serviceData.description;
    
    // Create booking form
    const bookingForm = document.createElement('form');
    bookingForm.className = 'booking-form';
    
    // Date selection
    const dateGroup = document.createElement('div');
    dateGroup.className = 'form-group';
    
    const dateLabel = document.createElement('label');
    dateLabel.htmlFor = 'booking-date';
    dateLabel.textContent = 'Select Date';
    
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'booking-date';
    dateInput.name = 'booking-date';
    dateInput.required = true;
    
    // Set min date to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tYyyy = tomorrow.getFullYear();
    const tMm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const tDd = String(tomorrow.getDate()).padStart(2, '0');
    dateInput.value = `${tYyyy}-${tMm}-${tDd}`;
    
    dateGroup.appendChild(dateLabel);
    dateGroup.appendChild(dateInput);
    
    // Time selection
    const timeGroup = document.createElement('div');
    timeGroup.className = 'form-group';
    
    const timeLabel = document.createElement('label');
    timeLabel.htmlFor = 'booking-time';
    timeLabel.textContent = 'Select Time';
    
    const timeSelect = document.createElement('select');
    timeSelect.id = 'booking-time';
    timeSelect.name = 'booking-time';
    timeSelect.required = true;
    
    // Add time options
    const timeOptions = [
      '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
    ];
    
    timeOptions.forEach(time => {
      const option = document.createElement('option');
      option.value = time;
      option.textContent = time;
      timeSelect.appendChild(option);
    });
    
    timeGroup.appendChild(timeLabel);
    timeGroup.appendChild(timeSelect);
    
    // Notes
    const notesGroup = document.createElement('div');
    notesGroup.className = 'form-group';
    
    const notesLabel = document.createElement('label');
    notesLabel.htmlFor = 'booking-notes';
    notesLabel.textContent = 'Additional Notes (Optional)';
    
    const notesInput = document.createElement('textarea');
    notesInput.id = 'booking-notes';
    notesInput.name = 'booking-notes';
    notesInput.rows = 3;
    
    notesGroup.appendChild(notesLabel);
    notesGroup.appendChild(notesInput);
    
    // Submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'btn btn-primary';
    submitButton.textContent = 'Book Service';
    
    bookingForm.appendChild(dateGroup);
    bookingForm.appendChild(timeGroup);
    bookingForm.appendChild(notesGroup);
    bookingForm.appendChild(submitButton);
    
    // Add form submit event
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(bookingForm);
      const bookingData = {
        service: serviceData.title,
        date: formData.get('booking-date'),
        time: formData.get('booking-time'),
        notes: formData.get('booking-notes')
      };
      
      // Save booking
      this.saveBooking(bookingData);
      
      // Close modal
      document.body.removeChild(modal);
      
      // Show confirmation
      this.showBookingConfirmation(bookingData);
      
      // Unlock achievement if booking service
      if (window.KonnectFeatures && window.KonnectFeatures.AchievementSystem) {
        window.KonnectFeatures.AchievementSystem.unlockAchievement('book_service');
      }
    });
    
    serviceDetailsContent.appendChild(serviceImage);
    serviceDetailsContent.appendChild(serviceInfo);
    serviceDetailsContent.appendChild(serviceDescription);
    serviceDetailsContent.appendChild(bookingForm);
    
    modalBody.appendChild(serviceDetailsContent);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add textarea styles if not already added
    if (!document.getElementById('textarea-styles')) {
      const textareaStyles = document.createElement('style');
      textareaStyles.id = 'textarea-styles';
      textareaStyles.textContent = `
        textarea {
          padding: 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          font-size: 16px;
          font-family: inherit;
          resize: vertical;
        }
        
        textarea:focus {
          border-color: var(--primary);
          outline: none;
        }
      `;
      document.head.appendChild(textareaStyles);
    }
  },
  
  // Save booking
  saveBooking: function(bookingData) {
    // Generate booking ID
    const bookingId = 'booking-' + Date.now();
    
    // Create booking object
    const booking = {
      id: bookingId,
      service: bookingData.service,
      date: bookingData.date,
      time: bookingData.time,
      notes: bookingData.notes,
      status: 'Upcoming',
      statusClass: 'status-upcoming'
    };
    
    // Get existing bookings
    const bookings = JSON.parse(localStorage.getItem('recent_bookings')) || [];
    
    // Add new booking
    bookings.unshift(booking);
    
    // Save bookings
    localStorage.setItem('recent_bookings', JSON.stringify(bookings));
    
    // Update recent activities
    const activities = JSON.parse(localStorage.getItem('recent_activities')) || [];
    
    activities.unshift({
      title: `Booked ${bookingData.service}`,
      time: 'Just now',
      icon: '📅'
    });
    
    localStorage.setItem('recent_activities', JSON.stringify(activities));
  },
  
  // Show booking confirmation
  showBookingConfirmation: function(bookingData) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Booking Confirmed';
    
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
    
    // Create confirmation content
    const confirmationContent = document.createElement('div');
    confirmationContent.className = 'confirmation-content';
    
    const confirmationIcon = document.createElement('div');
    confirmationIcon.className = 'confirmation-icon';
    confirmationIcon.textContent = '✅';
    
    const confirmationMessage = document.createElement('div');
    confirmationMessage.className = 'confirmation-message';
    confirmationMessage.textContent = 'Your booking has been confirmed!';
    
    const bookingDetails = document.createElement('div');
    bookingDetails.className = 'booking-details-confirmation';
    
    // Format date
    const date = new Date(bookingData.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    bookingDetails.innerHTML = `
      <div class="booking-detail-item">
        <div class="booking-detail-label">Service:</div>
        <div class="booking-detail-value">${bookingData.service}</div>
      </div>
      <div class="booking-detail-item">
        <div class="booking-detail-label">Date:</div>
        <div class="booking-detail-value">${formattedDate}</div>
      </div>
      <div class="booking-detail-item">
        <div class="booking-detail-label">Time:</div>
        <div class="booking-detail-value">${bookingData.time}</div>
      </div>
    `;
    
    if (bookingData.notes) {
      bookingDetails.innerHTML += `
        <div class="booking-detail-item">
          <div class="booking-detail-label">Notes:</div>
          <div class="booking-detail-value">${bookingData.notes}</div>
        </div>
      `;
    }
    
    const addToCalendarButton = document.createElement('button');
    addToCalendarButton.className = 'btn btn-outline';
    addToCalendarButton.innerHTML = '<span class="button-icon">📅</span> Add to Calendar';
    addToCalendarButton.addEventListener('click', () => {
      alert('Calendar integration would be implemented here');
    });
    
    const viewBookingsButton = document.createElement('button');
    viewBookingsButton.className = 'btn btn-primary';
    viewBookingsButton.textContent = 'View My Bookings';
    viewBookingsButton.addEventListener('click', () => {
      document.body.removeChild(modal);
      this.showAllBookings();
    });
    
    confirmationContent.appendChild(confirmationIcon);
    confirmationContent.appendChild(confirmationMessage);
    confirmationContent.appendChild(bookingDetails);
    confirmationContent.appendChild(addToCalendarButton);
    confirmationContent.appendChild(viewBookingsButton);
    
    modalBody.appendChild(confirmationContent);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add confirmation styles if not already added
    if (!document.getElementById('confirmation-styles')) {
      const confirmationStyles = document.createElement('style');
      confirmationStyles.id = 'confirmation-styles';
      confirmationStyles.textContent = `
        .confirmation-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
        }
        
        .confirmation-icon {
          font-size: 64px;
          margin-bottom: 8px;
        }
        
        .confirmation-message {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        
        .booking-details-confirmation {
          width: 100%;
          background-color: var(--background-light);
          border-radius: var(--border-radius-lg);
          padding: 16px;
          margin-bottom: 16px;
        }
        
        .booking-detail-item {
          display: flex;
          margin-bottom: 8px;
        }
        
        .booking-detail-item:last-child {
          margin-bottom: 0;
        }
        
        .booking-detail-label {
          font-weight: 600;
          margin-right: 8px;
          min-width: 80px;
        }
        
        .booking-detail-value {
          flex-grow: 1;
          text-align: left;
        }
        
        .btn-outline {
          width: 100%;
          margin-bottom: 8px;
        }
        
        .btn-primary {
          width: 100%;
        }
      `;
      document.head.appendChild(confirmationStyles);
    }
  },
  
  // Show all bookings
  showAllBookings: function() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'My Bookings';
    
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
    
    // Get bookings from local storage or use default
    const bookings = JSON.parse(localStorage.getItem('recent_bookings')) || [];
    
    // Create bookings list
    const bookingsList = document.createElement('div');
    bookingsList.className = 'all-bookings-list';
    
    // Show message if no bookings
    if (bookings.length === 0) {
      const noBookings = document.createElement('div');
      noBookings.className = 'no-bookings';
      noBookings.textContent = 'No bookings found';
      bookingsList.appendChild(noBookings);
    } else {
      // Create booking items
      bookings.forEach(booking => {
        const bookingItem = document.createElement('div');
        bookingItem.className = 'all-booking-item';
        
        const bookingHeader = document.createElement('div');
        bookingHeader.className = 'all-booking-header';
        
        const bookingService = document.createElement('div');
        bookingService.className = 'all-booking-service';
        bookingService.textContent = booking.service;
        
        const bookingStatus = document.createElement('div');
        bookingStatus.className = `booking-status ${booking.statusClass}`;
        bookingStatus.textContent = booking.status;
        
        bookingHeader.appendChild(bookingService);
        bookingHeader.appendChild(bookingStatus);
        
        const bookingDetails = document.createElement('div');
        bookingDetails.className = 'all-booking-details';
        
        // Format date
        const date = new Date(booking.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
          weekday: 'short',
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
        
        const bookingDateTime = document.createElement('div');
        bookingDateTime.className = 'all-booking-datetime';
        bookingDateTime.innerHTML = `
          <div class="all-booking-date">${formattedDate}</div>
          <div class="all-booking-time">${booking.time || 'N/A'}</div>
        `;
        
        const bookingActions = document.createElement('div');
        bookingActions.className = 'all-booking-actions';
        
        const viewButton = document.createElement('button');
        viewButton.className = 'btn-text';
        viewButton.textContent = 'View Details';
        viewButton.addEventListener('click', () => {
          this.showBookingDetails(booking);
        });
        
        bookingActions.appendChild(viewButton);
        
        // Add cancel button for upcoming bookings
        if (booking.status === 'Upcoming') {
          const cancelButton = document.createElement('button');
          cancelButton.className = 'btn-text btn-text-danger';
          cancelButton.textContent = 'Cancel';
          cancelButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to cancel this booking?')) {
              this.cancelBooking(booking.id);
              document.body.removeChild(modal);
              this.showAllBookings();
            }
          });
          
          bookingActions.appendChild(cancelButton);
        }
        
        bookingDetails.appendChild(bookingDateTime);
        bookingDetails.appendChild(bookingActions);
        
        bookingItem.appendChild(bookingHeader);
        bookingItem.appendChild(bookingDetails);
        
        bookingsList.appendChild(bookingItem);
      });
    }
    
    modalBody.appendChild(bookingsList);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add all bookings styles if not already added
    if (!document.getElementById('all-bookings-styles')) {
      const allBookingsStyles = document.createElement('style');
      allBookingsStyles.id = 'all-bookings-styles';
      allBookingsStyles.textContent = `
        .all-bookings-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .all-booking-item {
          background-color: var(--background-light);
          border-radius: var(--border-radius-lg);
          padding: 16px;
          box-shadow: var(--shadow-md);
        }
        
        .all-booking-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .all-booking-service {
          font-size: 16px;
          font-weight: 600;
        }
        
        .all-booking-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .all-booking-datetime {
          display: flex;
          flex-direction: column;
        }
        
        .all-booking-date {
          font-weight: 500;
        }
        
        .all-booking-time {
          font-size: 14px;
          color: var(--text-secondary);
        }
        
        .all-booking-actions {
          display: flex;
          gap: 16px;
        }
        
        .btn-text {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 500;
          cursor: pointer;
          padding: 4px 8px;
        }
        
        .btn-text-danger {
          color: var(--error);
        }
      `;
      document.head.appendChild(allBookingsStyles);
    }
  },
  
  // Show booking details
  showBookingDetails: function(booking) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Booking Details';
    
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
    
    // Create booking details content
    const bookingDetailsContent = document.createElement('div');
    bookingDetailsContent.className = 'booking-details-content';
    
    const bookingStatus = document.createElement('div');
    bookingStatus.className = `booking-status-large ${booking.statusClass}`;
    bookingStatus.textContent = booking.status;
    
    const bookingService = document.createElement('h3');
    bookingService.className = 'booking-service-title';
    bookingService.textContent = booking.service;
    
    const bookingInfo = document.createElement('div');
    bookingInfo.className = 'booking-info';
    
    // Format date
    const date = new Date(booking.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    bookingInfo.innerHTML = `
      <div class="booking-info-item">
        <div class="booking-info-label">Booking ID:</div>
        <div class="booking-info-value">${booking.id}</div>
      </div>
      <div class="booking-info-item">
        <div class="booking-info-label">Date:</div>
        <div class="booking-info-value">${formattedDate}</div>
      </div>
      <div class="booking-info-item">
        <div class="booking-info-label">Time:</div>
        <div class="booking-info-value">${booking.time || 'N/A'}</div>
      </div>
    `;
    
    if (booking.notes) {
      bookingInfo.innerHTML += `
        <div class="booking-info-item">
          <div class="booking-info-label">Notes:</div>
          <div class="booking-info-value">${booking.notes}</div>
        </div>
      `;
    }
    
    const bookingActions = document.createElement('div');
    bookingActions.className = 'booking-actions';
    
    // Add actions based on booking status
    if (booking.status === 'Upcoming') {
      const rescheduleButton = document.createElement('button');
      rescheduleButton.className = 'btn btn-outline';
      rescheduleButton.innerHTML = '<span class="button-icon">📅</span> Reschedule';
      rescheduleButton.addEventListener('click', () => {
        alert('Reschedule functionality would be implemented here');
      });
      
      const cancelButton = document.createElement('button');
      cancelButton.className = 'btn btn-outline btn-danger';
      cancelButton.innerHTML = '<span class="button-icon">❌</span> Cancel Booking';
      cancelButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to cancel this booking?')) {
          this.cancelBooking(booking.id);
          document.body.removeChild(modal);
          this.init(); // Refresh services screen
        }
      });
      
      bookingActions.appendChild(rescheduleButton);
      bookingActions.appendChild(cancelButton);
    } else if (booking.status === 'Completed') {
      const reviewButton = document.createElement('button');
      reviewButton.className = 'btn btn-outline';
      reviewButton.innerHTML = '<span class="button-icon">⭐</span> Leave Review';
      reviewButton.addEventListener('click', () => {
        alert('Review functionality would be implemented here');
      });
      
      const bookAgainButton = document.createElement('button');
      bookAgainButton.className = 'btn btn-primary';
      bookAgainButton.innerHTML = 'Book Again';
      bookAgainButton.addEventListener('click', () => {
        document.body.removeChild(modal);
        this.showServiceDetails(booking.service.toLowerCase().replace(/\s+/g, '-'));
      });
      
      bookingActions.appendChild(reviewButton);
      bookingActions.appendChild(bookAgainButton);
    }
    
    bookingDetailsContent.appendChild(bookingStatus);
    bookingDetailsContent.appendChild(bookingService);
    bookingDetailsContent.appendChild(bookingInfo);
    bookingDetailsContent.appendChild(bookingActions);
    
    modalBody.appendChild(bookingDetailsContent);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add booking details styles if not already added
    if (!document.getElementById('booking-details-styles')) {
      const bookingDetailsStyles = document.createElement('style');
      bookingDetailsStyles.id = 'booking-details-styles';
      bookingDetailsStyles.textContent = `
        .booking-details-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .booking-status-large {
          align-self: flex-start;
          font-size: 14px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: var(--border-radius-md);
        }
        
        .booking-service-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        
        .booking-info {
          background-color: var(--background-light);
          border-radius: var(--border-radius-lg);
          padding: 16px;
          margin-bottom: 16px;
        }
        
        .booking-info-item {
          display: flex;
          margin-bottom: 12px;
        }
        
        .booking-info-item:last-child {
          margin-bottom: 0;
        }
        
        .booking-info-label {
          font-weight: 600;
          min-width: 100px;
          margin-right: 8px;
        }
        
        .booking-info-value {
          flex-grow: 1;
        }
        
        .booking-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .btn-danger {
          background-color: var(--error-light);
          color: var(--error);
          border: 1px solid var(--error);
        }
        
        .btn-danger:active {
          background-color: var(--error-light);
        }
      `;
      document.head.appendChild(bookingDetailsStyles);
    }
  },
  
  // Cancel booking
  cancelBooking: function(bookingId) {
    // Get bookings
    const bookings = JSON.parse(localStorage.getItem('recent_bookings')) || [];
    
    // Find booking
    const bookingIndex = bookings.findIndex(booking => booking.id === bookingId);
    
    if (bookingIndex !== -1) {
      // Update booking status
      bookings[bookingIndex].status = 'Cancelled';
      bookings[bookingIndex].statusClass = 'status-cancelled';
      
      // Save bookings
      localStorage.setItem('recent_bookings', JSON.stringify(bookings));
      
      // Update recent activities
      const activities = JSON.parse(localStorage.getItem('recent_activities')) || [];
      
      activities.unshift({
        title: `Cancelled ${bookings[bookingIndex].service} booking`,
        time: 'Just now',
        icon: '❌'
      });
      
      localStorage.setItem('recent_activities', JSON.stringify(activities));
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
    modalTitle.textContent = 'Search Services';
    
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
    searchInput.placeholder = 'Search for services...';
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
    searchResults.innerHTML = '<div class="search-placeholder">Enter a search term to find services</div>';
    
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
          
          // Search all services
          let resultsFound = false;
          
          // This would normally search an API
          // For now, we'll search our predefined categories
          const allServices = [];
          
          // Collect all services from categories
          const categories = [
            {
              id: 'visa',
              title: 'Visa & Immigration',
              icon: '🛂',
              services: [
                {
                  id: 'visa-application',
                  title: 'Visa Application',
                  description: 'Apply for a new visa with expert guidance'
                },
                {
                  id: 'visa-renewal',
                  title: 'Visa Renewal',
                  description: 'Renew your existing visa before it expires'
                },
                {
                  id: 'visa-extension',
                  title: 'Visa Extension',
                  description: 'Extend your stay in Korea'
                }
              ]
            },
            {
              id: 'housing',
              title: 'Housing',
              icon: '🏠',
              services: [
                {
                  id: 'apartment-search',
                  title: 'Apartment Search',
                  description: 'Find the perfect apartment with local agents'
                },
                {
                  id: 'housing-contract',
                  title: 'Housing Contract Review',
                  description: 'Expert review of your housing contract'
                },
                {
                  id: 'temporary-housing',
                  title: 'Temporary Housing',
                  description: 'Short-term accommodation solutions'
                }
              ]
            }
          ];
          
          categories.forEach(category => {
            category.services.forEach(service => {
              allServices.push({
                id: service.id,
                title: service.title,
                description: service.description,
                category: category.title,
                icon: category.icon
              });
            });
          });
          
          // Filter services by search term
          const filteredServices = allServices.filter(service => 
            service.title.toLowerCase().includes(searchTerm) || 
            service.description.toLowerCase().includes(searchTerm) ||
            service.category.toLowerCase().includes(searchTerm)
          );
          
          if (filteredServices.length > 0) {
            resultsFound = true;
            
            filteredServices.forEach(service => {
              const resultItem = document.createElement('div');
              resultItem.className = 'search-result-item';
              
              const resultIcon = document.createElement('div');
              resultIcon.className = 'search-result-icon';
              resultIcon.textContent = service.icon;
              
              const resultContent = document.createElement('div');
              resultContent.className = 'search-result-content';
              
              const resultTitle = document.createElement('div');
              resultTitle.className = 'search-result-title';
              resultTitle.textContent = service.title;
              
              const resultDescription = document.createElement('div');
              resultDescription.className = 'search-result-description';
              resultDescription.textContent = service.description;
              
              const resultCategory = document.createElement('div');
              resultCategory.className = 'search-result-category';
              resultCategory.textContent = service.category;
              
              resultContent.appendChild(resultTitle);
              resultContent.appendChild(resultDescription);
              resultContent.appendChild(resultCategory);
              
              resultItem.appendChild(resultIcon);
              resultItem.appendChild(resultContent);
              
              resultItem.addEventListener('click', () => {
                document.body.removeChild(modal);
                this.showServiceDetails(service.id, service);
              });
              
              searchResults.appendChild(resultItem);
            });
          }
          
          if (!resultsFound) {
            const noResults = document.createElement('div');
            noResults.className = 'search-no-results';
            noResults.textContent = 'No services found matching your search';
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
    if (!document.getElementById('search-styles')) {
      const searchStyles = document.createElement('style');
      searchStyles.id = 'search-styles';
      searchStyles.textContent = `
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
          padding: 16px;
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
        
        .search-result-icon {
          font-size: 24px;
          margin-right: 16px;
          flex-shrink: 0;
        }
        
        .search-result-content {
          flex-grow: 1;
        }
        
        .search-result-title {
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .search-result-description {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        
        .search-result-category {
          font-size: 12px;
          color: var(--primary);
        }
      `;
      document.head.appendChild(searchStyles);
    }
    
    // Focus search input
    setTimeout(() => {
      searchInput.focus();
    }, 100);
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
    
    // Add animation to service categories
    const categories = document.querySelectorAll('.service-category');
    categories.forEach((category, index) => {
      category.style.opacity = '0';
      category.style.transform = 'translateX(-20px)';
      category.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      setTimeout(() => {
        category.style.opacity = '1';
        category.style.transform = 'translateX(0)';
      }, 300 + index * 100);
    });
  }
};

// Export to window object
window.ServicesScreen = ServicesScreen;
