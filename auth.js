// Authentication and User Management System

// User accounts storage (in production, this would be on a server)
function getUsers() {
    const users = localStorage.getItem('smartHomeUsers');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('smartHomeUsers', JSON.stringify(users));
}

// Get current logged-in user
function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

function setCurrentUser(username) {
    if (username) {
        localStorage.setItem('currentUser', username);
    } else {
        localStorage.removeItem('currentUser');
    }
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Login function
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showError('Please enter both username and password');
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
        showError('Username not found. Please register first.');
        return;
    }

    if (user.password !== password) {
        showError('Incorrect password');
        return;
    }

    // Login successful
    setCurrentUser(username);
    showSuccess('Login successful! Redirecting...');
    
    // Update last login time
    user.lastLogin = new Date().toISOString();
    saveUsers(users);

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Register function
function register() {
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const email = document.getElementById('regEmail').value.trim();

    // Validation
    if (!username || !password || !confirmPassword) {
        showError('Please fill in all required fields');
        return;
    }

    if (username.length < 3) {
        showError('Username must be at least 3 characters long');
        return;
    }

    if (password.length < 4) {
        showError('Password must be at least 4 characters long');
        return;
    }

    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }

    const users = getUsers();

    // Check if username already exists
    if (users.find(u => u.username === username)) {
        showError('Username already exists. Please choose another.');
        return;
    }

    // Create new user
    const newUser = {
        username: username,
        password: password, // In production, this should be hashed
        email: email || null,
        createdAt: new Date().toISOString(),
        lastLogin: null
    };

    users.push(newUser);
    saveUsers(users);

    showSuccess('Account created successfully! Redirecting to login...');
    
    setTimeout(() => {
        showLoginForm();
        // Clear registration form
        document.getElementById('regUsername').value = '';
        document.getElementById('regPassword').value = '';
        document.getElementById('regConfirmPassword').value = '';
        document.getElementById('regEmail').value = '';
    }, 1500);
}

// Show error message
function showError(message) {
    const errorEl = document.getElementById('errorMessage');
    const successEl = document.getElementById('successMessage');
    
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    successEl.style.display = 'none';
}

// Show success message
function showSuccess(message) {
    const errorEl = document.getElementById('errorMessage');
    const successEl = document.getElementById('successMessage');
    
    successEl.textContent = message;
    successEl.style.display = 'block';
    errorEl.style.display = 'none';
}

// Toggle between login and register forms
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    clearMessages();
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    clearMessages();
}

function clearMessages() {
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
}

// Toggle password visibility
function togglePassword(type = 'login') {
    const passwordId = type === 'login' ? 'password' : 'regPassword';
    const passwordInput = document.getElementById(passwordId);
    const toggleBtn = passwordInput.nextElementSibling;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// Logout function
function logout() {
    setCurrentUser(null);
    window.location.replace('login.html');
}


// Check authentication on page load (for dashboard)
function checkAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Get current user info
function getCurrentUserInfo() {
    const username = getCurrentUser();
    if (!username) return null;

    const users = getUsers();
    return users.find(u => u.username === username);
}

// Allow Enter key to submit forms
document.addEventListener('DOMContentLoaded', () => {
    // Login form Enter key
    const loginUsername = document.getElementById('username');
    const loginPassword = document.getElementById('password');
    
    if (loginUsername && loginPassword) {
        loginPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                login();
            }
        });
    }

    // Register form Enter key
    const regConfirmPassword = document.getElementById('regConfirmPassword');
    if (regConfirmPassword) {
        regConfirmPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                register();
            }
        });
    }
});
