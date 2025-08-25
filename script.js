// Navsahyadri Education Society's Group of Institutions Website JavaScript

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show home page by default
    showPage('home');

    // Initialize mobile menu toggle
    initializeMobileMenu();

    console.log('Navsahyadri Education Society Website initialized successfully');
});

// Function to show different pages
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update navigation active state
    updateNavigation(pageId);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to show department detail pages
function showDepartment(deptId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show department page
    const deptPage = document.getElementById(deptId + '-page');
    if (deptPage) {
        deptPage.classList.add('active');
    }

    // Clear navigation active state
    updateNavigation('');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to update navigation active state
function updateNavigation(activePageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Find and activate the corresponding nav link
    const activeLink = document.querySelector(`[onclick="showPage('${activePageId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        // Close menu when clicking on a nav link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Modal functions
function openApplyModal() {
    const modal = document.getElementById('applyModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeApplyModal() {
    const modal = document.getElementById('applyModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling

        // Reset form and messages
        resetApplyForm();
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('applyModal');
    if (event.target === modal) {
        closeApplyModal();
    }
});

// Handle apply form submission
function handleApplyForm(event) {
    event.preventDefault();

    const form = document.getElementById('applyForm');
    const formData = new FormData(form);
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Hide messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Basic validation
    const requiredFields = ['studentName', 'studentEmail', 'studentPhone', 'department', 'class10Marks', 'address'];
    let isValid = true;

    for (let field of requiredFields) {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            isValid = false;
            break;
        }
    }

    // Validate email
    const email = document.getElementById('studentEmail').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
    }

    // Validate marks
    const marks = parseFloat(document.getElementById('class10Marks').value);
    if (marks < 40 || marks > 100) {
        isValid = false;
    }

    if (isValid) {
        // Simulate form submission
        successMessage.style.display = 'block';

        // Reset form after success
        setTimeout(() => {
            resetApplyForm();
            closeApplyModal();
        }, 2000);

        console.log('Application submitted:', Object.fromEntries(formData));
    } else {
        errorMessage.style.display = 'block';
    }
}

// Handle contact form submission
function handleContactForm(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    const formData = new FormData(form);

    // Basic validation
    const requiredFields = ['name', 'email', 'subject', 'message'];
    let isValid = true;

    for (let field of requiredFields) {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            isValid = false;
            break;
        }
    }

    // Validate email
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
    }

    if (isValid) {
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
        console.log('Contact form submitted:', Object.fromEntries(formData));
    } else {
        alert('Please fill in all required fields correctly.');
    }
}

// Reset apply form
function resetApplyForm() {
    const form = document.getElementById('applyForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    if (form) form.reset();
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
}

console.log('Navsahyadri Education Society Website - All features loaded successfully');