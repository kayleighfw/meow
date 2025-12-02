# 🚀 TIEDRAGON Dashboard - Quick Start Guide

## Wat is er geïmplementeerd?

Een volledig functioneel dashboard met **MVC architectuur** voor het TIEDRAGON incident management systeem.

## 📁 Bestandsstructuur

```
src/dashboard/
├── Dashboard.js                    ← Hoofd controller
├── dashboard.css                   ← Gedeelde stijlen
├── index.js                        ← Export file
├── README.md                       ← Documentatie
├── ARCHITECTURE.md                 ← Architectuur uitleg
│
├── models/                         ← Data modellen (M in MVC)
│   ├── Incident.js                 ← Incident model
│   ├── Activity.js                 ← Activiteit model
│   └── DashboardStats.js           ← Statistieken model
│
├── components/                     ← UI componenten (V in MVC)
│   ├── DashboardHeader.js          ← Header met logout
│   ├── DashboardSidebar.js         ← Navigatie sidebar
│   ├── StatCard.js                 ← Statistiek kaartjes
│   ├── ActivityItem.js             ← Activiteit items
│   └── IncidentTable.js            ← Incident tabel met filters
│
└── services/                       ← Business logica (C in MVC)
    └── DashboardService.js         ← Data ophaal service
```

## ✨ Features

### 1. **Dashboard Header**
- TIEDRAGON logo/titel
- Gebruikersnaam weergave
- Uitlog functionaliteit

### 2. **Navigatie Sidebar**
- Dashboard (actief)
- Incidenten
- Rapporten
- Instellingen

### 3. **Statistiek Kaarten** (4 stuks)
- 🚨 Hoge Prioriteit (rood)
- ⚠️ Gemiddelde Prioriteit (oranje)
- ℹ️ Lage Prioriteit (groen)
- 📊 Totaal Incidenten

### 4. **Recente Activiteit**
- Live feed van acties
- Timestamps
- Visuele indicators

### 5. **Incident Tabel**
- Sorteerbare kolommen
- Filter knoppen (Alle/Hoog/Gemiddeld/Laag)
- Status badges (Open/In behandeling/Opgelost)
- Prioriteit badges
- Type badges (Ongeval/Verkeer/Schietincident)
- Bekijk actie knop per incident

## 🎯 MVC Architectuur Toegepast

### **Model** (Data laag)
```javascript
// Incident.js - Data structuur
class Incident {
  constructor(id, title, type, priority, status, location, time, description)
  static fromJSON(json)
  toJSON()
}
```

### **View** (Presentatie laag)
```javascript
// StatCard.js - UI component
class StatCard extends LitElement {
  static properties = { title, value, icon, priority }
  render() { return html`...` }
}
```

### **Controller** (Logica laag)
```javascript
// Dashboard.js - Orchestrator
class DashboardPage extends LitElement {
  async loadDashboardData() {
    this.incidents = await this.dashboardService.getIncidents()
    this.stats = DashboardStats.fromIncidents(this.incidents)
  }
}
```

## 🔧 Hoe te Gebruiken

### 1. Start de applicatie
```bash
cd meow
npm run dev
```

### 2. Login
- Voer credentials in bij het login scherm
- Na succes wordt automatisch dashboard geladen

### 3. Dashboard Interacties
- **Filter incidenten**: Klik op Alle/Hoog/Gemiddeld/Laag knoppen
- **Bekijk incident**: Klik op "Bekijken" knop in de tabel
- **Navigeer**: Gebruik de sidebar voor navigatie
- **Uitloggen**: Klik op de gebruikersnaam in de header

## 🎨 Design Patterns Gebruikt

### 1. **Component Pattern**
Elk UI element is een herbruikbaar component:
```javascript
<stat-card title="Hoge Prioriteit" .value=${5} icon="🚨" priority="high">
</stat-card>
```

### 2. **Observer Pattern** (Event-driven)
Components communiceren via events:
```javascript
// IncidentTable stuurt event
this.dispatchEvent(new CustomEvent('filter-change', { detail: { filter } }))

// Dashboard luistert en reageert
@filter-change=${this.handleFilterChange}
```

### 3. **Service Layer Pattern**
Data logica gescheiden van UI:
```javascript
// DashboardService.js
async getIncidents() {
  // API call hier
  return mockIncidents
}
```

### 4. **Factory Pattern**
Models maken van JSON:
```javascript
Incident.fromJSON(jsonData)
```

## 📊 Data Flow

```
User Login
    ↓
Dashboard mounts
    ↓
DashboardService.getIncidents()
    ↓
Transform to Incident models
    ↓
Update component state
    ↓
Render views
    ↓
User interacts
    ↓
Events bubble up to controller
    ↓
Controller updates state
    ↓
Views re-render (reactive)
```

## 🔌 API Integratie

Momenteel gebruikt het systeem **mock data**. Om echte API te gebruiken:

### Vervang in `DashboardService.js`:

**Voor:**
```javascript
async getIncidents() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(this.mockIncidents), 300);
  });
}
```

**Na:**
```javascript
async getIncidents() {
  const response = await fetch('http://localhost:3000/api/incidents');
  const data = await response.json();
  return data.map(json => Incident.fromJSON(json));
}
```

## 🎨 Styling Aanpassen

### Kleuren wijzigen in `dashboard.css`:
```css
:root {
  --primary-color: #667eea;      /* Hoofdkleur */
  --danger-color: #e74c3c;       /* Hoge prioriteit */
  --warning-color: #f39c12;      /* Gemiddelde prioriteit */
  --success-color: #27ae60;      /* Lage prioriteit */
}
```

### Component stijl aanpassen:
Elk component heeft zijn eigen `static styles`:
```javascript
// In StatCard.js
static styles = css`
  .stat-card {
    border-radius: 10px;  /* Aanpassen naar 5px voor minder ronde hoeken */
  }
`;
```

## 🧪 Testing

### Component testen:
```javascript
// Test StatCard
const card = document.createElement('stat-card');
card.title = 'Test';
card.value = 5;
card.priority = 'high';
document.body.appendChild(card);
```

### Event testen:
```javascript
// Test IncidentTable filter
const table = document.querySelector('incident-table');
table.addEventListener('filter-change', (e) => {
  console.log('Filter changed to:', e.detail.filter);
});
```

## 📱 Responsive Design

Dashboard is volledig responsive:
- **Desktop**: Volledige layout met sidebar
- **Tablet**: Grid aanpassingen
- **Mobile**: Gestapelde layout

Media queries in elke component:
```css
@media (max-width: 768px) {
  .incidents-table { font-size: 14px; }
}
```

## 🚀 Uitbreidingen Toevoegen

### Nieuwe incident type:
1. Voeg toe aan `IncidentTable.js`:
```javascript
const typeMap = {
  'fire': 'Brand'  // Nieuw type
};
```

2. Voeg CSS toe:
```css
.type-fire {
  background-color: #ff5722;
  color: white;
}
```

### Nieuwe statistiek kaart:
```javascript
<stat-card
  title="Actieve Teams"
  .value=${activeTeams}
  icon="👥"
  priority="medium">
</stat-card>
```

### Nieuwe sidebar item:
```javascript
// In DashboardSidebar.js
<li class="${this.activeItem === 'teams' ? 'active' : ''}">
  <a @click=${() => this.handleNavigation('teams')}>Teams</a>
</li>
```

## 🐛 Troubleshooting

### Dashboard laadt niet
- Check browser console voor errors
- Verifieer dat alle imports correct zijn
- Check of Lit library is geïnstalleerd: `npm list lit`

### Stijlen werken niet
- Shadow DOM isoleert stijlen
- Gebruik component properties voor styling
- Check of `dashboard.css` is geïmporteerd in `main.js`

### Events werken niet
- Check event namen (case-sensitive)
- Verifieer dat `@event-name` syntax correct is
- Check dat `dispatchEvent` correct is aangeroepen

## 📚 Verder Lezen

- `README.md` - Algemene documentatie
- `ARCHITECTURE.md` - Gedetailleerde architectuur uitleg
- [Lit Documentation](https://lit.dev) - Lit framework docs
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) - Web Components MDN

## ✅ Checklist voor Productie

- [ ] Vervang mock data met echte API calls
- [ ] Voeg error handling toe
- [ ] Implementeer loading states
- [ ] Voeg authenticatie toe
- [ ] Test op alle browsers
- [ ] Optimaliseer voor performance
- [ ] Voeg unit tests toe
- [ ] Implementeer logging
- [ ] Voeg analytics toe
- [ ] Security audit uitvoeren

## 💡 Tips

1. **Component hergebruik**: Alle components zijn herbruikbaar
2. **Event-driven**: Gebruik events voor component communicatie
3. **Mock first**: Test met mock data voor snelle ontwikkeling
4. **Shadow DOM**: Styles zijn geïsoleerd per component
5. **Reactive**: State changes triggeren automatisch re-renders

## 🎉 Klaar om te Gebruiken!

Het dashboard is volledig functioneel met:
- ✅ MVC architectuur
- ✅ Herbruikbare components
- ✅ Event-driven communicatie
- ✅ Responsive design
- ✅ Mock data voor testen
- ✅ Uitgebreide documentatie

Veel succes met je project! 🚀
