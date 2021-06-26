import { useEffect, useState } from 'react';

import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likedId: string | undefined;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`/rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions;
      
      const entriesQuestions = Object.entries(firebaseQuestions);

      const parsedQuestions = entriesQuestions.map(([key, value]) => ({
        id: key,
        content: value.content,
        author: value.author,
        isAnswered: value.isAnswered,
        isHighlighted: value.isHighlighted,
        likeCount: Object.values(value.likes ?? {}).length,
        likedId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
      }));

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);

      return () => {
        roomRef.off('value');
      }
    })
  }, [roomId, user])

  return { questions, title };
}