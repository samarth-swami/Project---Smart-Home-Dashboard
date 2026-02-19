🏠 Smart Home Dashboard

A Smart Home Dashboard built using pure HTML, CSS, and Vanilla JavaScript, featuring client-side authentication and simulated smart device controls.

The application follows a login-first approach, ensuring users must authenticate before accessing the dashboard.

🔑 Application Flow

The application opens on the Login page

Users can register or log in

After successful login, users are redirected to the Dashboard

If a user is not logged in, dashboard access is blocked

Logging out clears the session and redirects back to the login page

Authentication and session handling are implemented using browser localStorage

📂 Project Structure
├── index.html      → Smart Home Dashboard (protected)
├── login.html      → Login & Registration page
├── styles.css      → Global styling and layout
├── script.js       → Dashboard logic & device simulation
├── auth.js         → Authentication, login, logout & session handling
├── vercel.json     → Routing configuration for Vercel
└── README.md       → Project documentation

⚙️ Features
🔐 Authentication

Client-side login and registration system

Session-based access control using localStorage

Protected dashboard routes

Logout functionality with session cleanup

🏡 Smart Device Simulation

Lighting

Climate Control

Security

Entertainment

🎛️ Controls & Interactions

Device ON/OFF toggles

Sliders for:

Brightness

Temperature

Volume

Category-based device filtering

Auto mode simulation

Real-time statistics display

Notification system

Keyboard shortcuts for quick device control

📱 UI/UX

Fully responsive design

Clean and intuitive interface

Works across desktop, tablet, and mobile screens

🛠️ Tech Stack

HTML5

CSS3

Vanilla JavaScript

Browser localStorage

Vercel (Static Deployment)

🚫 No frameworks
🚫 No libraries
🚫 No build tools

🌍 Deployment

The project is deployed as a static site on Vercel with custom routing:

Login page is the default entry point

Dashboard is protected via authentication checks

Static assets (CSS & JS) are served correctly

▶️ Run Locally

Clone the repository:

git clone https://github.com/samarth-swami/Project---Smart-Home-Dashboard.git


Open login.html directly in your browser
(No server required)

⚠️ Important Note

This project uses client-side authentication only and is intended for:

Learning purposes

College projects

Portfolio demonstrations

❌ Not suitable for production-level security

👥 Collaborators

Samarth Swami — Project Lead

Dhruv Takale

Vishal Wadh

Bhavya Kumar
