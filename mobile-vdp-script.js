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

// ===== iOS Message Modal =====
function initActionSheet() {
    const textButton = document.querySelector('.btn-text');
    const modal = document.getElementById('messageModal');
    const cancelButton = document.getElementById('messageCancelBtn');
    const sendButton = document.getElementById('sendMessageBtn');
    const messageInput = document.getElementById('messageTextInput');

    if (!textButton || !modal) return;

    // Show modal when Text button is clicked
    textButton.addEventListener('click', function(e) {
        e.preventDefault();
        showMessageModal();
    });

    // Hide modal when Cancel button is clicked
    if (cancelButton) {
        cancelButton.addEventListener('click', hideMessageModal);
    }

    // Handle send button
    if (sendButton) {
        sendButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleSendMessage();
        });
    }

    // Handle Enter key to send
    if (messageInput) {
        messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        });
    }

    // Hide modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display !== 'none') {
            hideMessageModal();
        }
    });
}

function showMessageModal() {
    const modal = document.getElementById('messageModal');
    const messagesThread = document.getElementById('messagesThread');
    const messageInput = document.getElementById('messageTextInput');

    if (modal) {
        // Clear previous messages
        if (messagesThread) {
            messagesThread.innerHTML = '';
        }

        // Reset input text
        if (messageInput) {
            messageInput.textContent = "I'm interested in the 2024 Hyundai Ioniq 6 SEL AWD I found listed on CarGurus. Is it still available?";
        }

        modal.style.display = 'block';
        // Trigger reflow for animation
        modal.offsetHeight;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hideMessageModal() {
    const modal = document.getElementById('messageModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Match CSS transition duration
    }
}

// Conversation state management
let conversationState = {
    step: 0,
    userName: '',
    userEmail: '',
    appointmentDay: '',
    appointmentTime: '',
    additionalInfo: ''
};

// Business hours (24-hour format)
const BUSINESS_HOURS = {
    open: 9,  // 9 AM
    close: 20 // 8 PM
};

// Parse time from user message
function parseTime(message) {
    const lowerMessage = message.toLowerCase();

    // Check for time patterns
    // Pattern 1: "3pm", "3:00pm", "15:00"
    const timePattern = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i;
    const match = lowerMessage.match(timePattern);

    if (match) {
        let hours = parseInt(match[1]);
        const minutes = match[2] ? parseInt(match[2]) : 0;
        const meridiem = match[3] ? match[3].toLowerCase() : null;

        // Convert to 24-hour format
        if (meridiem === 'pm' && hours !== 12) {
            hours += 12;
        } else if (meridiem === 'am' && hours === 12) {
            hours = 0;
        }

        return { hours, minutes };
    }

    // Pattern 2: "morning", "afternoon", "evening"
    if (lowerMessage.includes('morning')) {
        return { hours: 10, minutes: 0, description: 'morning' };
    }
    if (lowerMessage.includes('afternoon')) {
        return { hours: 14, minutes: 0, description: 'afternoon' };
    }
    if (lowerMessage.includes('evening')) {
        return { hours: 18, minutes: 0, description: 'evening' };
    }

    return null;
}

// Validate if time is within business hours
function validateBusinessHours(timeObj) {
    if (!timeObj) return { valid: false, reason: 'no_time' };

    if (timeObj.hours < BUSINESS_HOURS.open) {
        return {
            valid: false,
            reason: 'too_early',
            suggestion: `${BUSINESS_HOURS.open}:00 AM`
        };
    }

    if (timeObj.hours >= BUSINESS_HOURS.close) {
        return {
            valid: false,
            reason: 'too_late',
            suggestion: `7:30 PM`
        };
    }

    return { valid: true };
}

// Format time for display
function formatTime(timeObj) {
    if (!timeObj) return '';

    if (timeObj.description) {
        return timeObj.description;
    }

    let hours = timeObj.hours;
    const minutes = timeObj.minutes || 0;
    const meridiem = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }

    const minuteStr = minutes > 0 ? `:${minutes.toString().padStart(2, '0')}` : '';
    return `${hours}${minuteStr} ${meridiem}`;
}

function handleSendMessage() {
    const messageTextElement = document.getElementById('messageTextInput');
    const messageText = messageTextElement.textContent.trim();
    const messagesThread = document.getElementById('messagesThread');

    if (!messageText) return;

    // Display sent message
    const sentMessage = document.createElement('div');
    sentMessage.className = 'message-item sent';
    sentMessage.innerHTML = `
        <div class="message-bubble-chat sent">${messageText}</div>
    `;
    messagesThread.appendChild(sentMessage);

    // Clear input
    messageTextElement.textContent = '';

    // Scroll to bottom
    messagesThread.scrollTop = messagesThread.scrollHeight;

    // Show typing indicator
    showTypingIndicator();

    // Process message and send reply after 1 second
    setTimeout(() => {
        hideTypingIndicator();
        processConversation(messageText, messagesThread);
    }, 1000);
}

function showTypingIndicator() {
    const messagesThread = document.getElementById('messagesThread');
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message-item received';
    typingIndicator.id = 'typingIndicator';
    typingIndicator.innerHTML = `
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    messagesThread.appendChild(typingIndicator);
    messagesThread.scrollTop = messagesThread.scrollHeight;
}

function hideTypingIndicator() {
    const typingEl = document.getElementById('typingIndicator');
    if (typingEl) {
        typingEl.remove();
    }
}

function sendReply(text, messagesThread) {
    const replyMessage = document.createElement('div');
    replyMessage.className = 'message-item received';
    replyMessage.innerHTML = `
        <div class="message-bubble-chat received">${text}</div>
    `;
    messagesThread.appendChild(replyMessage);
    messagesThread.scrollTop = messagesThread.scrollHeight;
}

function processConversation(userMessage, messagesThread) {
    const lowerMessage = userMessage.toLowerCase();

    switch(conversationState.step) {
        case 0: // Initial message - ask about test drive
            sendReply("Thanks for contacting CarGurus and your questions about the 2024 Hyundai Ioniq 6 SEL AWD. It is currently available! Would you like to schedule a test drive? To stop receiving messages, reply STOP. For help, reply HELP.", messagesThread);
            conversationState.step = 1;
            break;

        case 1: // User responds to test drive question
            if (lowerMessage.includes('yes') || lowerMessage.includes('yeah') || lowerMessage.includes('sure') || lowerMessage.includes('interested')) {
                sendReply("Great! Based on our information, AutoMax Preowned is open today from 9:00 AM - 8:00 PM. Would you like to schedule your visit for today, or would another day work better?", messagesThread);
                conversationState.step = 2;
            } else if (lowerMessage.includes('no') || lowerMessage.includes('not')) {
                sendReply("No problem! Is there anything else I can help you with regarding this vehicle?", messagesThread);
                conversationState.step = 0;
            } else {
                sendReply("Great! Based on our information, AutoMax Preowned is open today from 9:00 AM - 8:00 PM. Would you like to schedule your visit for today, or would another day work better?", messagesThread);
                conversationState.step = 2;
            }
            break;

        case 2: // User picks a day and potentially time
            // Extract day from message
            if (lowerMessage.includes('today')) {
                conversationState.appointmentDay = 'today';
            } else if (lowerMessage.includes('tomorrow')) {
                conversationState.appointmentDay = 'tomorrow';
            } else if (lowerMessage.includes('monday') || lowerMessage.includes('tuesday') || lowerMessage.includes('wednesday') ||
                       lowerMessage.includes('thursday') || lowerMessage.includes('friday') || lowerMessage.includes('saturday') ||
                       lowerMessage.includes('sunday')) {
                // Extract the day mentioned
                const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                for (let day of days) {
                    if (lowerMessage.includes(day)) {
                        conversationState.appointmentDay = day.charAt(0).toUpperCase() + day.slice(1);
                        break;
                    }
                }
            } else {
                conversationState.appointmentDay = 'your preferred day';
            }

            // Try to parse time from the message
            const timeObj = parseTime(userMessage);

            if (timeObj) {
                const validation = validateBusinessHours(timeObj);

                if (validation.valid) {
                    // Valid time - store it and move on
                    conversationState.appointmentTime = formatTime(timeObj);
                    sendReply(`Perfect! I'll reach out to AutoMax Preowned to coordinate your appointment for ${conversationState.appointmentDay} at ${conversationState.appointmentTime} so they can have the car ready and waiting for you.`, messagesThread);
                    conversationState.step = 3;
                } else if (validation.reason === 'too_early' || validation.reason === 'too_late') {
                    // Invalid time - suggest alternative
                    sendReply(`I see you'd like ${conversationState.appointmentDay} at ${formatTime(timeObj)}. AutoMax Preowned is open from 9:00 AM to 8:00 PM. Would ${validation.suggestion} work instead?`, messagesThread);
                    conversationState.step = 2; // Stay on same step to get new time
                }
            } else {
                // No time specified - ask for it
                sendReply(`Great! What time works best for you on ${conversationState.appointmentDay}? AutoMax Preowned is open from 9:00 AM to 8:00 PM.`, messagesThread);
                conversationState.step = 2.5; // Sub-step to collect time
            }
            break;

        case 2.5: // Collect specific time after day was chosen
            const specificTime = parseTime(userMessage);

            if (specificTime) {
                const validation = validateBusinessHours(specificTime);

                if (validation.valid) {
                    conversationState.appointmentTime = formatTime(specificTime);
                    sendReply(`Perfect! I'll reach out to AutoMax Preowned to coordinate your appointment for ${conversationState.appointmentDay} at ${conversationState.appointmentTime} so they can have the car ready and waiting for you.`, messagesThread);
                    conversationState.step = 3;
                } else if (validation.reason === 'too_early' || validation.reason === 'too_late') {
                    sendReply(`I see you'd like ${formatTime(specificTime)}. AutoMax Preowned is open from 9:00 AM to 8:00 PM. Would ${validation.suggestion} work instead?`, messagesThread);
                    conversationState.step = 2.5; // Stay here to get new time
                }
            } else {
                // Still no valid time - try again
                sendReply(`I didn't catch the time. What time works best for you? AutoMax Preowned is open from 9:00 AM to 8:00 PM.`, messagesThread);
                conversationState.step = 2.5;
            }
            break;

        case 3: // Move to collect contact info (no redundant confirmation needed)
            sendReply("AutoMax Preowned will be in touch as soon as possible. To help them assist you better, may I have your name?", messagesThread);
            conversationState.step = 4;
            break;

        case 4: // Collect name, ask for email
            conversationState.userName = userMessage;
            sendReply(`Thank you, ${conversationState.userName}! Apart from your phone number, would you like to provide an email address as an alternative contact method?`, messagesThread);
            conversationState.step = 5;
            break;

        case 5: // Collect email or skip, then summarize
            if (lowerMessage.includes('@')) {
                conversationState.userEmail = userMessage;
            }

            const emailPart = conversationState.userEmail ? ` or via email at ${conversationState.userEmail}` : '';
            const timePart = conversationState.appointmentTime ? ` at ${conversationState.appointmentTime}` : '';
            sendReply(`Perfect, ${conversationState.userName}! Here's a quick recap: You're interested in the 2024 Hyundai Ioniq 6 SEL AWD and would like to schedule a test drive at AutoMax Preowned on ${conversationState.appointmentDay}${timePart}. They'll contact you at this number${emailPart}. Is there anything else you'd like the dealer to know or any questions you'd like them to prepare for?`, messagesThread);
            conversationState.step = 6;
            break;

        case 6: // Collect additional info, then confirm
            if (!lowerMessage.includes('no') && !lowerMessage.includes('nope') && userMessage.length > 5) {
                conversationState.additionalInfo = userMessage;
            }

            sendReply(`Thank you! I've forwarded your information to AutoMax Preowned and they'll be reaching out shortly to confirm your appointment. Before we wrap up, how would you rate your experience with CarGurus today? (1-5, with 5 being the best)`, messagesThread);
            conversationState.step = 7;
            break;

        case 7: // Handle rating and close
            const rating = userMessage.match(/[1-5]/);
            if (rating) {
                const ratingValue = parseInt(rating[0]);
                if (ratingValue >= 4) {
                    sendReply(`Thank you for the ${ratingValue}-star rating! We're so glad we could help. If you need anything else, feel free to reach out. Have a great visit at AutoMax Preowned! To stop receiving messages, reply STOP. For help, reply HELP.`, messagesThread);
                } else {
                    sendReply(`Thank you for your ${ratingValue}-star rating. We appreciate your feedback and will work to improve. If you need anything else, feel free to reach out. Have a great visit at AutoMax Preowned! To stop receiving messages, reply STOP. For help, reply HELP.`, messagesThread);
                }
            } else {
                sendReply("Thank you for your feedback! If you need anything else, feel free to reach out. Have a great visit at AutoMax Preowned! To stop receiving messages, reply STOP. For help, reply HELP.", messagesThread);
            }
            // Reset conversation
            conversationState = {
                step: 0,
                userName: '',
                userEmail: '',
                appointmentDay: '',
                appointmentTime: '',
                additionalInfo: ''
            };
            break;
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
