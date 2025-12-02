// Model: DashboardStats
export class DashboardStats {
  constructor(highPriority, mediumPriority, lowPriority, totalIncidents) {
    this.highPriority = highPriority;
    this.mediumPriority = mediumPriority;
    this.lowPriority = lowPriority;
    this.totalIncidents = totalIncidents;
  }

  static fromIncidents(incidents) {
    const high = incidents.filter(i => i.priority === 'high').length;
    const medium = incidents.filter(i => i.priority === 'medium').length;
    const low = incidents.filter(i => i.priority === 'low').length;
    const total = incidents.length;

    return new DashboardStats(high, medium, low, total);
  }
}
