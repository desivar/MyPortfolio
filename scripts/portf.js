// Initialize AOS for animation
AOS.init({
    duration: 1200, // Animation duration in ms
    once: true, // Whether animation should happen only once - while scrolling down
  });
  
  // Toggle Menu on Mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('nav ul');
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('active');
    }
  });
  
  // Document ready function for skills and projects functionality
  document.addEventListener('DOMContentLoaded', function() {
    // Skills marquee duplication for infinite scrolling effect
    const skillsTrack = document.querySelector('.skills-track');
    if (skillsTrack) {
      // Clone the skills items to make continuous loop
      const skillItems = skillsTrack.querySelectorAll('.skill-item');
      skillItems.forEach(item => {
        const clone = item.cloneNode(true);
        skillsTrack.appendChild(clone);
      });
    }
  
    // Project card animations with smooth transitions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
    
    // Set up skills marquee pause on hover
    const skillsMarquee = document.querySelector('.skills-marquee');
    if (skillsMarquee) {
      skillsMarquee.addEventListener('mouseenter', function() {
        const track = document.querySelector('.skills-track');
        if (track) {
          track.style.animationPlayState = 'paused';
        }
      });
      
      skillsMarquee.addEventListener('mouseleave', function() {
        const track = document.querySelector('.skills-track');
        if (track) {
          track.style.animationPlayState = 'running';
        }
      });
    }
  });
  
      