import { LitElement, html, css } from "lit"; 

export class LoginForm extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100%;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      background: #161716ff;
      position: relative;
      overflow: hidden;
    }

    /* Cirkelvormige "figuren" */
    :host::before,
    :host::after,
    .circle1,
    .circle2,
    .circle3,
    .circle4,
    .circle5,
    .circle6 {
      content: "";
      position: absolute;
      border-radius: 50%;
      opacity: 0.1;
    }

    :host::before {
      width: 200px;
      height: 200px;
      background: #ffffff;
      top: 20%;
      left: 10%;
    }

    :host::after {
      width: 400px;
      height: 400px;
      background: #cccccc;
      bottom: -100px;
      right: -100px;
    }

    .circle1 {
      width: 150px;
      height: 150px;
      background: #6c3737ff;
      top: 10%;
      right: 20%;
    }

    .circle2 {
      width: 250px;
      height: 250px;
      background: #161716ff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .circle3 {
      width: 100px;
      height: 100px;
      background: #6c3737ff;
      bottom: 20%;
      left: 30%;
    }

    .circle4 {
      width: 180px;
      height: 180px;
      background: #6c3737ff;
      top: 60%;
      right: 10%;
    }

    .circle5 {
      width: 120px;
      height: 120px;
      background: #6c3737ff;
      bottom: 10%;
      right: 30%;
    }

    .circle6 {
      width: 200px;
      height: 200px;
      background: #6c3737ff;
      top: 30%;
      left: 15%;
    }

    /* Golven onderaan */
    :host .waves {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 120px;
      background: radial-gradient(
        circle at 50% 50%,
        rgba(210, 207, 207, 0.95),
        transparent 70%
      );
    }

    form {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      background: linear-gradient(140deg, #3a3a3a, #040404ff, #5b5656ff);
      padding: 40px 30px;
      border-radius: 40px;
      box-shadow: 0 8px 10px rgba(70, 69, 69, 0.8);
      width: 350px;
      color: #f0f0f0;
      height: 300px;
      transition: transform 0.2s ease-in-out;
      z-index: 1; /* Zorgt dat formulier boven cirkels staat */
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
      position: absolute;
      top: 380px;
      left: 50%;
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
      z-index: 2; /* Boven formulier */
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
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="circle3"></div>
      <div class="circle4"></div>
      <div class="circle5"></div>
      <div class="circle6"></div>

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
