import { useRef, createContext, useState } from "react";
import Controller, { GameInit } from "../logic/controller";
import Dashboard from "./Dashboard";
import GameOver from './GameOver';
import TriviaBattle from './TriviaBattle';
import './Game.css';
import { GameMode } from "../logic/events";

const init:GameInit = {
  playerRoom: 1,
  wumpusRoom: 3,
  pits:[4],
  bats: [5],
  imap:0
};

const Game = () => {
  const GameModeContext = createContext(GameMode.normal)
  const [ gameMode, setGameMode ] = useState(GameMode.normal);
  const controllerRef = useRef(new Controller(init));
  const controller = controllerRef.current;

  const onChangeMode = (md:GameMode) => { 
    setGameMode(md)
  }

  controller.setChangeFn(onChangeMode);


  const chooseDisplay = () => {
    switch(gameMode) {
      case GameMode.normal:
        return <Dashboard controller={controller}/>;
      case GameMode.eatenByWumpus:
      case GameMode.outOfCoins:
        return <GameOver />
      case GameMode.pitBattle:
      case GameMode.wumpusBattle:
        return <TriviaBattle controller={controller} />;
    }
  }

  return (
    <GameModeContext.Provider value={gameMode} >
      <div className="game">
        {chooseDisplay()}
      </div>
    </GameModeContext.Provider>
  )
}

export default Game;