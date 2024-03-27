import Map from './map';
import Player from './player';
import Hazards from './hazards';
import Wumpus from './wumpus';
import Trivia from './trivia';
import { GameEvent } from './events';

export type GameInit = {
  playerRoom: number;
  wumpusRoom: number;
  pits: number[];
  bats: number[];
  imap: number;
};

export type GameDisplay = {
  playerRoom:number;
  moveChoices:number[];
  warnings: string[];
  coins:number;
  arrows:number;
  state: GameEvent;
  moves: number;
}

export default class Controller {
  private map:Map;
  private player:Player;
  private hazards:Hazards;
  private wumpus:Wumpus;
  private trivia:Trivia;
  private state:GameEvent = GameEvent.noEvent;

  constructor(gameInit: GameInit) {
    this.map = new Map(gameInit.imap);
    this.player = new Player(gameInit.playerRoom);
    this.hazards = new Hazards(gameInit.pits, gameInit.bats, this.map);
    this.wumpus = new Wumpus(gameInit.wumpusRoom, this.map);
    this.trivia = new Trivia();
  }

  getDisplay():GameDisplay {
    const playerRoom = this.player.getCurrentRoom();
    const warnings = this.hazards.getWarnings(playerRoom).concat(this.wumpus.getWarnings(playerRoom));
    return {
      playerRoom,
      moveChoices:this.map.getTunnels(playerRoom),
      warnings,
      coins: this.player.getCoins(),
      arrows: this.player.getArrows(),
      state: this.state,
      moves: this.player.getMoves()
    }
  }

  buyArrows(count:number) {
    alert(`TBD - buy arrows ${count}`);

  }

  shootArrow(room:number) {
    alert(`TBD - shoot arrow into room ${room}`);

  }

  moveToRoom(room:number) {
    this.player.setCurrentRoom(room);
    this.state = this.wumpus.playerEntersRoom(room);
  }

  buySecret() {
    alert(`buy secret`);
  }
}