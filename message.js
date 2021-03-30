class Message {
  constructor(message, type) {
    this.id = Date.now();
    this.type = type
    this.message = message
  }
}