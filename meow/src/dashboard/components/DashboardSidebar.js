import { LitElement, html, css } from 'lit';

// View Component: Dashboard Sidebar
export class DashboardSidebar extends LitElement {
  static properties = {
    activeItem: { type: String }
  };

  constructor() {
    super();
    this.activeItem = 'dashboard';
  }

  static styles = css`
    .sidebar {
      width: 260px;
      background: linear-gradient(135deg, #1e2425ff, #141b1dff, #131f24ff);
      color: white;
      padding: 30px 0;
      height: 100%;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }

    nav ul {
      list-style: none;
      padding: 0 15px;
      margin: 0;
    }

    nav li {
      margin: 8px 0;
    }

    nav a {
      display: block;
      padding: 15px 20px;
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;
      border-radius: 12px;
      font-weight: 500;
      position: relative;
    }

    nav a:hover {
      background: rgba(102, 126, 234, 0.2);
      color: #fff;
      transform: translateX(5px);
    }

    nav li.active a {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
  `;

  handleNavigation(item) {
    this.activeItem = item;
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { item }
    }));
  }

  render() {
    return html`
      <div class="sidebar">
        <nav>
          <ul>
            <li class="${this.activeItem === 'dashboard' ? 'active' : ''}">
              <a @click=${() => this.handleNavigation('dashboard')}>Dashboard</a>
            </li>
            <li class="${this.activeItem === 'incidents' ? 'active' : ''}">
              <a @click=${() => this.handleNavigation('incidents')}>Incidenten</a>
            </li>
            <li class="${this.activeItem === 'reports' ? 'active' : ''}">
              <a @click=${() => this.handleNavigation('reports')}>Rapporten</a>
            </li>
           
          </ul>
        </nav>
      </div>
    `;
  }
}

customElements.define('dashboard-sidebar', DashboardSidebar);
