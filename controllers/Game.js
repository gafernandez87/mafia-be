const Game = require('../models/Game');
const PlayerController = require('./Player');
const MarketController = require('./Market');

let game = null;
const SPECIAL_JOBS = ['policia', 'medico'];
const getRandom = (min, max) => min + Math.floor((max - min) * Math.random());

const shuffleArray = (input) => {
  const array = [...input];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const assignJobs = () => {
  const jobsShuffled = shuffleArray(SPECIAL_JOBS);
  let mafias = 0;
  let maxMafias = game.players.length <= 5 ? 1 : 2;

  const newPlayers = shuffleArray(game.players).map(player => {
    if(mafias < maxMafias) {
      player.job = 'mafia';
      mafias++;
    } else {
      const newJob = jobsShuffled.pop();
      player.job = newJob || 'pueblo';
    }
    return player;
  });


  return newPlayers;
};

const isGameOver = () => {
  const hasMafia = game.players.find((p) => p.job === 'mafia').status === 'alive';
  const alive = game.players
    .filter((p) => p.job !== 'admin' && p.job !== 'mafia' && p.status === 'alive').length;
  return {
    isOver: !hasMafia || alive <= 1,
    winner: alive > 1 ? 'pueblo' : 'mafia',
  };
};

exports.getGame = () => {
  console.log("getting Game", game);
  if (!game) {
    const players = PlayerController.getPlayers();
    const market = MarketController.getMarket();

    game = new Game(players,market);
  }
  return game;
};

exports.updatePlayers = (players) => {
  game.players = players;
  return game;
};

exports.begin = () => {
  game.status = 'in_progress';
  game.players = assignJobs();
  return game;
};

exports.reset = () => {
  const players = PlayerController.getPlayers();
  game = new Game(players);
  return game;
};

exports.changeTurn = (job, from) => {
  if (from) {
    game.alreadyPlayed.push(from);
  }
  game.turn = job;
  return game;
};

exports.toggleDay = () => {
  const newDaytime = game.daytime === 'day' ? 'night' : 'day';
  if (newDaytime === 'day') game.dayCount += 1;
  game.daytime = newDaytime;
  game.players = game.players.map((p) => ({
    ...p,
    status: newDaytime === 'day' ? p.nextStatus : p.status,
    nextStatus: newDaytime === 'night' ? p.status : p.nextStatus,
    isProtected: false,
  }));

  game.alreadyPlayed = [];

  const gameOver = isGameOver();
  if (gameOver.isOver) {
    game.status = 'game_over';
    game.winner = gameOver.winner;
  }
  return game;
};

exports.kick = (who) => {
  game.players = game.players.map((p) => ({
    ...p,
    status: p.id === who ? 'dead' : p.status,
  }));
  const gameOver = isGameOver();
  if (gameOver.isOver) {
    game.status = 'game_over';
    game.winner = gameOver.winner;
  }
  return game;
};

exports.kill = (who) => {
  const updatedPlayers = game.players.map((p) => ({
    ...p,
    nextStatus: p.id === who && !p.isProtected ? 'dead' : p.status,
  }));
  game.players = updatedPlayers;
  game.turn = 'admin';
  game.alreadyPlayed.push('mafia');
  return game;
};

exports.protect = (who) => {
  game.players = game.players.map((p) => ({
    ...p,
    isProtected: p.id === who,
    nextStatus: p.id === who ? 'alive' : p.nextStatus,
  }));
  game.turn = 'admin';
  game.alreadyPlayed.push('medico');
  return game;
};

exports.investigate = (who) => {
  const suspect = game.players.find((p) => p.id === who);
  game.alreadyPlayed.push('policia');
  return suspect.job === 'mafia';
};
