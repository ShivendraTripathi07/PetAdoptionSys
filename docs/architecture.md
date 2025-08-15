🏛️ Pet Adoption System — Architecture Overview
This document outlines the architectural design and implementation details of the Pet Adoption System.

🎨 Architecture Overview
The application follows a traditional three-tier architecture with clear separation of concerns:

Client Layer: Frontend application (served as static files)
Application Layer: Express.js REST API
Data Layer: MongoDB database with Mongoose ODM

💻 Technology Stack

Backend Framework: Express.js
Database: MongoDB with Mongoose
Authentication: JWT tokens with bcryptjs for password hashing
Testing: Jest with Supertest for API testing
Environment Management: dotenv for configuration

Additional middleware includes CORS for cross-origin requests, cookie-parser for session management, and custom error handling utilities.

📂 Project Structure
The project is organized into distinct directories as shown below:

backend/
controllers/
pets/
users/

coverage/
db/
middleware/
authToken.js

models/
petModel.js
userModel.js

node_modules/
routes/
petRoutes.js
userRoutes.js

tests/
pet.test.js
setup.js

.env
.env.test
.gitignore
app.js
jest.config.js
package-lock.json
package.json
server.js
docs/
assets/
aiDoc.md
api-docs.md
architecture.md
commits.md
localSetup.md

frontend/
public/
src/
assets/
common/
axiosInstance.js
index.jsx
uploadImage.jsx

components/
Button.jsx
EditPetForm.jsx
Header.jsx
Input.jsx
Loader.jsx
Modal.jsx
PetCard.jsx
PetForm.jsx

context/

📑 Models
petModel.js
const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
{
name: { type: String, required: true, trim: true },
species: {
type: String,
enum: ["Dog", "Cat", "Bird", "cow", "Other"],
required: true,
},
images: [],
vaccinated: { type: Boolean, default: false },
baseFee: { type: Number, min: 0, required: true },
discountPercent: { type: Number, min: 0, max: 100, default: 0 },
owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
},
{ timestamps: true }
);

PetSchema.virtual("adoptionFeeFinal").get(function () {
return Number(
(this.baseFee - (this.baseFee \* this.discountPercent) / 100).toFixed(2)
);
});

PetSchema.set("toJSON", { virtuals: true });
PetSchema.set("toObject", { virtuals: true });

const Pets = mongoose.model("Pets", PetSchema);
module.exports = Pets;

userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
name: String,
email: {
type: String,
unique: true,
required: true,
},
password: String,
profilePic: String,
},
{
timestamps: true,
}
);

const User = mongoose.model("user", userSchema);
module.exports = User;

🌐 API Design
petRoutes.js
router.post("/", authToken, postPet);
router.get("/", authToken, getAllPets);
router.get("/my", authToken, getMyPets);
router.get("/:id", authToken, getPetById);
router.put("/:id", authToken, updatePet);
router.delete("/:id", authToken, deletePet);

userRoutes.js
router.post("/signup", userRegister);
router.post("/login", userLogin);
router.get("/", authToken, allUsers);
router.get("/userDetail", authToken, userDetails);

🔐 Authentication System

JWT Tokens: Used for securing API endpoints.
bcryptjs: Employed for hashing user passwords with salt rounds.
Middleware: authToken.js validates JWT tokens for protected routes.
Session Management: Utilizes HTTP-only cookies to mitigate XSS attacks.

🧪 Testing Strategy
The testing approach covers multiple layers:

Unit Tests: Model validation, business logic methods

Integration Tests: API endpoint functionality, authentication flows

Security Tests: Access control, input validation, boundary conditions

End-to-End Tests: Complete user workflows from signup to habit management

Tools: MongoDB Memory Server for test isolation and Supertest for HTTP testing.

Test Helpers: Provide common functionality like user creation and authentication token generation.

🔒 Security Considerations

Data Protection: Users can only access their own pets through ownership validation.
Password Security: bcryptjs hashing with salt rounds.
Session Management: HTTP-only cookies prevent XSS attacks.
Input Validation: Comprehensive request validation at model and controller levels.
Error Handling: Centralized error processing without exposing sensitive information.
