const fs = require("fs");
const request = require("supertest");
const bcrypt = require("bcrypt");

// Gebruik dezelfde app als index.js
const app = require("../index");

const USERS_FILE = "test_users.json";

beforeEach(() => {
  fs.writeFileSync(
    USERS_FILE,
    JSON.stringify([{ name: "admin", password: "admin123" }], null, 2)
  );
});

afterAll(() => {
  if (fs.existsSync(USERS_FILE)) fs.unlinkSync(USERS_FILE);
});

describe("Login API", () => {
  test("kan inloggen met correct wachtwoord", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ name: "admin", password: "admin123" });
    expect(res.body.success).toBe(true);
  });

  test("kan niet inloggen met verkeerd wachtwoord", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ name: "admin", password: "fout" });
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Wachtwoord klopt niet");
  });

  test("kan niet inloggen met onbekende gebruiker", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ name: "onbekend", password: "123" });
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Gebruiker niet gevonden");
  });
});
