import { GameDisplay } from '../logic/controller';

import './CaveControls.scss';

type Props = {
  info: GameDisplay;
  moveToRoom: (room:number)=>void;
  shootToRoom: (room: number) => void;
}


const CaveControls = ({info, moveToRoom, shootToRoom}: Props) => {

  const room = info.playerRoom;

  const renderControls = (wall:number) => {
    const room = info.walls[wall];
    if (room <= 0) return;

    return (
      <>
        <button onClick={() => moveToRoom(room)}>Move to {room}</button>
        <br />
        <button onClick={() => shootToRoom(room)}>Shoot into {room}</button>
      </>
    )
  }
  
  return (
    <div className="cave-control">
      <div className="top">
        <div className="content">
          {renderControls(1)}
        </div>
      </div>
      <div className="leftTop">
        <div className="content">
          {renderControls(0)}
        </div>
      </div>
      <div className="rightTop">
        <div className="content">
          {renderControls(2)}
        </div>
      </div>
      <div className="leftBottom">
        <div className="content">
          {renderControls(5)}
        </div>
      </div>
      <div className="rightBottom">{renderControls(3)}</div>
      <div className="bottom">{renderControls(4)}</div>
      <div className="hexagon">
        <div className="content">
        {info.playerRoom}
        </div>
      </div>
    </div>
  )
}

export default CaveControls;