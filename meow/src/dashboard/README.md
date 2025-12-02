# TIEDRAGON Dashboard - Architecture Documentation

## 🏗️ Project Structure

This dashboard follows **MVC (Model-View-Controller)** architecture pattern using Lit web components.

```
src/dashboard/
├── Dashboard.js                 # Main Controller
├── dashboard.css               # Global styles
├── models/                     # Data Models (M)
│   ├── Incident.js            # Incident data model
│   ├── Activity.js            # Activity data model
│   └── DashboardStats.js      # Statistics model
├── components/                 # View Components (V)
│   ├── DashboardHeader.js     # Header with logout
│   ├── DashboardSidebar.js    # Navigation sidebar
│   ├── StatCard.js            # Statistics card
│   ├── ActivityItem.js        # Activity list item
│   └── IncidentTable.js       # Incidents table with filters
└── services/                   # Business Logic (C)
    └── DashboardService.js    # Data fetching service
```

## 📋 Architecture Breakdown

### Models (M)
Models represent the data structure and business entities:
- **Incident.js**: Represents incident data (id, title, type, priority, status, etc.)
- **Activity.js**: Represents activity/log entries
- **DashboardStats.js**: Calculates statistics from incidents

### Views (V)
Reusable Lit components that render UI:
- **DashboardHeader**: Top navigation bar with user info and logout
- **DashboardSidebar**: Left navigation menu
- **StatCard**: Displays statistics with icon and priority styling
- **ActivityItem**: Individual activity list item
- **IncidentTable**: Full table with filtering and actions

### Controller (C)
- **Dashboard.js**: Main orchestrator that:
  - Manages application state
  - Coordinates between models and views
  - Handles user interactions
  - Fetches data via services
  
- **DashboardService.js**: Service layer that:
  - Abstracts data fetching logic
  - Provides mock data (replace with real API calls)
  - Handles business operations

## 🎨 Key Features

### Component Communication
Components communicate via:
- **Properties**: Parent-to-child data flow (`.property=${value}`)
- **Events**: Child-to-parent communication (`@event-name`)
- **Example**: IncidentTable fires `filter-change` and `view-incident` events

### Styling Strategy
- **Shadow DOM**: Each component has encapsulated styles
- **Global Styles**: `dashboard.css` provides utility classes
- **CSS Variables**: Defined in `:root` for consistent theming

### Responsive Design
- CSS Grid for adaptive layouts
- Media queries for mobile optimization
- Flexible components that adapt to screen size

## 🔧 Component Details

### StatCard
```javascript
<stat-card
  title="Hoge Prioriteit"
  .value=${count}
  icon="🚨"
  priority="high">
</stat-card>
```

### IncidentTable
```javascript
<incident-table
  .incidents=${incidentArray}
  @filter-change=${handleFilter}
  @view-incident=${handleView}>
</incident-table>
```

### DashboardHeader
```javascript
<dashboard-header 
  .username=${userName}
  @logout=${handleLogout}>
</dashboard-header>
```

## 🔄 Data Flow

1. **Dashboard.js** (Controller) initializes
2. Calls **DashboardService** to fetch data
3. Updates component **properties** (state)
4. **View components** render based on properties
5. User interactions trigger **events**
6. Events bubble up to Dashboard controller
7. Controller updates state, cycle repeats

## 🚀 Usage

### Starting the Application
```bash
cd meow
npm install
npm run dev
```

### Login Flow
1. User enters credentials in `LoginForm`
2. On success, calls `window.showPage('dashboard')`
3. Main app mounts `<dashboard-page>` component
4. Dashboard loads data and renders

### Customization

#### Adding New Incident Types
Update `IncidentTable.js` type mapping:
```javascript
const typeMap = {
  'accident': 'Ongeval',
  'traffic': 'Verkeersincident',
  'shooting': 'Schietincident',
  'fire': 'Brand' // Add new type
};
```

#### Connecting Real API
Replace mock data in `DashboardService.js`:
```javascript
async getIncidents() {
  const response = await fetch('/api/incidents');
  const data = await response.json();
  return data.map(json => Incident.fromJSON(json));
}
```

## 🎯 Best Practices Applied

✅ **Separation of Concerns**: Clear MVC separation
✅ **Component Reusability**: Small, focused components
✅ **Event-Driven**: Loose coupling via events
✅ **Type Safety**: Model classes with fromJSON/toJSON
✅ **Encapsulation**: Shadow DOM prevents style leaks
✅ **Responsive**: Mobile-first design approach
✅ **Accessibility**: Semantic HTML, proper ARIA labels

## 📚 Technologies

- **Lit**: Web components framework
- **CSS3**: Modern styling with Grid/Flexbox
- **ES6 Modules**: Clean imports/exports
- **Shadow DOM**: Style encapsulation
- **Custom Events**: Component communication

## 🔮 Future Enhancements

- Real-time updates with WebSocket
- Advanced filtering and search
- Data visualization charts
- Export functionality
- Multi-language support
- Dark mode theme
- Offline support with Service Workers

## 📝 Notes

- Mock data is used for demonstration
- Replace `DashboardService` with actual API calls
- Add authentication state management
- Consider state management library (Redux, MobX) for larger apps
- Add unit tests for components and models
