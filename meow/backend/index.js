const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

// Hardcoded user
const user = {
  name: "admin",
  passwordHash: bcrypt.hashSync("admin123", 10)
};

app.post("/api/login", async (req, res) => {
  const { name, password } = req.body;

  if (name !== user.name) {
    return res.json({ success: false, error: "Gebruiker niet gevonden" });
  }

  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) {
    return res.json({ success: false, error: "Wachtwoord klopt niet" });
  }

  return res.json({ success: true });
});

module.exports = app;

// Start de server alleen als dit bestand direct wordt uitgevoerd
if (require.main === module) {
  app.listen(3000, () => console.log("Server gestart op http://localhost:3000"));
}
