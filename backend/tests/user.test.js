const request = require("supertest");
const app = require("../app"); // Express app from app.js
const { connect, closeDatabase, clearDatabase } = require("./setup");

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("User Routes", () => {
  test("Signup with valid data should succeed", async () => {
    const res = await request(app)
      .post("/user/signup")
      .send({ name: "Test", email: "test@example.com", password: "pass123" });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("_id");
    expect(res.body.success).toBe(true);
  });

  test("Signup with missing email should fail", async () => {
    const res = await request(app)
      .post("/user/signup")
      .send({ name: "Test", password: "pass123" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe(true);
  });

  test("Login with valid credentials should return cookie", async () => {
    // First signup
    await request(app)
      .post("/user/signup")
      .send({ name: "Test", email: "test@example.com", password: "pass123" });

    // Then login
    const res = await request(app)
      .post("/user/login")
      .send({ email: "test@example.com", password: "pass123" });

    expect(res.statusCode).toBe(200);
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  test("Accessing protected route without login should fail", async () => {
    const res = await request(app).get("/user/");
    expect(res.statusCode).toBe(200); // Your middleware sends 200 with error=true
    expect(res.body.error).toBe(true);
  });
});
