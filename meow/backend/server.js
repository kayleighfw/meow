import express from "express";
import fs from "fs";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors());

const USERS_FILE = "users.json";

// POST /api/login
app.post("/api/login", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.json({ success: false, error: "Naam en wachtwoord zijn verplicht" });
  }

  // Haal bestaande users op
  const users = fs.existsSync(USERS_FILE)
    ? JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"))
    : [];

  // Check of user bestaat
  const exists = users.find(u => u.name === name);
  if (exists) {
    return res.json({ success: false, error: "Gebruiker bestaat al!" });
  }

  // Hash het wachtwoord (10 salt rounds)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Voeg nieuwe user toe
  users.push({
    name,
    password: hashedPassword
  });

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({ success: true });
});

app.listen(3000, () => console.log("Server is gestart op http://localhost:3000"));
