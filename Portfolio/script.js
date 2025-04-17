// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // =============== PRELOADER ===============
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Start animations after preloader
            startAnimations();
        }, 1000);
    });
    
    // =============== CUSTOM CURSOR ===============
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Add some delay to follower for smooth effect
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Show cursor when mouse enters viewport
        document.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
        });
        
        // Hide cursor when mouse leaves viewport
        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });
        
        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .contact-card, .tech-icon');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });
    }
    
    // =============== NAVBAR ===============
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    // Scroll effect on navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section');
    
    function activeLink() {
        let position = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*=${id}]`);
            
            if (position >= top && position < top + height) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', activeLink);
    
    // =============== DARK/LIGHT THEME TOGGLE ===============
    const modeToggle = document.querySelector('.mode-toggle');
    const body = document.body;
    
    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        if (modeToggle) {
            modeToggle.querySelector('i').classList.remove('fa-moon');
            modeToggle.querySelector('i').classList.add('fa-sun');
        }
    }
    
    // Toggle theme
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            
            const icon = modeToggle.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
            
            // Save user preference
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // =============== TEXT TYPING ANIMATION ===============
    const typingElement = document.querySelector('.dynamic-text');
    
    if (typingElement) {
        const words = [
            'web applications.',
            'responsive interfaces.',
            'secure systems.',
            'efficient solutions.'
        ];
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 1500; // Wait before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // Wait before typing new word
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing animation after a delay
        setTimeout(type, 1000);
    }
    
    // =============== EXPERIENCE TABS ===============
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to selected button and tab
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // =============== SKILL PROGRESS ANIMATION ===============
    function animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const progressBar = item.querySelector('.progress-bar');
            const width = progressBar.style.width;
            
            // Reset width
            progressBar.style.width = '0%';
            
            // Animate to final width
            setTimeout(() => {
                progressBar.style.width = width;
            }, 100);
        });
    }
    
    // =============== SCROLL ANIMATIONS ===============
    const animationElements = document.querySelectorAll(
        '.hero-text, .hero-image, .about-content > *, .project-card, .skills-group, .contact-card, .contact-form'
    );
    
    // Initialize elements to be hidden
    animationElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    function checkElementsInView() {
        animationElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                
                // If element is a skills section, animate progress bars
                if (el.classList.contains('skills-group')) {
                    animateSkills();
                }
            }
        });
    }
    
    // Animate elements that are already visible
    function startAnimations() {
        // Delay the initial animations for better effect
        setTimeout(checkElementsInView, 300);
    }
    
    // Check for animations on scroll
    window.addEventListener('scroll', checkElementsInView);
    
    // =============== BACK TO TOP BUTTON ===============
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // =============== TECH BACKGROUND ANIMATION ===============
    function animateTechBackground() {
        const techBg = document.querySelector('.tech-background');
        
        if (techBg) {
            const techWords = techBg.querySelectorAll('span');
            
            techWords.forEach(word => {
                // Random starting position
                const randomX = Math.floor(Math.random() * 80) + 10;
                const randomY = Math.floor(Math.random() * 80) + 10;
                
                word.style.left = `${randomX}%`;
                word.style.top = `${randomY}%`;
                
                // Random animation
                setInterval(() => {
                    // Generate new position
                    const newX = Math.floor(Math.random() * 80) + 10;
                    const newY = Math.floor(Math.random() * 80) + 10;
                    
                    // Slowly move to new position
                    word.style.transition = 'left 30s ease, top 30s ease';
                    word.style.left = `${newX}%`;
                    word.style.top = `${newY}%`;
                }, 30000);
            });
        }
    }
    
    // Start tech background animation
    animateTechBackground();
    
    // =============== CONTACT FORM ===============
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                alert('Please fill out all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Form would be submitted to server here
            // For now, just show success message and reset form
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Change button text to show sending
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate sending (would be replaced by actual AJAX)
            setTimeout(() => {
                // Show success message
                alert('Your message has been sent successfully!');
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // =============== SMOOTH SCROLLING ===============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get navbar height for offset
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 