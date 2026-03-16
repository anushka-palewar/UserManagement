import type { User } from '../../types/user';

interface UserItemProps {
  user: User;
  onDelete: (id: string) => void;
}

export const UserItem = ({ user, onDelete }: UserItemProps) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.age}</td>
      <td>
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </td>
    </tr>
  );
};
