// Mobile menu functionality for lab pages
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        // Set initial state
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            const isOpen = navLinks.classList.contains('open');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
            
            // Prevent body scroll when menu is open
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navItems = navLinks.querySelectorAll('.nav-link');
        navItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
});

// Modal functionality
function openModal(src) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    if (modal && modalImg) {
        modalImg.src = src;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Search functionality for writeups
const searchInput = document.getElementById('searchInput');
const writeupsList = document.getElementById('writeupsList');
if (searchInput && writeupsList) {
    const writeups = writeupsList.getElementsByClassName('writeup-item');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        Array.from(writeups).forEach(writeup => {
            const title = writeup.querySelector('.writeup-title').textContent.toLowerCase();
            const meta = writeup.querySelector('.writeup-meta').textContent.toLowerCase();
            if (title.includes(searchTerm) || meta.includes(searchTerm)) {
                writeup.style.display = '';
            } else {
                writeup.style.display = 'none';
            }
        });
    });
}

// Projects filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const labCards = document.querySelectorAll('.lab-card');
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects/labs
            const filter = this.getAttribute('data-filter');
            
            if (projectCards.length > 0) {
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
            
            if (labCards.length > 0) {
                labCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
}


// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.className = 'toast show ' + type;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }
}

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.background = document.documentElement.getAttribute('data-theme') === 'light' 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(10, 25, 47, 0.95)';
        } else {
            nav.style.background = document.documentElement.getAttribute('data-theme') === 'light' 
                ? 'rgba(255, 255, 255, 0.9)' 
                : 'rgba(10, 25, 47, 0.9)';
        }
    }
    
    // Show/hide back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// Back to top functionality
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Highlight current section in navigation
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightCurrentSection);
window.addEventListener('load', highlightCurrentSection);

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Writeup item click handler
document.querySelectorAll('.writeup-item').forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('.writeup-title').textContent;
        showToast(`Opening writeup: ${title}`, 'success');
        // In a real implementation, this would navigate to the writeup
    });
    
    // Keyboard accessibility
    item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Function to load lazy images
function loadLazyImages(lazyImages) {
    lazyImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
            img.addEventListener('error', () => img.classList.add('loaded'));
        }
    });
}

// Enhanced loading screen with image prioritization
window.addEventListener('load', function() {
    // Fallback: Hide loading screen after 3 seconds if image loading fails
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            console.log('Loading screen hidden by fallback');
        }
    }, 3000);
    
    // Get all images on the page
    const allImages = document.querySelectorAll('img');
    // Separate images into priority (viewport) and lazy (below viewport)
    const priorityImages = [];
    const lazyImages = [];
    
    allImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (isInViewport) {
            priorityImages.push(img);
        } else {
            lazyImages.push(img);
        }
    });
    
    // Load priority images first
    let priorityLoaded = 0;
    const checkPriorityLoaded = () => {
        priorityLoaded++;
        if (priorityLoaded === priorityImages.length) {
            // All priority images loaded, hide loading screen
            setTimeout(() => {
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                }
                // Start loading lazy images
                loadLazyImages(lazyImages);
            }, 500);
        }
    };
    
    // If there are no priority images, hide loading screen immediately
    if (priorityImages.length === 0) {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
            loadLazyImages(lazyImages);
        }, 500);
    } else {
        priorityImages.forEach(img => {
            // Add loaded class to priority images immediately
            img.classList.add('priority-load');
            if (img.complete) {
                checkPriorityLoaded();
            } else {
                img.addEventListener('load', checkPriorityLoaded);
                img.addEventListener('error', checkPriorityLoaded);
            }
        });
    }
    
    // Make all sections visible after page load
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('visible');
    });
});