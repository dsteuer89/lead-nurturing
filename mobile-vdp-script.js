// Mobile VDP Interactive Functionality

// ===== Additional Page Sections (loaded via JS to reduce initial HTML size) =====
const additionalSections = `
    <!-- Overview Section -->
    <section class="vdp-section">
        <h2 class="section-heading">Overview</h2>
        <div class="info-list">
            <div class="info-item"><span class="info-label">Make:</span> <span class="info-value">Hyundai</span></div>
            <div class="info-item"><span class="info-label">Model:</span> <span class="info-value">Ioniq 6</span></div>
            <div class="info-item"><span class="info-label">Year:</span> <span class="info-value">2024</span></div>
            <div class="info-item"><span class="info-label">Trim:</span> <span class="info-value">SEL AWD</span></div>
            <div class="info-item"><span class="info-label">Body type:</span> <span class="info-value">Sedan</span></div>
            <div class="info-item"><span class="info-label">Doors:</span> <span class="info-value">4</span></div>
            <div class="info-item"><span class="info-label">Seats:</span> <span class="info-value">5</span></div>
            <div class="info-item"><span class="info-label">Stock #:</span> <span class="info-value">ABC123</span></div>
            <div class="info-item"><span class="info-label">VIN:</span> <span class="info-value">1HGBH41JXMN109186</span></div>
        </div>
    </section>

    <!-- Dealer Section -->
    <section class="vdp-section dealer-section">
        <h2 class="section-heading">Dealer</h2>
        <div class="dealer-info">
            <div class="dealer-logo">LOGO</div>
            <h3 class="dealer-name">AutoMax Preowned</h3>
            <p class="dealer-status">Open · Closes at 8:00 PM</p>
            <div class="dealer-links">
                <a href="#" class="text-btn">View website</a>
                <a href="#" class="text-btn">Get directions</a>
            </div>
        </div>
    </section>

    <!-- Email Signup -->
    <section class="vdp-section email-signup">
        <h2 class="section-heading">Notify me of new listings like this one</h2>
        <form class="email-form" id="emailForm">
            <input type="email" class="email-input" placeholder="Enter your email" required>
            <button type="submit" class="btn-primary">Email me</button>
            <p class="disclaimer">By clicking "Email me," you agree to our Privacy Policy and Terms of Use.</p>
        </form>
    </section>
`;

// Inject additional sections on page load
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('additional-sections');
    if (container) {
        container.innerHTML = additionalSections;
    }

    // Initialize all interactive components
    initGallery();
    initEmailForm();
    initActionSheet();
});

// ===== Photo Gallery Carousel =====
let currentPhotoIndex = 0;
const totalPhotos = 10; // Placeholder count

function initGallery() {
    const prevBtn = document.querySelector('.gallery-nav-prev');
    const nextBtn = document.querySelector('.gallery-nav-next');
    const counter = document.querySelector('.photo-counter');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateGallery(-1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateGallery(1));
    }

    updateCounter();
}

function navigateGallery(direction) {
    currentPhotoIndex += direction;

    // Wrap around
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = totalPhotos - 1;
    } else if (currentPhotoIndex >= totalPhotos) {
        currentPhotoIndex = 0;
    }

    updateCounter();

    // In a real implementation, this would update the image src
    console.log(`Navigated to photo ${currentPhotoIndex + 1}`);
}

function updateCounter() {
    const counter = document.querySelector('.photo-counter');
    if (counter) {
        counter.textContent = `${currentPhotoIndex + 1} of ${totalPhotos}`;
    }
}

// ===== Email Form Handling =====
function initEmailForm() {
    const form = document.getElementById('emailForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = form.querySelector('.email-input');
            const email = emailInput.value;

            if (validateEmail(email)) {
                // Show success message
                showMessage('Thanks! We\'ll notify you of new listings.', 'success');
                emailInput.value = '';
            } else {
                showMessage('Please enter a valid email address.', 'error');
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(message, type) {
    // Create and show a toast message
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        background-color: ${type === 'success' ? '#00a862' : '#ff4444'};
        color: white;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideUp 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== Action Sheet Modal =====
function initActionSheet() {
    const textButton = document.querySelector('.btn-text');
    const modal = document.getElementById('textActionSheet');
    const backdrop = document.getElementById('modalBackdrop');
    const cancelButton = document.getElementById('cancelButton');

    if (!textButton || !modal) return;

    // Show modal when Text button is clicked
    textButton.addEventListener('click', function(e) {
        e.preventDefault();
        showActionSheet();
    });

    // Hide modal when backdrop is clicked
    if (backdrop) {
        backdrop.addEventListener('click', hideActionSheet);
    }

    // Hide modal when Cancel button is clicked
    if (cancelButton) {
        cancelButton.addEventListener('click', hideActionSheet);
    }

    // Hide modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display !== 'none') {
            hideActionSheet();
        }
    });
}

function showActionSheet() {
    const modal = document.getElementById('textActionSheet');
    if (modal) {
        modal.style.display = 'flex';
        // Trigger reflow for animation
        modal.offsetHeight;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hideActionSheet() {
    const modal = document.getElementById('textActionSheet');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Match CSS transition duration
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }

    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
    }

    /* Additional section styles */
    .info-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .info-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid var(--cg-border-light);
    }

    .info-label {
        color: var(--cg-text-secondary);
        font-size: 14px;
    }

    .info-value {
        color: var(--cg-text-primary);
        font-weight: 600;
        font-size: 14px;
    }

    .dealer-section {
        padding: 24px;
        background-color: var(--cg-white);
        border: 1px solid var(--cg-border-light);
        border-radius: 20px;
    }

    .dealer-logo {
        width: 75px;
        height: 75px;
        background-color: var(--cg-surface-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
        border-radius: 8px;
        font-weight: 700;
        color: var(--cg-text-secondary);
    }

    .dealer-name {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .dealer-status {
        font-size: 14px;
        color: var(--cg-text-secondary);
        margin-bottom: 16px;
    }

    .dealer-links {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .email-signup {
        padding: 24px;
        background-color: #f8f9fa;
        border-radius: 20px;
        text-align: center;
    }

    .email-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 400px;
        margin: 0 auto;
    }

    .email-input {
        padding: 12px 16px;
        font-size: 14px;
        border: 1px solid var(--cg-border-light);
        border-radius: 8px;
        font-family: var(--font-body);
    }

    .email-input:focus {
        outline: none;
        border-color: var(--cg-blue);
        box-shadow: 0 0 0 3px rgba(7, 99, 211, 0.1);
    }

    .disclaimer {
        font-size: 12px;
        color: var(--cg-text-secondary);
        line-height: 1.4;
    }
`;
document.head.appendChild(style);

console.log('Mobile VDP initialized');
