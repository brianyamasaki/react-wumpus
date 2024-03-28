export enum GError {
  encounterWumpus,
  fallenInPit,
  movedByBat,
  outOfCoins,
  eatenByWumpus
}

export default class GameError extends Error {
  private gerror: GError;
  private newRoom: number = 0;

  constructor(message:string, gerror:GError, newRoom?: number) {
    super(message);
    this.gerror = gerror;
    if (newRoom) {
      this.newRoom = newRoom;
    }
  }

  get gameError() {
    return this.gerror;
  }

  get nextRoom() {
    return this.newRoom;
  }
}