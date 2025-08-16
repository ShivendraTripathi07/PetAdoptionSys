# 🐾 Pet Adoption System — Local Setup Guide

![Node.js](https://img.shields.io/badge/Node.js-v20+-green?logo=node.js)
![npm](https://img.shields.io/badge/npm-v8+-red?logo=npm)
![React](https://img.shields.io/badge/React-frontend-blue?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-database-green?logo=mongodb)

![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)

---

This guide provides step-by-step instructions for setting up the **Pet Adoption System** on your local machine for development and testing. Follow these steps to ensure a smooth setup process.

---

## 📋 Prerequisites

Before you begin, ensure that the following are installed:

- [Node.js](https://nodejs.org/) (**v20 or higher**)
- [npm](https://www.npmjs.com/) (**v8 or higher**)
- [MongoDB](https://www.mongodb.com/) (local instance **or** MongoDB Atlas account)
- [Git](https://git-scm.com/) (for cloning the repository)

---

## 1️⃣ Clone the Repository

git clone https://github.com/yourusername/pet-adoption-system.git
cd pet-adoption-system

---

## 2️⃣ Install Dependencies

This project consists of a **backend (Node.js)** and a **frontend (React)**. Install dependencies for both.

### 🔹 Backend

cd backend
npm install

### 🔹 Frontend

cd ../frontend
npm install

---

## 3️⃣ Configure Environment Variables

Create two environment files inside the `/backend` directory.

### 🔹 `.env` (Development)

MONGO_URI=mongodb://127.0.0.1:27017/pet_adoption_system
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=development

### 🔹 `.env.test` (Testing)

MONGO_URI=mongodb://127.0.0.1:27017/pet_adoption_system_test
JWT_SECRET=test_jwt_secret
NODE_ENV=test

#### 💡 Notes:

- **MONGO_URI:** Replace with your local MongoDB instance or MongoDB Atlas URI.
- **JWT_SECRET:** Use a strong, random string (recommended: generated via a password manager).
- **NODE_ENV=test:** Ensures Jest uses the test database when running tests.

---

## 4️⃣ Run the Application

Run backend and frontend in **separate terminal sessions**.

### 🔹 Start Backend

cd backend
npm start

Backend will be available at: [**http://localhost:8000**](http://localhost:8000)

### 🔹 Start Frontend

cd frontend
npm run dev

Frontend will be available at: [**http://localhost:5173**](http://localhost:5173)

---

## 5️⃣ Run Tests

The backend uses **Jest** + **Supertest** for integration testing.

Run tests from the **backend** directory:

npm test

#### 📝 Test Notes:

- Tests automatically use the `.env.test` configuration.
- The test database (`pet_adoption_system_test`) is **wiped clean between runs**.
- Ensure **MongoDB is running** before executing tests.

---

## 6️⃣ Project Structure

pet-adoption-system/
├── frontend/ # React frontend (UI components, pages, and assets)
└── backend/ # Node.js backend (API routes, models, and controllers)

---

## 7️⃣ CORS Configuration

To allow the frontend and backend to communicate locally, configure **CORS** in `backend/app.js`.

const cors = require('cors');

app.use(cors({
origin: 'http://localhost:5173',
credentials: true,
}));

#### 📝 CORS Notes:

- Ensure the `origin` matches your frontend URL (`http://localhost:5173`).
- If you change the frontend port, update the CORS origin accordingly.

---

## 🛠 Troubleshooting

- **❌ MongoDB Connection Issues** → Ensure MongoDB is running locally or use a valid MongoDB Atlas URI.
- **⚠️ CORS Errors** → Verify that the CORS `origin` matches the frontend URL.
- **🔌 Port Conflicts** → If port `8000` (backend) or `5173` (frontend) is in use, change it in respective `.env` configs or stop conflicting processes.
- **📦 Dependency Issues** → Run `npm install` again, or delete `node_modules` + `package-lock.json`, then reinstall.

---

✨ You’re now ready to run and contribute to the **Pet Adoption System** locally!
