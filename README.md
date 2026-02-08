# 🏠 Smart Home Dashboard

A Smart Home Dashboard built using **pure HTML, CSS, and Vanilla JavaScript** with **client-side authentication** and simulated smart device control.  
The application follows a **login-first approach**: users must log in before accessing the dashboard.

---

## 🔑 Application Flow

- The application **opens on the login page**
- Users can **register or log in**
- After successful login, users are redirected to the dashboard
- If a user is not logged in, dashboard access is blocked
- Logging out clears the session and redirects back to login

Authentication and session handling are implemented using **browser localStorage**.

---

## 📂 Project Files

index.html → Smart Home Dashboard (protected)
login.html → Login & Registration page
styles.css → Global styling and layout
script.js → Dashboard logic and device simulation
auth.js → Authentication, login, logout, session handling
vercel.json → Routing configuration for Vercel
README.md → Project documentation


---

## ⚙️ Features

- Login and registration system (client-side)
- Session-based access control
- Smart device simulation:
  - Lighting
  - Climate Control
  - Security
  - Entertainment
- Device ON/OFF toggles
- Sliders for brightness, temperature, and volume
- Category-based device filtering
- Auto mode simulation
- Real-time statistics display
- Notification system
- Keyboard shortcuts for device control
- Fully responsive UI

---

## 🛠️ Tech Stack

- HTML5  
- CSS3  
- Vanilla JavaScript  
- Browser localStorage  
- Vercel (static deployment)

No frameworks, no libraries, no build tools.

---

## 🌍 Deployment

The project is deployed as a **static site on Vercel** with custom routing:
- Login page is the default entry point
- Dashboard is protected via authentication checks
- Static assets (CSS & JS) are served correctly

---

## ▶️ Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/samarth-swami/Project---Smart-Home-Dashboard.git
Open login.html directly in your browser
(No server required)

⚠️ Note
This project uses client-side authentication only and is intended for:

Learning

College projects

Portfolio demonstrations

Not suitable for production-level security.

## 👥 Collaborators

- **Samarth Swami** (Project Lead)
- Dhruv Takale
- Vishal Wadh
- Bhavya Kumar
