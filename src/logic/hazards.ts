import Map from './map';

export default class Hazards {
  private pits:number[];
  private bats:number[];
  map:Map;

  constructor(pits:number[], bats:number[], map:Map) {
    this.pits = pits;
    this.bats = bats;
    this.map = map;
  }

  getWarnings(iroom:number):string[] {
    const warnings:string[] = [];
    const roomTunnels = this.map.getTunnels(iroom);
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