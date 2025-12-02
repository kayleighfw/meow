import express from "express";
import fs from "fs";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors());

const USERS_FILE = "users.json";

// Zorg dat users.json bestaat en bevat de admin user in plaintext als eerste run
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(
    USERS_FILE,
    JSON.stringify([{ name: "admin", password: "admin123" }], null, 2)
  );
}

// POST /api/login
app.post("/api/login", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.json({ success: false, error: "Naam en wachtwoord zijn verplicht" });
  }

  // Lees gebruikers
  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));

  const user = users.find(u => u.name === name);
  if (!user) {
    return res.json({ success: false, error: "Gebruiker niet gevonden" });
  }

  // Check of wachtwoord al gehashed is (bcrypt hashes beginnen met $2b$ of $2a$)
  if (user.password.startsWith("$2")) {
    // Vergelijk gehashed wachtwoord
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.json({ success: false, error: "Wachtwoord ongeldig" });
  } else {
    // Nog plaintext: check gelijkheid en hash het daarna
    if (user.password !== password) {
      return res.json({ success: false, error: "Wachtwoord ongeldig" });
    }
    // Hash en sla op
    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    console.log("Wachtwoord gehashed en opgeslagen in users.json");
  }

  res.json({ success: true, user: { name: user.name } });
});

app.listen(3000, () => console.log("Server gestart op http://localhost:3000"));
