import '../styles/user-info.scss';

import { useAuth } from '../hooks/useAuth';

export function UserInfo() {
  const { user } = useAuth();

  return (
    <>
      {user?.name
        ? (
          <div className="user-info" >
            <img src={user.avatar} alt={user.name} />
            <span>{user.name}</span>
          </div>
        )
        : (
          <></>
        )}
    </>
  );
}