// Model: Incident
export class Incident {
  constructor(id, title, type, priority, status, location, time, description) {
    this.id = id;
    this.title = title;
    this.type = type; // 'accident', 'traffic', 'shooting', etc.
    this.priority = priority; // 'high', 'medium', 'low'
    this.status = status; // 'open', 'progress', 'resolved'
    this.location = location;
    this.time = time;
    this.description = description;
  }

  static fromJSON(json) {
    return new Incident(
      json.id,
      json.title,
      json.type,
      json.priority,
      json.status,
      json.location,
      json.time,
      json.description
    );
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      priority: this.priority,
      status: this.status,
      location: this.location,
      time: this.time,
      description: this.description
    };
  }
}
