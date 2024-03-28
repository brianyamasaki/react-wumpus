export default class Score {
  private coins:number;
  private arrows:number;
  private cturns = 0;
  private bank:CoinBank;

  constructor(coins:number, arrows:number) {
    this.coins = coins;
    this.arrows = arrows;
    this.bank = new CoinBank(100);
  }

  addCoins (count:number) {
    this.coins += this.bank.getCoins(count);
  }

  loseCoins (count:number) {
    if (count > this.coins) {
      throw (new Error ("Out of Coins"));
    } else {
      this.coins -= count;
    }
  }

  addTurn() {
    this.cturns += 1;
  }

  coinCount() {
    return this.coins;
  }

  addArrows(count:number) {
    this.arrows += count;
  }

  useArrow() {
    this.arrows -= 1;
    if (this.arrows < 1) {
      throw Error("No more arrows - you lose");
    }
  }

  arrowCount() {
    return this.arrows;
  }
  
  addMove() {
    this.cturns += 1;
  }

  moveCount() {
    return this.cturns;
  }
}

class CoinBank {
  private bank:number;

  constructor(count:number) {
    this.bank = count;
  }

  getCoins(count: number):number {
    const available = Math.min(count, this.bank);
    this.bank -= available;
    return available;
  }
}