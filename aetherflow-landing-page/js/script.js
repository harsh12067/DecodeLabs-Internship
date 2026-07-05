/**
 * AetherFlow Landing Page JavaScript Logic
 * Project: Full Stack Development Portfolio (Project 1)
 * Features: Sticky Header, Mobile Menu Toggle, Scroll-to-Top, Active Nav Highlighting,
 *           FAQ Accordion, Services Modals, Scroll Reveal, and Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Dom Elements Selection
     ========================================================================== */
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  // Modals
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCards = document.querySelectorAll('.modal-card');
  
  // Contact Form
  const contactForm = document.getElementById('contact-form');
  const formInputs = contactForm.querySelectorAll('.form-input');
  const formSuccessMsg = document.getElementById('form-success-msg');

  /* ==========================================================================
     2. Sticky Header & Scroll-to-Top Button Visibility
     ========================================================================== */
  const handleWindowScroll = () => {
    // Sticky Nav toggle
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }

    // Scroll to Top visibility toggle
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add('active');
    } else {
      scrollToTopBtn.classList.remove('active');
    }
  };

  window.addEventListener('scroll', handleWindowScroll);
  // Trigger once on page load to ensure initial state is correct
  handleWindowScroll();

  /* ==========================================================================
     3. Scroll-to-Top Action
     ========================================================================== */
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* ==========================================================================
     4. Mobile Hamburger Navigation Menu Toggle
     ========================================================================== */
  const toggleMobileMenu = () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle body scroll locking when mobile menu is active
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  menuToggle.addEventListener('click', toggleMobileMenu);

  // Close Mobile Menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // Close mobile menu if resized above mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && navMenu.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  /* ==========================================================================
     5. Smooth Scrolling for Anchor Links (with Offset for Sticky Nav)
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const offset = window.innerWidth > 1024 ? 80 : 70; // Header heights at sticky states
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     6. Active Navigation Link Highlighting (Intersection Observer)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  
  const navHighlightOptions = {
    root: null,
    // Add offset matching sticky nav so trigger points when section crosses nav line
    rootMargin: '-90px 0px -60% 0px',
    threshold: 0
  };

  const navHighlightCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  const navObserver = new IntersectionObserver(navHighlightCallback, navHighlightOptions);
  sections.forEach(section => navObserver.observe(section));

  /* ==========================================================================
     7. Scroll Reveal Animations (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
    threshold: 0.15
  };

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed to keep layout performant
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  revealElements.forEach(element => revealObserver.observe(element));

  /* ==========================================================================
     8. FAQ Accordion Panels
     ========================================================================== */
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      
      // Close other open panels first
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== question) {
          otherQuestion.setAttribute('aria-expanded', 'false');
          otherQuestion.nextElementSibling.style.maxHeight = null;
        }
      });
      
      // Toggle current panel
      if (!isExpanded) {
        question.setAttribute('aria-expanded', 'true');
        // Set dynamic height from scrollHeight
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      }
    });
  });

  /* ==========================================================================
     9. Services Read More Modals
     ========================================================================== */
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-target');
      const targetModal = document.getElementById(modalId);
      
      if (targetModal) {
        modalOverlay.classList.add('active');
        targetModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // lock page scroll
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    modalCards.forEach(card => card.style.display = 'none');
    document.body.style.overflow = ''; // unlock page scroll
  };

  closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
  
  // Close modal when clicking outside (on the overlay)
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  /* ==========================================================================
     10. Contact Form Validation & Real-time Feedback
     ========================================================================== */
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[a-zA-Z\s]{3,50}$/;

  // Check validity of a specific input field
  const validateField = (input) => {
    const errorSpan = document.getElementById(`${input.id}-error`);
    let isValid = true;
    let errorMessage = '';

    // Reset error state
    input.classList.remove('invalid', 'valid');
    if (errorSpan) {
      errorSpan.textContent = '';
      errorSpan.classList.remove('active');
    }

    // Name Validation
    if (input.id === 'name') {
      const val = input.value.trim();
      if (val === '') {
        isValid = false;
        errorMessage = 'Name is required.';
      } else if (val.length < 3) {
        isValid = false;
        errorMessage = 'Name must be at least 3 characters.';
      } else if (!nameRegex.test(val)) {
        isValid = false;
        errorMessage = 'Name can only contain alphabetic letters and spaces.';
      }
    }

    // Email Validation
    if (input.id === 'email') {
      const val = input.value.trim();
      if (val === '') {
        isValid = false;
        errorMessage = 'Email address is required.';
      } else if (!emailRegex.test(val)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address (e.g. name@company.com).';
      }
    }

    // Subject Validation
    if (input.id === 'subject') {
      const val = input.value.trim();
      if (val === '') {
        isValid = false;
        errorMessage = 'Subject line is required.';
      } else if (val.length < 4) {
        isValid = false;
        errorMessage = 'Subject must be at least 4 characters.';
      }
    }

    // Message Validation
    if (input.id === 'message') {
      const val = input.value.trim();
      if (val === '') {
        isValid = false;
        errorMessage = 'Message content is required.';
      } else if (val.length < 15) {
        isValid = false;
        errorMessage = 'Message details must be at least 15 characters.';
      }
    }

    // Apply visual feedback
    if (!isValid) {
      input.classList.add('invalid');
      if (errorSpan) {
        errorSpan.textContent = errorMessage;
        errorSpan.classList.add('active');
      }
    } else if (input.value.trim() !== '') {
      input.classList.add('valid');
    }

    return isValid;
  };

  // Attach real-time input and blur listener checks
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      // If the field was already marked invalid, validate it in real-time as they type
      if (input.classList.contains('invalid')) {
        validateField(input);
      }
    });

    input.addEventListener('blur', () => {
      validateField(input);
    });
  });

  // Handle Form Submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    // Validate all fields before processing submission
    formInputs.forEach(input => {
      const isFieldValid = validateField(input);
      if (!isFieldValid) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      // Retrieve values
      const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
      };

      console.log('Form successfully submitted:', formData);

      // Disable inputs and show sending feedback state
      const submitBtn = document.getElementById('form-submit-btn');
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';

      // Simulate API loading state
      setTimeout(() => {
        // Show success visual feedback
        formSuccessMsg.classList.add('success');
        formSuccessMsg.textContent = `Thank you, ${formData.name}! Your message has been sent successfully. Our team will contact you shortly.`;
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;

        // Reset form inputs and remove validation styles
        contactForm.reset();
        formInputs.forEach(input => {
          input.classList.remove('valid', 'invalid');
        });

        // Hide success alert after 6 seconds
        setTimeout(() => {
          formSuccessMsg.classList.remove('success');
          formSuccessMsg.textContent = '';
        }, 6000);

      }, 1500);
    } else {
      // Focus on the first invalid field
      const firstInvalid = contactForm.querySelector('.form-input.invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });

});
