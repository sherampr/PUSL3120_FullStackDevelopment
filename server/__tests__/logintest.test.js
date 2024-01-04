require("dotenv").config(); // Make sure this is at the top of your file

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const User = require("../models/userModel");
const bcrypt = require("bcrypt"); // Make sure bcrypt is required

describe("Authentication API", () => {
  let userData = {
    firstName: "Test",
    lastName: "User",
    email: "testuser@example.com",
    password: "Password@123",
    phone: "1234567890",
  };

  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONG_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userData.password, salt);
    await User.create({ ...userData, password: hashPassword });
  });

  afterAll(async () => {
    await User.findOneAndDelete({ email: userData.email });
    await mongoose.disconnect();
  });

  test("User registration", async () => {
    const response = await request(app).post("/api/users").send({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  test("User login with correct credentials", async () => {
    const response = await request(app).post("/api/auth").send({
      email: userData.email,
      password: userData.password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toBeTruthy();
  });

  test("User login with incorrect credentials", async () => {
    const response = await request(app).post("/api/auth").send({
      email: userData.email,
      password: "wrongpassword",
    });

    expect(response.statusCode).toBe(401);
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
