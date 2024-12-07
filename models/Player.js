const { v4: uuidv4 } = require('uuid');

class Player {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
    this.job = null;
    this.status = 'alive';
    this.nextStatus = 'alive';
    this.isAdmin = false;
    this.isProtected = false; // TODO ver de borrar
    this.isPoisened = false;
    this.health = 2;
    this.money = 100;
    this.backpack = [];
  }
}

module.exports = Player;
