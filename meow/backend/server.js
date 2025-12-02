import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors()); // zodat je frontend kan fetchen vanaf Vite dev server

const USERS_FILE = "users.json";

// Endpoint voor registratie/login
app.post("/api/login", (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.json({ success: false, error: "Naam en wachtwoord zijn verplicht" });
  }

  // Lees bestaande gebruikers
  const users = fs.existsSync(USERS_FILE)
    ? JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"))
    : [];

  // Controleer of gebruiker al bestaat
  const exists = users.find(u => u.name === name);
  if (exists) {
    return res.json({ success: false, error: "Gebruiker bestaat al" });
  }

  // Voeg nieuwe gebruiker toe (zonder hashing)
  users.push({ name, password });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running on port 3000"));
