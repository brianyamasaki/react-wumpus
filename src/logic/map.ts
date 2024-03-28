import map6_1 from './data/map6_1.json';
import map30_1 from './data/map30_1.json';
const maps = [
  map6_1,
  map30_1
];

export default class Map {
  private map:number[][];
  
  constructor(imap:number) {
    this.map = maps[imap];
  }

  getTunnels(iroom:number): number[] {
    return this.map[iroom-1].filter((val) => val > 0);
  }

  areRoomsClose(iroom1:number, iroom2:number):boolean {
    const room1Tunnels = this.getTunnels(iroom1);
    return room1Tunnels.includes(iroom2);
  }

  getRandomRoom() {
    return Math.trunc(Math.random() * this.map.length);
  }
}

