import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
  className?: string;
};

export function Button({ isOutlined = false, className, ...props }: ButtonProps) {

  return (
    <button
      className={`button ${isOutlined ? 'outlined' : ''} ${className ? className : ''} `}
      {...props}
    />
  );
}