/* global describe, beforeAll, afterAll, beforeEach, afterEach, test, expect */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const request = require("supertest");
require("dotenv").config();

const { User } = require("../../models/user");
const app = require("../../app");

describe("test signup controller", () => {
  let server;

  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URL);
    server = app.listen(3000);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  beforeEach(async () => {
    const user = { email: "a@a.ua", password: "123456" };
    const avatarURL = gravatar.url(user.email);
    const passwordHash = await bcrypt.hash(user.password, 10);
    const newUser = new User({
      email: user.email,
      password: passwordHash,
      avatarURL,
    });
    await newUser.save();
  });

  afterEach(async () => {
    await mongoose.connection.db.dropCollection("users");
  });

  test("response returns code 200", async () => {
    const loginUser = { email: "a@a.ua", password: "123456" };
    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    expect(response.statusCode).toBe(200);
  });

  test("response has field token", async () => {
    const loginUser = { email: "a@a.ua", password: "123456" };
    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);

    expect(response.body.token).toBeDefined();
  });

  test("response has field user: {email, subscription}", async () => {
    const loginUser = { email: "a@a.ua", password: "123456" };
    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);

    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });
});
