class Game {
  constructor(players, market) {
    this.players = players;
    this.daytime = 'day';
    this.status = 'new';
    this.turn = 'admin';
    this.alreadyPlayed = [];
    this.winner = null;
    this.dayCount = 1;
    this.market = market;
  }
}

module.exports = Game;
