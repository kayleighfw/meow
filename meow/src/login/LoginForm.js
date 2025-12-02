import { LitElement, html, css } from "lit";

export class LoginForm extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: white;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }

    form {
      position: relative; /* position relative om button absoluut te positioneren */
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      background: linear-gradient(140deg, #3a3a3a, #040404ff, #5b5656ff);
      padding: 40px 30px;
      border-radius: 40px;
      box-shadow: 0 8px 10px rgba(51, 49, 49, 0.8);
      width: 350px;
      color: #f0f0f0;
      height: 300px;
      transition: transform 0.2s ease-in-out;
    }

    form:hover {
      transform: translateY(-3px);
    }

    h2 {
      text-align: start;
      margin-bottom: 5px;
      color: #fff;
      font-weight: 700;
      font-size: 26px;
    }

    label {
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 14px;
      color: #ccc;
    }

    input[type="text"],
    input[type="password"] {
      padding: 12px;
      margin-bottom: 20px;
      border: 1px solid gray;
      border-radius: 15px;
      font-size: 16px;
      background-color: #b1b1b1ff;
      color: black;
    }

    input[type="text"]::placeholder,
    input[type="password"]::placeholder {
      color: black;
    }

    button {
      position: absolute; /* absoluut tov form */
      top: 380px;       /* afstand vanaf onderkant form */
      left: 50%;          /* horizontaal centreren */
      transform: translateX(-50%);
      padding: 12px 20px;
      border: none;
      border-bottom-right-radius: 30px;
      border-bottom-left-radius: 30px;
      background: linear-gradient(140deg, #3a3a3a, #040404ff, #5b5656ff);
      color: white;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s ease;
      width: 250px;
      box-shadow: 0 1px 10px rgba(10, 49, 49, 0.8);
      height: 45px;

    }

    button:hover {
      background: linear-gradient(140deg, #0c0c0cff, #292626ff, #615f5fff);
    }

    .error {
      color: black;
      margin-bottom: 15px;
      text-align: center;
      font-size: 14px;
    }
  `;

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <h2>Login</h2>
        <div class="error" id="error"></div>
        <label>Naam</label>
        <input type="text" name="name" placeholder="Voer je naam in" required />
        <label>Wachtwoord</label>
        <input
          type="password"
          name="password"
          placeholder="Voer je wachtwoord in"
          required
        />
        <button type="submit">Inloggen</button>
      </form>
    `;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const password = formData.get("password");

    const errorDiv = this.shadowRoot.getElementById("error");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const result = await res.json();

      if (result.success) {
        errorDiv.textContent = "";
        alert("Inloggen geslaagd!");
        if (window.showPage) window.showPage("dashboard");
      } else {
        errorDiv.textContent = result.error;
      }
    } catch (err) {
      console.error(err);
      errorDiv.textContent = "Kan geen verbinding maken met de server.";
    }
  }
}

customElements.define("login-form", LoginForm);
