import Controller, { GameDisplay, GameInit } from "../logic/controller";

import './Dashboard.css';

type Props = {
  info: GameDisplay;
  controller: Controller;
}
const Dashboard = ({info, controller}: Props) => {

  const moveButtons = (choices: number[]) => {
    return choices.map((room, i) => (
      <button key={i} onClick={() => controller.moveToRoom(room)}>Move to {room}</button>
    ))
  }

  return (
    <div>
      <img src="./demo-cave.svg" alt="Map of Dungeon" />
      <h2>You're in room {info.playerRoom}</h2>
      <ul>
        <li>
          {moveButtons(info.moveChoices)}
        </li>
        <li>{info.warnings.join(', ')}</li>
        <li>Coins: {info.coins}</li>
        <li>Arrows: {info.arrows}</li>
      </ul>
    </div>
  )
}

export default Dashboard;