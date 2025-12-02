// Service: Data service for dashboard
import { Incident } from '../models/Incident.js';
import { Activity } from '../models/Activity.js';

export class DashboardService {
  constructor() {
    // Mock data - replace with actual API calls
    this.mockIncidents = [
      new Incident(1001, 'Verkeersongeval A12', 'accident', 'high', 'open', 'Utrecht Centrum', '10:30', 'Ernstig ongeval met meerdere voertuigen'),
      new Incident(1002, 'Verkeersopstopping Ring', 'traffic', 'medium', 'progress', 'Amsterdam Zuid', '09:15', 'File door wegwerkzaamheden'),
      new Incident(1003, 'Schietpartij Centrum', 'shooting', 'high', 'open', 'Rotterdam CS', '11:45', 'Gewapende man gesignaleerd'),
      new Incident(1004, 'Kleine aanrijding', 'accident', 'low', 'resolved', 'Den Haag West', '08:00', 'Blikschade zonder gewonden'),
      new Incident(1005, 'Wegblokkade protest', 'traffic', 'medium', 'progress', 'Utrecht Oost', '14:20', 'Demonstranten blokkeren verkeer')
    ];

    this.mockActivities = [
      new Activity(1, 'Nieuwe melding ontvangen', 'Verkeersongeval A12 toegevoegd aan systeem', '5 min geleden'),
      new Activity(2, 'Status update', 'Incident #1002 status gewijzigd naar "In behandeling"', '15 min geleden'),
      new Activity(3, 'Incident opgelost', 'Incident #1004 succesvol afgehandeld', '1 uur geleden'),
      new Activity(4, 'Team ingezet', 'Eenheid Delta-5 ingezet voor incident #1003', '2 uur geleden')
    ];
  }

  async getIncidents() {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.mockIncidents), 300);
    });
  }

  async getActivities() {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.mockActivities), 300);
    });
  }

  async updateIncidentStatus(incidentId, newStatus) {
    // Simulate API call
    const incident = this.mockIncidents.find(i => i.id === incidentId);
    if (incident) {
      incident.status = newStatus;
    }
    return incident;
  }
}
