require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Mocking mongoose model for User
jest.mock("../models/userModel", () => {
    return {
        User: {
            create: jest.fn(),
            findOne: jest.fn(),
        }
    };
});

const { User } = require("../models/userModel");
const app = require("../index");

describe("Authentication", () => {
    let userData = {
        firstName: "Test",
        lastName: "User",
        email: "testthis@example.com",
        password: "Password@123",
        confirmPassword: "Password@123",
        phone: "1234567890",
    };

    // Mock bcrypt for hashing passwords
    bcrypt.genSalt = jest.fn().mockResolvedValue("somesalt");
    bcrypt.hash = jest.fn().mockResolvedValue("hashedpassword");

    beforeEach(() => {
        User.create.mockClear();
        User.findOne.mockClear();
    });

    // Test for user registration
    test("User registration", async () => {
        const newUser = {
            ...userData,
            email: "newtestuser@example.com",
        };

        User.create.mockResolvedValue(newUser);

        const response = await request(app).post("/api/users").send(newUser);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("token");
        expect(User.create).toHaveBeenCalledWith({
            ...newUser,
            password: "hashedpassword"
        });
    });

    // Test for user login with correct credentials
    test("User login with correct credentials", async () => {
        User.findOne.mockResolvedValue({
            ...userData,
            password: "hashedpassword",
            comparePassword: jest.fn().mockResolvedValue(true),
        });

        const response = await request(app).post("/api/auth").send({
            email: userData.email,
            password: userData.password,
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toBeTruthy();
    });

    // Test for user login with incorrect credentials
    test("User login with incorrect credentials", async () => {
        User.findOne.mockResolvedValue({
            ...userData,
            password: "hashedpassword",
            comparePassword: jest.fn().mockResolvedValue(false),
        });

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
