import Map from './map';
import GameError, { GError } from './gameErrors';

export default class Hazards {
  private pits:number[];
  private bats:number[];
  map:Map;

  constructor(pits:number[], bats:number[], map:Map) {
    this.pits = pits;
    this.bats = bats;
    this.map = map;
  }

  playerEntersRoom(room:number) {
    if (this.bats.includes(room)) {
      //bat moves you.
      throw new GameError('A bat has moved you', GError.movedByBat, this.map.getRandomRoom());
    }
    if (this.pits.includes(room)) {
      throw new GameError('You have fallen into a pit', GError.fallenInPit);
    }
  }

  getWarnings(room:number):string[] {
    const warnings:string[] = [];
    const roomTunnels = this.map.getTunnels(room);
    roomTunnels.forEach((ir) => {
      if (this.pits.includes(ir)) {
        warnings.push("I feel a draft");
      }
    })
    roomTunnels.forEach((ir) => {
      if (this.bats.includes(ir)) {
        warnings.push("Bats Nearby");
      }
    })

    return warnings;
  }
}