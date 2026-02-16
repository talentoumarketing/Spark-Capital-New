// Spark Capital Website - Main JavaScript

// ========================================
// STICKY HEADER
// ========================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinkItems = document.querySelectorAll('.nav-link');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ========================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ========================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinkItems = document.querySelectorAll('.nav-link');

navLinkItems.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});

// ========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const scrollToTopBtn = document.querySelector('.scroll-to-top');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// CONTACT FORM VALIDATION
// ========================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(error => error.remove());
        
        let isValid = true;
        
        // Validate name
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required');
            isValid = false;
        }
        
        // Validate company
        const companyInput = document.getElementById('company');
        if (!companyInput.value.trim()) {
            showError(companyInput, 'Company is required');
            isValid = false;
        }
        
        // Validate email
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate requirement
        const requirementInput = document.getElementById('requirement');
        if (!requirementInput.value.trim()) {
            showError(requirementInput, 'Please describe your requirement');
            isValid = false;
        }
        
        if (isValid) {
            // Form is valid - show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = message;
    formGroup.appendChild(error);
    input.focus();
}

// ========================================
// FADE IN ANIMATIONS ON PAGE LOAD
// ========================================
window.addEventListener('load', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
        }, index * 100);
    });
});
