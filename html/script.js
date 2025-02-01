document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("contact-modal").style.display = "none";
    typeWriterEffect();
    window.addEventListener("scroll", showBackToTop);
    document.addEventListener("click", closeSettingsOnClickOutside); // Detects clicks outside the settings panel
});

// Open and close the contact modal
function openModal() { document.getElementById("contact-modal").style.display = "flex"; }
function closeModal() { document.getElementById("contact-modal").style.display = "none"; }
window.onclick = function(event) { if (event.target === document.getElementById("contact-modal")) closeModal(); };

// Typewriter Effect
function typeWriterEffect() {
    const typewriterSpan = document.getElementById("typewriter-text");
    if (!typewriterSpan) return;
    const text = "Richard Jameson - Cybersecurity Enthusiast";
    let i = 0;
    typewriterSpan.innerHTML = "";
    function type() { if (i < text.length) { typewriterSpan.innerHTML += text.charAt(i); i++; setTimeout(type, 100); } }
    type();
}

function toggleTheme() { 
    document.body.classList.toggle("light-mode");

    // Change button text & icon dynamically
    let themeButton = document.querySelector(".theme-toggle-button");
    themeButton.innerHTML = document.body.classList.contains("light-mode") ? "🌞 Light Mode" : "🌙 Dark Mode";
    
    // Store preference in localStorage (so it remembers after refresh)
    localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
}

// Apply saved theme when page loads
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
    }
});


// Toggle Settings Panel
function toggleSettings() {
    document.getElementById("settings-panel").classList.toggle("active");
}

// Close Settings Panel if Clicking Outside
function closeSettingsOnClickOutside(event) {
    let settingsPanel = document.getElementById("settings-panel");
    let settingsButton = document.getElementById("settings-toggle");
    if (!settingsPanel.contains(event.target) && event.target !== settingsButton) {
        settingsPanel.classList.remove("active");
    }
}

// Toggle Dark/Light Mode
function toggleTheme() { 
    document.body.classList.toggle("light-mode");
    
    // Select the theme button and update text & icon
    let themeButton = document.querySelector(".theme-toggle-button");
    themeButton.innerHTML = document.body.classList.contains("light-mode") ? "🌞 Light Mode" : "🌙 Dark Mode";
}

// Open and Close Chat
function toggleChat(chatNumber) {
    document.getElementById(`chat-container-${chatNumber}`).style.display = "flex";
}

function closeChat(chatNumber) {
    document.getElementById(`chat-container-${chatNumber}`).style.display = "none";
}

// Handle Messages
function sendMessage(chatNumber) {
    let userInput = document.getElementById(`user-input-${chatNumber}`).value.trim();
    if (userInput === "") return;

    clearChat(chatNumber); // Clear previous messages
    addMessage(chatNumber, "You: " + userInput);
    generateResponse(chatNumber, userInput);
    document.getElementById(`user-input-${chatNumber}`).value = "";
}

// Handle Enter Key
function handleKeyPress(event, chatNumber) {
    if (event.key === "Enter") {
        sendMessage(chatNumber);
    }
}

// Display Messages
function addMessage(chatNumber, message) {
    let chatBox = document.getElementById(`chat-box-${chatNumber}`);
    let msgDiv = document.createElement("div");
    msgDiv.textContent = message;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Clear Chat Before New Message
function clearChat(chatNumber) {
    document.getElementById(`chat-box-${chatNumber}`).innerHTML = ""; 
}

// AI Chat Responses (Now Supports Both Chatbots)
function generateResponse(chatNumber, userInput) {
    let response = "I'm sorry, I didn't understand that. Can you try asking in a different way?";
    
    // Predefined Responses
    let responses = {
        // Greetings
        "hello": "Hello! How can I assist you today?",
        "hi": "Hi there! Feel free to ask about my skills, projects, or experience.",
        "how are you": "I'm just a chatbot, but I'm here to help! Ask me anything about my CV.",
        
        // Skills
        "what are your skills": "I specialize in cybersecurity, ethical hacking, network security, and incident response.",
        "do you know programming": "Yes! I'm experienced in HTML, CSS, JavaScript, and cybersecurity scripting.",
        "what security tools do you use": "I have hands-on experience with Wireshark, Packet Tracer, Virtual Machines, and ethical hacking tools.",
        
        // Certifications
        "do you have any certifications": "Yes! I have completed:\n✅ Cisco IT Essentials\n✅ ILP Infrastructure Technician\nBoth in 2024!",
        
        // Work Experience
        "where do you work": "I currently work at Serco as an Operational Support Officer.",
        "what do you do at serco": "At Serco, I manage sensitive customer information, conduct risk assessments, and train employees on cybersecurity best practices.",
        "have you trained employees": "Yes! I have provided cybersecurity training sessions to help employees understand risk assessments and security protocols.",
        
        // Projects
        "tell me about your projects": "I have developed:\n🎮 A cybersecurity awareness game\n🔐 Network security simulations using Packet Tracer\n👨‍💻 Web security auditing projects",
        "what is your cybersecurity game about": "My game teaches users about phishing attacks, password security, and online safety using interactive scenarios.",
        "what did you do in network simulation": "I designed secure network topologies, tested firewall rules, and simulated cyber-attacks to analyze defenses.",
        
        // Education
        "what degree do you have": "I have a BSc (Hons) in Cyber Security from Manchester Metropolitan University (2:1).",
        "where did you study": "I studied at Manchester Metropolitan University, where I focused on network security, ethical hacking, and digital forensics.",
        
        // Portfolio & Contact Info
        "where can I see your work": "You can check out my projects on GitHub here: [GitHub](https://github.com/your-github-profile).",
        "can I download your CV": "Of course! Click [here](#) to download my CV.",
        "do you have linkedin": "Yes! You can connect with me on LinkedIn: [LinkedIn](https://www.linkedin.com/in/richard-jameson-06209b18a/).",
        "how can I contact you": "You can reach me via email: richardjameson15@gmail.com",
        
        // Interview Simulation
        "can you ask me interview questions": "Sure! Here's a cybersecurity-related interview question:\n🛡️ *How would you handle a data breach in a company?*",
        "another interview question": "Here's another question:\n🔍 *What steps would you take to secure a web application?*",
        "more interview questions": "Okay! Try this:\n🚀 *How do you stay updated on the latest cybersecurity threats and vulnerabilities?*",
        
        // Closing
        "bye": "Goodbye! Let me know if you need anything else. 😊",
        "thank you": "You're welcome! Let me know if I can help with anything else.",
        "thanks": "No problem! Have a great day!"
    };

    // Match User Input
    let lowerCaseInput = userInput.toLowerCase();
    for (let key in responses) {
        if (lowerCaseInput.includes(key)) {
            response = responses[key];
            break;
        }
    }

    setTimeout(() => addMessage(chatNumber, "AI: " + response), 500);
}

// Attach Click Listeners to Chat Buttons
document.getElementById("chat-toggle-1").addEventListener("click", () => toggleChat(1));
document.getElementById("chat-toggle-2").addEventListener("click", () => toggleChat(2));

// Handle Contact Form Submission
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.querySelector(".contact-form form");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent default form submission

            // Show loading state (disable button)
            const submitButton = contactForm.querySelector(".contact-button");
            submitButton.textContent = "Sending...";
            submitButton.disabled = true;

            // Send form data to Formspree
            fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    // Success: Show message
                    let successMessage = document.getElementById("success-message");
                    successMessage.textContent = "✅ Message Sent Successfully!";
                    successMessage.style.display = "block";

                    // Hide success message after 4 seconds
                    setTimeout(() => {
                        successMessage.style.display = "none";
                    }, 4000);

                    // Reset form after successful submission
                    contactForm.reset();
                } else {
                    throw new Error("Form submission failed.");
                }
            })
            .catch(error => {
                alert("⚠️ Error submitting form. Please try again later.");
            })
            .finally(() => {
                // Reset button after response
                submitButton.textContent = "Send Message";
                submitButton.disabled = false;
            });
        });
    }
});

// Scroll to Top
function showBackToTop() { 
    document.getElementById("back-to-top").style.display = window.scrollY > 300 ? "block" : "none"; 
}

function scrollToTop() { 
    window.scrollTo({ top: 0, behavior: "smooth" }); 
}
