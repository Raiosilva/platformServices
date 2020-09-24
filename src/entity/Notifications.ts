export abstract class Notifications {
  
  notifications: Array< { message: any }>;

  constructor() {
    this.notifications = new Array< { message: string }>();
  }

  isRequired(value, message){
    if (!value || value.length <= 0) {
      this.notifications.push({ message: message });
    }
  }

  valid(): boolean {
    return this.notifications.length == 0;
  }
}