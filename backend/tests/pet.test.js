const request = require("supertest");
const app = require("../app");
const { connect, closeDatabase, clearDatabase } = require("./setup");

let authCookie;

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

beforeEach(async () => {
  // Signup
  await request(app).post("/user/signup").send({
    name: "PetOwner",
    email: "owner@example.com",
    password: "pass123",
  });

  // Login
  const loginRes = await request(app)
    .post("/user/login")
    .send({ email: "owner@example.com", password: "pass123" });

  expect(loginRes.headers["set-cookie"]).toBeDefined();
  authCookie = loginRes.headers["set-cookie"][0]; // store token cookie
});

describe("Pet Routes", () => {
  test("Creating pet with missing fields should fail (Validation)", async () => {
    const res = await request(app)
      .post("/pets")
      .set("Cookie", authCookie)
      .send({ species: "Dog" });

    expect(res.statusCode).toBe(400);
  });

  test("Pagination boundary: limit=1 returns only 1 item", async () => {
    await request(app).post("/pets").set("Cookie", authCookie).send({
      name: "Dog1",
      species: "Dog",
      vaccinated: true,
      baseFee: 1000,
      discountPercent: 5,
    });
    await request(app).post("/pets").set("Cookie", authCookie).send({
      name: "Dog2",
      species: "Dog",
      vaccinated: true,
      baseFee: 1200,
      discountPercent: 5,
    });

    const res = await request(app)
      .get("/pets?limit=1")
      .set("Cookie", authCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.items.length).toBe(1);
  });

  test("Unauthorized access to pet creation should fail (Security)", async () => {
    const res = await request(app).post("/pets").send({
      name: "Milo",
      species: "Dog",
      vaccinated: true,
      baseFee: 3000,
      discountPercent: 10,
    });

    expect(res.statusCode).toBe(200); // Middleware returns 200 with error
    expect(res.body.error).toBe(true);
  });

  test("End-to-end CRUD: create → get → update → delete", async () => {
    // Create
    const createRes = await request(app)
      .post("/pets")
      .set("Cookie", authCookie)
      .send({
        name: "Charlie",
        species: "Dog",
        vaccinated: true,
        baseFee: 2000,
        discountPercent: 10,
      });

    expect(createRes.statusCode).toBe(201);
    const petId = createRes.body._id;

    // Get by ID
    const getRes = await request(app)
      .get(`/pets/${petId}`)
      .set("Cookie", authCookie);

    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.name).toBe("Charlie");

    // Update
    const updateRes = await request(app)
      .put(`/pets/${petId}`)
      .set("Cookie", authCookie)
      .send({ baseFee: 2500 });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.baseFee).toBe(2500);

    // Delete
    const deleteRes = await request(app)
      .delete(`/pets/${petId}`)
      .set("Cookie", authCookie);

    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.message).toMatch(/deleted/i);
  });
});
