🐾 Pet Adoption System – Architecture Documentation

1. System Overview
   The Pet Adoption System is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to facilitate pet adoption. It provides a seamless user experience with the following core functionalities:

User Authentication: Secure registration and login using JWT (JSON Web Tokens) with cookie-based sessions.
Pet Management: Users can create, read, update, and delete (CRUD) pet listings.
Adoption Process: Calculate adoption fees with dynamic discounts for a streamlined adoption experience.

The system adheres to a modular architecture with a clear separation of concerns, ensuring maintainability and scalability:

Routes: Define RESTful API endpoints.
Controllers: Handle business logic for each endpoint.
Models: Define MongoDB schemas using Mongoose.
Middleware: Manage authentication and request preprocessing.

2. High-Level Architecture
   The system is structured as a client-server application with a RESTful API:
   +-------------------------+
   | Frontend (React + TailwindCSS) |
   | - UI Components |
   | - Axios (API Calls) |
   | |
   +-------------------------+
   |
   | REST API (Axios, withCredentials)
   v
   +-------------------------+
   | Backend (Node.js + Express) |
   | - Routes |
   | - Controllers |
   | - Middleware (JWT Auth) |
   | - Mongoose ODM |
   +-------------------------+
   |
   | MongoDB Queries
   v
   +-------------------------+
   | Database (MongoDB) |
   | - User Collection |
   | - Pet Collection |
   +-------------------------+

3. Database Schema
   User Collection (user)

Field
Type
Constraints
Description

\_id
ObjectId
Primary Key
Unique user identifier

name
String
Required
Full name of the user

email
String
Required, Unique
User's email address

password
String
Required (hashed)
Hashed password

profilePic
String
Optional
Profile picture URL

createdAt
Date
Auto-generated
Timestamp of creation

updatedAt
Date
Auto-generated
Timestamp of last update

Pet Collection (pets)

Field
Type
Constraints
Description

\_id
ObjectId
Primary Key
Unique pet identifier

name
String
Required
Name of the pet

species
String
Enum: Dog, Cat, Bird, Cow, Other
Type of animal

images
Array
Optional
Image URLs of the pet

vaccinated
Boolean
Default: false
Vaccination status

baseFee
Number
Required, min: 0
Base adoption fee

discountPercent
Number
Default: 0, min: 0, max: 100
Discount percentage

owner
ObjectId
Ref: user
Reference to owner (user)

adoptionFeeFinal
Virtual
Calculated
Final fee after applying discount

createdAt
Date
Auto-generated
Timestamp of creation

updatedAt
Date
Auto-generated
Timestamp of last update

4.  Entity Relationship Diagram (ERD)
    erDiagram
    USER {
    ObjectId \_id
    string name
    string email
    string password
    string profilePic
    date createdAt
    date updatedAt
    }

        PETS {
            ObjectId _id
            string name
            string species
            array images
            boolean vaccinated
            number baseFee
            number discountPercent
            number adoptionFeeFinal
            ObjectId owner
            date createdAt
            date updatedAt
        }

        USER ||--o{ PETS : "owns"

5.  Folder Structure
    pet-adoption-system/
    ├── controllers/ # Business logic for API endpoints
    │ ├── pets/ # Pet-related controllers
    │ │ ├── postPets.js # Create a new pet
    │ │ ├── allPets.js # Fetch all pets with pagination
    │ │ ├── petDetail.js # Fetch a single pet by ID
    │ │ ├── updatePet.js # Update an existing pet
    │ │ └── deletePet.js # Delete a pet
    │ ├── users/ # User-related controllers
    │ │ ├── userLogin.js # User authentication
    │ │ ├── userRegister.js # User registration
    │ │ ├── allUsers.js # Fetch all users
    │ │ └── userDetail.js # Fetch user details
    ├── routes/ # API route definitions
    │ ├── userRoutes.js # User-related routes
    │ └── petRoutes.js # Pet-related routes
    ├── models/ # Mongoose schema definitions
    │ ├── userModel.js # User schema
    │ └── petModel.js # Pet schema
    ├── middleware/ # Custom middleware
    │ └── authToken.js # JWT authentication middleware
    ├── tests/ # Jest test cases
    │ ├── user.test.js # User-related tests
    │ └── pet.test.js # Pet-related tests
    ├── db/ # Database connection
    │ └── db.js # MongoDB connection setup
    ├── server.js # Application entry point
    ├── package.json # Project dependencies and scripts
    └── .env / .env.test # Environment variables

6.  Module Responsibilities

Module
Responsibility

userRoutes.js
Handles user signup, login, and fetching user details

petRoutes.js
Manages CRUD operations for pet listings

authToken.js
Verifies JWT tokens from cookies for authentication

userModel.js
Defines the User schema and collection

petModel.js
Defines the Pet schema with virtual adoptionFeeFinal

postPets.js
Controller to create a new pet listing

updatePet.js
Controller to update an existing pet

deletePet.js
Controller to delete a pet

allPets.js
Controller to fetch all pets with pagination

petDetail.js
Controller to fetch a single pet by ID

userLogin.js
Controller for user authentication

userRegister.js
Controller for new user registration

7. Additional Notes

Security: Passwords are hashed using bcrypt, and JWTs are stored in HTTP-only cookies to prevent XSS attacks.
Scalability: The modular structure allows for easy addition of new features, such as pet search filters or adoption history.
Testing: Jest is used for unit and integration tests, ensuring reliability of user and pet operations.
Frontend Styling: TailwindCSS ensures responsive and modern UI design with minimal custom CSS.

This architecture provides a robust foundation for the Pet Adoption System, balancing functionality, security, and maintainability.
