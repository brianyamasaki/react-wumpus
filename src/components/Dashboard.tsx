import type { GameDisplay } from "../logic/controller";

type Props = {
  info: GameDisplay;
}


const Dashboard = ({info}: Props) => {

  return (
    <div>
      <img src="./demo-cave.svg" style={{width:'50%'}}/>
      <h2>You're in room {info.playerRoom}</h2>
      <ul>
        <li>
          Tunnels to {info.moveChoices.join(', ')}
        </li>
        <li>{info.warnings.join(', ')}</li>
        <li>Coins: {info.coins}</li>
        <li>Arrows: {info.arrows}</li>
      </ul>
    </div>
  )
}

export default Dashboard;