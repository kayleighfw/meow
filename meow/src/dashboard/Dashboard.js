// src/dashboard/Dashboard.js
// Controller: Main Dashboard Page
import { LitElement, html, css } from 'lit';
import './components/DashboardHeader.js';
import './components/DashboardSidebar.js';
import './components/StatCard.js';
import './components/ActivityItem.js';
import './components/IncidentTable.js';
import { DashboardService } from './services/DashboardService.js';
import { DashboardStats } from './models/DashboardStats.js';

export class DashboardPage extends LitElement {
  static properties = {
    username: { type: String },
    incidents: { type: Array },
    activities: { type: Array },
    stats: { type: Object },
    loading: { type: Boolean },
    activeView: { type: String }
  };

  constructor() {
    super();
    this.username = 'Agent';
    this.incidents = [];
    this.activities = [];
    this.stats = null;
    this.loading = true;
    this.activeView = 'dashboard';
    this.dashboardService = new DashboardService();
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :host {
      display: block;
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      height: 100vh;
      overflow: hidden;
    }

    .dashboard-container {
      display: flex;
      height: calc(100vh - 70px);
      width: 100%;
      overflow: hidden;
    }

    .main-content {
      flex: 1;
      padding: 30px;
      overflow-y: auto;
      overflow-x: hidden;
      max-width: 100%;
    }

    .welcome-section {
      margin-bottom: 30px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 15px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }

    .welcome-section h1 {
      font-size: 36px;
      color: #fff;
      margin-bottom: 10px;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .welcome-section p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 16px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .recent-activity {
      background: rgba(255, 255, 255, 0.05);
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      margin-bottom: 30px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }

    .recent-activity h2 {
      color: #fff;
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 600;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      font-size: 18px;
      color: rgba(255, 255, 255, 0.7);
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    await this.loadDashboardData();
  }

  async loadDashboardData() {
    this.loading = true;
    try {
      // Load data from service (following MVC pattern)
      this.incidents = await this.dashboardService.getIncidents();
      this.activities = await this.dashboardService.getActivities();
      this.stats = DashboardStats.fromIncidents(this.incidents);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      this.loading = false;
    }
  }

  handleLogout() {
    if (window.showPage) {
      window.showPage('login');
    }
  }

  handleNavigation(e) {
    this.activeView = e.detail.item;
  }

  handleFilterChange(e) {
    console.log('Filter changed:', e.detail.filter);
  }

  handleViewIncident(e) {
    console.log('View incident:', e.detail.incident);
    alert(`Bekijk incident: ${e.detail.incident.title}`);
  }

  render() {
    return html`
      <dashboard-header 
        .username=${this.username}
        @logout=${this.handleLogout}>
      </dashboard-header>

      <div class="dashboard-container">
        <dashboard-sidebar 
          .activeItem=${this.activeView}
          @navigate=${this.handleNavigation}>
        </dashboard-sidebar>

        <div class="main-content">
          ${this.loading ? this.renderLoading() : this.renderContent()}
        </div>
      </div>
    `;
  }

  renderLoading() {
    return html`
      <div class="loading">
        <p>Dashboard laden...</p>
      </div>
    `;
  }

  renderContent() {
    return html`
      <!-- Welcome Section -->
      <div class="welcome-section">
        <h1>Welkom terug, ${this.username}!</h1>
        <p>Hier is een overzicht van de actuele situatie.</p>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <stat-card
          title="Hoge Prioriteit"
          .value=${this.stats?.highPriority || 0}
          icon="🚨"
          priority="high">
        </stat-card>
        <stat-card
          title="Gemiddelde Prioriteit"
          .value=${this.stats?.mediumPriority || 0}
          icon="⚠️"
          priority="medium">
        </stat-card>
        <stat-card
          title="Lage Prioriteit"
          .value=${this.stats?.lowPriority || 0}
          icon="ℹ️"
          priority="low">
        </stat-card>
        <stat-card
          title="Totaal Incidenten"
          .value=${this.stats?.totalIncidents || 0}
          icon="📊"
          priority="medium">
        </stat-card>
      </div>

      <!-- Recent Activity -->
      <div class="recent-activity">
        <h2>Recente Activiteit</h2>
        <div class="activity-list">
          ${this.activities.map(activity => html`
            <activity-item .activity=${activity}></activity-item>
          `)}
        </div>
      </div>

      <!-- Incidents Table -->
      <incident-table
        .incidents=${this.incidents}
        @filter-change=${this.handleFilterChange}
        @view-incident=${this.handleViewIncident}>
      </incident-table>
    `;
  }
}

customElements.define('dashboard-page', DashboardPage);
