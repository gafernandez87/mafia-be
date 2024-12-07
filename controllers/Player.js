const Player = require('../models/Player');

const mockPlayers = [
  {
      "id": "f653bf0e-5749-46a1-83a4-a48ef1b5bae3",
      "name": "p0",
      "job": "pueblo",
      "nextStatus": "alive",
      "status": "alive",
      "isAdmin": false,
      "isProtected": false,
      "money": 100,
      "isPoisoned": false,
      "health": 2,
      "backpack": [],
  },
  {
      "id": "124f0508-5526-4b74-82e0-ff6307ce26c8",
      "name": "p1",
      "job": "pueblo",
      "nextStatus": "alive",
      "status": "alive",
      "isAdmin": false,
      "isProtected": false,
      "money": 100,
      "isPoisoned": false,
      "health": 2,
      "backpack": [],
  },
  {
      "id": "16eed8c8-c771-4220-b431-83458e272786",
      "name": "p2",
      "job": "medico",
      "nextStatus": "alive",
      "status": "alive",
      "isAdmin": false,
      "isProtected": false,
      "money": 100,
      "isPoisoned": false,
      "health": 2,
      "backpack": [],
  },
  {
      "id": "c7ed33f6-b353-4ee5-bc6c-58ab4d671289",
      "name": "p3",
      "job": "mafia",
      "nextStatus": "alive",
      "status": "alive",
      "isAdmin": false,
      "isProtected": false,
      "money": 100,
      "isPoisoned": false,
      "health": 2,
      "backpack": [],
  },
  {
      "id": "54453e69-6520-4b34-8662-3ba598f16dad",
      "name": "p4",
      "job": "pueblo",
      "nextStatus": "alive",
      "status": "alive",
      "isAdmin": false,
      "isProtected": false,
      "money": 100,
      "isPoisoned": false,
      "health": 2,
      "backpack": [],
  },
  {
      "id": "7724b716-03bd-469b-95f6-93ee27a2b226",
      "name": "Peter",
      "job": 'policia',
      "status": "alive",
      "nextStatus": "alive",
      "isAdmin": true,
      "isProtected": false,
      "money": 100,
      "isPoisened": false,
      "health": 2,
      "backpack": [],
  }
];

let players = [...mockPlayers];

exports.addPlayer = (name) => {
  players.push(name);
};

exports.clear = () => {
  players = [];
};

exports.getPlayers = () => players;

exports.setAdmin = (players, id) => {
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


exports.makePurchase = (player, item) => {
  const found = players.find((p) => p.id === player.id);
  if(found) {
    found.money -= item.price;
    found.backpack.push(item.name);
  }
}