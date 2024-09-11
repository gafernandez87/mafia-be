class Game {
  constructor(players) {
    this.players = players;
    this.daytime = 'day';
    this.status = 'new';
    this.turn = 'admin';
    this.alreadyPlayed = [];
    this.winner = null;
    this.dayCount = 1;
  }
}

module.exports = Game;
