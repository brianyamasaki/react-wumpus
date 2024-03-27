import Score from './score';


export default class Player {
  private currentRoom:number;
  private score:Score;

  constructor(playerStart:number) {
    this.currentRoom = playerStart;
    this.score = new Score(0, 3);
  }

  setCurrentRoom(room:number) {
    this.currentRoom = room;
  }

  addTurn() {
    this.score.addTurn();
  }

  addCoin() {
    this.score.addCoins();
  }

  addArrows(count:number) {
    this.score.addArrows(count);
  }

  getCurrentRoom() {
    return this.currentRoom;
  }

  getCoins() {
    return this.score.coinCount();
  }

  getArrows() {
    return this.score.arrowCount();
  }
}
