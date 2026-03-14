# 🏠 Smart Home Dashboard

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000?style=for-the-badge&logo=vercel)](https://project-smart-home-dashboard-hsqj.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/samarth-swami/Project---Smart-Home-Dashboard)

A **Smart Home Dashboard** built using **pure HTML, CSS, and Vanilla JavaScript**, featuring client-side authentication and simulated smart device controls.

The application follows a **login-first approach**, ensuring users must authenticate before accessing the dashboard.

---

# 🔑 Application Flow

1. The application opens on the **Login page**
2. Users can **register or log in**
3. After successful login, users are redirected to the **Dashboard**
4. If a user is **not logged in**, dashboard access is **blocked**
5. Logging out **clears the session** and redirects back to the login page

Authentication and session handling are implemented using **browser localStorage**.

---

# 🌍 Live Demo

🚀 Try the project here:

👉 https://project-smart-home-dashboard-hsqj.vercel.app/

---

# 📂 Project Structure

├── index.html → Smart Home Dashboard (Protected Page)
├── login.html → Login & Registration Page
├── styles.css → Global Styling and Layout
├── script.js → Dashboard Logic & Device Simulation
├── auth.js → Authentication, Login, Logout & Session Handling
├── vercel.json → Routing Configuration for Vercel
└── README.md → Project Documentation

# ⚙️ Features

## 🔐 Authentication

- Client-side **login and registration system**
- **Session-based access control** using `localStorage`
- **Protected dashboard routes**
- **Logout functionality** with session cleanup

---

## 🏡 Smart Device Simulation

The dashboard simulates different smart home systems:

- 💡 **Lighting**
- 🌡️ **Climate Control**
- 🔐 **Security**
- 🎵 **Entertainment**

---

## 🎛️ Controls & Interactions

Users can interact with smart devices through:

- **Device ON/OFF toggles**
- Adjustable sliders for:
  - Brightness
  - Temperature
  - Volume
- **Category-based device filtering**
- **Auto mode simulation**
- **Real-time statistics display**
- **Notification system**
- **Keyboard shortcuts for faster device control**

---

# 📱 User Interface

- **Fully responsive design**
- Clean and intuitive dashboard layout
- Works smoothly across:

  - Desktop
  - Tablet
  - Mobile devices

---

# 🛠️ Tech Stack

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **Browser localStorage**
- **Vercel (Static Deployment)**

### Project Constraints

- ❌ No frameworks  
- ❌ No libraries  
- ❌ No build tools

---

# 🌍 Deployment

The project is deployed as a **static website using Vercel**.

Deployment configuration ensures:

- The **Login page is the default entry point**
- The **Dashboard remains protected** via authentication checks
- Static assets (**CSS & JavaScript**) are served correctly

---

# ▶️ Run Locally

Clone the repository:

```bash
git clone https://github.com/samarth-swami/Project---Smart-Home-Dashboard.git

---

Open the project folder and run:

login.html

---

## ⚠️ Important Note

This project uses **client-side authentication only** and is intended for:

- Learning purposes
- College projects
- Portfolio demonstrations

❌ **Not suitable for production-level security.**

---

## 👥 Contributors

- **Samarth Swami** — Project Lead  
- **Dhruv Takale**  
- **Vishal Wadh**  
- **Bhavya Kumar**

