# 🐾 Pet Adoption System (MERN Stack)

A full-stack **Pet Adoption Platform** built with the **MERN stack** (MongoDB, Express.js, React, Node.js) that allows users to **sign up, log in, browse pets, post pets for adoption, and manage their profiles**.  
Authentication is powered by **JWT tokens stored in HttpOnly cookies** for enhanced security.

---

## 🔗 Live Demo

[Site Live Link](https://petadoptionsys-1.onrender.com)

---

## 📜 Features

- 👤 User authentication (signup & login) with JWT cookies
- 🐶 CRUD operations for pets (create, view, update, delete)
- 🔍 View all pets & filter by owner
- 🖼 Upload multiple pet images
- 🛡 Protected routes for logged-in users
- 📱 Fully responsive frontend with Tailwind CSS
- 🧪 Backend tests using Jest + Supertest

---

## ⚙ Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/pet-adoption-system.git
cd pet-adoption-system
2️⃣ Setup Backend
bash
Copy
Edit
cd server
npm install
Create a .env file inside /server:

env
Copy
Edit
MONGODB_URI=mongodb://127.0.0.1:27017/pet_adoption_system
JWT_SECRET=your_jwt_secret
NODE_ENV=development
Run backend:

bash
Copy
Edit
npm start
3️⃣ Setup Frontend
bash
Copy
Edit
cd ../client
npm install
Create a .env file inside /client:

env
Copy
Edit
VITE_API_BASE_URL=http://localhost:8000
Run frontend:

bash
Copy
Edit
npm run dev
4️⃣ Access the Application
Frontend: http://localhost:5173

Backend API: http://localhost:8000

🛠 Tech Stack
Frontend: React, Tailwind CSS, Axios, lucide-react, react-hot-toast

Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt

Testing: Jest, Supertest, mongodb-memory-server

📄 Documentation Files
Document	Description
commit.md	All commits with explanations
architecture.md	System architecture with diagrams & models
api.md	API endpoints documentation
ai.md	AI conversation & generated suggestions
local-setup.md	Detailed local environment setup guide

🚀 Run Tests
bash
Copy
Edit
cd server
npm test
```
