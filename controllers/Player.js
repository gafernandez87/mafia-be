const Player = require('../models/Player');

let players = [];

exports.addPlayer = (name) => {
  players.push(name);
};

exports.clear = () => {
  players = [];
};

exports.getPlayers = () => players;
exports.getMockPlayers = () => [
  {
    id: 'f653bf0e-5749-46a1-83a4-a48ef1b5bae3',
    name: 'p0',
    job: 'pueblo',
    nextStatus: 'alive',
    status: 'alive',
    isAdmin: false,
    isProtected: false,
  },
  {
    id: '124f0508-5526-4b74-82e0-ff6307ce26c8',
    name: 'p1',
    job: 'policia',
    nextStatus: 'alive',
    status: 'alive',
    isAdmin: false,
    isProtected: false,
  },
  {
    id: '16eed8c8-c771-4220-b431-83458e272786',
    name: 'p2',
    job: 'medico',
    nextStatus: 'alive',
    status: 'alive',
    isAdmin: false,
    isProtected: false,
  },
  {
    id: 'c7ed33f6-b353-4ee5-bc6c-58ab4d671289',
    name: 'p3',
    job: 'mafia',
    nextStatus: 'alive',
    status: 'alive',
    isAdmin: false,
    isProtected: false,
  },
  {
    id: '54453e69-6520-4b34-8662-3ba598f16dad',
    name: 'p4',
    job: 'pueblo',
    nextStatus: 'alive',
    status: 'alive',
    isAdmin: false,
    isProtected: false,
  },
  {
    id: 'ab45964b-3d00-4b9d-9132-deee523b0c92',
    name: 'admin',
    job: 'admin',
    nextStatus: 'alive',
    status: 'alive',
    isAdmin: true,
    isProtected: false,
  },
];

exports.setAdmin = (id) => {
  players = players.map((p) => ({
    ...p,
    isAdmin: p.id === id,
  }));
  return players;
};

exports.takePlayer = async (playerId, taken) => {
  const player = await Player.findById(playerId);
  player.taken = taken;
  return player.save();
};
