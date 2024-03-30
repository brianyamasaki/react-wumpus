import { useState } from "react";
import Controller from "../logic/controller";
import CaveControls from "./CaveControls";
import './Dashboard.scss';

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

  const moveTo = (room: number) => {
    controller.moveToRoom(room);
    setInfo(controller.getDisplay());
  }

  const shootTo = (room: number) => {
    controller.shootArrow(room);
    setInfo(controller.getDisplay());
  }
  
  return (
    <>
      <div className="side-by-side">
        <CaveControls info={info} moveToRoom={moveTo} shootToRoom={shootTo} />
        <img src="./demo-cave.svg" alt="Map of Dungeon" />
      </div>
      {displayWarnings()}
      <div className="purchase">
        <button onClick={() => controller.buyArrows(2)}>Purchase Arrows</button>
        <button onClick={() => controller.buySecret()}>Purchase a secret</button>
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