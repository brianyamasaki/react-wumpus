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

  const displayWarnings = () => {
    if (gameInfo.warnings.length > 0) {
      return (
        <ul className="warnings">
          {gameInfo.warnings.map((str,i) => (
            <li key={str + i}>
              {str}
            </li>
          ))}
        </ul>
      )
    }
  }

  const roomsDisplay = (choices: number[]) => {
    const moveTo = (room: number) => {
      controller.moveToRoom(room);
      setGameInfo(controller.getDisplay());
    }

    const shootTo = (room: number) => {
      controller.shootArrow(room);
      setGameInfo(controller.getDisplay());
    }

    return choices.map((room, i) => (
      <div className="room">
        <button key={i} onClick={() => moveTo(room)}>Move to {room}</button>
        <br />
        <button key={i} onClick={() => shootTo(room)}>Shoot into {room}</button>
      </div>
    ))
  }

  return (
    <div className="game">
      <img src="./demo-cave.svg" alt="Map of Dungeon" />
      <h2>You're in room {gameInfo.playerRoom}</h2>
      {displayWarnings()}
      <p>You have access to rooms {gameInfo.moveChoices.join(' and ')}</p>
      <div className="room-choice">
        {roomsDisplay(gameInfo.moveChoices)}
      </div>      

      <div className="purse">
        <div>Coins: {gameInfo.coins} </div>
        <div>Arrows: {gameInfo.arrows}</div>

      </div>
    </div>
  )
}

export default Game;