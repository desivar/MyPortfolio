document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Set up mobile menu
    setupMobileMenu();
    
    // Set up contact form
    setupContactForm();
    
    // Set up theme toggle if it exists
    setupThemeToggle();
    
    // Set up smooth scrolling for anchor links
    setupSmoothScrolling();
});

function initAnimations() {
    // Initialize AOS animations with more configuration options
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out-quart',
        offset: 120,
        disable: window.innerWidth < 768 // Disable animations on mobile if needed
    });
}

function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', function() {
        // Toggle menu and aria-expanded state
        const isExpanded = nav.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Toggle hamburger icon
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
    
    // Close menu when clicking on nav links
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            if (menuToggle.querySelector('i')) {
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            if (menuToggle.querySelector('i')) {
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
        }
    });
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = {
            name: contactForm.elements['name'].value.trim(),
            email: contactForm.elements['email'].value.trim(),
            message: contactForm.elements['message'].value.trim()
        };
        
        // Validate form
        const errors = validateForm(formData);
        if (errors.length > 0) {
            showFormErrors(errors);
            return;
        }
        
        // Simulate form submission
        submitForm(formData)
            .then(() => {
                showSuccessMessage();
                contactForm.reset();
            })
            .catch(error => {
                showErrorMessage(error);
            });
    });
}

function validateForm({ name, email, message }) {
    const errors = [];
    
    if (!name) errors.push('Please enter your name');
    if (!email) errors.push('Please enter your email address');
    if (email && !validateEmail(email)) errors.push('Please enter a valid email address');
    if (!message) errors.push('Please enter your message');
    
    return errors;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormErrors(errors) {
    // In a real implementation, you might want to show these errors next to the fields
    alert(errors.join('\n'));
}

function submitForm(formData) {
    // In a real implementation, this would be an AJAX call to your server
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            console.log('Form submitted:', formData);
            resolve();
        }, 1000);
    });
}

function showSuccessMessage() {
    // Create a more elegant success message than an alert
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success-message';
    successDiv.textContent = 'Thank you for your message! I will get back to you soon.';
    
    const contactForm = document.getElementById('contact-form');
    contactForm.parentNode.insertBefore(successDiv, contactForm.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

function showErrorMessage(error) {
    console.error('Form submission error:', error);
    alert('There was an error submitting your message. Please try again later.');
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme + '-mode');
    
    // Set initial icon
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.classList.toggle('fa-moon', savedTheme === 'light');
        icon.classList.toggle('fa-sun', savedTheme === 'dark');
    }
    
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        
        const newTheme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        
        if (icon) {
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        }
    });
}

function setupSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}