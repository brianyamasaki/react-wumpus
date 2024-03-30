import Map from './map';
import Player from './player';
import Hazards from './hazards';
import Wumpus from './wumpus';
import Trivia, { TriviaQuestion, emptyTriviaQuestion } from './trivia';
import { GameMode } from './events';
import GameError, { GError } from './gameErrors';

type fnChangeMode = (md:GameMode) => void;
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
  walls:number[];
  warnings: string[];
  coins:number;
  arrows:number;
  state: GameMode;
  moves: number;
  triviaQuestionsCorrect: number;
  triviaQuestionsIncorrect: number;
}

export default class Controller {
  private map:Map;
  private player:Player;
  private hazards:Hazards;
  private wumpus:Wumpus;
  private trivia:Trivia|null = null;
  private state:GameMode = GameMode.normal;
  private onChangeMode: fnChangeMode| null = null;

  constructor(gameInit: GameInit) {
    this.map = new Map(gameInit.imap);
    this.player = new Player(gameInit.playerRoom);
    this.hazards = new Hazards(gameInit.pits, gameInit.bats, this.map);
    this.wumpus = new Wumpus(gameInit.wumpusRoom, this.map);
  }

  get gameState() {
    return this.state;
  }

  setChangeFn(fn: fnChangeMode) {
    this.onChangeMode = fn;
  }

  changeGameMode(md:GameMode) {
    if (this.onChangeMode) {
      this.onChangeMode(md);
    }
    this.state = md;
  }

  getDisplay():GameDisplay {
    const playerRoom = this.player.getCurrentRoom();
    const warnings = this.hazards.getWarnings(playerRoom).concat(this.wumpus.getWarnings(playerRoom));
    return {
      playerRoom,
      moveChoices:this.map.getTunnels(playerRoom),
      walls:this.map.getWalls(playerRoom),
      warnings,
      coins: this.player.getCoins(),
      arrows: this.player.getArrows(),
      state: this.state,
      moves: this.player.getMoves(),
      triviaQuestionsCorrect: this.trivia ? this.trivia.correctAnswerCount() : 0,
      triviaQuestionsIncorrect: this.trivia ? this.trivia.incorrectAnswerCount() : 0
    }
  }

  buyArrows(count:number) {
    alert(`TBD - buy arrows ${count}`);

  }

  shootArrow(room:number) {
    alert('TBD - must consume arrow and change game state');
    this.wumpus.shotArrow(room);
  }

  moveToRoom(room:number) {
    this.player.moveToCurrentRoom(room);
    try {
      this.wumpus.playerEntersRoom(room);
      this.hazards.playerEntersRoom(room);
    }
    catch(error) {
      if (error instanceof GameError) {
        switch(error.gameError) {
          case GError.encounterWumpus:
            this.changeGameMode(GameMode.wumpusBattle);
            this.trivia = new Trivia(3, 5);
            break;
          case GError.fallenInPit:
            this.changeGameMode(GameMode.pitBattle);
            this.trivia = new Trivia(2, 3);
            break;
          case GError.eatenByWumpus:
            this.changeGameMode(GameMode.eatenByWumpus);
            break;
          case GError.movedByBat:
            if (error.nextRoom) {
              this.player.setCurrentRoom(error.nextRoom);
              alert(`A Bat has moved you to room ${error.nextRoom}`);
            }
            break;
          case GError.outOfCoins:
            this.changeGameMode(GameMode.outOfCoins);
            break;
        }
      } else {
        // general JavaScript Error
        const err = error as Error;
        console.error(err.message);
      }
    }
  }

  buySecret() {
    alert(`buy secret`);
  }

  getTriviaQuestion() : TriviaQuestion {
    if (this.trivia) {
      this.player.loseCoins(1);
      return this.trivia.randomQuestion();
    }
    console.error('Triva Object not allocated');
    return emptyTriviaQuestion;
  }

  triviaAnswer(ichoice:number): GameMode {
    if (this.trivia) {
      const result = this.trivia.triviaAnswer(ichoice);
      switch (this.state) {
        case GameMode.wumpusBattle:
          this.wumpus.lostBattle();
          break;
        case GameMode.pitBattle:
          this.player.setCurrentRoom(1);
          this.changeGameMode(GameMode.normal);
          break;
      }
      return result;
    }
    console.error('Trivia Object not allocated');
    return GameMode.normal;
  }
}