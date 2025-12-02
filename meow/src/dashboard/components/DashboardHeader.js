import { LitElement, html, css } from 'lit';

// View Component: Dashboard Header
export class DashboardHeader extends LitElement {
  static properties = {
    username: { type: String }
  };

  constructor() {
    super();
    this.username = 'Gebruiker';
  }

  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      width: 100%;
      height: 70px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      position: relative;
      z-index: 10;
    }

    .title {
      font-size: 28px;
      font-weight: 800;
      margin-left: 25px;
      color: white;
      letter-spacing: 1px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .profile {
      font-size: 16px;
      cursor: pointer;
      margin-right: 25px;
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
      padding: 8px 16px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }

    .profile:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  `;

  handleLogout() {
    this.dispatchEvent(new CustomEvent('logout'));
  }

  render() {
    return html`
      <header>
        <div class="title">TIEDRAGON</div>
        <a class="profile" @click=${this.handleLogout}>
          ${this.username} - Uitloggen
        </a>
      </header>
    `;
  }
}

customElements.define('dashboard-header', DashboardHeader);
