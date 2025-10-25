// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Countdown Timer Function
function updateCountdown() {
    // Set the wedding date (change this to your actual wedding date)
    const weddingDate = new Date('2026-01-09T13:30:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        // Wedding day has arrived or passed
        document.getElementById('countdown').innerHTML = `
            <div class="countdown-item" style="background: linear-gradient(135deg, #d4af37, #f4e4bc); color: white;">
                <span style="color: white;">¡Es el gran día!</span>
                <p style="color: white;">¡Nos casamos hoy!</p>
            </div>
        `;
        document.querySelector('.countdown-message').textContent = '¡Hoy es nuestro gran día! 💕';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update countdown elements
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    // Add special styling for final days/hours
    const daysElement = document.getElementById('days').parentElement;
    const hoursElement = document.getElementById('hours').parentElement;
    
    // Remove previous classes
    daysElement.classList.remove('final-days', 'final-hours');
    hoursElement.classList.remove('final-days', 'final-hours');

    // Add special styling based on time remaining
    if (days <= 7) {
        daysElement.classList.add('final-days');
    }
    if (days <= 1) {
        hoursElement.classList.add('final-hours');
    }

    // Update countdown message based on time remaining
    const countdownMessage = document.querySelector('.countdown-message');
    if (days > 30) {
        countdownMessage.textContent = '¡Faltan muchos días para nuestro gran día!';
    } else if (days > 7) {
        countdownMessage.textContent = '¡Faltan pocos días para nuestro gran día!';
    } else if (days > 1) {
        countdownMessage.textContent = '¡Faltan muy pocos días para nuestro gran día!';
    } else if (days === 1) {
        countdownMessage.textContent = '¡Mañana es nuestro gran día!';
    } else if (days === 0) {
        countdownMessage.textContent = '¡Hoy es nuestro gran día!';
    }

    // Add animation when numbers change
    if (seconds === 0) {
        document.getElementById('minutes').parentElement.classList.add('animate');
        setTimeout(() => {
            document.getElementById('minutes').parentElement.classList.remove('animate');
        }, 600);
    }
    if (minutes === 0 && seconds === 0) {
        document.getElementById('hours').parentElement.classList.add('animate');
        setTimeout(() => {
            document.getElementById('hours').parentElement.classList.remove('animate');
        }, 600);
    }
    if (hours === 0 && minutes === 0 && seconds === 0) {
        document.getElementById('days').parentElement.classList.add('animate');
        setTimeout(() => {
            document.getElementById('days').parentElement.classList.remove('animate');
        }, 600);
    }
}

// Initialize countdown timer
function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.story-item, .event-card, .gift-card, .gallery-item, .recommendation-card, .rsvp-form');
    animateElements.forEach(el => observer.observe(el));
    
    // Initialize progress bars
    initializeProgressBars();
});

// Initialize progress bars with animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress-width', progress + '%');
        bar.style.width = progress + '%';
    });
}

// RSVP Form Handling
const rsvpForm = document.getElementById('rsvpForm');
const attendingRadios = document.querySelectorAll('input[name="attending"]');
const additionalOptions = document.getElementById('additional-options');

// Show/hide additional options based on attendance
attendingRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'yes') {
            additionalOptions.style.display = 'block';
            additionalOptions.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            additionalOptions.style.display = 'none';
        }
    });
});

// RSVP Form submission
rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(rsvpForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.phone || !data.attending) {
        showNotification('Por favor, completa todos los campos requeridos.', 'error');
        return;
    }
    
    // Try to submit to Google Sheets if available
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    try {
        // Check if Google Sheets integration is available
        if (typeof submitRSVPToSheets === 'function') {
            const success = await submitRSVPToSheets(data);
            if (success) {
                showNotification('¡Gracias por confirmar tu asistencia! Te esperamos en nuestro gran día. 🎉', 'success');
                createConfetti();
            } else {
                throw new Error('Error submitting to Google Sheets');
            }
        } else {
            // Fallback to simulated response
            setTimeout(() => {
                if (data.attending === 'yes') {
                    showNotification('¡Gracias por confirmar tu asistencia! Te esperamos en nuestro gran día. 🎉', 'success');
                    createConfetti();
                } else {
                    showNotification('Entendemos que no puedas asistir. ¡Gracias por tu mensaje! 💕', 'info');
                }
            }, 2000);
        }
    } catch (error) {
        console.error('Error submitting RSVP:', error);
        showNotification('Hubo un error al enviar tu confirmación. Por favor, inténtalo de nuevo.', 'error');
    } finally {
        rsvpForm.reset();
        additionalOptions.style.display = 'none';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Gift Modal Functions
function openGiftModal(giftType) {
    const modal = document.getElementById('giftModal');
    const modalTitle = document.getElementById('modalTitle');
    
    // Set modal title based on gift type
    const giftTitles = {
        'luna-miel': 'Luna de Miel',
        'muebles': 'Muebles para el Hogar',
        'vajilla': 'Vajilla Completa',
        'ropa-cama': 'Ropa de Cama',
        'electrodomesticos': 'Electrodomésticos',
        'auto': 'Fondo para Auto',
        'ejercicio': 'Equipo de Ejercicio',
        'biblioteca': 'Biblioteca',
        'fondo-general': 'Fondo General'
    };
    
    modalTitle.textContent = `Contribuir a ${giftTitles[giftType] || 'el Regalo'}`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGiftModal() {
    const modal = document.getElementById('giftModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('giftForm').reset();
}

// Gift Form submission
document.getElementById('giftForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    if (!data.contributorName || !data.contributorEmail || !data.contributionAmount) {
        showNotification('Por favor, completa todos los campos requeridos.', 'error');
        return;
    }
    
    // Try to submit to Google Sheets if available
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Registrando...';
    submitBtn.disabled = true;
    
    try {
        // Check if Google Sheets integration is available
        if (typeof submitGiftToSheets === 'function') {
            const giftType = document.getElementById('modalTitle').textContent.split(' ').pop();
            const success = await submitGiftToSheets(data, giftType);
            if (success) {
                showNotification(`¡Gracias por tu contribución de $${parseInt(data.contributionAmount).toLocaleString()}! Se ha registrado exitosamente.`, 'success');
                closeGiftModal();
                updateProgressBar();
            } else {
                throw new Error('Error submitting to Google Sheets');
            }
        } else {
            // Fallback to simulated response
            setTimeout(() => {
                showNotification(`¡Gracias por tu contribución de $${parseInt(data.contributionAmount).toLocaleString()}! Se ha registrado exitosamente.`, 'success');
                closeGiftModal();
                updateProgressBar();
            }, 2000);
        }
    } catch (error) {
        console.error('Error submitting gift contribution:', error);
        showNotification('Hubo un error al registrar tu contribución. Por favor, inténtalo de nuevo.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Update progress bar (simulate)
function updateProgressBar() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const currentProgress = parseInt(bar.getAttribute('data-progress'));
        const newProgress = Math.min(currentProgress + Math.random() * 10, 100);
        bar.setAttribute('data-progress', newProgress);
        bar.style.width = newProgress + '%';
        
        // Update amount text
        const currentAmount = bar.parentElement.querySelector('.current-amount');
        if (currentAmount) {
            const currentValue = parseInt(currentAmount.textContent.replace(/[^0-9]/g, ''));
            const newValue = Math.floor(currentValue * (1 + Math.random() * 0.1));
            currentAmount.textContent = `$${newValue.toLocaleString()}`;
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Confetti effect
function createConfetti() {
    const colors = ['#d4af37', '#f4e4bc', '#ff6b6b', '#4ecdc4', '#45b7d1'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background-color: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        confetti.animate([
            { 
                transform: 'translateY(0) rotate(0deg)', 
                opacity: 1 
            },
            { 
                transform: `translateY(100vh) rotate(360deg)`, 
                opacity: 0 
            }
        ], {
            duration: 3000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            confetti.remove();
        };
    }
}

// Google Maps integration (placeholder for now)
function initializeMaps() {
    // This would integrate with Google Maps API
    // For now, we'll add click handlers to show map info
    const mapPlaceholders = document.querySelectorAll('.map-placeholder');
    mapPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            const isCeremony = placeholder.id === 'ceremony-map';
            const address = isCeremony 
                ? 'Carrera 9 # 74 – 99, Bogotá, Colombia'
                : 'Km 19 vía La Calera – Sopó, Cundinamarca, Colombia';
            
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            window.open(mapUrl, '_blank');
        });
    });
}

// Initialize maps when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeMaps();
});

// Image placeholder click handlers
document.querySelectorAll('.image-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', () => {
        showNotification('Haz clic aquí para agregar tus propias fotos. Puedes reemplazar estos placeholders con tus imágenes reales.', 'info');
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close modal if open
        const modal = document.getElementById('giftModal');
        if (modal.style.display === 'block') {
            closeGiftModal();
        }
    }
});

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
}

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize countdown timer
    initCountdown();
    
    // Animate progress bars on load
    setTimeout(() => {
        initializeProgressBars();
    }, 500);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to cards
document.querySelectorAll('.gift-card, .event-card, .gallery-item, .recommendation-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        }
    });
});

// Add lazy loading to all images
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add print styles for RSVP
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// Service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Enhanced form validation
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !validateEmail(input.value)) {
            input.style.borderColor = '#dc3545';
            showNotification('Por favor, ingresa un email válido.', 'error');
        } else {
            input.style.borderColor = '#d4af37';
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !validatePhone(input.value)) {
            input.style.borderColor = '#dc3545';
            showNotification('Por favor, ingresa un teléfono válido.', 'error');
        } else {
            input.style.borderColor = '#d4af37';
        }
    });
});

// Add smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply reveal animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealObserver.observe(section);
});
