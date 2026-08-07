/* ============================================================
   MGF GYM - SCRIPT.JS
   All interactive JavaScript functionality for the website
   ============================================================ */

// ----------------------------------------------------------
// FUNCTION 1: NAVBAR SCROLL EFFECT
// When user scrolls down, add 'scrolled' class to navbar
// This triggers CSS backdrop-filter blur and shadow
// ----------------------------------------------------------
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ----------------------------------------------------------
// FUNCTION 2: MOBILE MENU TOGGLE
// Opens/closes the slide-in mobile navigation menu
// Also toggles the dark overlay behind the menu
// ----------------------------------------------------------
function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

// ----------------------------------------------------------
// FUNCTION 3: SCROLL REVEAL ANIMATIONS
// Uses IntersectionObserver to detect when elements enter
// the viewport, then adds 'visible' class to trigger CSS fade-in
// ----------------------------------------------------------
const observerOptions = {
    threshold: 0.1,                    // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px'    // Start slightly before element enters view
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with the .animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ----------------------------------------------------------
// FUNCTION 4: BMI CALCULATOR
// Calculates Body Mass Index from height (cm) and weight (kg)
// Displays result with color-coded health category
// ----------------------------------------------------------
function calculateBMI() {
    // Get input values from the form
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    // Get result display elements
    const resultDiv = document.getElementById('bmiResult');
    const valueDiv = document.getElementById('bmiValue');
    const statusDiv = document.getElementById('bmiStatus');

    // Validate inputs
    if (!height || !weight || height <= 0 || weight <= 0) {
        alert('Please enter valid height and weight values.');
        return;
    }

    // Calculate BMI: weight(kg) / (height(m))^2
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    // Display the calculated value
    valueDiv.textContent = bmi;
    resultDiv.classList.add('show');

    // Determine health category and apply color class
    statusDiv.className = 'bmi-status';  // Reset classes first

    if (bmi < 18.5) {
        statusDiv.textContent = 'Underweight';
        statusDiv.classList.add('underweight');
    } else if (bmi >= 18.5 && bmi < 25) {
        statusDiv.textContent = 'Normal Weight';
        statusDiv.classList.add('normal');
    } else if (bmi >= 25 && bmi < 30) {
        statusDiv.textContent = 'Overweight';
        statusDiv.classList.add('overweight');
    } else {
        statusDiv.textContent = 'Obese';
        statusDiv.classList.add('obese');
    }
}

// ----------------------------------------------------------
// FUNCTION 5: SMOOTH SCROLL FOR ANCHOR LINKS
// Overrides default anchor jump with smooth animated scroll
// ----------------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ----------------------------------------------------------
// FUNCTION 6: CONTACT FORM HANDLER
// Shows confirmation message when form is submitted
// (Replace with actual backend integration as needed)
// ----------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});