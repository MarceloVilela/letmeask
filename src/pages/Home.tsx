import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';

import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { UserInfo } from '../components/UserInfo';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';

import '../styles/auth.scss';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle, signoutGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleIdentify() {
    if (user) {
      await signoutGoogle();
    }

    await signInWithGoogle();
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      toast.error('Código da sala inválido');
      return;
    }

    const roomRef = await database.ref(`/rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error(`Sala não existe: ${roomCode}`);
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error(`Sala está fechada: ${roomCode}`);
      return;
    }

    if (roomRef.val().authorId === user?.id) {
      history.push(`/admin/rooms/${roomCode}`);
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
        <Footer />
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
              name="roomCode"
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>

          <div className="acess-profile">
            Acessando como {!user?.name && 'visitante'}
            {user?.name && <UserInfo />}
          </div>

          <Button type="button" onClick={handleIdentify}>
            <img src={googleIconImg} alt="Logo do Google" />
            Entrar com o Google
          </Button>
        </div>
      </main>
    </div>
  );
}