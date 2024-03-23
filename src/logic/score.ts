export default class Score {
  private coins = 0;
  private arrows = 3;
  private cturns = 0;

  addCoins (count?:number) {
      this.coins += typeof count === 'number' ? count : 1;
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
}