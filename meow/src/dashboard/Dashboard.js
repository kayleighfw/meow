// src/dashboard/Dashboard.js
import { LitElement, html, css } from 'lit';

export class DashboardPage extends LitElement {
  static styles = css`
    h1 { color: green; }
    p { font-size: 16px; }
  `;

  render() {
    return html`
      <h1>Welkom op je Dashboard!</h1>
      <p>Hier kun je je gegevens bekijken.</p>
    `;
  }
}

customElements.define('dashboard-page', DashboardPage);
