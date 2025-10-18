 // Particles.js implementation
    document.addEventListener('DOMContentLoaded', function() {
      const particlesContainer = document.getElementById('particles');
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 5 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `rgba(255, 193, 7, ${Math.random() * 0.5 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.opacity = '0';
        
        // Animate particles
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        particle.style.transition = `opacity 1s ease ${delay}s`;
        
        particlesContainer.appendChild(particle);
        
        // Fade in particles
        setTimeout(() => {
          particle.style.opacity = '1';
        }, 100);
      }
      
      // Mobile menu toggle
      const menuToggle = document.getElementById('menuToggle');
      const sidebar = document.getElementById('sidebar');
      
      menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        sidebar.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = this.querySelectorAll('span');
        if (sidebar.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          spans[0].style.transform = 'rotate(0) translate(0)';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'rotate(0) translate(0)';
        }
      });
      
      // Navigation between sections
      document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Update active class in navigation
          document.querySelectorAll('.navbar a').forEach(link => {
            link.classList.remove('active');
          });
          this.classList.add('active');
          
          // Hide all sections
          document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
          });
          
          // Show selected section
          const sectionId = this.getAttribute('data-section');
          document.querySelector(`.page-section.${sectionId}`).classList.add('active');
          
          // Trigger animations for the new section
          animateSectionOnLoad(`.page-section.${sectionId}`);
          
          // If mobile, close menu after click
          if (window.innerWidth <= 768) {
            menuToggle.classList.remove('active');
            sidebar.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translate(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0)';
          }
          
          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
      
      // Animate cards on hover
      document.querySelectorAll('.card').forEach(card => {
        const icon = card.querySelector('h3 i');
        if (icon) {
          card.addEventListener('mouseenter', function() {
            icon.style.transform = 'rotate(10deg) scale(1.1)';
          });
          
          card.addEventListener('mouseleave', function() {
            icon.style.transform = 'rotate(0) scale(1)';
          });
        }
      });
      
      // Animate skill bars on scroll
      const skillBars = document.querySelectorAll('.skill-progress');
      const animateSkillBars = () => {
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
      };
      
      // Intersection Observer for scroll animations
      const observerOptions = {
        threshold: 0.1
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // If it's the about section with skills, animate skill bars
            if (entry.target.classList.contains('about')) {
              animateSkillBars();
            }
          }
        });
      }, observerOptions);
      
      document.querySelectorAll('.page-section').forEach(section => {
        observer.observe(section);
      });
      
      // Function to animate elements when section loads
      function animateSectionOnLoad(selector) {
        const section = document.querySelector(selector);
        if (section) {
          const elements = section.querySelectorAll('h1, h2, h3, .card, .timeline-item, .portfolio-item, .blog-post, .form-group');
          
          elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, 100 + index * 100);
          });
        }
      }
      
      // Initialize first section
      animateSectionOnLoad('.page-section.about');
      
      // Form submission
      const contactForm = document.querySelector('.contact-form');
      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Thank you for your message! I will get back to you soon.');
          this.reset();
        });
      }
    });