import { useState, useRef, useEffect } from "react";
import Controller, { GameDisplay, GameInit } from "../logic/controller";
import './Game.css';

const init:GameInit = {
  playerRoom: 1,
  wumpusRoom: 3,
  pits:[4],
  bats: [5],
  imap:0
};

const giInit: GameDisplay = {
  playerRoom: 1,
  moveChoices: [],
  warnings:[],
  coins:0,
  arrows: 3
};

const Game = () => {

  const [ gameInfo, setGameInfo] = useState(giInit);
  const controllerRef = useRef(new Controller(init));
  const controller = controllerRef.current;

  useEffect(() => {
    setGameInfo(controller.getDisplay());
  }, []);

  const moveButtons = (choices: number[]) => {
    const moveTo = (room: number) => {
      controller.moveToRoom(room);
      setGameInfo(controller.getDisplay());
    }
    return choices.map((room, i) => (
      <button key={i} onClick={() => moveTo(room)}>Move to {room}</button>
    ))
  }

  return (
    <div className="game">
      <img src="./demo-cave.svg" alt="Map of Dungeon" />
      <h2>You're in room {gameInfo.playerRoom}</h2>
      <ul>
        <li>
          {moveButtons(gameInfo.moveChoices)}
        </li>
        <li>{gameInfo.warnings.join(', ')}</li>
        <li>Coins: {gameInfo.coins}</li>
        <li>Arrows: {gameInfo.arrows}</li>
      </ul>
    </div>
  )
}

export default Game;