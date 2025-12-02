import { LitElement, html, css } from "lit";
import "./login.css";

export class LoginForm extends LitElement {
  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      width: 300px;
    }
    input {
      margin-bottom: 10px;
      padding: 8px;
      font-size: 16px;
    }
    button {
      padding: 8px;
      font-size: 16px;
      cursor: pointer;
    }
  `;

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <label>Naam:</label>
        <input type="text" name="name" required />
        <label>Wachtwoord:</label>
        <input type="password" name="password" required />
        <button type="submit">Verzenden</button>
      </form>
    `;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const password = formData.get("password");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password })
      });

      const result = await res.json();

      if (result.success) {
        alert("gebruiker opgeslagen");

        if (window.showPage) {
          window.showPage("dashboard");
        }
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error(err);
      alert("kan niet verbinden met de server :(");
    }
  }
}

customElements.define("login-form", LoginForm);
