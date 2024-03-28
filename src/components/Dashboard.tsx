import { useState } from "react";
import Controller from "../logic/controller";
import './Dashboard.css';

type Props = {
  controller: Controller;
}

const Dashboard = ({controller}:Props) => {

  const [info, setInfo ] = useState(controller.getDisplay());
  const displayWarnings = () => {
    if (info.warnings.length > 0) {
      return (
        <ul className="warnings">
          {info.warnings.map((str,i) => (
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
      setInfo(controller.getDisplay());
    }

    const shootTo = (room: number) => {
      controller.shootArrow(room);
      setInfo(controller.getDisplay());
    }

    return choices.map((room, i) => (
      <div className="room" key={i}>
        <h3>Room {room}</h3>
        <button onClick={() => moveTo(room)}>Move to {room}</button>
        <br />
        <button onClick={() => shootTo(room)}>Shoot into {room}</button>
      </div>
    ))
  }
  return (
    <>
      <img src="./demo-cave.svg" alt="Map of Dungeon" />
      <h2>You're in room {info.playerRoom}</h2>
      {displayWarnings()}
      <p>You have access to rooms {info.moveChoices.join(' and ')}</p>
      <div className="room-choice">
        {roomsDisplay(info.moveChoices)}
      </div>      

      <div className="purse">
        <div>Coins: {info.coins} </div>
        <div>Arrows: {info.arrows}</div>
        <div>Moves: {info.moves}</div>
      </div>
    </>
  )
}

export default Dashboard;