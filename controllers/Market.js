const Market = require('../models/Market');

let market = null;

exports.getMarket = () => {
    if(!market) market = new Market();
    return market;
};

exports.buy = (itemName) => {
    let found = null;
    if(market) {
        found = market.goodItems.find((i) => i.name === itemName);
        found ? found : market.badItems.find((i) => i.name === itemName);
    }

    if(found) {
        found.stock--;
        return true;
    }

    return false;
}