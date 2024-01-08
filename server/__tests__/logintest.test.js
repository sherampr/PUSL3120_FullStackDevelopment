require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const app = require("../index");

describe("Authentication", () => {
  let userData = {
    firstName: "Test",
    lastName: "User",
    email: "testthisone@example.com",
    password: "Password@123",
    confirmPassword: "Password@123",
    phone: "1234567890",
  };

  beforeAll(async () => {
    jest.setTimeout(100000);

    await mongoose.connect(process.env.MONG_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userData.password, salt);
    await User.create({ ...userData, password: hashPassword });
  }, 100000);

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("User registration", async () => {
    const newUser = {
      ...userData,
      email: "newtestuser@example.com",
    };

    const response = await request(app).post("/api/users").send(newUser);

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
