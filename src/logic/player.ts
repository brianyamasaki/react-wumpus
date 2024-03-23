import Score from './score';


export default class Player {
  private currentRoom:number;
  private score:Score;

  constructor(playerStart:number) {
    this.currentRoom = playerStart;
    this.score = new Score();
  }

  setCurrentRoom(room:number) {
    this.currentRoom = room;
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
