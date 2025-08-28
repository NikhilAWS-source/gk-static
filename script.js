// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all animations and interactions
    initAnimations();
    initScrollEffects();
    initFloatingElements();
    initContactForm();
    initMobileMenu();
    animateCounters();
    initMobileMenuToggle();
    // Add loading animation
    document.body.classList.add('loading');
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 1000);
});

// Initialize all animations
function initAnimations() {
    // Animate elements on page load
    const animatedElements = document.querySelectorAll('.promise-card, .category-card, .client-card, .contact-item');

    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';

        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * index);
    });
}

// Initialize scroll effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');

                // Add staggered animation for grid items
                if (entry.target.classList.contains('promises-grid') ||
                    entry.target.classList.contains('categories-grid') ||
                    entry.target.classList.contains('clients-grid')) {
                    const items = entry.target.querySelectorAll('.promise-card, .category-card, .client-card');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100 * index);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-item');

    floatingElements.forEach((element, index) => {
        const speed = parseFloat(element.dataset.speed) || 1;

        // Create parallax effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * speed * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * speed * 20;

            element.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.5}deg)`;
        });
    });
}

// Initialize contact form interactions
function initContactForm() {
    const contactButtons = document.querySelectorAll('.contact-btn, .cta-btn');

    contactButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Add ripple effect
            createRippleEffect(e, this);
        });
    });
}

// Create ripple effect on button click
function createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Initialize mobile menu functionality
function initMobileMenu() {
    // Add mobile menu toggle if needed
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    // Hide/show header on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .fade-in-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .promise-card,
    .category-card,
    .client-card,
    .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .header {
        transition: transform 0.3s ease-in-out;
    }
    
    .cta-btn,
    .contact-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-orange), var(--secondary-orange));
        z-index: 10000;
        transition: width 0.1s ease;
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Add scroll progress bar
addScrollProgress();

// Add counter animation for numbers
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);

                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Add hover effects for cards
function addHoverEffects() {
    const cards = document.querySelectorAll('.promise-card, .category-card, .client-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.01)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize hover effects
addHoverEffects();

// Add typing effect for hero title
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };

    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Initialize typing effect
//addTypingEffect();

// Add parallax effect for hero section
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Initialize parallax effect
addParallaxEffect();

// Add loading animation for images
function addImageLoading() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('load', function () {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
}

// Initialize image loading
addImageLoading();

// Add scroll-triggered animations
function addScrollAnimations() {
    const elements = document.querySelectorAll('.promise-card, .category-card, .client-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// Add CSS for slideInUp animation
const slideInUpStyle = document.createElement('style');
slideInUpStyle.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .promise-card,
    .category-card,
    .client-card {
        opacity: 0;
    }
`;
document.head.appendChild(slideInUpStyle);

// Initialize scroll animations
addScrollAnimations();

// Add performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let ticking = false;

    function updateOnScroll() {
        // Update scroll-based animations here
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Initialize performance optimization
optimizePerformance();

// Mobile menu toggle functionality
function initMobileMenuToggle() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking close button
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        }

        // Close mobile menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });

        // Close mobile menu when clicking on contact links
        document.querySelectorAll('.mobile-contact-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
}
