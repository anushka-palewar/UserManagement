import type { User } from '../../types/user';
import { UserItem } from '../UserItem/UserItem';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number | string) => Promise<boolean>;
}

export const UserList = ({ users, onEdit, onDelete }: UserListProps) => {
  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserItem key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};
