const goodItems = [
  {name: 'antidote', price: 10, stock: 3},
  {name: 'medkit', price: 10, stock: 3},
  {name: 'kevlar', price: 10, stock: 3},
];

const badItems = [
  {name: 'poison', price: 10, stock: -1},
  {name: 'bullet', price: 10, stock: -1},
];


class Market {
  constructor() {
    this.goodItems = goodItems;
    this.badItems = badItems;
  }
}

module.exports = Market;
