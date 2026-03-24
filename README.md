# MERN User Management System

A modern, full-stack user management application built with the MERN stack (MongoDB, Express, React, Node.js). This project features a high-performance backend with Upstash Redis rate limiting and a stunning, responsive frontend built with Next.js 15+ and Tailwind CSS 4.

## 🚀 Features

- **Full CRUD Support**: Create, Read, Update, and Delete users.
- **Modern UI/UX**: Premium dark-mode design with smooth transitions and micro-animations.
- **Dynamic User Profiles**: Detailed profile pages featuring user avatars and responsive layouts.
- **Smart Forms**: Zero-config form management with React Hook Form and Zod validation.
- **API Performance**: 
  - Backend rate limiting using **Upstash Redis**.
  - Frontend data fetching and caching with **TanStack Query (React Query)**.
- **Fully Responsive**: Optimized for all devices from mobile to desktop.
- **Dropdown Integration**: Role selection via custom-styled dropdowns.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router, Turbopack)
- **Styling**: Tailwind CSS 4
- **State & Data**: TanStack Query (React Query) v5
- **Forms**: React Hook Form, Zod
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Infrastructure**: 
  - **Upstash Redis** (Rate limiting)
  - Upstash for distributed state management
- **Security**: CORS, Upstash-based Rate Limiter

## 📦 Project Structure

```text
├── backend/            # Express.js Server
│   ├── src/
│   │   ├── config/     # DB and Upstash configuration
│   │   ├── controllers/# Business logic
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API endpoints
│   │   └── services/   # Data access layer
│   └── .env            # Backend environment variables
├── frontend/           # Next.js Application
│   ├── app/            # App router pages and API proxies
│   ├── hooks/          # Custom React hooks (React Query)
│   ├── lib/            # Shared utilities and schemas
│   └── public/         # Static assets
└── README.md
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Upstash account (for Redis rate limiting)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/omarelbastawesy/User-MERN.git
   cd User-MERN
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   ```
   Start the backend:
   ```bash
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` folder:
   ```env
   BASE_URL=http://localhost:5000
   ```
   Start the frontend:
   ```bash
   npm run dev
   ```

## 📸 Screenshots

*(Add screenshots of your Home page and User profile page here)*

## 📄 License

This project is licensed under the ISC License.

---
Developed by [Omar Elbastawesy](https://github.com/omarelbastawesy)
