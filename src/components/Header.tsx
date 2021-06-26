import { ReactNode } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { RoomCode } from './RoomCode';
import '../styles/header.scss';
import logoImg from '../assets/images/logo.svg';
import logoutImg from '../assets/images/logout.svg';
import { useAuth } from '../hooks/useAuth';

type HeaderProps = {
  roomId: string;
  children?: ReactNode;
}

export function Header({
  roomId,
  children,
}: HeaderProps) {
  const { signoutGoogle } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    await signoutGoogle();
    history.push('/');
  }

  return (
    <header>
      <div className="content">
        <Link to="/">
          <img src={logoImg} alt="Letmeask" />
        </Link>
        <div>
          <RoomCode code={roomId} />

          {children}

          <button
            className="logout"
            type="button"
            aria-label="Sair"
            onClick={() => handleLogout()}
          >
            <img src={logoutImg} alt="Sair" />
          </button>
        </div>
      </div>
    </header>
  )
}