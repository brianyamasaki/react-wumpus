import { useRef, useState } from "react";
import Controller, { GameInit } from "../logic/controller";
import Dashboard from "./Dashboard";
import GameOver from './GameOver';
import TriviaBattle from './TriviaBattle';
import { ErrorBoundary } from "react-error-boundary";
import './Game.css';
import { GameMode } from "../logic/events";

const init:GameInit = {
  playerRoom: 1,
  wumpusRoom: 3,
  pits:[4],
  bats: [5],
  imap:0
};

type FallbackProps = {
  error: Error;
};

const Game = () => {
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
        return <TriviaBattle title={"You have fallen into a Pit"} controller={controller} mdBattle={gameMode}/>;
      case GameMode.wumpusBattle:
        return <TriviaBattle title={"You have found the Wumpus"} controller={controller} mdBattle={gameMode} />;
    }
  }

  const renderDeath = ({error}:FallbackProps) => {
    return (
      <div>
        <h1>You Lost</h1>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <ErrorBoundary fallbackRender={renderDeath} >
      <div className="game">
        {chooseDisplay()}
      </div>
    </ErrorBoundary>
  )
}

export default Game;