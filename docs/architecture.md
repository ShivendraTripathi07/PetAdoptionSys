# 🐾 Pet Adoption System

A comprehensive full-stack web application for managing pet adoptions with secure user authentication and intuitive pet management features.

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Data Models](#data-models)
- [API Endpoints](#api-endpoints)
- [Authentication System](#authentication-system)
- [Testing Strategy](#testing-strategy)
- [Security Features](#security-features)
- [Getting Started](#getting-started)

---

## 🏛️ Architecture Overview

The Pet Adoption System follows a **three-tier architecture** with clear separation of concerns:

```
┌─────────────────────┐
│   Client Layer      │  ← Frontend (Static Files)
├─────────────────────┤
│ Application Layer   │  ← Express.js REST API
├─────────────────────┤
│   Data Layer        │  ← MongoDB + Mongoose ODM
└─────────────────────┘
```

### Key Architectural Principles

- **Separation of Concerns**: Clear boundaries between presentation, business logic, and data layers
- **RESTful API Design**: Consistent and predictable endpoint structure
- **Stateless Authentication**: JWT-based authentication for scalability
- **Database Abstraction**: Mongoose ODM for elegant MongoDB interactions

---

## 💻 Technology Stack

### Backend

| Technology     | Purpose                             |
| -------------- | ----------------------------------- |
| **Express.js** | Web framework and API server        |
| **MongoDB**    | NoSQL database for data persistence |
| **Mongoose**   | Object Data Modeling (ODM) library  |
| **JWT**        | Token-based authentication          |
| **bcryptjs**   | Password hashing and security       |

### Development & Testing

| Technology                | Purpose                        |
| ------------------------- | ------------------------------ |
| **Jest**                  | Testing framework              |
| **Supertest**             | HTTP testing library           |
| **MongoDB Memory Server** | In-memory database for testing |
| **dotenv**                | Environment configuration      |

### Middleware & Security

- **CORS**: Cross-origin resource sharing
- **cookie-parser**: Session management
- **Custom error handling**: Centralized error processing

---

## 📂 Project Structure

```
pet-adoption-system/
├── backend/
│   ├── controllers/
│   │   ├── pets/           # Pet-related business logic
│   │   └── users/          # User-related business logic
│   ├── db/                 # Database configuration
│   ├── middleware/
│   │   └── authToken.js    # JWT authentication middleware
│   ├── models/
│   │   ├── petModel.js     # Pet data model
│   │   └── userModel.js    # User data model
│   ├── routes/
│   │   ├── petRoutes.js    # Pet API endpoints
│   │   └── userRoutes.js   # User API endpoints
│   ├── tests/
│   │   ├── pet.test.js     # Pet functionality tests
│   │   └── setup.js        # Test configuration
│   ├── app.js              # Express application setup
│   ├── server.js           # Server entry point
│   └── package.json        # Dependencies and scripts
├── frontend/
│   ├── public/             # Static assets
│   └── src/
│       ├── assets/         # Images and resources
│       ├── common/         # Shared utilities
│       ├── components/     # React components
│       └── context/        # React context providers
└── docs/                   # Documentation files
```

---

## 📑 Data Models

### Pet Model

```javascript
{
  name: String (required, trimmed),
  species: Enum ["Dog", "Cat", "Bird", "Cow", "Other"],
  images: Array,
  vaccinated: Boolean (default: false),
  baseFee: Number (min: 0, required),
  discountPercent: Number (0-100, default: 0),
  owner: ObjectId (ref: "user"),
  timestamps: true
}
```

**Virtual Fields:**

- `adoptionFeeFinal`: Calculated final adoption fee after discount

### User Model

```javascript
{
  name: String,
  email: String (unique, required),
  password: String (hashed),
  profilePic: String,
  timestamps: true
}
```

---

## 🌐 API Endpoints

### Pet Management

| Method   | Endpoint    | Description              | Auth Required |
| -------- | ----------- | ------------------------ | ------------- |
| `POST`   | `/pets`     | Create a new pet listing | ✅            |
| `GET`    | `/pets`     | Get all available pets   | ✅            |
| `GET`    | `/pets/my`  | Get current user's pets  | ✅            |
| `GET`    | `/pets/:id` | Get specific pet details | ✅            |
| `PUT`    | `/pets/:id` | Update pet information   | ✅            |
| `DELETE` | `/pets/:id` | Remove pet listing       | ✅            |

### User Management

| Method | Endpoint            | Description              | Auth Required |
| ------ | ------------------- | ------------------------ | ------------- |
| `POST` | `/users/signup`     | Register new user        | ❌            |
| `POST` | `/users/login`      | User authentication      | ❌            |
| `GET`  | `/users`            | Get all users            | ✅            |
| `GET`  | `/users/userDetail` | Get current user details | ✅            |

---

## 🔐 Authentication System

### Security Features

- **JWT Tokens**: Stateless authentication for API access
- **Password Hashing**: bcryptjs with salt rounds for secure password storage
- **HTTP-Only Cookies**: Prevents XSS attacks on session tokens
- **Route Protection**: Middleware-based authentication for protected endpoints

### Authentication Flow

```
1. User Registration/Login
   ↓
2. Password Hashed (bcryptjs)
   ↓
3. JWT Token Generated
   ↓
4. Token Stored in HTTP-Only Cookie
   ↓
5. Protected Routes Validate Token
```

---

## 🧪 Testing Strategy

### Test Coverage Levels

#### Unit Tests

- Model validation and schema constraints
- Business logic methods and calculations
- Utility function verification

#### Integration Tests

- API endpoint functionality
- Authentication and authorization flows
- Database operations and data integrity

#### Security Tests

- Access control validation
- Input sanitization and validation
- Boundary condition testing

#### End-to-End Tests

- Complete user registration and login workflows
- Pet creation, update, and deletion processes
- Full adoption process simulation

### Testing Tools

- **Jest**: Primary testing framework
- **Supertest**: HTTP endpoint testing
- **MongoDB Memory Server**: Isolated test database
- **Custom Test Helpers**: User creation and token generation utilities

---

## 🔒 Security Features

### Data Protection

- **Ownership Validation**: Users can only access and modify their own pets
- **Input Validation**: Comprehensive request validation at multiple layers
- **Error Handling**: Centralized processing without sensitive information exposure

### Authentication Security

- **Password Security**: bcryptjs hashing with configurable salt rounds
- **Session Management**: Secure HTTP-only cookie implementation
- **Token Validation**: Middleware-based JWT verification

### API Security

- **CORS Configuration**: Controlled cross-origin access
- **Request Rate Limiting**: Protection against abuse
- **SQL Injection Prevention**: MongoDB and Mongoose built-in protections

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pet-adoption-system
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Configure your MongoDB URI, JWT secret, etc.
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Run tests**
   ```bash
   npm test
   ```

### Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
NODE_ENV=development
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the GitHub repository or contact the development team.

---

_Built with ❤️ for pet lovers everywhere_
