import { LitElement, html, css } from 'lit';

// View Component: Activity Item
export class ActivityItem extends LitElement {
  static properties = {
    activity: { type: Object }
  };

  static styles = css`
    .activity-item {
      display: flex;
      align-items: flex-start;
      padding: 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
      border-radius: 8px;
    }

    .activity-item:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-dot {
      width: 12px;
      height: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      margin-right: 15px;
      margin-top: 5px;
      flex-shrink: 0;
      box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
    }

    .activity-content {
      flex: 1;
    }

    .activity-content h4 {
      color: #fff;
      margin-bottom: 5px;
      font-size: 15px;
      margin: 0 0 5px 0;
      font-weight: 600;
    }

    .activity-content p {
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 5px;
      font-size: 13px;
      margin: 0 0 5px 0;
      line-height: 1.5;
    }

    .activity-time {
      color: rgba(255, 255, 255, 0.4);
      font-size: 12px;
    }
  `;

  render() {
    return html`
      <div class="activity-item">
        <div class="activity-dot"></div>
        <div class="activity-content">
          <h4>${this.activity.title}</h4>
          <p>${this.activity.description}</p>
          <span class="activity-time">${this.activity.time}</span>
        </div>
      </div>
    `;
  }
}

customElements.define('activity-item', ActivityItem);
