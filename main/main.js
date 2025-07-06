function myMenuFunction() {
    var i = document.getElementById("navMenu");
    if (i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
}

var loginBtn = document.getElementById("loginBtn");
var registerBtn = document.getElementById("registerBtn");
var loginForm = document.getElementById("login");
var registerForm = document.getElementById("register");

// Get form input elements
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const registerName = document.getElementById("registerName");
// The messageDiv is no longer needed if using alert(), but leaving it for context if you revert later.
// const messageDiv = document.createElement("div"); 
// messageDiv.id = "message";
// document.querySelector(".form-box")?.appendChild(messageDiv);

// Modified showMessage to use alert()
function showMessage(text, isError = false) {
    alert(text);
}

function login() {
    loginForm.style.left = "4px";
    registerForm.style.right = "-520px";
    loginBtn.className += " white-btn";
    registerBtn.className = "btn";
    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
}

function register() {
    loginForm.style.left = "-510px";
    registerForm.style.right = "5px";
    loginBtn.className = "btn";
    registerBtn.className += " white-btn";
    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;
}

// Handle registration
function handleRegister(e) {
    e.preventDefault();
    
    const email = registerEmail.value.trim();
    const password = registerPassword.value.trim();
    const name = registerName.value.trim();
    
    // Basic validation
    if (!email || !password || !name) {
        showMessage("Please fill in all fields", true);
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage("Please enter a valid email", true);
        return;
    }
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some(user => user.email === email)) {
        showMessage("Email already registered", true);
        return;
    }
    
    // Store new user
    users.push({ email, password, name });
    localStorage.setItem("users", JSON.stringify(users));
    
    showMessage("Registration successful! You can now log in.");
    
    // Reset form and switch to login
    document.getElementById("registerForm").reset();
    login();
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();
    
    // Basic validation
    if (!email || !password) {
        showMessage("Please fill in all fields", true);
        return;
    }
    
    // Check credentials
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        showMessage(`Login successful! Welcome, ${user.name}!`);
        document.getElementById("loginForm").reset();
    } else {
        showMessage("Invalid email or password", true);
    }
}

// Add event listeners
document.getElementById("registerForm")?.addEventListener("submit", handleRegister);
document.getElementById("loginForm")?.addEventListener("submit", handleLogin);