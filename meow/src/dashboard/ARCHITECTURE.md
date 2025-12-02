# Dashboard Component Architecture

## 📊 Component Hierarchy

```
<dashboard-page>  ← Controller (Dashboard.js)
│
├── <dashboard-header>
│   ├── Title: "TIEDRAGON"
│   └── Profile/Logout button
│
├── <dashboard-sidebar>
│   ├── Dashboard (active)
│   ├── Incidenten
│   ├── Rapporten
│   └── Instellingen
│
└── Main Content Area
    │
    ├── Welcome Section
    │   ├── Greeting
    │   └── Description
    │
    ├── Stats Grid
    │   ├── <stat-card> (High Priority)
    │   ├── <stat-card> (Medium Priority)
    │   ├── <stat-card> (Low Priority)
    │   └── <stat-card> (Total Incidents)
    │
    ├── Recent Activity Section
    │   └── <activity-item> (x4)
    │       ├── Dot indicator
    │       ├── Title
    │       ├── Description
    │       └── Timestamp
    │
    └── <incident-table>
        ├── Header with filter buttons
        └── Table with incidents
            ├── ID column
            ├── Title column
            ├── Type badge
            ├── Priority badge
            ├── Status badge
            ├── Location column
            ├── Time column
            └── Action button
```

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  USER INTERACTION (Login Success)               │
│                                                 │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  main.js calls showPage('dashboard')            │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  <dashboard-page> mounted                       │
│  (Controller - Dashboard.js)                    │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  connectedCallback() triggered                  │
│  └─> loadDashboardData() called                 │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  DashboardService fetches data                  │
│  ├─> getIncidents()                             │
│  └─> getActivities()                            │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  Data transformed to Models                     │
│  ├─> Incident[] instances                       │
│  ├─> Activity[] instances                       │
│  └─> DashboardStats calculated                  │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  Component State Updated                        │
│  this.incidents = [...]                         │
│  this.activities = [...]                        │
│  this.stats = {...}                             │
│  this.loading = false                           │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  Render Triggered (Lit reactivity)              │
│  render() method executes                       │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  Child Components Rendered                      │
│  ├─> <dashboard-header>                         │
│  ├─> <dashboard-sidebar>                        │
│  ├─> <stat-card> x4                             │
│  ├─> <activity-item> x4                         │
│  └─> <incident-table>                           │
└─────────────────────────────────────────────────┘
```

## 🎯 Event Flow

```
USER CLICKS FILTER BUTTON
        │
        ▼
┌──────────────────────┐
│  IncidentTable.js    │
│  handleFilterChange()│
└──────────┬───────────┘
           │ dispatches 'filter-change' event
           ▼
┌──────────────────────┐
│  Dashboard.js        │
│  handleFilterChange()│
│  (can update state)  │
└──────────────────────┘


USER CLICKS VIEW BUTTON
        │
        ▼
┌──────────────────────┐
│  IncidentTable.js    │
│  handleViewIncident()│
└──────────┬───────────┘
           │ dispatches 'view-incident' event
           ▼
┌──────────────────────┐
│  Dashboard.js        │
│  handleViewIncident()│
│  (shows alert/modal) │
└──────────────────────┘


USER CLICKS LOGOUT
        │
        ▼
┌──────────────────────┐
│  DashboardHeader.js  │
│  handleLogout()      │
└──────────┬───────────┘
           │ dispatches 'logout' event
           ▼
┌──────────────────────┐
│  Dashboard.js        │
│  handleLogout()      │
│  window.showPage()   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  main.js             │
│  showPage('login')   │
└──────────────────────┘
```

## 🏛️ MVC Pattern Implementation

### MODEL (Data Layer)
- `Incident.js` - Incident entity
- `Activity.js` - Activity entity  
- `DashboardStats.js` - Computed statistics

### VIEW (Presentation Layer)
- `DashboardHeader.js` - Header UI
- `DashboardSidebar.js` - Sidebar UI
- `StatCard.js` - Stat card UI
- `ActivityItem.js` - Activity list UI
- `IncidentTable.js` - Table UI

### CONTROLLER (Logic Layer)
- `Dashboard.js` - Main orchestrator
- `DashboardService.js` - Data service
- Handles state management
- Coordinates model ↔ view interaction

## 📦 File Organization

```
src/dashboard/
│
├── 📄 Dashboard.js          ← CONTROLLER (Main entry point)
├── 📄 dashboard.css         ← Global styles
├── 📄 index.js              ← Barrel exports
├── 📄 README.md             ← Architecture docs
│
├── 📁 models/               ← MODEL layer
│   ├── Incident.js
│   ├── Activity.js
│   └── DashboardStats.js
│
├── 📁 components/           ← VIEW layer
│   ├── DashboardHeader.js
│   ├── DashboardSidebar.js
│   ├── StatCard.js
│   ├── ActivityItem.js
│   └── IncidentTable.js
│
└── 📁 services/             ← CONTROLLER layer (Business logic)
    └── DashboardService.js
```

## 🎨 Styling Strategy

### Shadow DOM (Component-level)
Each component has encapsulated styles that don't leak:
```javascript
static styles = css`
  .stat-card { ... }  // Only affects this component
`;
```

### Global Styles (dashboard.css)
Utility classes and CSS variables:
```css
:root {
  --primary-color: #667eea;
  --danger-color: #e74c3c;
}
```

### No Style Conflicts
- Shadow DOM prevents leaking
- Each component is self-contained
- Predictable styling behavior

## 🔧 Key Design Decisions

1. **Lit Framework**: Modern, lightweight, standards-based
2. **Shadow DOM**: True encapsulation
3. **Custom Events**: Loose coupling between components
4. **Property Binding**: Reactive data flow
5. **Service Layer**: Abstracts data fetching
6. **Model Classes**: Type-safe data structures
7. **Modular Components**: Small, focused, reusable
8. **Mock Data**: Easy testing and development

## ✅ Benefits

✨ **Maintainable**: Clear separation of concerns
✨ **Scalable**: Easy to add new features
✨ **Testable**: Isolated components and models
✨ **Reusable**: Components work independently
✨ **Type-safe**: Model classes enforce structure
✨ **Performant**: Lit's efficient rendering
✨ **Modern**: Web standards-based approach
