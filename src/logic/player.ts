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

  moveToCurrentRoom(room:number) {
    this.currentRoom = room;
    this.score.addTurn();
    this.score.addCoins(1);
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

  loseCoins(count:number) {
    this.score.loseCoins(count);
  }

  getArrows() {
    return this.score.arrowCount();
  }

  getMoves() {
    return this.score.moveCount();
  }
}
