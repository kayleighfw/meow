import { LitElement, html, css } from 'lit';

// View Component: Stat Card
export class StatCard extends LitElement {
  static properties = {
    title: { type: String },
    value: { type: Number },
    icon: { type: String },
    priority: { type: String } // 'high', 'medium', 'low'
  };

  static styles = css`
    .stat-card {
      background: rgba(255, 255, 255, 0.05);
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      text-align: center;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, currentColor, transparent);
      opacity: 0;
      transition: opacity 0.3s;
    }

    .stat-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    }

    .stat-card:hover::before {
      opacity: 1;
    }

    .stat-card.high {
      border-top: 3px solid #e74c3c;
      color: #e74c3c;
    }

    .stat-card.medium {
      border-top: 3px solid #f39c12;
      color: #f39c12;
    }

    .stat-card.low {
      border-top: 3px solid #27ae60;
      color: #27ae60;
    }

    .stat-icon {
      font-size: 48px;
      margin-bottom: 15px;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    }

    .stat-card h3 {
      color: rgba(255, 255, 255, 0.6);
      font-size: 13px;
      margin-bottom: 10px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .stat-number {
      font-size: 36px;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `;

  render() {
    return html`
      <div class="stat-card ${this.priority}">
        <div class="stat-icon">${this.icon}</div>
        <h3>${this.title}</h3>
        <div class="stat-number">${this.value}</div>
      </div>
    `;
  }
}

customElements.define('stat-card', StatCard);
