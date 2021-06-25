import '../styles/room-code.scss';
import copyImg from '../assets/images/copy.svg';

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className="room-code">
      <div onClick={copyRoomCodeToClipboard}>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>

      <span>Sala #{props.code}</span>
    </button>
  );
}