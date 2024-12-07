const GameController = require('./controllers/Game');
const PlayerController = require('./controllers/Player');
const MarketController = require('./controllers/Market');

function socketConnection(socket, io) {
  
    try {
        const game = GameController.getGame();
        io.emit('game', game);
    } catch (error) {
        console.error('Error al obtener el juego:', error); // Añade este log
        socket.emit('connect_error', 'Error al obtener el juego'); // Emite un error específico al cliente
    }
  
    socket.on('game', () => {
      console.log('Game request')
      socket.emit('game', GameController.getGame());
    });
  
    socket.on('setAdmin', (id) => {
      const players = GameController.getGame().players;
      const updated = PlayerController.setAdmin(players, id);
      io.emit('game', GameController.updatePlayers(updated));
    });
  
    socket.on('beginGame', () => {
      io.emit('game', GameController.begin());
    });
  
    socket.on('toggleDay', () => {
      io.emit('game', GameController.toggleDay());
    });

    socket.on('buy', (data) => {
      const {player, item} = data;
      const success = MarketController.buy(item.name);
      if(success) {
        PlayerController.makePurchase(player, item);
      }

      const game = GameController.getGame();
      game.players = PlayerController.getPlayers();
      game.market = MarketController.getMarket();
      io.emit('game', game);
    })

    socket.on('reset', () => {
      io.emit('game', GameController.reset());
    });
  
    socket.on('changeTurn', (obj) => {
      io.emit('game', GameController.changeTurn(obj.nextTurn, obj.from));
    });
  
    socket.on('kick', (who) => {
      io.emit('game', GameController.kick(who));
    });
  
    socket.on('kill', (who) => {
      io.emit('game', GameController.kill(who));
    });
  
    socket.on('protect', (who) => {
      io.emit('game', GameController.protect(who));
    });
  
    socket.on('investigate', (who) => {
      socket.emit('investigate', GameController.investigate(who));
    });
  
    socket.on('disconnect', () => {
      // TODO Investigar como saber quien se desconectó.
      console.log('Client disconnected');
    });
}

//export function
module.exports = socketConnection;