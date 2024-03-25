import Map from './map';
import Player from './player';
import Hazards from './hazards';
import Trivia from './trivia';

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
}

export default class Controller {
  private map:Map;
  private player:Player;
  private hazards:Hazards;
  private trivia:Trivia;

  constructor(gameInit: GameInit) {
    this.map = new Map(gameInit.imap);
    this.player = new Player(gameInit.playerRoom);
    this.hazards = new Hazards(gameInit.pits, gameInit.bats, this.map);
    this.trivia = new Trivia();
  }

  getDisplay():GameDisplay {
    const playerRoom = this.player.getCurrentRoom();
    const warnings = this.hazards.getWarnings(playerRoom);
    return {
      playerRoom,
      moveChoices:this.map.getTunnels(playerRoom),
      warnings,
      coins: this.player.getCoins(),
      arrows: this.player.getArrows()
    }
  }

  buyArrows(count:number) {
    alert(`buy arrows ${count}`);

  }

  shootArrows() {
    alert(`shoot arrow`);

  }

  moveToRoom(iroom:number) {
    this.player.setCurrentRoom(iroom);
  }

  buySecret() {
    alert(`buy secret`);
  }
}