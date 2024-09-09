// context/nodemailer.context.js
"use strict";

class NodemailerContext {
  constructor(strategy) {
    this.setStrategy(strategy);
  }

  setStrategy(strategy) {
    this.strategy = strategy;
    this.transport = this.strategy.createTransport();
  }

  async sendMail(options) {
    if (!this.transport) {
      throw new Error("Nodemailer transport is not initialized");
    }

    const info = await this.transport.sendMail(options);
    return info;
  }
}

module.exports = NodemailerContext;
