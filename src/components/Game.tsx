import Controller, { GameInit } from "../logic/controller";
import Dashboard from "./Dashboard";
import './Game.css';
const Game = () => {

  const init:GameInit = {
    playerRoom: 1,
    wumpusRoom: 3,
    pits:[4],
    bats: [5],
    imap:0
  }
  const controller:Controller = new Controller(init);

  return (
    <div className="game">
      <Dashboard info={controller.getDisplay()} />
    </div>
  )
}

export default Game;