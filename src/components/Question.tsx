import { ReactNode } from 'react';
import '../styles/question.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  const classnameAnswered = isAnswered ? 'answered' : '';
  const classnameHighlighted = isHighlighted && !isAnswered ? 'highlighted' : '';

  return (
    <div className={`question ${classnameAnswered} ${classnameHighlighted}`}>
      <p>{content} {isAnswered ? '1' : ''} {isHighlighted ? '2' : ''}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>

        <div>{children}</div>
      </footer>
    </div>
  )
}