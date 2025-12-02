import { LitElement, html, css } from 'lit';

// View Component: Incident Table
export class IncidentTable extends LitElement {
  static properties = {
    incidents: { type: Array },
    filter: { type: String }
  };

  constructor() {
    super();
    this.incidents = [];
    this.filter = 'all';
  }

  static styles = css`
    .incidents-section {
      background: rgba(255, 255, 255, 0.05);
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      overflow-x: hidden;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 15px;
    }

    .section-header h2 {
      color: #fff;
      font-size: 24px;
      margin: 0;
      font-weight: 600;
    }

    .filter-buttons {
      display: flex;
      gap: 10px;
    }

    .filter-btn {
      padding: 10px 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.3s ease;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
    }

    .filter-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    .filter-btn.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: transparent;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    .incidents-table {
      overflow-x: auto;
      max-width: 100%;
    }

    .incidents-table table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    .incidents-table th {
      background: rgba(255, 255, 255, 0.08);
      padding: 12px 10px;
      text-align: left;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      border-bottom: 2px solid rgba(255, 255, 255, 0.1);
      font-size: 12px;
      width: 12.5%;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .incidents-table td {
      padding: 14px 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.8);
      font-size: 13px;
      width: 12.5%;
      word-wrap: break-word;
      vertical-align: middle;
    }

    .incident-row {
      transition: background 0.3s ease;
    }

    .incident-row:hover {
      background: rgba(102, 126, 234, 0.15);
    }

    .status-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 600;
      display: inline-block;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      white-space: nowrap;
      margin: 2px 0;
    }

    .status-open {
      background: rgba(231, 76, 60, 0.2);
      color: #ff6b6b;
      border: 1px solid rgba(231, 76, 60, 0.3);
    }

    .status-progress {
      background: rgba(243, 156, 18, 0.2);
      color: #feca57;
      border: 1px solid rgba(243, 156, 18, 0.3);
    }

    .status-resolved {
      background: rgba(39, 174, 96, 0.2);
      color: #5ed49a;
      border: 1px solid rgba(39, 174, 96, 0.3);
    }

    .priority-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 600;
      display: inline-block;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      white-space: nowrap;
      margin: 2px 0;
    }

    .priority-high {
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      color: white;
    }

    .priority-medium {
      background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
      color: white;
    }

    .priority-low {
      background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
      color: white;
    }

    .type-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 600;
      display: inline-block;
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      margin: 2px 0;
    }

    .type-accident {
      background: linear-gradient(135deg, #ff9800 0%, #ff6f00 100%);
      color: white;
    }

    .type-traffic {
      background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
      color: white;
    }

    .type-shooting {
      background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
      color: white;
    }

    .action-btn {
      padding: 8px 18px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.3s ease;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
    }

    @media (max-width: 768px) {
      .incidents-table {
        font-size: 14px;
      }
      
      .incidents-table th,
      .incidents-table td {
        padding: 10px 8px;
      }
      
      .section-header {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `;

  get filteredIncidents() {
    if (this.filter === 'all') return this.incidents;
    return this.incidents.filter(incident => incident.priority === this.filter);
  }

  handleFilterChange(newFilter) {
    this.filter = newFilter;
    this.dispatchEvent(new CustomEvent('filter-change', {
      detail: { filter: newFilter }
    }));
  }

  handleViewIncident(incident) {
    this.dispatchEvent(new CustomEvent('view-incident', {
      detail: { incident }
    }));
  }

  getStatusClass(status) {
    return `status-badge status-${status}`;
  }

  getPriorityClass(priority) {
    return `priority-badge priority-${priority}`;
  }

  getTypeClass(type) {
    return `type-badge type-${type}`;
  }

  getStatusText(status) {
    const statusMap = {
      'open': 'Open',
      'progress': 'In behandeling',
      'resolved': 'Opgelost'
    };
    return statusMap[status] || status;
  }

  getPriorityText(priority) {
    const priorityMap = {
      'high': 'Hoog',
      'medium': 'Gemiddeld',
      'low': 'Laag'
    };
    return priorityMap[priority] || priority;
  }

  getTypeText(type) {
    const typeMap = {
      'accident': 'Ongeval',
      'traffic': 'Verkeersincident',
      'shooting': 'Schietincident'
    };
    return typeMap[type] || type;
  }

  render() {
    return html`
      <div class="incidents-section">
        <div class="section-header">
          <h2>Actieve Incidenten</h2>
          <div class="filter-buttons">
            <button 
              class="filter-btn ${this.filter === 'all' ? 'active' : ''}"
              @click=${() => this.handleFilterChange('all')}>
              Alle
            </button>
            <button 
              class="filter-btn ${this.filter === 'high' ? 'active' : ''}"
              @click=${() => this.handleFilterChange('high')}>
              Hoog
            </button>
            <button 
              class="filter-btn ${this.filter === 'medium' ? 'active' : ''}"
              @click=${() => this.handleFilterChange('medium')}>
              Gemiddeld
            </button>
            <button 
              class="filter-btn ${this.filter === 'low' ? 'active' : ''}"
              @click=${() => this.handleFilterChange('low')}>
              Laag
            </button>
          </div>
        </div>

        <div class="incidents-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Titel</th>
                <th>Type</th>
                <th>Prioriteit</th>
                <th>Status</th>
                <th>Locatie</th>
                <th>Tijd</th>
                <th>Actie</th>
              </tr>
            </thead>
            <tbody>
              ${this.filteredIncidents.map(incident => html`
                <tr class="incident-row">
                  <td>#${incident.id}</td>
                  <td>${incident.title}</td>
                  <td>
                    <span class="${this.getTypeClass(incident.type)}">
                      ${this.getTypeText(incident.type)}
                    </span>
                  </td>
                  <td>
                    <span class="${this.getPriorityClass(incident.priority)}">
                      ${this.getPriorityText(incident.priority)}
                    </span>
                  </td>
                  <td>
                    <span class="${this.getStatusClass(incident.status)}">
                      ${this.getStatusText(incident.status)}
                    </span>
                  </td>
                  <td>${incident.location}</td>
                  <td>${incident.time}</td>
                  <td>
                    <button 
                      class="action-btn"
                      @click=${() => this.handleViewIncident(incident)}>
                      Bekijken
                    </button>
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

customElements.define('incident-table', IncidentTable);
