// Model: Activity
export class Activity {
  constructor(id, title, description, time) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.time = time;
  }

  static fromJSON(json) {
    return new Activity(
      json.id,
      json.title,
      json.description,
      json.time
    );
  }
}
