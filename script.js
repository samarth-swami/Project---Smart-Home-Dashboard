// Device data structure
const devices = [
    {
        id: 1,
        name: 'Living Room Lights',
        type: 'Lighting',
        icon: '💡',
        status: false,
        value: 50 // brightness percentage
    },
    {
        id: 2,
        name: 'Thermostat',
        type: 'Climate Control',
        icon: '🌡️',
        status: false,
        value: 22
    },
    {
        id: 3,
        name: 'Security Camera',
        type: 'Security',
        icon: '📹',
        status: false,
        value: null
    },
    {
        id: 4,
        name: 'Smart TV',
        type: 'Entertainment',
        icon: '📺',
        status: false,
        value: 30 // volume percentage
    },
    {
        id: 5,
        name: 'Air Conditioner',
        type: 'Climate Control',
        icon: '❄️',
        status: false,
        value: 24
    },
    {
        id: 6,
        name: 'Door Lock',
        type: 'Security',
        icon: '🔒',
        status: false,
        value: null
    },
    {
        id: 7,
        name: 'Smart Speaker',
        type: 'Entertainment',
        icon: '🔊',
        status: false,
        value: 40 // volume percentage
    },
    {
        id: 8,
        name: 'Garage Door',
        type: 'Security',
        icon: '🚗',
        status: false,
        value: null
    }
];

// Current filter (for filtering devices)
let currentFilter = 'All';

// Initialize dashboard
function initDashboard() {
    // Check authentication first
    if (!checkAuth()) {
        return; // Will redirect to login
    }
    
    // Display current user info
    const currentUser = getCurrentUser();
    const userInfoEl = document.getElementById('currentUsername');
    if (userInfoEl && currentUser) {
        userInfoEl.textContent = currentUser;
    }
    
    loadState();
    updateSystemStatus();
    updateFilterCounts();
    renderDevices();
    updateStats();
    updateLastTime(); // Set initial time
}

// Render all devices
function renderDevices() {
    const devicesGrid = document.getElementById('devicesGrid');
    devicesGrid.innerHTML = '';

    const filtered = currentFilter === 'All' 
        ? devices 
        : devices.filter(d => d.type === currentFilter);
    
    filtered.forEach(device => {
        const deviceCard = createDeviceCard(device);
        devicesGrid.appendChild(deviceCard);
    });
    
    updateFilterCounts(); // Update counts after rendering
}

// Create device card element
function createDeviceCard(device) {
    const card = document.createElement('div');
    card.className = `device-card ${device.status ? 'active' : 'inactive'}`;
    card.dataset.deviceId = device.id;

    const statusClass = device.status ? 'active' : 'inactive';
    const statusText = device.status ? 'ON' : 'OFF';
    
    // Generate device-specific controls
    let extraControl = '';
    
    if (device.type === 'Climate Control' && device.status) {
        extraControl = `
            <div class="slider-control">
                <label>Temperature: <span class="slider-value">${device.value}°C</span></label>
                <input type="range" min="16" max="30" value="${device.value}" 
                       class="control-slider" onchange="changeTemp(${device.id}, this.value)"
                       oninput="this.previousElementSibling.querySelector('.slider-value').textContent = this.value + '°C'">
            </div>
        `;
    } else if (device.type === 'Lighting' && device.status) {
        extraControl = `
            <div class="slider-control">
                <label>Brightness: <span class="slider-value">${device.value}%</span></label>
                <input type="range" min="0" max="100" value="${device.value}" 
                       class="control-slider" onchange="changeBrightness(${device.id}, this.value)"
                       oninput="this.previousElementSibling.querySelector('.slider-value').textContent = this.value + '%'">
            </div>
        `;
    } else if (device.type === 'Entertainment' && device.status) {
        extraControl = `
            <div class="slider-control">
                <label>Volume: <span class="slider-value">${device.value}%</span></label>
                <input type="range" min="0" max="100" value="${device.value}" 
                       class="control-slider" onchange="changeVolume(${device.id}, this.value)"
                       oninput="this.previousElementSibling.querySelector('.slider-value').textContent = this.value + '%'">
            </div>
        `;
    } else if (device.type === 'Security' && (device.name === 'Door Lock' || device.name === 'Garage Door')) {
        const lockText = device.status ? 'Unlocked' : 'Locked';
        extraControl = `
            <div class="lock-status">
                <strong>${lockText}</strong>
            </div>
        `;
    }

    card.innerHTML = `
        <div class="device-header">
            <div class="device-icon" title="Click to control">${device.icon}</div>
            <div class="status-indicator ${statusClass}"></div>
        </div>
        <div class="device-name">${device.name}</div>
        <div class="device-type">${device.type}</div>
        <div class="device-info">
            <div class="device-status">
                <strong>Status:</strong> ${statusText}
            </div>
        </div>
        ${extraControl}
        <div class="toggle-switch ${statusClass}"></div>
    `;

    // Add click event to toggle switch
    const toggleSwitch = card.querySelector('.toggle-switch');
    toggleSwitch.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDevice(device.id);
    });

    // Prevent slider clicks from toggling device
    const sliders = card.querySelectorAll('.control-slider');
    sliders.forEach(slider => {
        slider.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Add click event to entire card (but not if clicking toggle switch or slider)
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('toggle-switch') && 
            !e.target.closest('.toggle-switch') &&
            !e.target.classList.contains('control-slider') &&
            !e.target.closest('.slider-control')) {
            toggleDevice(device.id);
        }
    });

    return card;
}

// Toggle device status
function toggleDevice(deviceId) {
    const device = devices.find(d => d.id === deviceId);
    if (device) {
        device.status = !device.status;
        saveState();
        renderDevices();
        updateStats();
        updateLastTime();
        showNotification(`${device.name} turned ${device.status ? "ON" : "OFF"}`);
        
        // Add visual feedback
        const deviceCard = document.querySelector(`[data-device-id="${deviceId}"]`);
        if (deviceCard) {
            deviceCard.style.transform = 'scale(0.98)';
            setTimeout(() => {
                deviceCard.style.transform = '';
            }, 150);
        }
    }
}

// Change temperature for Climate Control devices
function changeTemp(id, value) {
    const device = devices.find(d => d.id === id);
    if (device) {
        device.value = parseInt(value);
        saveState();
        updateStats();
        updateLastTime();
        showNotification(`${device.name} set to ${value}°C`);
    }
}

// Change brightness for Lighting devices
function changeBrightness(id, value) {
    const device = devices.find(d => d.id === id);
    if (device) {
        device.value = parseInt(value);
        saveState();
        updateLastTime();
        showNotification(`${device.name} brightness set to ${value}%`);
    }
}

// Change volume for Entertainment devices
function changeVolume(id, value) {
    const device = devices.find(d => d.id === id);
    if (device) {
        device.value = parseInt(value);
        saveState();
        updateLastTime();
        showNotification(`${device.name} volume set to ${value}%`);
    }
}

// Update statistics
function updateStats() {
    const activeDevices = devices.filter(d => d.status).length;
    const totalDevices = devices.length;
    
    // Calculate average temperature from climate control devices
    const climateDevices = devices.filter(d => 
        d.type === 'Climate Control' && d.status && d.value !== null
    );
    const avgTemp = climateDevices.length > 0
        ? Math.round(climateDevices.reduce((sum, d) => sum + d.value, 0) / climateDevices.length)
        : '--';

    // Calculate energy consumption (fake calculation)
    const energy = (activeDevices * 1.5).toFixed(1);

    document.getElementById('activeDevices').textContent = activeDevices;
    document.getElementById('totalDevices').textContent = totalDevices;
    document.getElementById('avgTemp').textContent = avgTemp;
    document.getElementById('energyUsed').textContent = energy + ' kWh';
    
    // Update page title with live count
    document.title = `(${activeDevices}) Active Devices - Smart Home`;
}

// Filter devices by type
function filterDevices(type) {
    currentFilter = type;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        const btnText = btn.textContent.trim();
        if ((type === 'All' && btnText.startsWith('All')) || 
            (type === 'Security' && btnText.startsWith('Security')) ||
            (type === 'Climate Control' && btnText.startsWith('Climate')) ||
            (type === 'Entertainment' && btnText.startsWith('Entertainment')) ||
            (type === 'Lighting' && btnText.startsWith('Lighting'))) {
            btn.classList.add('active');
        }
    });
    
    renderDevices();
}

// Update filter button counts
function updateFilterCounts() {
    const securityCount = devices.filter(d => d.type === 'Security').length;
    const climateCount = devices.filter(d => d.type === 'Climate Control').length;
    const entertainmentCount = devices.filter(d => d.type === 'Entertainment').length;
    const lightingCount = devices.filter(d => d.type === 'Lighting').length;
    
    const securityBtn = document.getElementById('filterSecurity');
    const climateBtn = document.getElementById('filterClimate');
    const entertainmentBtn = document.getElementById('filterEntertainment');
    const lightingBtn = document.getElementById('filterLighting');
    
    if (securityBtn) securityBtn.textContent = `Security (${securityCount})`;
    if (climateBtn) climateBtn.textContent = `Climate (${climateCount})`;
    if (entertainmentBtn) entertainmentBtn.textContent = `Entertainment (${entertainmentCount})`;
    if (lightingBtn) lightingBtn.textContent = `Lighting (${lightingCount})`;
}

// Set all devices on or off
function setAll(state) {
    devices.forEach(d => d.status = state);
    saveState();
    renderDevices();
    updateStats();
    updateLastTime();
    showNotification(`All devices turned ${state ? "ON" : "OFF"}`);
}

// Auto mode - randomly activate devices
function autoMode() {
    devices.forEach(d => {
        if (Math.random() > 0.5) d.status = true;
        else d.status = false;
    });
    saveState();
    renderDevices();
    updateStats();
    updateLastTime();
    showNotification("Auto mode activated");
}

// Update last updated time
function updateLastTime() {
    const time = new Date().toLocaleTimeString();
    const lastUpdateEl = document.getElementById("lastUpdate");
    if (lastUpdateEl) {
        lastUpdateEl.textContent = `Last updated: ${time}`;
    }
}

// Update system online/offline status
function updateSystemStatus() {
    const online = navigator.onLine;
    const el = document.getElementById("systemStatus");
    if (el) {
        el.textContent = online ? "🟢 System Online" : "🔴 System Offline";
    }
}

// Show notification
function showNotification(msg) {
    const box = document.getElementById("notifications");
    if (!box) return;
    
    const div = document.createElement("div");
    div.className = "notification";
    div.textContent = msg;
    box.appendChild(div);

    // Animate in
    setTimeout(() => div.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        div.classList.remove('show');
        setTimeout(() => div.remove(), 300);
    }, 3000);
}

// Save state to localStorage
function saveState() {
    const state = {
        devices: devices.map(d => ({
            id: d.id,
            status: d.status,
            value: d.value
        })),
        timestamp: Date.now()
    };
    localStorage.setItem('smartHomeState', JSON.stringify(state));
}

// Load state from localStorage
function loadState() {
    const savedState = localStorage.getItem('smartHomeState');
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            state.devices.forEach(savedDevice => {
                const device = devices.find(d => d.id === savedDevice.id);
                if (device) {
                    device.status = savedDevice.status;
                    if (savedDevice.value !== undefined) {
                        device.value = savedDevice.value;
                    }
                }
            });
        } catch (error) {
            console.error('Error loading state:', error);
        }
    }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', initDashboard);

// Save state periodically (every 5 seconds) as backup
setInterval(saveState, 5000);

// System status event listeners
window.addEventListener("online", updateSystemStatus);
window.addEventListener("offline", updateSystemStatus);

// Keyboard shortcuts (1-8 to toggle devices)
document.addEventListener("keydown", e => {
    const key = e.key;
    if (key >= '1' && key <= '8') {
        const deviceId = parseInt(key);
        if (devices.find(d => d.id === deviceId)) {
            toggleDevice(deviceId);
        }
    }
});
