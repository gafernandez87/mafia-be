const express = require('express');

const Player = require('../models/Player');

const GameController = require('../controllers/Game');
const PlayerController = require('../controllers/Player');

const router = express.Router();

router.get('/', (_, res) => {
  res.status(200).send({ response: 'I am alive' });
});

router.get('/games', async (_, res) => {
  const game = GameController.getGame();
  res.status(200).json(game);
});

router.get('/players', async (_, res) => {
  const players = PlayerController.getPlayers();
  res.status(200).json(players);
});

router.post('/players', (req, res) => {
  const newPlayer = new Player(req.body.name);
  PlayerController.addPlayer(newPlayer);
  res.status(200).json(newPlayer);
});

router.get('/clear', (req, res) => {
  PlayerController.clear();
  GameController.reset();
  res.status(200).send('done');
});

module.exports = router;
