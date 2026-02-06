// Lead Nurturing Chat Tester Script

// Always use proxy - it handles CORS
const API_URL = "/api/chat-proxy";
const STORAGE_KEY = "lead_nurturing_conversations";

// Debug logging
console.log('Chat Tester initialized');
console.log('API URL:', API_URL);
console.log('Current hostname:', window.location.hostname);

// State management
let currentConversation = null;
let conversations = loadConversations();

// DOM elements
const startPanel = document.getElementById("start-panel");
const chatPanel = document.getElementById("chat-panel");
const newConversationForm = document.getElementById("new-conversation-form");
const messageForm = document.getElementById("message-form");
const messagesContainer = document.getElementById("messages-container");
const conversationsContainer = document.getElementById("conversations-container");
const backButton = document.getElementById("back-button");
const loadingIndicator = document.getElementById("loading");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    renderConversationsList();
    setupEventListeners();
});

function setupEventListeners() {
    newConversationForm.addEventListener("submit", handleNewConversation);
    messageForm.addEventListener("submit", handleSendMessage);
    backButton.addEventListener("click", showStartPanel);
}

// Load conversations from localStorage
function loadConversations() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error("Error loading conversations:", error);
        return {};
    }
}

// Save conversations to localStorage
function saveConversations() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch (error) {
        console.error("Error saving conversations:", error);
    }
}

// Handle new conversation form submission
function handleNewConversation(e) {
    e.preventDefault();

    const phoneNumber = document.getElementById("phone-number").value.trim();
    const listingId = document.getElementById("listing-id").value.trim();

    // Create or load conversation
    if (!conversations[phoneNumber]) {
        conversations[phoneNumber] = {
            phoneNumber,
            listingId: listingId || null,
            messages: [],
            sessionInfo: {
                clickId: null,
                serviceProviderId: null
            },
            createdAt: new Date().toISOString()
        };
        saveConversations();
    }

    // Load conversation
    loadConversation(phoneNumber);

    // Reset form
    newConversationForm.reset();
}

// Load and display a conversation
function loadConversation(phoneNumber) {
    currentConversation = conversations[phoneNumber];

    if (!currentConversation) {
        alert("Conversation not found");
        return;
    }

    // Update UI
    document.getElementById("chat-title").textContent = `Chat: ${phoneNumber}`;
    updateSessionInfo();
    renderMessages();
    showChatPanel();

    // Focus message input
    document.getElementById("message-input").focus();
}

// Update session info display
function updateSessionInfo() {
    const sessionInfo = document.getElementById("session-info");
    const conv = currentConversation;

    sessionInfo.innerHTML = `
        <span>
            <span class="label">Phone:</span>
            <span class="value">${conv.phoneNumber}</span>
        </span>
        ${conv.listingId ? `
        <span>
            <span class="label">Listing:</span>
            <span class="value">${conv.listingId}</span>
        </span>
        ` : ''}
        ${conv.sessionInfo.clickId ? `
        <span>
            <span class="label">Click ID:</span>
            <span class="value">${conv.sessionInfo.clickId}</span>
        </span>
        ` : ''}
        ${conv.sessionInfo.serviceProviderId ? `
        <span>
            <span class="label">Provider:</span>
            <span class="value">${conv.sessionInfo.serviceProviderId}</span>
        </span>
        ` : ''}
    `;
}

// Render all messages in the conversation
function renderMessages() {
    messagesContainer.innerHTML = "";

    if (currentConversation.messages.length === 0) {
        messagesContainer.innerHTML = `
            <div class="empty-state">
                <p>No messages yet. Start the conversation!</p>
            </div>
        `;
        return;
    }

    currentConversation.messages.forEach(msg => {
        appendMessage(msg.sender, msg.text, msg.timestamp, msg.isError);
    });

    scrollToBottom();
}

// Append a message to the chat
function appendMessage(sender, text, timestamp, isError = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender} ${isError ? 'error' : ''}`;

    const time = timestamp ? formatTime(timestamp) : formatTime(new Date().toISOString());

    messageDiv.innerHTML = `
        <div class="message-sender">${sender === 'user' ? 'You' : 'Agent'}</div>
        <div class="message-bubble">${escapeHtml(text)}</div>
        <div class="message-time">${time}</div>
    `;

    messagesContainer.appendChild(messageDiv);
}

// Handle send message form submission
async function handleSendMessage(e) {
    e.preventDefault();

    const input = document.getElementById("message-input");
    const message = input.value.trim();

    if (!message) return;

    // Clear input
    input.value = "";

    // Add user message to conversation
    const userMessage = {
        sender: "user",
        text: message,
        timestamp: new Date().toISOString()
    };

    currentConversation.messages.push(userMessage);
    saveConversations();
    appendMessage(userMessage.sender, userMessage.text, userMessage.timestamp);
    scrollToBottom();

    // Send to API
    await sendMessageToAPI(message);
}

// Send message to API
async function sendMessageToAPI(message) {
    showLoading();

    try {
        const isFirstMessage = currentConversation.messages.filter(m => m.sender === 'user').length === 1;

        const payload = {
            message,
            phone_number: currentConversation.phoneNumber
        };

        // Only include listing_id on first message
        if (isFirstMessage && currentConversation.listingId) {
            payload.listing_id = parseInt(currentConversation.listingId);
        }

        console.log('Sending to API:', API_URL);
        console.log('Payload:', payload);

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API error response:', errorText);
            throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Response data:', data);

        // Update session info
        if (data.click_id) {
            currentConversation.sessionInfo.clickId = data.click_id;
        }
        if (data.listing_id) {
            currentConversation.listingId = data.listing_id;
        }
        if (data.service_provider_id) {
            currentConversation.sessionInfo.serviceProviderId = data.service_provider_id;
        }

        // Add agent response
        const agentMessage = {
            sender: "agent",
            text: data.response || "No response",
            timestamp: new Date().toISOString()
        };

        currentConversation.messages.push(agentMessage);
        saveConversations();
        updateSessionInfo();
        appendMessage(agentMessage.sender, agentMessage.text, agentMessage.timestamp);
        scrollToBottom();

    } catch (error) {
        console.error("Error sending message:", error);
        console.error("Error details:", {
            name: error.name,
            message: error.message,
            stack: error.stack
        });

        // Add error message with helpful info
        let errorText = `Error: ${error.message}`;

        if (error.message.includes('Failed to fetch')) {
            errorText += '\n\nTroubleshooting:\n';
            errorText += '• Check if you\'re accessing via Vercel URL\n';
            errorText += '• Open browser console (F12) for details\n';
            errorText += `• Current URL: ${window.location.href}`;
        }

        const errorMessage = {
            sender: "agent",
            text: errorText,
            timestamp: new Date().toISOString(),
            isError: true
        };

        currentConversation.messages.push(errorMessage);
        saveConversations();
        appendMessage(errorMessage.sender, errorMessage.text, errorMessage.timestamp, true);
        scrollToBottom();
    } finally {
        hideLoading();
    }
}

// Render conversations list
function renderConversationsList() {
    const convArray = Object.values(conversations);

    if (convArray.length === 0) {
        conversationsContainer.innerHTML = `
            <div class="empty-state">
                <p>No conversations yet. Start a new one above!</p>
            </div>
        `;
        return;
    }

    // Sort by most recent
    convArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    conversationsContainer.innerHTML = convArray.map(conv => {
        const messageCount = conv.messages.length;
        const listingText = conv.listingId ? `Listing: ${conv.listingId}` : 'No listing';

        return `
            <div class="conversation-item" data-phone="${conv.phoneNumber}">
                <div class="phone">${conv.phoneNumber}</div>
                <div class="details">${listingText}</div>
                <div class="message-count">${messageCount} message${messageCount !== 1 ? 's' : ''}</div>
            </div>
        `;
    }).join("");

    // Add click listeners
    document.querySelectorAll(".conversation-item").forEach(item => {
        item.addEventListener("click", () => {
            const phone = item.dataset.phone;
            loadConversation(phone);
        });
    });
}

// UI helpers
function showStartPanel() {
    startPanel.classList.remove("hidden");
    chatPanel.classList.add("hidden");
    currentConversation = null;
    renderConversationsList();
}

function showChatPanel() {
    startPanel.classList.add("hidden");
    chatPanel.classList.remove("hidden");
}

function showLoading() {
    loadingIndicator.classList.remove("hidden");
}

function hideLoading() {
    loadingIndicator.classList.add("hidden");
}

function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Utility functions
function formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
