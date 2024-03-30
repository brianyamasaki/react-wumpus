import map6_1 from './data/map6_1.json';
import map30_1 from './data/map30_1.json';
const maps = [
  map6_1,
  map30_1
];

const randInRange = (min:number, max:number):number => {
  return Math.floor(Math.random() * (max - min + 1) + 1);
}

export default class Map {
  private map:number[][];
  
  constructor(imap:number) {
    this.map = maps[imap];
  }

  getTunnels(room:number): number[] {
    return this.map[room-1].filter((val) => val > 0);
  }
  
  getWalls(room: number): number[] {
    return this.map[room-1];
  }

  areRoomsClose(room1:number, room2:number):boolean {
    const room1Tunnels = this.getTunnels(room1);
    return room1Tunnels.includes(room2);
  }

  getRandomRoom() {
    return Math.floor(Math.random() * this.map.length);
  }

  moveToRandomRoom(room:number, min:number, max:number): number {
    const roomsToMove = randInRange(min, max);
    let prevRoom = room;
    let curRoom = room;
    for (let i = roomsToMove; i > 0; i -= 1) {
      // tunnels excluding previous tunnel
      const tunnels = this.getTunnels(curRoom).filter(val => val !== prevRoom);
      // choose tunnel
      prevRoom = curRoom;
      if (tunnels.length === 1) {
        curRoom = tunnels[0];
      } else {
        curRoom = tunnels[randInRange(0,tunnels.length - 1)];
      }
    }
    return curRoom;
  }
}

