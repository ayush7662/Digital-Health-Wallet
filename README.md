<h1 align="center">🏥 Digital Health Wallet </h1>

A full-stack Digital Health Wallet application that allows users to register, login, upload medical reports, view reports, and track vital health data securely.

This project is built using React (Vite) for the frontend and Node.js + Express + SQLite for the backend, with JWT-based authentication.

# server : https://digital-health-wallet-server-pduy.onrender.com
# client: https://digital-health-wallet-alpha.vercel.app/login

# ✨ Features
## 🔐 Authentication

User Registration & Login

JWT-based authentication

Protected routes using ProtectedRoute

## 📄 Medical Reports

Upload medical reports (PDF / Images)

View uploaded reports

Reports are user-specific and secured

## ❤️ Vital Health Tracking

Add vitals (BP, Sugar, Heart Rate)

View vitals in chart format

Data fetched from backend APIs

## 🎨 UI & UX

Clean and responsive UI

Built with modern React structure

Reusable components


# 🛠 Tech Stack
## Frontend

React (Vite)

JavaScript (JSX)

Axios

Context API

Recharts

CSS / Tailwind (if enabled)


## Backend

Node.js

Express.js

SQLite3

JWT (jsonwebtoken)

bcryptjs

Multer (file uploads)


# 📁 Frontend Folder Structure

```text
client
├── public
│   └── vite.svg
│
├── src
│   ├── assets                # Static assets
│   │
│   ├── components
│   │   ├── ui                # Reusable UI components
│   │   ├── AddVitalsForm.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── UploadReportForm.jsx
│   │
│   ├── context
│   │   └── AuthContext.jsx   # Authentication context
│   │
│   ├── lib
│   │   └── api.js            # Axios API configuration
│   │
│   ├── pages
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── UploadReport.jsx
│   │   ├── ViewReports.jsx
│   │   └── Vitals.jsx
│   │
│   ├── App.jsx               # Application routing
│   ├── App.css
│   ├── index.css
│   └── main.jsx              # Application entry point
│
├── .gitignore
└── package.json
```


 # 🔗 Backend API Overview

## Authentication

POST /api/auth/register

POST /api/auth/login

## Reports

POST /api/reports/upload (Protected)

GET /api/reports (Protected)

## Vitals

POST /api/vitals (Protected)

GET /api/vitals (Protected)

# 🔐 Authentication Flow

User logs in

Backend returns JWT token

Token stored in localStorage

Axios interceptor attaches token to headers

ProtectedRoute restricts access to secure pages


# ⚙️ Installation & Setup
## Backend

cd server

npm install

## Create .env file:

JWT_SECRET=your_secret_key

# Run server:

node index.js

## Server runs at:

http://localhost:5000

## Frontend

cd client

npm install

npm run dev

## Frontend runs at:

http://localhost:5173

# 📊 Vitals Chart Logic

useEffect → fetch vitals from backend on page load

useState → store vitals data

Data mapped into chart-friendly format

Rendered using Recharts














