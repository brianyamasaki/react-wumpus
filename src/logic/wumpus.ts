import Map from './map';
import GameError, {GError} from './gameErrors';

export default class Wumpus {
  private currentRoom: number;
  private map:Map;

  constructor(startingRoom:number, map:Map) {
    this.currentRoom = startingRoom;
    this.map = map;
  }

  getRoom() {
    return this.currentRoom;
  }

  playerEntersRoom(room: number) {
    if (room === this.currentRoom) {
      // Player has entered Wumpus Room
      throw new GameError('Wumpus Encounter', GError.encounterWumpus);
    }
  }

  shotArrow(room:number) {
    if (this.currentRoom === room) {
      alert('TBD - You have killed the Wumpus')
    }
  }

  lostBattle() {
    this.currentRoom = this.map.moveToRandomRoom(this.currentRoom, 2,4);
  }

  getWarnings(playerRoom:number):string[] {
    const warnings: string[] = [];
    if (this.map.areRoomsClose(playerRoom, this.currentRoom)) {
      warnings.push("I smell a Wumpus!");
    }
    return warnings;
  }
}