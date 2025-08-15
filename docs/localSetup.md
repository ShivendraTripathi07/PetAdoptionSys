🐾 Pet Adoption System — Local Setup Guide
This guide provides step-by-step instructions for setting up the Pet Adoption System on your local machine for development and testing. Follow these steps to ensure a smooth setup process.

📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v20 or higher)
npm (v8 or higher)
MongoDB (local instance or MongoDB Atlas account)
Git (for cloning the repository)

1️⃣ Clone the Repository
Clone the project repository to your local machine and navigate to the project directory.
git clone https://github.com/yourusername/pet-adoption-system.git
cd pet-adoption-system

2️⃣ Install Dependencies
The project consists of a backend (Node.js) and a frontend (React). Install dependencies for both.
Backend
Navigate to the server directory and install the required Node.js packages.
cd backend
npm install

Frontend
Navigate to the client directory and install the required React dependencies.
cd ../frontend
npm install

3️⃣ Configure Environment Variables
Create two environment files in the /server directory to configure the backend for development and testing.
.env (Development)
Create a .env file with the following content:
MONGO_URI=mongodb://127.0.0.1:27017/pet_adoption_system
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=development

.env.test (Testing)
Create a .env.test file for running tests:
MONGO_URI=mongodb://127.0.0.1:27017/pet_adoption_system_test
JWT_SECRET=test_jwt_secret
NODE_ENV=test

💡 Environment Notes

MONGO_URI: Replace with your local MongoDB instance or MongoDB Atlas URI.
JWT_SECRET: Use a strong, random string for security (e.g., generated via a password manager).
NODE_ENV=test: Ensures Jest uses the test database during testing.

4️⃣ Run the Application
Start the backend and frontend servers in separate terminal sessions.
Start Backend
In the backenddirectory, run:
npm start

The backend will be available at:🌐 http://localhost:8000
Start Frontend
In the frontenddirectory, run:
npm run dev

The frontend will be available at:🌐 http://localhost:5173

5️⃣ Run Tests
The backend uses Jest and Supertest for integration testing. Tests are configured to use the .env.test file and a separate test database.
Run tests from the backenddirectory:
npm test

Test Notes

Tests automatically use the .env.test configuration.
The test database (pet_adoption_system_test) is wiped between test runs to ensure a clean state.
Ensure MongoDB is running before executing tests.

6️⃣ Project Structure
Understand the directory layout to navigate the project efficiently.
pet-adoption-system/
├── client/ # React frontend (UI components, pages, and assets)
└── server/ # Node.js backend (API routes, models, and controllers)

7️⃣ CORS Configuration
To enable communication between the frontend and backend during local development, ensure CORS is configured correctly.
In server/server.js, verify or update the CORS settings:
const cors = require('cors');

app.use(cors({
origin: 'http://localhost:5173',
credentials: true,
}));

CORS Notes

Ensure the origin matches the frontend URL (http://localhost:5173).
If you change the frontend port, update the CORS origin accordingly.

🛠 Troubleshooting

MongoDB Connection Issues: Ensure MongoDB is running locally or use a valid MongoDB Atlas URI.
CORS Errors: Verify the CORS origin in backend.js matches the frontend URL.
Port Conflicts: If port 8000 or 5173 is in use, change the port in the respective .env file or stop conflicting processes.
Dependency Issues: Run npm install again or delete node_modules and package-lock.json, then reinstall.
