import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { Header } from '../components/Header';
import { Question } from '../components/Question';
import { ModalConfirm } from '../components/ModalConfirm';
import { Button } from '../components/Button';

import '../styles/room.scss';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import closeImg from '../assets/images/close.svg';
import emptyImg from '../assets/images/empty-questions.svg';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const { id: roomId } = params;

  const { questions, title, roomAuthorId } = useRoom(roomId);
  const { user } = useAuth();

  const [idQuestionToDelete, setIdQuestionToDelete] = useState('');
  const [confirmActionName, setConfirmActionName] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalSubtitle, setModalSubtitle] = useState('');


  useEffect(() => {
    if ((user?.id && roomAuthorId) && user?.id !== roomAuthorId) {
      toast.error('Página disponível apenas para responsável da sala');
      history.push('/');
    }
  }, [user?.id, roomAuthorId, history])

  async function handleEndRoom() {
    setModalTitle('Encerrar sala');
    setModalSubtitle('Tem certeza que você deseja encerrar esta sala?');
    setConfirmActionName('endRoom');
  }

  async function handleRequestEndRoom() {
    await database.ref(`/rooms/${roomId}`).update({
      endedAt: new Date()
    });

    toast.success('Sala encerrada com sucesso');
    setConfirmActionName('');
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    setModalTitle('Excluir pergunta');
    setModalSubtitle('Tem certeza que você deseja excluir esta pergunta?');
    setConfirmActionName('deleteQuestion');
    setIdQuestionToDelete(questionId);
  }

  async function handleRequestDeleteQuestion() {
    await database.ref(`/rooms/${roomId}/questions/${idQuestionToDelete}`).remove();

    toast.success('Pergunta excluída com sucesso');
    setConfirmActionName('');
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
      <Header roomId={roomId}>
        <Button className="end-room" onClick={handleEndRoom}>
          <img src={closeImg} alt="Encerrar sala" />
          Encerrar sala
        </Button>
      </Header>

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

        {!questions.length && (
          <div>
            <img src={emptyImg} alt="Ainda não há questões para esta sala" />
            <p>Ainda não há questões para esta sala</p>
          </div>
        )}

        <ModalConfirm
          onCancel={() => setConfirmActionName('')}
          onConfirm={confirmActionName === 'deleteQuestion' ? handleRequestDeleteQuestion : handleRequestEndRoom}
          modalIsOpen={!!confirmActionName}
          modalTitle={modalTitle}
          modalSubtitle={modalSubtitle}
          modalActionLabel={confirmActionName === 'deleteQuestion' ? 'excluir' : 'encerrar'}
          icon={confirmActionName === 'deleteQuestion' ? 'delete' : 'close'}
        />
      </main>
    </div>
  );
}