import { useHistory, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';
import { Question } from '../components/Question';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import '../styles/room.scss';
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const { id: roomId } = params;

  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    if (window.confirm('Tem certeza que você deseja encerrar esta sala?')) {
      await database.ref(`/rooms/${roomId}`).update({
        endedAt: new Date()
      });

      toast.success('Sala encerrada com sucesso');
      history.push('/');
    }
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove();
    }

    toast.success('Pergunta excluída com sucesso');
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });

    toast.success('Pergunta marcada como respondida com sucesso');
  }

  async function handleHighlightedQuestion(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });

    toast.success('Pergunta destacada com sucesso');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      aria-label="Marcar pergunta como respondida"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      aria-label="Dar destaque à pergunta"
                      onClick={() => handleHighlightedQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  aria-label="Remover pergunta"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  );
}